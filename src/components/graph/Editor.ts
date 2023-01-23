
import { LitElement, html, css } from 'lit';
import './Workspace';
import { GraphWorkspace } from './Workspace';
import context from '../../instances/context'
import { Modal, Overlay } from '../general';
import { Tree } from '../tree';
import { GraphEditorProps } from './types/general';

type keyType = string | number | symbol

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

      };
    }

    graph: GraphEditorProps['graph']
    plugins: GraphEditorProps['plugins']
    history: any[] = []
    workspace: GraphWorkspace
    onedgeadded: GraphWorkspace['onedgeadded']
    onedgeremoved: GraphWorkspace['onedgeremoved']
    onnodeadded: GraphWorkspace['onnodeadded']
    onnoderemoved: GraphWorkspace['onnoderemoved']

    contextMenu = context

    constructor(props?: GraphEditorProps) {
      super();

      // ---------------------------------------------------------------------------------------------------------
      // ----------------------------------------- Proxy Workspace Events ----------------------------------------
      // ---------------------------------------------------------------------------------------------------------

      const events = ['onedgeadded', 'onedgeremoved', 'onnodeadded', 'onnoderemoved']
      events.forEach(ev => {
        Object.defineProperty(this, ev, {
          get: () => this.workspace[ev],
          set: (f) => this.workspace[ev] = f
        })
      })

      this.workspace = new GraphWorkspace(props)
      if (props) this.set(props.graph)
      this.plugins = props?.plugins ?? {}

            // ---------------------------------------------------------------------------------------------------------
            // ------------------------------------- Setting Context Menu Response -------------------------------------
            // ---------------------------------------------------------------------------------------------------------

            if (!this.contextMenu.parentNode) document.body.appendChild(this.contextMenu)

            // Setting Context Menu Responses
            this.contextMenu.set(`visualscript-graph-editor_nodes_${Math.random()}`, {
              condition: (path) => {
                  let returned: any = false
                  this.workspace.nodes.forEach(n => {
                    if (path.includes(n)) returned = n
                  })
                  return returned
                },
              contents: () => {
                return [
                  {
                    text: 'Delete',
                    onclick: (_, node) => {
                      this.workspace.removeNode(node)
                  }
                }
                ]
                
              }
            })


            this.contextMenu.set(`visualscript-graph-editor_${Math.random()}`, {
              condition: (path) => path.includes(this),
              contents: (ev) => {
                return [
                  {
                    text: 'Add Component',
                    onclick: async () => {

                      var rect = this.workspace.element.getBoundingClientRect();
                      var x = ev.clientX - rect.left; //x position within the element.
                      var y = ev.clientY - rect.top;  //y position within the element.
                      

                      // Blur the Background
                      const overlay = new Overlay()

                      // Create a Modal
                      const modal = new Modal({open: true, header: 'Components', footer: '<small>All ES Components can be found on the <a href="https://github.com/brainsatplay/escode/blob/main/components">ESCode</a> repository.</small>'})
                      overlay.appendChild(modal)

                      modal.onClose = () => {
                        overlay.open = false
                      }

                      // Show Node Options in a List
                      const result = await new Promise((resolve) => {

                        const list = new Tree({
                          target: this.plugins,
                          conditions: {
                            value: (o) => !!o.__ // Check if a component
                          },
                          onClick: (tag, thing:any) => {
                            resolve({tag, info: Object.assign({}, thing)}) // Copying thing so that it doesn't get modified globally
                           } // pass a shallow copy onwards
                        })
                        modal.appendChild(list)
                        document.body.appendChild(overlay)
                        // this.workspace.parentNode.appendChild(overlay)
                        overlay.open = true
                        
                      }) as any // TODO: Add ES Component types...

                      // Add essential info
                      const info = result.info

                      const tag = `${result.tag}_${Math.floor(1000*Math.random())}` // generate tag from plugin

                      // extend info for visualscript
                      delete info?.extensions?.visualscript // delete existing instance-specific info

                      this.workspace.addNode({ tag, info, x, y })
                      modal.open = false
                      overlay.open = false
                  },
                },
                //    {
                //     text: 'Do another thing',
                //     onclick: () => {
                //       console.warn('MUST DO SOMETHING')
                //   }
                // }
                ]
              }
            })
    }

    set = async (graph) => {
      this.graph = graph
      await this.workspace.set(this.graph)
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