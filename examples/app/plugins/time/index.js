export default {
    tag: 'seconds',
    looper: () => Date.now()/1000,
    loop: 1000/10 // 10 times a second
}