

const node2 = {
    tag: 'node2',
    arguments: new Map([['input', 0]]),
    operator: (input) => {
        console.log('node2', input)
    }
}

const node1 = {
    tag: 'node1',
    arguments: new Map([['input', 0]]),
    children: [node2],
    operator: () => {
        return 1
    }
}

export const graph = {
   nodes: [node1, node2]
}

export {
    node1,
    node2
}