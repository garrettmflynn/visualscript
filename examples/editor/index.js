import * as visualscript from '../../src/index'
// import * as freerange from 'https://cdn.jsdelivr.net/npm/freerange@0.0.21/dist/index.esm.js'
import * as freerange from './external/freerange/index.esm.js'
import { Plugin } from './components/Plugin';
import App from './App';

// -------------- Setup File Manager --------------
const manager = new freerange.FileManager({
    debug: true,
    ignore: ['DS_Store']
})

let file, app;

let tabs = {};
let nodes = {};


// -------------- Setup Elememts --------------
const select = document.querySelector('#select')
const save = document.querySelector('#save')
const displayName = document.querySelector('#name')

let globalMain = document.querySelector('#globalMain')
let appElement = document.querySelector('visualscript-app')
let appMainElement = appElement.querySelector('visualscript-main')

select.onclick = () => manager.mount().then(onMount)


// -------------- Setup Keyboard Shortcuts --------------
document.onkeydown = async (e) => {
    if (e.metaKey && e.code == 'KeyS') {
        e.preventDefault()
        app.save()
    }
};

// -------------- Handle Filesystem Mount --------------
const onMount = async (info) => {
    console.log('File System', info, manager)
    file = await manager.open('index.js')
    app = new App()
    console.log('App', app)
    
    save.onclick = app.save

    app.onsave = async () => await manager.save()

    app.oncompile = async () => {

       const importModule = await manager.import(file)
       displayName.innerHTML = `${importModule.name}`
    
       // Display Plugin Editors
       const tabMap = new Map()
   
       let createdTabs = 0
       await Promise.all(manager.files.list.map(async f => {
           const tab = tabs[f.path]
           if (tab) return
           else {
               const tab = document.createElement('visualscript-tab')
               tab.name = f.path
               const texteditor = document.createElement('textarea')
               tab.appendChild(texteditor)
               texteditor.value = await f.body
               texteditor.oninput = (ev) => f.body = ev.target.value
               tabMap.set(f.path, tab)
               globalMain.appendChild(tab)
               tabs[f.path] = tab
               createdTabs++
           }
       }))
   
       if (createdTabs) globalMain.tabs = tabMap

       return importModule
    }

    app.onstart = () => {
        
        // Display All Node Info
        app.graph.nodes.forEach(n => {
            console.log('Node', n)
            const node = nodes[n.tag]
            if (node) return
            else {
                const info = new Plugin()
                info.set(n)
                appMainElement.insertAdjacentElement('beforeend', info)
                nodes[n.tag] = n
            }
        })

    }

    app.init()
}