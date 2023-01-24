
import { LitElement, html, css } from 'lit';
import {until} from 'lit-html/directives/until.js';

import { TimeSeries } from '../plots';
import {Input} from '../input/Input'
import { darkBackgroundColor } from 'src/globals';

type keyType = string | number | symbol
export type ObjectEditorProps = {
  target?: {[x:string]: any}
  header?: keyType
  mode?: string
  plot?: Function[],
  onPlot?: Function
  toPlot?: (key?: keyType, parent?: any, history?: ObjectEditor['history']) => boolean
  preprocess?: Function
}

export class ObjectEditor extends LitElement {

  static get styles() {
    return css`

    :host * {
      font-family: var(--visualscript-font-family, sans-serif);
      box-sizing: border-box;
    }

    :host > * {
      background: white;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
      height: 100%;
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    img {
      max-height: 100px;
    }

    .header {
      padding: 5px 10px;
      font-size: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header span {
      font-weight: 800;
      font-size: 120%;
    }

    .container {
      width: 100%;
      padding: 10px;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: scroll;
      height: 100%;
    }

    .separate {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .attribute {
      width: 100%;
      font-size: 90%;
      padding: 15px;
      flex-grow: 1;
      flex-wrap: wrap;
    }

    .info {
      display: flex;
      align-items: center;
    }

    .name {
      font-weight: 800;
      padding-right: 10px;
    }

    .value {
      font-size: 80%;
    }

    @media (prefers-color-scheme: dark) {
      :host > * {
        background-color: ${darkBackgroundColor};
        box-shadow: 0 1px 5px 0 rgb(255 255 255 / 20%);
      }

      .header {
        border-bottom: 1px solid gray;
      }
    }

    `;
  }
    
    static get properties() {
      return {
        // target: {
        //   type: Object,
        //   reflect: false,
        // },
        keys: {
          type: Object,
          reflect: true,
        },
        plot: {
          type: Object,
          reflect: true,
        },
        header: {
          type: String,
          reflect: true,
        },
        mode: {
          type: String,
          reflect: true,
        },
        onPlot: {
          type: Function,
          reflect: true,
        },
        preprocess: {
          type: Function,
          reflect: true,
        },
      };
    }

    target: ObjectEditorProps['target']
    keys: (keyType)[]
    header: ObjectEditorProps['header']
    history: any[] = []
    plot: ObjectEditorProps['plot']
    onPlot: ObjectEditorProps['onPlot']
    preprocess: ObjectEditorProps['preprocess']

    mode: string
    timeseries: TimeSeries
    base: any

    constructor(props: ObjectEditorProps = {target: {}}) {
      super();

      const target = props.target

      // this.header = props.header
      this.set(target, { base: true })
      this.mode = props.mode ?? 'view'
      this.plot = props.plot ?? []
      this.onPlot = props.onPlot
      if (props.toPlot) this.toPlot = props.toPlot
      if (props.preprocess) this.preprocess = props.preprocess


      this.timeseries = new TimeSeries({
        data: []
      })
    }

    getMode = (target, plot) => {
      return (plot) ? 'plot' : 'view' 
    }

    set = async (target={}, options: {
      plot?: boolean,
      base?: boolean
    } = {
      plot: false,
      base: false
    }) => {

      if (options.base) this.base = target
      if (this.preprocess instanceof Function) this.target = await this.preprocess(target)
      else this.target = target

      this.header = this.target.constructor.name
      this.keys = Object.keys(this.target).sort()
      this.mode = this.getMode(this.target, options.plot)
    }

    to = (path) => {

      this.history = []

      const registerAll = (path, target) => {

        let info: any = {
          history: []
        }

        // Multiple Values
        if (path.includes('.')) {
          const split = path.split('.')
          for (let key of split) {

            target = register(split, target, info)
            if (target === false) {
              console.error('Invalid path', key, path)
              return
            }
          }
        } 

        // Single Value
        else {
          register(path, target, info)
        }

        return info
      }

      const register = (key, target, info: any = {}) => {

        // const hasKey = (key in target)

        // // Check first for special hierarchy key
        // const deeper = target[specialHierarchyKey]
        // if (deeper && !hasKey){
        //    target = register(specialHierarchyKey, target, info)
        // }

        const hasKeyBase = (key in target)
        if (!hasKeyBase) return false

        // Grab general key
        const parent = target
        target = target[key]
        this.updateHistory(parent, key, info.history)

        info.last = key
        info.parent = parent
        info.value = target

        return target
      }


      this.updateHistory(parent, this.header) // Update base history
      const info = registerAll(path, this.base)
      if (!info) return
      else {
        this.history = [{key: this.header, value: this.base}, ...info.history.slice(0, -1)]
        this.set(info.value, {
          plot: this.toPlot(info.last, info.parent, this.history)
        }).then(() => {
          this.header = info.last
        })
        return true
      }
    }

