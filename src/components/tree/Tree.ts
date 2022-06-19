
import { LitElement, html, css } from 'lit';
import {until} from 'lit-html/directives/until.js';
import { TreeItem } from './TreeItem';

type keyType = string
export type TreeProps = {
  target: {[x:string]: any}
  depth?: number
}

export class Tree extends LitElement {

  static get styles() {
    return css`

    :host * {
      box-sizing: border-box;
    }

    :host > * {
      background: white;
      height: 100%;
      width: 100%;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        font-size: 90%;
    }

    .container {
      width: 100%;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: scroll;
      height: 100%;
    }

    .info {
      display: flex;
      align-items: center;
    }

    .name {
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
        // target: {
        //   type: Object,
        //   reflect: false,
        // },
        keys: {
          type: Object,
          reflect: true,
        },
        depth: {
          type: Number,
          reflect: true,
        }
      };
    }

    target: TreeProps['target']
    keys: (keyType)[]
    depth: TreeProps['depth'] = 0

    constructor(props: TreeProps = {target: {}}) {
      super();

      if (props.depth) this.depth = props.depth
      this.set(props.target)
    }

    set = async (target={}) => {
      this.target = target
      this.keys = Object.keys(this.target)
    }

    getElement = async (key:keyType, o: any) => {

      const value = o[key]
      let type = (value.constructor.name === 'Object') ? 'folder' : 'file'

      const treeItem = new TreeItem({
        key,
        type,
        value,
        parent: this
      })

      return treeItem
    }
  
    render() {

      const content = (this.keys?.map(key => this.getElement(key, this.target)))

      return until(Promise.all(content).then((data) => {

        return html`
          <ul class="container">
                ${data}
          </ul>
      `
      }), html`<span>Loading...</span>`)

    }
  }
  
  customElements.define('visualscript-tree', Tree);