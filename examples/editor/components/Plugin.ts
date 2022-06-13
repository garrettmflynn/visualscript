
import { LitElement, html, css } from 'lit';
import {getFnParamNames} from '../external/brainsatplay/Graph'

export type PluginProps = {
  tag?: string
}

export class Plugin extends LitElement {

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
      height: 100%;
      width: 100%;
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
      align-items: flex-start;
      justify-content: flex-start;
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
        tag: {
          type: String,
          reflect: true,
        },
      };
    }

    tag: PluginProps['tag']
    plugin: {[x:string]: any}

    constructor(props={}) {
      super();
      if (props.plugin) this.set(props.plugin)
    }

    set = (plugin) => {
      this.plugin = plugin
      this.tag = plugin.tag
    }

    render() {

      return html`
        <div>
          <div class="header separate">
            <span>${this.tag ?? 'Tag'}</span>
          </div>
          <div class="container">
          ${getFnParamNames(this.plugin.operator ?? this.plugin.looper ?? this.plugin.animation).map(str => html`<p>${str}</p>`)}
          </div>
        </div>
      `

    }
  }
  
  customElements.define('visualscript-plugin', Plugin);