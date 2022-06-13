
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
        fileUpdate: {
          type: Number,
          reflect: true
        }
      };
    }

    app: any
    ui = document.createElement('visualscript-tab') 
    files: TabContainer = new TabContainer()
    info: TabContainer = new TabContainer()
    fileHistory: {[x:string]: any} = {}
    fileUpdate: number = 0


    constructor(props:EditorProps={}) {
      super();

      this.ui.setAttribute('name', 'UI')
      if (props.app) this.setApp(props.app)
      if (props.ui) this.setUI(props.ui)
      if (props.files) this.setFiles(props.files)
    }

    setApp = (app) => {
      this.app = app
    }

    setUI = (ui) => {
      this.ui.innerHTML = ''
      this.ui.appendChild(ui)
    }

    setFiles = async (files) => {
      // for (let child of this.files.children) child.remove()

      const previousTabs = new Set(Object.keys(this.fileHistory))

      await Promise.all(files.map(async f => {

        let tabInfo = this.fileHistory[f.path]
        const plugin = await f.manager.import(f)
        previousTabs.delete(f.path)

        if (!tabInfo) {
          
          const tab = new Tab()
          tabInfo = {tab} // Start tracking essential tab information
          tab.name = `${f.path}`

          // Create File Editors
          let container = new TabContainer()
          const codeTab = new Tab({name: "Code"});

          // Conditionally Show Information
          if (plugin.tag){
            const infoTab = new Tab({name: 'Info'})
            tabInfo.plugin = new Plugin()
            infoTab.appendChild(tabInfo.plugin)
            container.addTab(infoTab)

            const objectTab = new Tab({name: "Properties"})
            tabInfo.object = new ObjectEditor()
            objectTab.appendChild(tabInfo.object)
            container.addTab(objectTab)

          }

          // Always Show Code Editor
          tabInfo.code = new CodeEditor()
          codeTab.appendChild(tabInfo.code)
          container.addTab(codeTab)

          tab.appendChild(container)
          this.files.addTab(tab)
          this.fileHistory[f.path] = tabInfo
        } 
        
        // ---------- Update Editors ----------

        // Plugin Info
        if (tabInfo.plugin){
          tabInfo.plugin.set(plugin)
        }

        // Object Editor
        if (tabInfo.object){
          tabInfo.object.set(plugin)
          tabInfo.object.header = plugin.tag
        }

        // Code Editor
        tabInfo.code.value = await f.body
        tabInfo.code.onInput = (ev) => f.body = (ev.target as HTMLTextAreaElement).value,
        tabInfo.code.onSave = async () => {
            await f.save()
            await this.app.init()
        }
      }))  

      // Remove Tabs That No Longer Exist
      previousTabs.forEach(str => {
        const info = this.fileHistory[str]
        info.tab.remove() // Remove
        delete this.fileHistory[str]
      })

      this.fileUpdate = this.fileUpdate + 1

    }

    render() {

      return html`
          ${this.ui}
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