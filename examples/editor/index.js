import * as visualscript from '../../src/index'
// import * as freerange from 'https://cdn.jsdelivr.net/npm/freerange@0.0.24/dist/index.esm.js'
import * as freerange from './external/freerange/index.esm.js'
import App from './App';
import './components/Editor';
import { TimeSeries } from '../../src/components/streams/data';
import FileApp from './FileApp';

// -------------- File System Generator--------------
let systems = {}

const createSystem = async (input) => {
    let system = new freerange.System(input, {
        debug: true,
        ignore: ['.DS_Store', '.git']
    })

    await system.init()
    systems[system.name] = system

    console.log(`----------------------- New System (${system.name}) -----------------------`)
    return system
}

// const createPlugins = async (src) => {
//     const plugins = new Plugins(src)
//     await plugins.init()
//     console.log(`----------------------- Plugins -----------------------`)
//     for await (let str of plugins.list){
//         console.log(await plugins.metadata(str))
//     }

//     return plugins
// }

// -------------- Remote App --------------
const appPath = 'https://raw.githubusercontent.com/brainsatplay/brainsatplay-starter-kit/main/package.json'
// const appPath = `./app/index.js` // Automatically relative to window.location.href

// createPlugins()
// -------------- Setup Elememts --------------
// const displayName = document.querySelector('#name')

const nav = document.querySelector('visualscript-nav')
// nav.primary= {"menu": [{"content": "Products"}], "options": [{"content": "Test"}]}

// <visualscript-button id=select primary>Select Project</visualscript-control>

// let appElement = document.querySelector('visualscript-app')
let editor = document.querySelector('visualscript-editor')

// -------------- Setup Default App --------------
let app = new FileApp()
editor.setApp(app)

// -------------- Show History --------------
freerange.getCache().then(arr => {
    const options = [
        {
            "content": "Select Project",
            "id": "select",
            "type": "button",
            onClick: async () => {
                const system = await createSystem()
                startApp(system)
            }
        }
    ]

    // SHOW HISTORY
    // arr.forEach(v => options.push({
    //    content: v.name ?? v,
    //    type: "button",
    //    onClick: async () => {
    //     const system = await createSystem(v)
    //     startApp(system)
    // }
    // }))

    nav.primary = {options}
})

// -------------- Create System --------------
createSystem(appPath).then((system) => startApp(system))
.catch(e => console.error('Remote app not available', e))

// -------------- Setup Keyboard Shortcuts --------------
document.onkeydown = async (e) => {
    if (e.metaKey && e.code == 'KeyS') {
        e.preventDefault()
        app.save() // Global save.
    }
};

const startApp = async (system) => {

    console.log(`File System Selected (${system.name})`, system.files)

    app.oncompile = () => {
        editor.start()
    }

    await app.start(system)

    const ui = new TimeSeries()
    editor.setUI(ui)

    app.active.graph.nodes.forEach(n => {
        if (n.tag === 'sine') n.subscribe((data) => {
            ui.data = [data]
            ui.draw() // FORCE DRAW: Update happens too fast for UI
        })
    })

    editor.setGraph(app.active.graph)

}