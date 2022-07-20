
import { LitElement, html, css } from 'lit';
import { GraphNode, GraphNodeProps } from './Node';
import './Edge';
import './Node';
import drag from './utils/drag'
import { GraphEdge } from './Edge';

export type GraphWorkspaceProps = {
  // tree: {[x:string]: any}
  graph: graphscriptGraph;
  plot?: Function[],
  onPlot?: Function
  preprocess?: Function
}

export class GraphWorkspace extends LitElement {

  static get styles() {
    return css`

    :host * {
      box-sizing: border-box;
    }

    :host {
        overflow: hidden;
        --grid-color: rgb(210, 210, 210);
    }

    #grid {
        position: relative;
        background-image:
        repeating-linear-gradient(var(--grid-color) 0 1px, transparent 1px 100%),
        repeating-linear-gradient(90deg, var(--grid-color) 0 1px, transparent 1px 100%);
        background-size: 20px 20px;
        width: 100%;
        height: 100%;
    }

    #grid:active:hover {
      cursor: move;
    }

    visualscript-graph-node {
      cursor: move;
    }


      @media (prefers-color-scheme: dark) { 
        :host {
            --grid-color: rgb(45, 45, 45);
        }
      }

    `;
  }
    
    static get properties() {
      return {
        // tree: {
        //   type: Object,
        //   reflect: false,
        // },
        updateCount: {
          type: Number,
          reflect: true,
        },
      };
    }

    graph: GraphWorkspaceProps['graph']
    updateCount: number = 0
    
    context: {
      scale: number
    } = {
        scale: 1
    }
    editing: HTMLElement | null = null
    mouseDown:boolean = false
    translation:{
      x: number, 
      y: number
    } = {x: 0, y:0}
    relXParent?: number
    relYParent?: number
    element: HTMLDivElement

    nodes: Map<string, GraphNode> = new Map()
    edges: Map<string, GraphEdge> = new Map()

    firstRender: boolean = true


    onEdgesReady = () => {}

    constructor(props?: GraphWorkspaceProps) {
      super();

      if (props) this.set(props.graph)

      // Resize with Window Resize
      window.addEventListener('resize', () => {
        this.resize()
      })
    }

    set = async (graph) => {
      this.graph = graph
      this.triggerUpdate(true)
    }

    updated() {

      // Rerender when All Edges have been Readied
      if (this.firstRender) {
        this.onEdgesReady = () => {
          this.firstRender = false
          this.triggerUpdate()
          this.onEdgesReady = () => {}
        }
      } 
      
      // Apply Final Methods
      else {

        this.element = this.shadowRoot.querySelector("div")
        this.addEventListener('mousedown', e => { this.mouseDown = true} )
        window.addEventListener('mouseup', e => { this.mouseDown = false} )
        this.addEventListener('wheel', this._scale)
        this.addEventListener('mousemove', this._pan)

        this.nodes.forEach((node: GraphNode) => {
          drag(this, node, () => {
            this.resize([node])
          }, () => { 
            if (!this.editing) this.editing = node
          }, () => {
            if (this.editing instanceof GraphNode) this.editing = null
          })
      })
    }

    this.resize() // Catch first edge to resize

  }

  resize = (nodes = Array.from(this.nodes.values())) => {
    nodes.forEach(node => node.edges.forEach(e => e.resize()))
  }


    triggerUpdate = (reset=false) => {
      if (reset) this.firstRender = true // Reset first render of this graph
      this.updateCount = this.updateCount + 1
    }

    resolveEdge = async (info, rerender = true, willAwait=false) => {

      if (!(this.editing instanceof GraphEdge)){

        const tempId = `${Math.round( 10000 * Math.random())}`
        const edge = new GraphEdge(Object.assign({workspace: this}, info))
        this.editing = edge

        this.edges.set(tempId, edge) // Place temp into DOM to trigger edge.rendered

        if (rerender) this.triggerUpdate()

        edge.ready.then(res => {
          if (res){
            this.edges.delete(tempId)
            this.edges.set(edge.id, edge)
            edge.resize()
          }
        }).catch(e => console.error(e))

        if (willAwait) await edge.ready // Wait until the edge is complete

        this.editing = null
        return edge
      } else await this.editing.link(info) // Link second port to the current edge
    }

    autolayout = () => {
      let count = 0
      let rowLen = 5
      let offset = 20
      this.nodes.forEach((n) => {
        n.x = offset + 100*(count % rowLen)
        n.y =  offset + 150*(Math.floor(count/rowLen))
        count++
      })
    }

    removeNode = (name) => {
      const node = this.nodes.get(name)
      this.onnoderemoved(node)
      this.nodes.delete(name)
    }

