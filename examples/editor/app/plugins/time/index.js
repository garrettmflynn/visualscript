export default {
    tag: 'seconds',
    operator: () => Date.now()/1000,
    loop: 1000/60 // 10 times a second
}