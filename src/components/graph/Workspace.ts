
import { LitElement, html, css } from 'lit';
import { GraphNode } from './Node';
import './Edge';
import './Node';
import drag from './utils/drag'
import { GraphEdge } from './Edge';
// import { Edge } from 'src/brainatplay/ui/Edge';


export type GraphWorkspaceProps = {
  // tree: {[x:string]: any}
  graph: {[x:string]: any};
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

    :host > div {
        position: relative;
        background-image:
        repeating-linear-gradient(var(--grid-color) 0 1px, transparent 1px 100%),
        repeating-linear-gradient(90deg, var(--grid-color) 0 1px, transparent 1px 100%);
        background-size: 20px 20px;
        width: 100%;
        height: 100%;
    }

    :host > div:active:hover {
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

    constructor(props: GraphWorkspaceProps) {
      super();

      if (props?.graph) this.set(props.graph)

      window.addEventListener('resize', () => {
        this.resize()
      })


      // let i = 0
      // window.addEventListener('keydown', (ev) => {
      //   switch(ev.code) {
      //     case 'Enter': 
      //       const tag = `Node${i}`
      //       let gN = new GraphNode({
      //         info: {
      //           tag
      //         },
      //         workspace: this
      //       })
      //       this.nodes.set(tag, gN)
      //       this.triggerUpdate()
      //       i++
      //       break;
      //   }
      // })
    }

    set = async (graph) => {
      this.graph = graph
      this.triggerUpdate()
    }

    updated() {
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

  resize = (nodes = Array.from(this.nodes.values())) => {
    nodes.forEach(node => node.edges.forEach(e => e.resize()))
  }


    triggerUpdate = () => {
      this.updateCount = this.updateCount + 1
    }

    resolveEdge = async (info, rerender = true) => {

      if (!(this.editing instanceof GraphEdge)){
        const tempId = `${Math.round( 10000 * Math.random())}`
        const edge = new GraphEdge(Object.assign({workspace: this}, info))
        this.editing = edge
        this.edges.set(tempId, edge)
        if (rerender) this.triggerUpdate()
        const res = await edge.ready.catch(e => console.error(e))

        if (res) {
          this.edges.delete(tempId)
          this.edges.set(edge.id, edge)
          edge.resize()
        }

        this.editing = null
        return edge
      } else this.editing.link(info)
    }

    autolayout = () => {
      let count = 0
      this.nodes.forEach((n) => {
        n.x = 100*count
        count++
      })
    }

    createUIFromGraph = () => {

      let nodes:any = ''
      let hasMoved = false

      if (this.graph){

        this.graph.nodes.forEach((n:any) => {
          let gN = this.nodes.get(n.tag)
          if (!gN){
            gN = new GraphNode({
              info: n,
              workspace: this
            })

            this.nodes.set(gN.info.tag, gN)
          }

          hasMoved = gN.x !== 0 && gN.y !== 0
          return gN
        })

        // Create Edges to Children
        const nodeArr = Array.from(this.nodes.values()) as GraphNode[]
        const createEdges = async () => {
          for (let i = 0; i < nodeArr.length; i++){
            let n = nodeArr[i]
            if (n.info.children) {
              for (let j = 0; j < n.info.children.length; j++){
                const node = n.info.children[j] as any
                const gNParent = this.nodes.get(n.info.tag)
                const output = gNParent.ports.get(gNParent.info.arguments.keys().next().value) // First key
                const gNChild = this.nodes.get(node.tag)
                const input = gNChild.ports.get(gNChild.info.arguments.keys().next().value) // First key
                await this.resolveEdge({
                  input,
                  output 
                })
              }
            }
          }
        }

        createEdges()
        if (!hasMoved) this.autolayout()
      }

      return nodes
    }
    
    render(){

      // Get Nodes from Graph
      this.createUIFromGraph()      

      // Auto Layout

      // return until(Promise.all(edgePromises).then((data) => {

        return html`
        <div>
            ${Array.from(this.nodes.values())}
            ${Array.from(this.edges.values())}
        </div>
      `
      // }), html`<span>Loading...</span>`)

    }



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
  
  customElements.define('visualscript-graph-workspace', GraphWorkspace);