    addNode = (props: GraphNodeProps) => {
      if (!props.workspace) props.workspace = this
     const gN = new GraphNode(props)
      this.nodes.set(gN.info.tag, gN)
      this.onnodeadded(gN)
      return gN
    }

    createUIFromGraph = async () => {

      let nodes:any = ''
      let hasMoved = false

      console.log('Graph', this.graph)
      if (this.graph){

        this.graph.nodes.forEach((n) => {

          // Filter for the current level on the graph
          if (!n.graph || this.graph === n.graph){

            let gN = this.nodes.get(n.tag)
            if (!gN){

              gN = this.addNode({
                info: n,
                workspace: this
              })
            }

            hasMoved = gN.x !== 0 && gN.y !== 0
            return gN
          }
        })

        // Create Edges to Children
        const createEdges = async () => {

          // Look Two Levels Down
          const edges = {}
          const maxDepth = 2

          const condition = (node) => node?.graph && node?.graph != this.graph
          const drillForMatchingGraph = (node, tag=node.tag) => {
                let tags = [tag];
                do {
                  const hasCondition = condition(node)
                  node = this.graph.nodes.get(node.graph?.tag)
                  if (hasCondition) tags.unshift(node.tag);
                } while (condition(node))

                let portName = tags.pop()
                let match = this.nodes.get(tag);
                tags.forEach(t => {
                  const temp = this.nodes.get(t)
                  if (temp) match = temp
                })

                if (tags.length === 0) portName = match.info.nodes.keys().next().value // fallback to first node
                const port = match.ports.get(portName);

                return {
                  port,
                  match
                }
          }
          const checkNodesForEdges = async (nodes: Map<string, (GraphNode | GraphNode['info'])>, depth=0) => {
            const nodeArr = Array.from(nodes.entries());

          for (let i = 0; i < nodeArr.length; i++) {

            const [key, value] = nodeArr[i]
            let nodeInfo = (depth === 0) ? (value as GraphNode).info : value as GraphNode['info']

            if (nodeInfo.children) {
              for (let nodeTag in nodeInfo.children) {

                const output = drillForMatchingGraph(nodeInfo, key)
                const input = drillForMatchingGraph(nodeInfo.children[nodeTag], nodeTag)

                // Don't duplicate on construction
                const outTag = output.port.tag
                if (!edges[outTag]) edges[outTag] = []
                if (!edges[outTag].includes(input.port.tag)){
                  await this.resolveEdge({
                    input: input.port,
                    output: output.port
                  }, false);    

                  edges[outTag].push(input.port.tag)
                }   
              }
            }
            if (nodeInfo.nodes && depth < maxDepth) await checkNodesForEdges(nodeInfo.nodes, depth + 1)
          }
          }
          await checkNodesForEdges(this.nodes)
        };

        await createEdges()
        if (!hasMoved) this.autolayout()

        this.onEdgesReady()
      }

      return nodes
    }
    
    render(){

      // Get Nodes from Graph on First Render
      if (this.firstRender) this.createUIFromGraph()  


      // Auto Layout
        return html`
        <div id=grid>
            ${Array.from(this.nodes.values())}
            ${Array.from(this.edges.values())}
        </div>
      `
    }

    // Events
    onedgeadded: (edge:GraphEdge) => void = () => {}
    onedgeremoved: (edge:GraphEdge) => void = () => {}
    onnodeadded: (node:GraphNode) => void = () => {}
    onnoderemoved: (node:GraphNode) => void = () => {}

    // Behavior
    _scale = (e) => {
      this.context.scale += 0.01*-e.deltaY
      if (this.context.scale < 0.1) this.context.scale = 0.1 // clamp
      if (this.context.scale > 3.0) this.context.scale = 3.0 // clamp
      this._transform()
  }

    _transform = () => {
        this.element.style['transform'] = `translate(${this.translation.x}px, ${this.translation.y}px) scale(${this.context.scale*100}%)`
    }

    _pan = (e) => {

      if (!this.editing){

        if (e.target.parentNode){

            // Transform relative to Parent
            let rectParent = e.target.parentNode.getBoundingClientRect();
            let curXParent = (e.clientX - rectParent.left)/rectParent.width; //x position within the element.
            let curYParent = (e.clientY - rectParent.top)/rectParent.height;  //y position within the element.
        
            if (this.mouseDown){
                let tX = (curXParent-this.relXParent)*rectParent.width
                let tY = (curYParent-this.relYParent)*rectParent.height

                if (!isNaN(tX) && isFinite(tX)) this.translation.x += tX
                if (!isNaN(tY) && isFinite(tY)) this.translation.y += tY
                this._transform()
            } 
            this.relXParent = curXParent
            this.relYParent = curYParent
          }
        }
    }

  }
  
  customElements.get('visualscript-graph-workspace') || customElements.define('visualscript-graph-workspace',  GraphWorkspace);