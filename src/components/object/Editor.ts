
import { LitElement, html, css } from 'lit';
import {until} from 'lit-html/directives/until.js';

import { TimeSeries } from '../plots';
import {Input} from '../input/Input'
import { darkBackgroundColor } from 'src/globals';


const noTypeSymbol = Symbol('noType')
var TypedArray = Object.getPrototypeOf(Uint8Array);


const isAnyArray = (val) => {
  return val && (Array.isArray(val) || val instanceof TypedArray)
}

type keyType = string | number | symbol
export type ObjectEditorProps = {
  target?: {[x:string]: any}
  header?: keyType
  plot?: Function[],
  onRender?: Function
  toDisplay?: (key?: keyType, parent?: any, history?: ObjectEditor['history']) => boolean
  preprocess?: Function,
  deferValues?: boolean
  readOnly?: boolean
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

    #header {
      padding: 5px 10px;
      font-size: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid gray;
    }

    #history span {
      font-weight: 800;
      cursor: pointer;
      transition: color 0.2s;
    }

    #history span:hover {
      color: gray;
    }

    #history span:last-child {
      font-weight: normal;
    }

    #history span:first-child {
      font-weight: bold;
    }

    #container {
      width: 100%;
      padding: 10px;
      position: relative;
      overflow: scroll;
      height: 100%;
    }

    #display {
      position: relative;
      overflow-y: scroll;
      height: 50%;
    }

    #loading {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      font-size: 80%;
      font-weight: 800;
    }

    .separate {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .attribute {
      width: 100%;
      font-size: 90%;
      padding: 10px 15px;
      flex-grow: 1;
      min-height: 50px;
    }

    .display {
      font-size: 80%;
      text-align: right;
      flex-grow: 1;
    }

    .info {
      display: block;
      padding-right: 10px;
    }

    .name {
      font-weight: 800;
      padding-right: 10px;
    }

    .type {
      font-size: 70%;
    }

    @media (prefers-color-scheme: dark) {
      :host > * {
        background-color: ${darkBackgroundColor};
        box-shadow: 0 1px 5px 0 rgb(255 255 255 / 20%);
      }

      #header {
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
        onRender: {
          type: Function,
          reflect: true,
        },
        preprocess: {
          type: Function,
          reflect: true,
        },
        deferValues: {
          type: Boolean,
          reflect: true,
        },
        readOnly: {
          type: Boolean,
          reflect: true,
        },
      };
    }

    target: ObjectEditorProps['target'] | any
    keys: (keyType)[]
    header: ObjectEditorProps['header']
    history: any[] = []
    plot: ObjectEditorProps['plot']
    onRender: ObjectEditorProps['onRender']
    preprocess: ObjectEditorProps['preprocess']
    deferValues: ObjectEditorProps['deferValues']
    readOnly: ObjectEditorProps['readOnly']

    timeseries: TimeSeries
    base: any

    constructor(props: ObjectEditorProps = {}) {
      super();

      const target = props.target ?? {}

      // this.header = props.header
      this.set(target, { base: true })
      this.plot = props.plot ?? []
      this.onRender = props.onRender
      this.deferValues = props.deferValues
      this.readOnly = props.readOnly

      if (props.preprocess) this.preprocess = props.preprocess


      this.timeseries = new TimeSeries({
        data: []
      })
    }

    set = async (target, options: {
      plot?: boolean,
      base?: boolean
    } = {
      plot: false,
      base: false
    }) => {

      if (options.base) this.base = target
      if (this.preprocess instanceof Function) this.target = await this.preprocess(target)
      else this.target = target


      const typeOf = typeof this.target
      const isClassValue = this.isClassValue(this.target)
      const isObject = (this.target && typeOf === 'object' && !isClassValue) 
      const isArray = this.target && isAnyArray(this.target)
      const renderValues = isObject || isArray
      if (renderValues) {
        this.header = this.target.constructor.name
        this.keys = Object.keys(this.target).sort()
      } else {
        this.header = this.target
        this.keys = null
      }
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
        this.set(info.value).then(() => {
          this.header = info.last
        })
        return true
      }
    }


    updateHistory = (value, key, history = this.history) => history.push({value, key})

    change = async (key, parent=this.target, previousKey=this.header) => {
      const val = await Promise.resolve(parent[key])
      this.updateHistory(parent, previousKey)
      await this.set(val)
      this.header = key
      return true
    }

    getActions = async (key:keyType, o:any) => {

      let actions;

      // const val = await Promise.resolve(o[key])

      // if (typeof val === 'object') {
        actions = html`<visualscript-button primary=true size="small" @click="${async () => this.change(key, o)}">View</visualscript-button>`
      // }

      return html`
      <div class="actions">
            ${actions}
      </div>
      `
    }

    isClassValue = (val) => {
      let classes = [String, Boolean, Number]
      return classes.find(cls => {
        if (val instanceof cls) return true
      })
    }

    getElement = async (key:keyType, parent: any, force = false) => {
        
        const getValue = !this.deferValues || force || isAnyArray(parent)
        const val = (getValue) ? await Promise.resolve(parent[key]) : noTypeSymbol 
        let display : any = '';

        let type: any = typeof val;

        let renderType = getValue

        let check = true
        let wrap = false

        let classes = [String, Boolean, Number]
        classes.forEach(cls => {
          if (val instanceof cls) {
            check = false
            type = cls.name
            if (this.readOnly) display = val // Avoid providing an input
            else {
              wrap = true
              display = new Input({
                value: val, 
                onInput: (ev) => {
                  parent[key] = new cls(ev.target.value) // Modify original data
                }
              })
            }
          }
        })

        if (check) {
          if (val && (typeof val === 'object' || val === noTypeSymbol)) {
            display = await this.getActions(key, parent)
            type = Object.keys(val).length ? val.constructor?.name : html`Empty ${val.constructor?.name}`
        }
        else if (val === undefined) type = 'undefined'
        else if (val === null) type = 'null'
        else if (typeof val === 'string' && val.includes('data:image')) {
          display = document.createElement('img') as HTMLImageElement
          display.src = val
          display.style.height = '100%'
          wrap = true
        } 
        else if (this.readOnly) display = val // Avoid providing an input
        else {
          wrap = true
            display = new Input({
              value: val, 
              onInput: (ev) => {
                parent[key] = ev.target.value // Modify original data
              }
            })
          }
        }

        let style = (wrap) ? 'flex-wrap: wrap;' : ''
        if (!getValue || this.readOnly) style += 'padding: 0px 15px;'

        return html`
        <div class="attribute separate" style="${style}">
          <div class="info">
            <span class="name">${typeof key === 'string' ? key : html`[${typeof key}]`}</span>
            ${(renderType) ? html`<br><span class="type">${type}</span>` : ''}
          </div>
          ${display instanceof HTMLElement ? display : html`<p class="display">${display}</p>`}
        </div>`

    }
  
    render() {
      
      const key = this.header

      // Only pass objects through the render function
      let display: any

      if (this.keys && this.onRender instanceof Function) display = this.onRender(this.header, this.target, this.history)

      const parent = this.history.slice(-1)[0]?.value
      const content = this.keys ? this.keys?.map(key => this.getElement(key, this.target))  : this.getElement(key, parent, true)

        const historyEl = document.createElement('div')
        historyEl.id = 'history'
        const historyArr = [...this.history, { key, value: this.target }]
        historyArr.forEach((o, i) => {
          const last =  i === (this.history.length)
          const pointInHistory = document.createElement('span')
          historyEl.appendChild(pointInHistory)

          pointInHistory.innerHTML = o.key
          if (!last) {
            pointInHistory.addEventListener('click', () => {
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
          <div id="header">
            ${historyEl}
          </div>
          ${until(Promise.resolve(display).then((res) => res ? html`<div id="display">${res}</div>` : ''), '')}
          <div id="container">
            ${until((this.keys ? Promise.all(content) : Promise.resolve(content)).then((data) => html`${data}`), html`<div id="loading"><span>Loading...</span></div>`)}
            </div>
        </div>
      `

      // return html`
      //   <div>
      //     <div id="header">
      //       ${historyEl}
      //     </div>
      //     <div id="container">
      //       ${until(Promise.all(content).then((data) => html`${data}`), html`<div id="loading"><span>Loading...</span></div>`)}
      //       </div>
      //   </div>
      // `

    // // This Go Back button used to be implemented instead of the history trail
    //   ${ (this.history.length > 0) ? html`<visualscript-button size="extra-small" @click="${() => {
    //     const historyItem = this.history.pop()
    //     this.set(historyItem.value)
    //     this.header = historyItem.key
    // }}">Go Back</visualscript-button>` : ``}
    }
  }
  
  customElements.get('visualscript-object-editor') || customElements.define('visualscript-object-editor',  ObjectEditor);