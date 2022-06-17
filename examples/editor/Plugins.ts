import * as freerange from './external/freerange/index.esm.js'


export default class Plugins {

    readyState: boolean = false
    source: string
    filesystem: freerange.System
    plugins: {[x:string]: {
        path: string,
        metadata?: freerange.RangeFile,
        module?: freerange.RangeFile,
    }}

    list: Set<string> = new Set()

    constructor(source:string | freerange.System ='https://raw.githubusercontent.com/brainsatplay/awesome-brainsatplay/main/plugins.js') {
        if (typeof source === 'string') this.source = source
        else {
            this.source = source.name
            this.filesystem = source
        }
        this.plugins = {}
    }

    init = async () => {


        // Remote Plugins
        if (!this.filesystem){
            this.filesystem = new freerange.System('plugins', {
                // debug: true,
                ignore: ['DS_Store']
            })
            await this.filesystem.init()

            const file = await this.filesystem.open(this.source)
            const plugins = await file.body
    
            for (let key in plugins){
                this.list.add(key) // Add to list
                const path = plugins[key]
                this.plugins[key] = { path }
                // await this.metadata(key) // Get metadata right away
            }
        } 
        
        // Get Metadata from Local Plugins
        else {

            this.filesystem.files.list.forEach(f => {
                this.list.add(f.path) // Add to list
                this.plugins[f.path] = { 
                    path: f.path,
                    module: f
                }
            })
            
            const metadata = await this.metadata(`index.js`)
            console.log('metadata', metadata)
        }

        this.readyState = true // Switch readyState to true
    }

    get = async (url) => {
        return await this.filesystem.open(url)
    }

    metadata = async (name) => {
        const path = this.plugins[name].path ?? name
        const splitPath = path.split('/').slice(0, -1)
        splitPath.push('.brainsatplay/metadata.js')
        this.plugins[name].metadata = this.plugins[name].metadata ?? await this.get(splitPath.join('/'))
        return await this.plugins[name].metadata.body
    }

    module = async (name) => {
        const path = this.plugins[name].path ?? name
        this.plugins[name].module = this.plugins[name].module ?? await this.get(path)
        return await this.plugins[name].module.body
    }
}