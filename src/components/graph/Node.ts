
import { LitElement, html, css } from 'lit';
import { GraphWorkspace } from './Workspace';
import './Port';
import { GraphEdge } from './Edge';
import { GraphPort } from './Port';

export type GraphNodeProps = {
  // tree: {[x:string]: any}
  // plot?: Function[],
  // onPlot?: Function
  // preprocess?: Function,
  workspace?: GraphWorkspace
  x?: number;
  y?: number;
  info?: any;
}

export class GraphNode extends LitElement {

  static get styles() {
    return css`

    :host {
      position: absolute;
      box-sizing: border-box;
      top: 10px;
      left: 10px;
      user-select: none;
      z-index: 1;
    }

    :host {
        --grid-color: rgb(210, 210, 210);
    }

    :host > div {
        width: 50px;
        background: rgb(60,60,60);
        cursor: move;
    }

    #header {
      color: white;
      font-size: 8px;
      background: black;
      padding: 5px;
      font-weight: 800;
    }

    #ports visualscript-graph-port{
      padding: 2px 0px;
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
        x: {
          type: Number,
          reflect: true,
        },
        y: {
          type: Number,
          reflect: true,
        },
        keys: {
          type: Object,
          reflect: true,
        },
      };
    }

    workspace: GraphNodeProps['workspace'];
    element: HTMLDivElement
    x: GraphNodeProps['x'];
    y: GraphNodeProps['y'];
    info: GraphNodeProps['info'];
    edges: Map<string, GraphEdge> = new Map()
    ports: Map<string, GraphPort> = new Map()

    constructor(props: GraphNodeProps = {}) {
      super();

      this.workspace = props.workspace
      this.info = props.info ?? {}

      this.id = `${this.info.tag}${Math.round(10000*Math.random())}` // TODO: Make these informative

      this.info.x = this.x = props.x ?? this.info.x ?? 0
      this.info.y = this.y = props.y ?? this.info.y ?? 0

      if (this.info){
        console.log(this.info)
        this.info.arguments.forEach((value,tag) => {
          console.log('arg', tag, value)
          this.addPort({
            tag,
            value
          })
        })
      }
    }

    willUpdate = (updatedProps) => {

      if (updatedProps.has('x') || updatedProps.has('y')){
        this.info.x = this.x        // brainsatplay extension
        this.info.y = this.y       // brainsatplay extension
      }
    }

    // set = async (tree={}) => {
    //   this.tree = tree
    //   this.keys = Object.keys(this.tree)
    // }

    updated(changedProperties) {
      this.element = this.shadowRoot.querySelector("div")
      if (!this.workspace) this.workspace = (this.parentNode.parentNode as any).host
    }

    setEdge = (edge) => this.edges.set(edge.id, edge)

    deleteEdge = (id) => this.edges.delete(id)

    addPort = (info) => {
      const port = new GraphPort(Object.assign({node: this}, info))
      this.ports.set(port.tag, port)
    }
    
    render() {


        return html`

        <style>

        :host {
          transform: scale(${1}) translate(${this.x}px, ${this.y}px);
        }


        </style>
        <div>
          <div id="header">
            ${this.info.tag}
          </div>
          <div id="ports">
              ${Array.from(this.ports.values())}
          </div>
        </div>
      `

    }
  }
  
  customElements.define('visualscript-graph-node', GraphNode);