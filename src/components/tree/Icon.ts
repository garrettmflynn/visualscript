import { LitElement, html, css } from 'lit';
import * as icons from './icons'

export interface IconProps {
  type?: string;
}

export class Icon extends LitElement {

  static get styles() {
    return css`
    div {
      padding: 7px;
    }


    svg {
      width: 18px;
      height: 18px;
      fill: black;
    }

    @media (prefers-color-scheme: dark) {

      svg {
        fill: rgb(210, 210, 210);
      }
    }

    `;
  }
    
    static get properties() {
      return {
        type:  {
          type: String,
          reflect: true
        },
      };
    }


    type: IconProps['type']

    constructor(props: IconProps = {}) {
      super();

      this.type = props.type ?? 'folder'

    }
  
    render() {

      return html`
      <div>
       ${icons[this.type]}
      </div>
    `
    }
  }
  
  customElements.define('visualscript-icon', Icon);