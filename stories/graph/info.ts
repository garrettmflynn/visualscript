

export const node2 = {
    tag: 'node2',
    nodes: new Map([['target', 0]]),
    operator: (input) => {
        console.log('target', input)
    },
}

export const node1 = {
    tag: 'node1',
    nodes: new Map([['target', 0]]),
    children: {
        [node2.tag]: true
    },
    operator: () => {
        return 1
    }
}

export const graph = {
   nodes: new Map([
        [node1.tag, node1], 
        [node2.tag, node2]
    ])
}