
import { LitElement, html, css } from 'lit';
import { Icon } from './Icon';
import { Tree } from './Tree';

type keyType = string
export type TreeItemProps = {
  type?: string | 'folder' | 'openfolder' | 'file',
  key: keyType,
  parent: Tree,
  value: any
}

export class TreeItem extends LitElement {

  static get styles() {
    return css`

    :host * {
      box-sizing: border-box;
    }

    li {
        width: 100%;
    }

    li > div > div {
        display: flex;
        font-size: 12px;
        padding: 5px;
        flex-grow: 1;
        align-items: center;
        flex-wrap: wrap;
        user-select: none;
    }

    li.last > div { background: #b6e3ff;}

    li.last > div:hover { background: #b6e3ff; }

    li > div:hover {
        background: rgb(240,240,240);
        cursor: pointer;
    }

    @media (prefers-color-scheme: dark) {

      li > div:hover{ background-color: rgb(70, 70, 70) }

      li.last > div { background: #0091ea;}

        li.last > div:hover { background: #0091ea; }


    }

    `;
  }
    
    static get properties() {
      return {
        type: {
          type: String,
          reflect: true,
        },
        key: {
            type: String,
            reflect: true,
        },
        open: {
            type: Boolean,
            reflect: true,
        }
      };
    }

    type: TreeItemProps['type']
    key: TreeItemProps['key']
    li?: HTMLLIElement
    value: TreeItemProps['value'];
    parent: TreeItemProps['parent'];
    open: boolean;

    constructor(props: TreeItemProps) {
      super();

      this.key = props.key
      this.value = props.value
      this.parent = props.parent

    //   this.set(props.target)
      this.type = props.type ?? 'folder'
    }

    removeLast = () => {
        if (this.li) this.li.classList.remove('last')
        window.removeEventListener('click', this.removeLast)
    }

    render() {

        const icon = new Icon({type: this.type})
        const leftPad = 8*(this.parent.depth ?? 0)

        return html`
        <li>
        <div @click=${() => {

            this.li = this.shadowRoot.querySelector('li')
            const icon = this.shadowRoot.querySelector('visualscript-icon') as Icon

            this.li.classList.add('last')
            window.addEventListener('mousedown', this.removeLast)
    
            // Switch Icons
            if (this.type === 'file'){

            } else {
              if (this.type === 'folder') {
                this.type = 'openfolder'
                this.open = true
              }
              else {
                  this.type = 'folder'
                  this.open = false
              }
            }
          }}>
            <div style="padding-left: ${leftPad}px">
             ${icon}
            <span class="name">${this.key}</span>
            </div>
          </div>
          ${(this.open) ? new Tree({target: this.value, depth: this.parent.depth + 1}) : ''}
        </li>
      `
    }
  }
  
  customElements.define('visualscript-tree-item', TreeItem);