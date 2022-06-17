import * as visualscript from '../../src/index'
// import * as freerange from 'https://cdn.jsdelivr.net/npm/freerange@0.0.24/dist/index.esm.js'
import * as freerange from './external/freerange/index.esm.js'
import App from './App';
import './components/Editor';
import { TimeSeries } from '../../src/components/streams/data';

// -------------- File System Generator--------------
let systems = {}

const createSystem = async (input) => {
    console.log('Creating system', input)

    let system = new freerange.System(input, {
        debug: true,
        ignore: ['DS_Store']
    })

    await system.init()
    systems[system.name] = system

    console.log('Created system', system.name)
    return system
}

// -------------- Remote App --------------
const appPath = 'https://raw.githubusercontent.com/brainsatplay/brainsatplay-starter-kit/main/app/index.js'
// const appPath = `./app/index.js` // Automatically relative to window.location.href


// -------------- Plugin Registry --------------
const pluginURL = 'https://raw.githubusercontent.com/brainsatplay/awesome-brainsatplay/main/plugins.js'

createSystem('remote').then(remoteSystem => {
    remoteSystem.open(pluginURL).then(async file => {
        console.log('File', file)
        const plugins = await file.body
        console.log('Plugins', plugins)
        for (let key in plugins){
            const url = plugins[key]
            Object.defineProperty(plugins, key, {
                get: async () => (await freerange.open(url)).contents,
                enumerable: true
            })
        }
        console.log('Plugin Registry', plugins)
    })
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
        onClick: async () => {
            const system = await createSystem()
            startApp(system)
        }
    }
]}

// -------------- Setup Default App --------------
let app = new App()
editor.setApp(app)

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

const startApp = (system) => {

    console.log(`File System Selected (${system.name})`, system.files)

    // TODO: Make it so that only new information is fully re-imported
    app.onsave = async () => {
        await system.save()
    }


    app.oncompile = async () => {

        console.error('Compiling!')
        const files = system.files.list
        const file = files.get('index.js')
        if (file) {
            editor.setFiles(Array.from(files.values()))
            const imported = await file.body
            return imported
        } else console.error('Not a valid Brains@Play project...')
    }

    app.onstart = () => {

        const ui = new TimeSeries()
        editor.setUI(ui)

        app.graph.nodes.forEach(n => {
            if (n.tag === 'sine') n.subscribe((data) => {
                ui.data = [data]
                ui.draw() // FORCE DRAW: Update happens too fast for UI
            })
        })
    }

    app.init()
}