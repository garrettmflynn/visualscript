
import { LitElement, html, css } from 'lit';
import "../../../src/components/dashboard/tabs"
import "../../../src/components/editors"
import { Tab, Panel } from '../../../src/components/dashboard/tabs';

import { Plugin } from './Plugin';
import App from '../App';
import { Tree } from '../../../src/components/tree';
import { CodeEditor, ObjectEditor, GraphEditor} from '../../../src/components/editors';
import Plugins from '../Plugins';
import { Modal } from '../../../src';
import { Icon } from '../../../src/components/general/Icon';
import { Container } from 'postcss';
import file from '@babel/core/lib/transformation/file/file';

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
    }

    :host * {
      box-sizing: border-box;
    }

    :host > div > * {
      flex-grow: 1;
    }

    :host > div {
      overflow: scroll;
      display: flex;
      width: 100%;
      height: 100%;
    }

    #files {
      display: flex;
      height: 100%;
    }

    #files > visualscript-tree {
      width: 250px;
    }

    #palette {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 25px;
      height: 25px;
      z-index: 2;
      cursor: pointer;
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
    modal: Modal = new Modal()
    ui = document.createElement('visualscript-tab') 
    files: Panel = new Panel()
    info: Panel = new Panel()
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

    isPlugin = (f) => {
      return f.mimeType === 'application/javascript' && !f.path.includes('/.brainsatplay/')
    }

    setSystem = async (system: any) => {

      // TODO: Reset File Viewer with Same Tabs Open
      // const toOpen: any[] = []
      // this.files.tabs.forEach(t => {
      //   const newTab = system.files.list.get(t.name)
      //   toOpen.push(newTab)
      // })
      this.files.reset() 

      this.filesystem = system

      this.plugins = new Plugins(this.filesystem)
      await this.plugins.init()

      const previousTabs = new Set(Object.keys(this.fileHistory))

      const allProperties = {}

      const importedFileInfo = {}
      const importedFileMetadata = {}
      const importedPluginPackage = {}

      // Get All Properties
      const getFileInfo = async (f, types=['module', 'metadata']) => {
        let module = importedFileInfo[f.path]
        let metadata = importedFileMetadata[f.path]
        let packageInfo = importedPluginPackage[f.path]

        if (types.includes('module')){
          if (!module) module = importedFileInfo[f.path] = await this.plugins.module(f.path) ?? await f.body
        }

        if (types.includes('metadata')){

        if (!metadata) {
          metadata = await this.plugins.metadata(f.path)
          if (metadata) {
            importedFileMetadata[f.path] = metadata
          }
        }

        // Merge closest package.json file into file metadata
        if (!packageInfo) {
          packageInfo = await this.plugins.package(f.path)
          console.log('Info', packageInfo)
          if (packageInfo) {
            importedPluginPackage[f.path] = packageInfo
            metadata = importedFileMetadata[f.path] = Object.assign(JSON.parse(JSON.stringify(packageInfo)), importedFileMetadata[f.path])
          }
        }
      }

        // Only Show ESM at Top Level
        const isValidPlugin = this.isPlugin(f)
        if (isValidPlugin) allProperties[metadata?.name ?? f.path] = importedFileInfo[f.path]
        return {metadata, module}
      }

      const packageFile = this.filesystem.files.list.get('package.json')
      const packageContents = await packageFile.body

      // Get Primary Module Info (will fill the system...)
      const metadataFilesToGet: any[] = []
      // TODO: remove group
      this.filesystem.addGroup('metadata', null, async (file, path, files) => {
        metadataFilesToGet.push(file)
      })

      const main = this.filesystem.files.list.get(packageContents.main)
      await getFileInfo(main)

      // actually get the files
      metadataFilesToGet.map(async f => {
        this.plugins.set(f)
        await getFileInfo(f)
      })

      const openTabs: {[x:string]: Tab} = {}

      // Add Tab On Click
      this.tree.onClick = async (key, f) => {


        if (!openTabs[f.path]){

        const {metadata, module} = await getFileInfo(f)

        let tabInfo = this.fileHistory[f.path]
        // const plugin = this.plugins.plugins[f.path]
  
        previousTabs.delete(f.path)

        if (!tabInfo) {
          
          const tab = new Tab()
          tabInfo = {tab} // Start tracking essential tab information
          tab.name = `${f.path}`

          // Create File Editors
          let container = new Panel({minTabs: 2})
          const codeTab = new Tab({name: "File"});

          // Conditionally Show Information
          const isPlugin = this.isPlugin(f)
          if (isPlugin){
            const infoTab = new Tab({name: 'Info'})
            tabInfo.plugin = new Plugin()
            infoTab.appendChild(tabInfo.plugin)
            container.addTab(infoTab)
          }

          // Show Property Editor for Objects (including esm modules)
          if (typeof await f.body === 'object') {
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
          this.files.addTab(tab, true)
          this.fileHistory[f.path] = tabInfo
        }
        
        // ---------- Update Editors ----------

        // Plugin Info
        if (tabInfo.plugin) tabInfo.plugin.set( module, metadata )

        // Object Editor
        if (tabInfo.object){
          tabInfo.object.set(module)
          tabInfo.object.header = metadata.name ?? f.name
        }

        // Code Editor
        const fileText = await f.text
        tabInfo.code.value = fileText

        tabInfo.code.onInput = (text) => f.text = text,
        tabInfo.code.onSave = async () => {
            await f.save()
            await this.app.init()
        }

        openTabs[f.path] = tabInfo.tab
      } else {
        openTabs[f.path].toggle.select()
      }
    } 

    this.properties.set(allProperties)

    // Remove Tabs That No Longer Exist
    previousTabs.forEach(str => {
      const info = this.fileHistory[str]
      info.tab.remove() // Remove
      delete this.fileHistory[str]
    })

    // Actually Display Tree
    this.tree.set(system.files.system)
    this.fileUpdate = this.fileUpdate + 1

    }

    render() {


      // const addBox = new Icon({type: 'addBox'})
      // addBox.id = 'palette'

      const newProject = document.createElement('div')
      newProject.innerHTML = 'Create new project'
      const fileTab =  new Tab({name: 'File', type:'dropdown'})
      fileTab.insertAdjacentElement('beforeend', newProject)
      newProject.onclick = () => {
        this.modal.open = true
      }

      const tabs = [
        fileTab,
        new Tab({name: 'Edit', type:'dropdown'}),
        new Tab({name: 'View'}),
        new Tab({name: 'Window'}),
        new Tab({name: 'Help'}),
      ]

      // return html`
      //     ${this.modal}
      //     <visualscript-tab-bar>
      //       ${tabs.map(t => t.toggle)}
      //     </visualscript-tab-bar>
      return html`
          <div>
            ${this.ui}
            <visualscript-panel>
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
            </visualscript-panel>
          </div>
      `

    }
  }
  
  customElements.define('visualscript-editor', Editor);