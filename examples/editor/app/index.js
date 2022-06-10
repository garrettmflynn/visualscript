import sinePlugin from './plugins/sine/index.js'
import secondsPlugin from './plugins/time/index.js'
import logPlugin from './plugins/log.js'

const seconds = Object.assign({children: []}, secondsPlugin)
const sine = Object.assign({children: []}, sinePlugin)
seconds.children.push(sine)
sine.children.push(logPlugin)

export default {
    seconds
}