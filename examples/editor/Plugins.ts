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
            
            await this.metadata(`index.js`) // Get metadata
        }

        this.readyState = true // Switch readyState to true
    }

    get = async (url) => {
        return await this.filesystem.open(url)
    }

    metadata = async (name) => {

        if (this.plugins[name]){
            let path = this.getPath(name)

            const metadataPath = this.metadataPath(name)
            
            if (!path.includes(metadataPath)) {
                const splitPath = path.split('/').slice(0, -1)
                splitPath.push(metadataPath)
                path = splitPath.join('/')
            }
            
            const metadata = this.plugins[name].metadata ?? await this.get(path)
            if (metadata) {
                this.plugins[name].metadata = metadata
                return await this.plugins[name].metadata.body
            } else return {}
        } else {
            console.warn(`No metadata for ${name}.`)
            return {}
        }
    }

    getPath = (name:string) => this.plugins[name].module?.path ?? this.plugins[name].path ?? name

    metadataPath = (name) => {
        const fileName = name.split('.').at(-2)
        return `${this.metadataDirBase}/${fileName}.${this.metadataFileSuffix}`
    }

    metadataDirBase = '.brainsatplay'
    metadataFileSuffix = 'metadata.js'

    module = async (name) => {
        
        // Getting Metadata File from Reference
        let isMetadata = false
        const metadataPath = this.metadataPath(name)
        if (name.includes(metadataPath)){
            name = name.replace(metadataPath,`${metadataPath.split('.')[0]}.js`)
            isMetadata = true
        }

        // Skip without Name
        if (this.plugins[name]){
            const path = this.getPath(name)
            const pluginModule = this.plugins[name].module ?? await this.get(path)
            if (pluginModule) {
                this.plugins[name].module = pluginModule
                if (isMetadata) return await this.metadata(name)
                else return await this.plugins[name].module.body
            } else return {}
        } else {
            console.error(`Module for ${name} not found.`)
            return {}
        }
    }
}