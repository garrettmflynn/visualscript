import * as visualscript from '../../src/index'
// import * as freerange from 'https://cdn.jsdelivr.net/npm/freerange@0.0.21/dist/index.esm.js'
import * as freerange from './external/freerange/index.esm.js'
import { Plugin } from './components/Plugin';
import {Graph} from './external/brainsatplay/Graph'

// -------------- Setup File Manager --------------
let file, app;

let tabs = {};
let nodes = {};

const manager = new freerange.FileManager({
    debug: true,
    ignore: ['DS_Store']
})

// -------------- Setup Elememts --------------
const select = document.querySelector('#select')
const save = document.querySelector('#save')
const displayName = document.querySelector('#name')

let globalMain = document.querySelector('#globalMain')
let appElement = document.querySelector('visualscript-app')
let appMainElement = appElement.querySelector('visualscript-main')

save.onclick = manager.save
select.onclick = () => manager.mount().then(onMount)


// -------------- Setup Keyboard Shortcuts --------------
document.onkeydown = async (e) => {
    if (e.metaKey && e.code == 'KeyS') {
        e.preventDefault()
        manager.save()
        app.active = false // stop other loops
        compile(file)
    }
};

// -------------- Handle Filesystem Mount --------------
const onMount = async (info) => {
    console.log('File System', info, manager)
    file = await manager.open('index.js')
    compile(file)
}

// -------------- Handle Brains@Play Application --------------
const compile = async (file) => {

    if (app) console.warn('Recompiling the application...')
    app = await manager.import(file)

    displayName.innerHTML = `${app.name}`

    // Display Plugins
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

    app.active = true
    // Start App
    start(app)
}


// Auto-Start Brains@Play Graph
const start = async (app) => {

        const graph = new Graph(app)
        console.log('Graph', graph)

        // Run the top-level nodes
        for (let key in graph.tree) {
            const nodeInfo = graph.tree[key]
            const node = graph.nodes.get(nodeInfo.tag)
            if (node.loop) {
                node.loop = 10
                node.runLoop() // Running looper at the specified rate
            }
        }

        graph.nodes.forEach(n => {
            console.log(n)

            const node = nodes[n.tag]
            if (node) return
            else {
                const info = new Plugin()
                info.set(n)
                appMainElement.insertAdjacentElement('beforeend', info)
                nodes[n.tag] = n
            }
        })
        // for (let key in app.plugins) {

        //     const properties = app.plugins[key]
        //     console.log('properties', properties)

        //     const graph = new Graph(properties)
        //     const node = graphs[graph.label]
        //     if (node) return
        //     else {
        //         const info = new Plugin({plugin: graph})
        //         appMainElement.insertAdjacentElement('beforeend', info)
        //         graphs[graph.label] = graph
        //     }

        //     // Activate Graph
        //     console.log('graph', graph)
        //     if (graph.loop) graph.runLoop() // Running looper at the specified rate
        // }

        // for (let key in app.plugins) {


        // }

}