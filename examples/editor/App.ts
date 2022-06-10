import { Graph } from './external/brainsatplay/Graph'

export default class App {

    tree: any; // Graph Properties
    graph: Graph;
    import: any; // ES6 Module
    animated: {[key: string]: Graph}

    constructor(tree) {
        this.tree = tree
        this.graph = null
        this.import = null
        this.animated = {}
    }

    init = async () => {
        await this.compile()
        await this.start()
    }

    start = async () => {

            this.graph = new Graph(this.tree, 'graph')
    
            // Run the top-level nodes
            for (let key in this.graph.tree) {
                const nodeInfo = this.graph.tree[key]
                const node = this.graph.nodes.get(nodeInfo.tag)
                console.log('node.loop', node.loop)
                if (node.loop) node.loop = parseFloat(node.loop) // TODO: fix importing...
                node.run()
            }
        if (this.onstart instanceof Function) this.onstart()
    }

    compile = async () => {

        if (this.import) console.warn('Recompiling the application...')

        // Remove While Tree
        if (this.graph) this.graph.nodes.forEach(this.graph.removeTree)
        this.graph = null

        // Let User Specify the New Tree
        if (this.oncompile instanceof Function) this.tree = await this.oncompile()
    }

    save = async () => {
        if (this.onsave instanceof Function) await this.onsave()
        await this.init()
    }

    // -------------- Events --------------
    onsave = null
    oncompile = null
    onstart = null

}