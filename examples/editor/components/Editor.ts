
import { LitElement, html, css } from 'lit';
import "../../../src/components/dashboard/tabs"
import "../../../src/components/editors"
import { Tab, TabContainer } from '../../../src/components/dashboard/tabs';

import { Plugin } from './Plugin';
import App from '../App';
import { Tree } from '../../../src/components/tree';
import { CodeEditor, ObjectEditor, GraphEditor} from '../../../src/components/editors';
import Plugins from '../Plugins';

export type EditorProps = {
  app?: App,
  filesystem?: any;
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

    #files {
      display: flex;
      height: 100%;
    }

    #files > visualscript-tree {
      width: 200px;
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
    graph: GraphEditor = new GraphEditor()
    properties: ObjectEditor = new ObjectEditor()
    tree: Tree = new Tree()


    plugins: Plugins
    filesystem: any;


    constructor(props:EditorProps={}) {
      super();

      this.ui.setAttribute('name', 'UI')
      if (props.app) this.setApp(props.app)
      if (props.ui) this.setUI(props.ui)
      if (props.filesystem) this.setSystem(props.filesystem)
    }

    setApp = (app) => {
      this.app = app
    }

    setGraph = (graph) => {
      this.graph.set(graph) // Set tree on graph
    }

    setUI = (ui) => {
      this.ui.innerHTML = ''
      this.ui.appendChild(ui)
    }

    setSystem = async (system: any) => {
      // for (let child of this.files.children) child.remove()

      this.filesystem = system
      this.tree.set(system.files.system)
      const files = Array.from(system.files.list.values())

      this.plugins = new Plugins(this.filesystem)
      await this.plugins.init()

      const previousTabs = new Set(Object.keys(this.fileHistory))

      const allProperties = {}

      const importedFileInfo = {}
      const importedFileMetadata = {}

      // Get All Properties
      await Promise.all(files.map(async f => {
        importedFileInfo[f.path] = await this.plugins.module(f.path)
        importedFileMetadata[f.path] = await this.plugins.metadata(f.path)
        allProperties[importedFileMetadata[f.path].name] = importedFileInfo[f.path]
      }))  


      const openTabs = {}

      // Add Tab On Click
      this.tree.onClick = async (key, f) => {

        if (!openTabs[f.path]){

        const metadata = importedFileMetadata[f.path]
        const imported = importedFileInfo[f.path]
        let tabInfo = this.fileHistory[f.path]
        const plugin = this.plugins.plugins[f.path]
  
        previousTabs.delete(f.path)

        if (!tabInfo) {
          
          const tab = new Tab()
          tabInfo = {tab} // Start tracking essential tab information
          tab.name = `${f.path}`

          // Create File Editors
          let container = new TabContainer()
          const codeTab = new Tab({name: "Code"});

          // Conditionally Show Information
          if (plugin.module){
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
        if (tabInfo.plugin) tabInfo.plugin.set( imported, metadata )

        // Object Editor
        if (tabInfo.object){
          tabInfo.object.set(imported)
          tabInfo.object.header = metadata.name
        }

        // Code Editor
        const fileText = await f.text
        tabInfo.code.value = fileText

        tabInfo.code.onInput = (ev) => f.text = (ev.target as HTMLTextAreaElement).value,
        tabInfo.code.onSave = async () => {
            await f.save()
            await this.app.init()
        }
      }
      openTabs[f.path] = true
    }

    this.properties.set(allProperties)

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
          <visualscript-tab name="Graph">
          ${this.graph}
         </visualscript-tab>
            <visualscript-tab name="Properties">
              ${this.properties}
            </visualscript-tab>
              <visualscript-tab name="Files">
              <div id="files">
                ${this.tree}
                ${this.files}
                </div>
              </visualscript-tab>
          </visualscript-tab-container>
      `

    }
  }
  
  customElements.define('visualscript-editor', Editor);