    toPlot: ObjectEditorProps['toPlot'] = () => false

    updateHistory = (value, key, history = this.history) => history.push({value, key})

    change = async (val, key, parent=this.target, previousKey=this.header) => {
      this.updateHistory(parent, previousKey)
      await this.set(val, {
        plot: this.toPlot(key, parent, this.history)
      })
      this.header = key
      return true
    }

    getActions = async (key:keyType, o:any) => {

      let actions;

      const val = await Promise.resolve(o[key])

      if (typeof val === 'object') {
        const mode = this.getMode(val, this.toPlot(key, o, this.history))
        actions = html`<visualscript-button primary=true size="small" @click="${async () => this.change(val, key, o)}">${mode[0].toUpperCase() + mode.slice(1)}</visualscript-button>`
      }

      return html`
      <div class="actions">
            ${actions}
      </div>
      `
    }


    getElement = async (key:keyType, o: any) => {
        let display : any = '';
        
        const val = await Promise.resolve(o[key])

        let showValue = true
        let displayValue = val ?? '';

        let check = true
        let classes = [String, Boolean, Number]
        classes.forEach(cls => {
          if (val instanceof cls) {
            showValue = false
            check = false
            display = new Input({
              value: val, 
              onInput: (ev) => {
                o[key] = new cls(ev.target.value) // Modify original data
              }
            })
          }
        })


        if (check) {
          if (val === undefined) displayValue = 'undefined'
          else if (val === null) displayValue = 'null'
          else if (val && typeof val === 'object') {
              display = await this.getActions(key, o)
              displayValue = Object.keys(val).length ? val.constructor?.name : html`Empty ${val.constructor?.name}`
          } else if (typeof val === 'string' && val.includes('data:image')) {
            display = document.createElement('img') as HTMLImageElement
            display.src = val
            display.style.height = '100%'
          } else {
            showValue = false
            display = new Input({
              value: val, 
              onInput: (ev) => {
                o[key] = ev.target.value // Modify original data
              }
            })
          }
        }

        return html`
        <div class="attribute separate">
          <div class="info">
            <span class="name">${key}</span><br>
            ${showValue ? html`<span class="value">${displayValue}</span>` : ''}
          </div>
          ${display}
        </div>`

    }
  
    render() {

      if (this.mode === 'plot') {
        if (this.onPlot instanceof Function) this.onPlot(this)
        this.insertAdjacentElement('afterend', this.timeseries)
      } else this.timeseries.remove()

      const content = (
        this.mode === 'view' 
        ? this.keys?.map(key => this.getElement(key, this.target)) 
        : []
      )


        const historyEl = document.createElement('small')
        const historyArr = [...this.history, { key: this.header, value: this.target }]
        historyArr.forEach((o, i) => {
          const last =  i === (this.history.length)
          const a = document.createElement('a')
          historyEl.appendChild(a)

          a.innerHTML = o.key
          if (!last) {
            a.title=`Click to shift history to ${o.key}`
            a.href="#"
            a.addEventListener('click', () => {
              this.set(o.value)
              this.history = historyArr.slice(0, i)
              this.header = o.key
              return false
            })
            historyEl.insertAdjacentHTML('beforeend', ' —&nbsp;')
          }
        })


        return html`
        <div>
          <div class="header">
            ${historyEl}
          </div>
          <div class="container">
            ${until(Promise.all(content).then((data) => html`${data}`), html`<span>Loading...</span>`)}
            </div>
        </div>
      `

    // // This Go Back button used to be implemented instead of the history trail
    //   ${ (this.history.length > 0) ? html`<visualscript-button size="extra-small" @click="${() => {
    //     const historyItem = this.history.pop()
    //     this.set(historyItem.value)
    //     this.header = historyItem.key
    // }}">Go Back</visualscript-button>` : ``}
    }
  }
  
  customElements.get('visualscript-object-editor') || customElements.define('visualscript-object-editor',  ObjectEditor);