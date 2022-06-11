import * as visualscript from '../../src/index'
// import * as freerange from 'https://cdn.jsdelivr.net/npm/freerange@0.0.21/dist/index.esm.js'
import * as freerange from './external/freerange/index.esm.js'
import App from './App';
import './components/Editor';
import { TimeSeries } from '../../src/components/streams/data';

import config from './app/index'
console.log(config)

// -------------- Setup File Manager --------------
const manager = new freerange.FileManager({
    debug: true,
    ignore: ['DS_Store']
})

// -------------- Setup Elememts --------------
// const displayName = document.querySelector('#name')

const nav = document.querySelector('visualscript-nav')
// nav.primary= {"menu": [{"content": "Products"}], "options": [{"content": "Products"}]}

// <visualscript-button id=select primary>Select Project</visualscript-control>

// let appElement = document.querySelector('visualscript-app')
let editor = document.querySelector('visualscript-editor')

nav.primary = {options: [
    {
        "content": "Select Project",
        "id": "select",
        "type": "button",
        onClick: () => manager.mount().then(onMount)
    }
]}

// -------------- Setup Default App --------------
let app = new App(config)
editor.setApp(app)


// -------------- Setup Keyboard Shortcuts --------------
document.onkeydown = async (e) => {
    if (e.metaKey && e.code == 'KeyS') {
        e.preventDefault()
        app.save() // Global save.
    }
};

const startApp = (file) => {

    // TODO: Make it so that only new information is fully re-imported
    app.onsave = async () => await manager.save()

    if (file){
        app.oncompile = async () => {
            const imported = await manager.import(file)
            editor.setFiles(manager.files.list)
            return imported
        }
    }

    app.onstart = () => {

        const ui = new TimeSeries()
        editor.setUI(ui)

        console.log(ui, app)
        app.graph.nodes.forEach(n => {
            if (n.tag === 'sine') n.subscribe((data) => {
                ui.data = [data]
                ui.draw() // FORCE DRAW: Update happens too fast for UI
            })
        })
    }

    app.init()
}


// -------------- Handle Filesystem Mount --------------
const onMount = async (info) => {
    console.log('File System', info, manager)
    let file = await manager.open('index.js')
    startApp(file)
}

startApp() // Start the default app