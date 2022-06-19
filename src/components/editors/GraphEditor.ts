
import { LitElement, html, css } from 'lit';
import {until} from 'lit-html/directives/until.js';

import { TimeSeries } from '../plots';
import {Input} from '../input/Input'

type keyType = string | number | symbol
export type GraphEditorProps = {
  tree: {[x:string]: any}
  plot?: Function[],
  onPlot?: Function
  preprocess?: Function
}

export class GraphEditor extends LitElement {

  static get styles() {
    return css`

    :host * {
      box-sizing: border-box;
    }

    :host > * {
      background: white;
      border-radius: 4px;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }

    img {
      max-height: 100px;
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
        background-color: rgb(40, 40, 40);
      }
    }

    `;
  }
    
    static get properties() {
      return {
        // tree: {
        //   type: Object,
        //   reflect: false,
        // },
        keys: {
          type: Object,
          reflect: true,
        },
      };
    }

    tree: GraphEditorProps['tree']
    keys: (keyType)[]
    history: any[] = []

    constructor(props: GraphEditorProps = {tree: {}}) {
      super();

      this.set(props.tree)
    }

    set = async (tree={}) => {
      this.tree = tree
      this.keys = Object.keys(this.tree)
    }

    getElement = async (key:keyType, o: any) => {
        let display;

        const val = await Promise.resolve(o[key])

        if (typeof val === 'string' && val.includes('data:image')) {
          display = document.createElement('img') as HTMLImageElement
          display.src = val
          display.style.height = '100%'
        } else {
          display = new Input()
          display.value = val
          display.oninput = () => {
            o[key] = display.value // Modify original data
          }
        }

        const isObject = typeof val === 'object' 

        return html`
        <div class="attribute separate">
        <div class="info">
          <span class="name">${key}</span><br>
          <span class="value">${(
            isObject
            ? (Object.keys(val).length ? val.constructor?.name : html`Empty ${val.constructor?.name}`)
            : '')}</span>
        </div>
          ${key}${o}
        </div>`

    }
  
    render() {

      // const content = this.keys?.map(key => this.getElement(key, this.tree)) 

      // return until(Promise.all(content).then((data) => {

        return html`
          <div class="container">
                ${this.tree}
          </div>
      `
      // }), html`<span>Loading...</span>`)

    }
  }
  
  customElements.define('visualscript-graph-editor', GraphEditor);