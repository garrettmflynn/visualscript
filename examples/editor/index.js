import * as visualscript from '../../src/index'
// import * as freerange from 'https://cdn.jsdelivr.net/npm/freerange@0.0.24/dist/index.esm.js'
import * as freerange from './external/freerange/index.esm.js'
import App from './App';
import './components/Editor';
import { TimeSeries } from '../../src/components/streams/data';

// Get Remote App by Default
const appPath = 'https://raw.githubusercontent.com/brainsatplay/brainsatplay-starter-kit/main/app/index.js'
// const appPath = `./app/index.js` // Automatically relative to window.location.href

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
        onClick: () => manager.mount()
    }
]}

// -------------- Setup Default App --------------
let app = new App()
editor.setApp(app)

manager.mount(appPath) // Mount specified file
.catch(e => console.error('Remote app not available', e))

// -------------- Handle Filesystem Mount / Switch --------------
manager.onswitch = (name, files) => {
    console.log(`${name} File System Selected`, files)
    const indexFile = files.list.get('index.js') // Get index.js file
    startApp(indexFile)
}


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


    app.oncompile = async () => {
        const file = manager.files.list.get('index.js')
        const imported = await manager.import(file)
        editor.setFiles(Array.from(manager.files.list.values()))
        return imported
    }

    app.onstart = () => {

        const ui = new TimeSeries()
        editor.setUI(ui)

        console.log('App Started', app)
        app.graph.nodes.forEach(n => {
            if (n.tag === 'sine') n.subscribe((data) => {
                ui.data = [data]
                ui.draw() // FORCE DRAW: Update happens too fast for UI
            })
        })
    }

    app.init()
}