import { randomId } from "./utils";

export default class Graph {

    static _id = randomId()
    id: string = randomId()

    // Internal Graphs
    graphs: {[x:string]: Graph} = {};

    // Edges with External Graphs
    // Note: First key is input graph. Second key is output graph.
    targets: {[x:string]:Graph} = {};

    parent: Graph | null;
    debug: boolean;

    constructor(transform?: Function, parent: Graph = null, debug: boolean = false){
        
        if (transform instanceof Function) this.transform = transform 
        if (parent) parent.add(this)
        this.debug = debug
    }

    // --------------------- METHODS ---------------------
    init = () => { 
        window.addEventListener('resize', this.resize)
        this.oninit() // specified by user
    }

    deinit = () => { 
        window.removeEventListener('resize', this.resize)
        this.ondeinit() // specified by user
    }
    
    resize = ()  => { this.onresize() }

    push = (input:any) => { this._onpush(input) }
    
    transform: Function = (input, self) => input


    // Subscribe to Another Graph's Output
    subscribe = (
        target?: Graph | Function | string, // External or Exposed Graph
    ) => {

        // Step #1: Get Target Graph
        let graph;
        if (target instanceof Graph ) graph = target
        else if (target instanceof Function) graph = new Graph(target)
        else if (typeof target === 'string') graph = this.graphs[target]
        else return null

        // Step #2: Register Edge
        if (!(graph.id in this.targets)) this.targets[graph.id] = graph

        return graph.id
    }

    unsubscribe = (targetId:string) => {
        delete this.targets[targetId] // Remove edge with target graph
    }


    // Internal Graph Management
    add = (graph: Graph) => {
        console.log(graph.parent)

        // Initialize Paren t
        if (!graph.parent) {
            graph.parent = this
            this.targets[graph.id] = graph
        } 
        
        // Catch Existing Parent
        else {
            if (graph.parent === this) console.error('Graph is already within this parent...')
            else console.error('Graph already has another parent...')
        }
    }

    remove = (id:string) => {
        delete this.targets[id] // Remove edge with target graph
    }


    // --------------------- CALLBACKS ---------------------
    oninit: (self?:Graph) => void = () => {};
    ondeinit: (self?:Graph) => void = () => {};
    onconnect: (self?:Graph) => void = () => {};
    ondisconnect: (self?:Graph) => void = () => {};
    onresize: (self?:Graph) => void = () => {};

    _onpush: (input:any) => void = (input) => {

        // Step #1: Transform Inputs into Single Output
        if (this.debug) console.log(`Input (${this.id}) : ${input}`)
        const output = this.transform(input, this)
        if (this.debug) console.log(`Output (${this.id}) : ${output}`)

        // Step #2: Pass Output to Connected Graphs
        for (let id in this.targets) this.targets[id].push(output)
    };
}