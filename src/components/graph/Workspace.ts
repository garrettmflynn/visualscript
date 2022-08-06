
import { LitElement, html, css } from 'lit';
import { GraphNode, GraphNodeProps } from './Node';
import './Edge';
import './Node';
import drag from './utils/drag'
import { GraphEdge } from './Edge';

export type GraphWorkspaceProps = {
  // tree: {[x:string]: any}
  graph: waslGraph;
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
        --grid-size: 5000px;
        --grid-color: rgb(210, 210, 210);
    }

    #grid {
        position: relative;
        background-image:
        repeating-linear-gradient(var(--grid-color) 0 1px, transparent 1px 100%),
        repeating-linear-gradient(90deg, var(--grid-color) 0 1px, transparent 1px 100%);
        background-size: 20px 20px;
        width: var(--grid-size);
        height: var(--grid-size);
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

    graph: GraphWorkspaceProps['graph'] // NOTE: This graph should remain consistent with the visual graph (!!!)
    updateCount: number = 0
    
    context: {
      zoom: number,

      minZoom: number,
      maxZoom: number,
      lastMousePos: {
        x: number,
        y: number
      },

      start: {
        x: number,
        y: number
      },
      point: {
        x: number,
        y: number
      }
    } = {
        zoom: 1,
        minZoom: 0.6 / window.devicePixelRatio,
        maxZoom: 3.0,
        lastMousePos: {x: 0, y: 0},
        start: {x: 0, y: 0},
        point: {x: 0, y: 0}

    }
    editing: HTMLElement | null = null
    mouseDown:boolean = false

    middle:{
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
        this.addEventListener('mousedown', e => { 
          this.context.start = { x: e.clientX - this.context.point.x, y: e.clientY - this.context.point.y };
          this.mouseDown = true
        } )
        window.addEventListener('mouseup', e => { this.mouseDown = false} )
        this.addEventListener('wheel', this._scale)
        this.addEventListener('mousemove', this._pan)

        const rect = this.element.getBoundingClientRect()

        this.middle = {
          x: rect.width / 2,
          y: rect.height / 2
        }

        let notMoved = []
        this.nodes.forEach((node: GraphNode) => {

          drag(this, node, () => {
            this.resize([node])
          }, () => { 
            if (!this.editing) this.editing = node
          }, () => {
            if (this.editing instanceof GraphNode) this.editing = null
          })

          if (node.info.extensions?.visualscript) {
            const info = node.info.extensions.visualscript
            if (info.x != 0 && info.y != 0) notMoved.push(node)
          } else notMoved.push(node)
      })

      this.autolayout(notMoved)
      this._transform() // Move to center
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

    autolayout = (nodes: GraphNode[] | Map<string, GraphNode> = this.nodes) => {
      let count = 0
      let rowLen = 5
      let offset = 20
      nodes.forEach((n) => {
        n.x = this.middle.x + offset + 100*(count % rowLen)
        n.y =  this.middle.y + offset + 150*(Math.floor(count/rowLen))
        count++
      })

    }

    removeNode = (name) => {
      const node = this.nodes.get(name)
      this.onnoderemoved(node)

      // update wasl
      delete this.graph.nodes[node.info.tag]

      // update ui
      this.nodes.delete(name)
    }

    addNode = (props: GraphNodeProps) => {
      if (!props.workspace) props.workspace = this
 
      // shift position to the middle
      if (props.info?.extensions?.visualscript?.x) props.x = props.info.extensions.visualscript.x
      if (props.info?.extensions?.visualscript?.y) props.y = props.info.extensions.visualscript.y

      // update ui
     const gN = new GraphNode(props)
      this.nodes.set(gN.info.tag, gN)
      this.onnodeadded(gN)

      // update wasl
      this.graph.nodes[gN.info.tag] = gN.info

      return gN
    }

    createUIFromGraph = async () => {

      let nodes:any = ''

      if (this.graph){

        for (let key in this.graph.nodes) {
          const n = this.graph.nodes[key]
            if (!n.tag) n.tag = key
            let gN = this.nodes.get(n.tag);
            if (!gN){
              gN = this.addNode({
                info: n,
                workspace: this
              })
            }
        }

        for (let key in this.graph.edges) {
          const nodeEdges = this.graph.edges[key]
          for (let targetKey in nodeEdges) {

          const output = this.match(key)
          const input = this.match(targetKey)

          const edges = {}

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


        // // Create Edges to Children
        // const createEdges = async () => {

        //   // Look Two Levels Down
        //   const edges = {}
        //   const maxDepth = 2

        //   const condition = (node) => node?.graph && node?.graph != this.graph
        //   const drillForMatchingGraph = (node, tag=node.tag) => {
        //         let tags = [tag];
        //         do {
        //           const hasCondition = condition(node)
        //           node = this.graph.nodes.get(node.graph?.tag)
        //           if (hasCondition) tags.unshift(node.tag);
        //         } while (condition(node))

        //         let portName = tags.pop()
        //         let match = this.nodes.get(tag);
        //         tags.forEach(t => {
        //           const temp = this.nodes.get(t)
        //           if (temp) match = temp
        //         })

        //         if (tags.length === 0) portName = match.info.nodes.keys().next().value // fallback to first node
        //         const port = match.ports.get(portName);

        //         return {
        //           port,
        //           match
        //         }
        //   }
        //   const checkNodesForEdges = async (nodes: Map<string, (GraphNode | GraphNode['info'])>, depth=0) => {
        //     const nodeArr = Array.from(nodes.entries());

        //   for (let i = 0; i < nodeArr.length; i++) {

        //     const [key, value] = nodeArr[i]
        //     let nodeInfo = (depth === 0) ? (value as GraphNode).info : value as GraphNode['info']

        //     if (nodeInfo.children) {
        //       for (let nodeTag in nodeInfo.children) {

        //         const output = drillForMatchingGraph(nodeInfo, key)
        //         const input = drillForMatchingGraph(nodeInfo.children[nodeTag], nodeTag)

        //         // Don't duplicate on construction
        //         const outTag = output.port.tag
        //         if (!edges[outTag]) edges[outTag] = []
        //         if (!edges[outTag].includes(input.port.tag)){
        //           await this.resolveEdge({
        //             input: input.port,
        //             output: output.port
        //           }, false);    

        //           edges[outTag].push(input.port.tag)
        //         }   
        //       }
        //     }
        //     if (nodeInfo.nodes && depth < maxDepth) await checkNodesForEdges(nodeInfo.nodes, depth + 1)
        //   }
        //   }
        //   await checkNodesForEdges(this.nodes)
        // };

        // await createEdges()

        this.onEdgesReady()
      }

      return nodes
    }

   match = (route:string) => {

      let tags = route.split('.')
      let portName = tags.pop()
      let match = this.nodes.get(route);

      tags.forEach(t => {
        const temp = this.nodes.get(t)
        if (temp) match = temp
      })

      if (tags.length === 0) {
        // tags.push(portName) // place base back
        portName = match.ports.keys().next().value // fallback to first node
      }

      const port = match.ports.get(portName);

      return {
        // route: [...tags, portName].join('.'),
        port,
        match
      }
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
      e.preventDefault()
      let xs = (e.clientX - this.context.point.x) / this.context.zoom;
      let ys = (e.clientY - this.context.point.y) / this.context.zoom;
      let delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
      this.context.zoom = (delta > 0) ? (this.context.zoom * 1.2) : (this.context.zoom / 1.2);
      if (this.context.zoom < this.context.minZoom) this.context.zoom = this.context.minZoom // clamp
      if (this.context.zoom > this.context.maxZoom) this.context.zoom = this.context.maxZoom // clamp


      this.context.point.x = e.clientX - xs * this.context.zoom;
      this.context.point.y = e.clientY - ys * this.context.zoom;

      this._transform()
  }

    _transform = () => {
      this.element.style['transform'] = `translate(calc(-50% + ${this.context.point.x}px), calc(-50% + ${this.context.point.y}px)) scale(${this.context.zoom*100}%)`
    }
    


    _pan = (e) => {

      this.context.lastMousePos.x = e.clientX
      this.context.lastMousePos.y = e.clientY

      // e.preventDefault();

      if (!this.editing){

        if (e.target.parentNode){

            // Transform relative to Parent
            let rectParent = e.target.parentNode.getBoundingClientRect();
            let curXParent = (e.clientX - rectParent.left)/rectParent.width; //x position within the element.
            let curYParent = (e.clientY - rectParent.top)/rectParent.height;  //y position within the element.
        
            if (this.mouseDown){

                this.context.point.x = (e.clientX - this.context.start.x);
                this.context.point.y = (e.clientY - this.context.start.y);
                this._transform()
            } 
            this.relXParent = curXParent
            this.relYParent = curYParent
          }
        }
    }

  }
  
  customElements.get('visualscript-graph-workspace') || customElements.define('visualscript-graph-workspace',  GraphWorkspace);