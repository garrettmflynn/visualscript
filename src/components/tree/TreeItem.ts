
import { LitElement, html, css } from 'lit';
import { Icon } from '../general/Icon';
import { Tree } from './Tree';

type keyType = string
export type TreeItemProps = {
  type?: string | 'folder' | 'openfolder' | 'file',
  key: keyType,
  parent: Tree,
  value: any,
  onClick: Function
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
        padding: 6px;
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

    visualscript-icon {
      padding: 0px 7px;
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

    type: TreeItemProps['type'] = 'folder'
    key: TreeItemProps['key']
    li?: HTMLLIElement
    value: TreeItemProps['value'];
    parent: TreeItemProps['parent'];
    open: boolean;
    onClick: TreeItemProps['onClick'];

    constructor(props: TreeItemProps) {
      super();

      this.key = props.key
      this.value = props.value
      this.parent = props.parent
      this.onClick = props.onClick

    //   this.set(props.target)
      if (props.type) this.type = props.type 
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

            this.li.classList.add('last')
            window.addEventListener('mousedown', this.removeLast)
    
            // Switch Icons
            if (this.type === 'file'){
                if (this.onClick instanceof Function) this.onClick(this.key, this.value)
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
          ${(this.open) ? new Tree({target: this.value, depth: this.parent.depth + 1, onClick: this.onClick}) : ''}
        </li>
      `
    }
  }
  
  customElements.define('visualscript-tree-item', TreeItem);