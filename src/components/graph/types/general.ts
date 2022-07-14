type graphscriptNode = {
    tag: string,
    children?: Node[]
    arguments?: Map<string, any>

    // Additional Visualscript Metadata
    x?: number,
    y?: number
}

type graphscriptGraph = {
    nodes: Map<string, graphscriptNode>
}

type brainsatplayApp = {
    graph: graphscriptGraph
}
