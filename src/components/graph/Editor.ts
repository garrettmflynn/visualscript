
import { LitElement, html, css } from 'lit';
import './Workspace';
import {Input} from '../input/Input'
import { GraphWorkspace } from './Workspace';
import context from '../../instances/context'

type keyType = string | number | symbol
export type GraphEditorProps = {
  graph: graphscriptGraph
  plot?: Function[],
  onPlot?: Function
  preprocess?: Function
}

export class GraphEditor extends LitElement {

  static get styles() {
    return css`

    :host * {
      box-sizing: border-box;
    }

    img {
      max-height: 100px;
    }

    .container {
      width: 100%;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: scroll;
      height: 100%;
    }

    .separate {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .attribute {
      width: 100%;
      font-size: 90%;
      padding: 15px;
      flex-grow: 1;
      flex-wrap: wrap;
    }

    .info {
      display: flex;
      align-items: center;
    }

    .name {
      font-weight: 800;
      padding-right: 10px;
    }

    .value {
      font-size: 80%;
    }

    @media (prefers-color-scheme: dark) {
      :host > * {
        background-color: rgb(40, 40, 40);
      }
    }

    `;
  }
    
    static get properties() {
      return {
        // graph: {
        //   type: Object,
        //   reflect: false,
        // },
        keys: {
          type: Object,
          reflect: true,
        },
      };
    }

    graph: GraphEditorProps['graph']
    keys: (keyType)[]
    history: any[] = []
    workspace: GraphWorkspace


    constructor(props?: GraphEditorProps) {
      super();

      // Define Setters and Getters for Workspace Events
      const events = ['onedgeadded', 'onedgeremoved', 'onnodeadded', 'onnoderemoved']
      events.forEach(ev => {
        Object.defineProperty(this, ev, {
          get: () => this.workspace[ev],
          set: (f) => this.workspace[ev] = f
        })
      })

      this.workspace = new GraphWorkspace(props)
      if (props) this.set(props.graph)

            // Setting Context Menu Response
            context.set('visualscript-graph-editor', {
              condition: (el) => {
                const root =  this.workspace.shadowRoot
                if (root){
                  return el ===  this.workspace // Is the workspace
                  || root.contains(el) // Is the workspace grid
                } else return false
              },
              contents: (ev) => {
                return [
                  {
                    text: 'Create new node',
                    onclick: () => {
                        const tag = `Node${Math.floor(1000*Math.random())}`

                              // e = Mouse click event.
                              var rect = this.workspace.element.getBoundingClientRect();
                              var x = ev.clientX - rect.left; //x position within the element.
                              var y = ev.clientY - rect.top;  //y position within the element.
                        
                          this.workspace.addNode({
                            info: {
                              tag,
                              nodes: new Map([['input', undefined]]),
                              graph: this.graph,

                              // Extension
                              x,
                              y
                            },
                        })
                        this.workspace.triggerUpdate()
                  },
                },
                   {
                    text: 'Do another thing',
                    onclick: () => {
                      console.warn('MUST DO SOMETHING')
                  }
                }
                ]
              }
            })
    }

    set = async (graph) => {
      this.graph = graph
      this.workspace.set(this.graph)
      this.keys = (this.graph) ? Object.keys(this.graph) : []
    }

    getElement = async (key:keyType, o: any) => {
        let display;

        const val = await Promise.resolve(o[key])

        if (typeof val === 'string' && val.includes('data:image')) {
          display = document.createElement('img') as HTMLImageElement
          display.src = val
          display.style.height = '100%'
        } else {
          display = new Input()
          display.value = val
          display.oninput = () => {
            o[key] = display.value // Modify original data
          }
        }

        const isObject = typeof val === 'object' 

        return html`
        <div class="attribute separate">
        <div class="info">
          <span class="name">${key}</span><br>
          <span class="value">${(
            isObject
            ? (Object.keys(val).length ? val.constructor?.name : html`Empty ${val.constructor?.name}`)
            : '')}</span>
        </div>
          ${key}${o}
        </div>`

    }
  
    render() {

      // const content = this.keys?.map(key => this.getElement(key, this.graph)) 

      // return until(Promise.all(content).then((data) => {
        
        return html`
        <div class="container">
          ${this.workspace}
        </div>
      `
      // }), html`<span>Loading...</span>`)

    }
  }
  
  customElements.get('visualscript-graph-editor') || customElements.define('visualscript-graph-editor',  GraphEditor);