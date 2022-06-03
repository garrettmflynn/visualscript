
import { LitElement, html, css } from 'lit';
import { TimeSeries } from '../plots';
import {Input} from '../input/Input'

type keyType = string | number | symbol
export type ObjectEditorProps = {
  target: {[x:string]: any}
  header?: keyType
  mode?: string
  plot?: Function[],
  onPlot?: Function
  preprocess?: Function
}

export class ObjectEditor extends LitElement {

  static get styles() {
    return css`

    :host * {
      box-sizing: border-box;
    }

    :host > * {
      background: white;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);
    }

    img {
      max-height: 100px;
    }

    .header {
      padding: 10px 20px;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      font-size: 70%;
      border-bottom: 1px solid #e3e3e3;
    }

    .header span {
      font-weight: 800;
      font-size: 120%;
    }

    .container {
      width: 100%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
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
        background-color: rgb(60, 60, 60);
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

    constructor(props: ObjectEditorProps = {target: {}, header: 'Object'}) {
      super();

      this.set(props.target)
      this.header = props.header ?? 'Object'
      this.mode = props.mode ?? 'view'
      this.plot = props.plot ?? []
      this.onPlot = props.onPlot
      if (props.preprocess) this.preprocess = props.preprocess

      this.timeseries = new TimeSeries({
        data: []
      })
    }

    getMode = (target, plot) => {
      return (plot) ? 'plot' : 'view' 
    }

    set = async (target={}, plot=false) => {
      if (this.preprocess instanceof Function) this.target = await this.preprocess(target)
      else this.target = target
      this.keys = Object.keys(this.target)
      this.mode = this.getMode(this.target, plot)
    }

    checkToPlot = (key, o) => this.plot.reduce((a,f) => a + f(key, o), 0) === this.plot.length

    getActions = (key:keyType, o:any) => {

      let actions;

      if (typeof o[key] === 'object') {
        const mode = this.getMode(o[key], this.checkToPlot(key,o))
        actions = html`<visualscript-button primary=true size="small" @click="${async () => {
          this.history.push({parent: o, key: this.header})
          await this.set(o[key], this.checkToPlot(key,o))
          this.header = key
        }}">${mode[0].toUpperCase() + mode.slice(1)}</visualscript-button>`
      }

      return html`
      <div class="actions">
            ${actions}
      </div>
      `
    }


    getElement = (key:keyType, o: any) => {
        let display;

        if (typeof o[key] === 'string' && o[key].includes('data:image')) {
          display = document.createElement('img') as HTMLImageElement
          display.src = o[key]
          display.style.height = '100%'
        } else {
          display = new Input()
          display.value = o[key]
          display.oninput = () => {
            o[key] = display.value // Modify original data
          }
        }

        const isObject = typeof o[key] === 'object' 

        return html`
        <div class="attribute separate">
        <div class="info">
          <span class="name">${key}</span><br>
          <span class="value">${(
            isObject
            ? (Object.keys(o[key]).length ? o[key].constructor.name : html`Empty ${o[key].constructor.name}`)
            : '')}</span>
        </div>
          ${isObject ? this.getActions(key, o) : display}
        </div>`

    }
  
    render() {

      if (this.mode === 'plot') {
        if (this.onPlot instanceof Function) this.onPlot(this)
        this.insertAdjacentElement('afterend', this.timeseries)
      } else this.timeseries.remove()

      return html`
      <div>
        <div class="header separate">
          <span>${this.header}</span>
          ${ (this.history.length > 0) ? html`<visualscript-button size="extra-small" @click="${() => {
              const historyItem = this.history.pop()
              this.set(historyItem.parent)
              this.header = historyItem.key
          }}">Go Back</visualscript-button>` : ``}
        </div>
        <div class="container">
              ${(
                this.mode === 'view' 
                ? this.keys?.map(key => this.getElement(key, this.target)) 
                : ''
              )}
        </div>
      </div>
    `
    }
  }
  
  customElements.define('visualscript-object-editor', ObjectEditor);