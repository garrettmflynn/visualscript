
import { LitElement, html, css } from 'lit';
import "../../../src/components/dashboard/tabs"
import "../../../src/components/editors"
import { Tab, TabContainer } from '../../../src/components/dashboard/tabs';

import { Plugin } from './Plugin';
import App from '../App';
import { CodeEditor, ObjectEditor } from '../../../src/components/editors';

export type EditorProps = {
  app?: App,
  files?: any[]
  plugins?: any[]
  ui?: HTMLElement
}

export class Editor extends LitElement {

  static get styles() {
    return css`

    :host { 
      width: 100%;
      height: 100%;
      overflow: scroll;
      display: flex;
    }

    :host * {
      box-sizing: border-box;
    }

    :host > * {
      flex-grow: 1;
    }


    `;
  }
    
    static get properties() {
      return {
        fileNames: {
          type: Array,
          reflect: true
        }
      };
    }

    app: any
    ui = document.createElement('div') 
    files: TabContainer = new TabContainer()
    info: TabContainer = new TabContainer()
    fileHistory: {[x:string]: any} = {}
    fileNames: string[] = []


    constructor(props:EditorProps={}) {
      super();
      if (props.app) this.setApp(props.app)
      if (props.ui) this.setUI(props.ui)
      if (props.files) this.setFiles(props.files)
    }

    setApp = (app) => {
      this.app = app
    }

    setUI = (ui) => {
      this.ui = ui
    }

    setFiles = async (files) => {
      // for (let child of this.files.children) child.remove()

      const names = []

      await Promise.all(files.map(async f => {

        let tab = this.fileHistory[f.path]
        names.push(f.path) // Push path to names
        if (!tab) {
          
          tab = new Tab()
          tab.name = `${f.path}`

          // Create File Editors
          let container = new TabContainer()
          const codeTab = new Tab({name: "Code"});

          // Conditionally Show Information
          const plugin = await f.manager.import(f)
          if (plugin.tag){
            const infoTab = new Tab({name: 'Info'})
            const infoEditor = new Plugin({plugin})
            infoTab.appendChild(infoEditor)
            container.addTab(infoTab)

            const objectTab = new Tab({name: "Properties"})
            const objectEditor = new ObjectEditor({
              target: plugin,
              header: plugin.tag
            })
            objectTab.appendChild(objectEditor)
            container.addTab(objectTab)

          }

          // Always Show Code Editor
          const codeEditor = new CodeEditor({
            onInput: (ev) => f.body = (ev.target as HTMLTextAreaElement).value,
            onSave: async () => {
              await f.save()
              await this.app.init()
            },
            value: await f.body
          })
          codeTab.appendChild(codeEditor)
          container.addTab(codeTab)

          tab.appendChild(container)
          this.files.addTab(tab)
          this.fileHistory[f.path] = tab
        }
      }))  

      this.fileNames = names
    }

    render() {


      return html`
          <visualscript-tab name="UI">${this.ui}</visualscript-tab>
          <visualscript-tab-container>
            <visualscript-tab name="Properties">
              <visualscript-object-editor>
              </visualscript-object-editor>
            </visualscript-tab>
              <visualscript-tab name="Graph">
                <visualscript-graph-editor>
                </visualscript-graph-editor>
              </visualscript-tab>
              <visualscript-tab name="Files">${this.files}</visualscript-tab>
          </visualscript-tab-container>
      `

    }
  }
  
  customElements.define('visualscript-editor', Editor);