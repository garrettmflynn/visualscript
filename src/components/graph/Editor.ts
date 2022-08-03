
import { LitElement, html, css } from 'lit';
import './Workspace';
import {Input} from '../input/Input'
import { GraphWorkspace } from './Workspace';
import context from '../../instances/context'
import { Modal, Overlay } from '../general';
import { ObjectEditor } from '../object';
import { Tree } from '../tree';

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
    onedgeadded: GraphWorkspace['onedgeadded']
    onedgeremoved: GraphWorkspace['onedgeremovedd']
    onnodeadded: GraphWorkspace['onnodeadded']
    onnoderemoved: GraphWorkspace['onnoderemoved']

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

                      var rect = this.workspace.element.getBoundingClientRect();
                      var x = ev.clientX - rect.left; //x position within the element.
                      var y = ev.clientY - rect.top;  //y position within the element.

                      // Blur the Background
                      const overlay = new Overlay()

                      // Create a Modal
                      const modal = new Modal({open: true, header: 'Plugins', footer: '<small>All plugins can be found on <a href="https://github.com/brainsatplay/awesome-brainsatplay">awesome-brainsatplay</a></small>'})
                      overlay.appendChild(modal)

                      modal.onClose = () => {
                        overlay.open = false
                      }

                      // Show Node Options in a List
                      let onResolve = null;
                      const list = new Tree({
                        target: {
                          header: {
                            option: 'wow',
                            again: 'wow'
                          },
                          tag: {
                            option: 'wow',
                            again: 'wow'
                          }
                        },
                        onClick: (type, thing) => {
                          console.log(type, thing)
                          // if (typeof onResolve === 'function') onResolve()
                        }
                      })
                      modal.appendChild(list)


                      this.workspace.parentNode.appendChild(overlay)
                      overlay.open = true

                      
                      // Wait for user to select an option
                      const info = {
                        tag,
                        nodes: new Map([['input', undefined]]),
                        graph: this.graph,

                        // Extension
                        x,
                        y
                      }

                      info.x = x
                      info.y = y

                        
                        this.workspace.addNode({info})
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

    render() {


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