
import { LitElement, html, css } from 'lit';
import { Icon } from '../general/Icon';
// import { Tree } from './Tree';

type keyType = string
export type TreeItemProps = {
  type?: string | 'folder' | 'openfolder' | 'file'
  key?: keyType,
  parent: any,
  value?: any,
  onClick: Function
}

export class TreeItem extends LitElement {

  static get styles() {
    return css`

    :host {
      font-family: var(--visualscript-font-family, sans-serif);
    }

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
        user-select: none;
        overflow: hidden;
    }

    li.error:not(.editing) > div { background: rgb(255,210,210); }
    li.selected > div { background: rgb(230,230,230); }
    li.last > div { background: #b6e3ff;}

    li:not(.selected):not(.last):not(.error):not(.editing) > div:hover {
        background: rgb(240,240,240);
    }

    li div:hover {
      cursor: pointer;
    }

    visualscript-icon {
      padding: 0px 7px;
    }

    @media (prefers-color-scheme: dark) {

      li > div:hover{ background-color: rgb(70, 70, 70) }

      li.error:not(.editing) > div { background: rgb(95,60,60); }
      li.selected > div { background: rgb(80,80,80); }
      li.last > div { background: #0091ea;}

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
        },
      };
    }

    type: TreeItemProps['type'] = 'folder'
    key: TreeItemProps['key']
    li?: HTMLLIElement
    value: TreeItemProps['value'];
    parent: TreeItemProps['parent'];
    open: boolean;
    onClick: TreeItemProps['onClick'];
    tree?: any;

    error?: any;
    editing?: any;


    resolveReady: {
      resolve: Function
      reject: Function
    }

    ready = new Promise((resolve, reject) => {
      this.resolveReady = {
        resolve,
        reject
      }
    })

    constructor(props: TreeItemProps) {
      super();

      this.key = props.key
      this.value = props.value
      this.parent = props.parent
      this.onClick = props.onClick

    //   this.set(props.target)
      if (props.type) this.type = props.type 
    }

    removeClass = (str: 'selected' | 'last'): any => {
        if (this.li) this.li.classList.remove(str)
    }

    updated = ( ) => {
      const input = this.shadowRoot.querySelector('input')
      if (input) input.focus()
    }

    render() {

        const icon = new Icon({type: this.type})
        const leftPad = 8*(this.parent.depth ?? 0)

        // Show Item Info (or edit it...)
        let content;
        if (!this.key) {
          content = html`<input type="text" @change=${(e) => {
            this.key = e.target.value
            this.resolveReady.resolve()
          }}/>
          `
          
        } else content = html`${this.key}`

        this.editing = (this.key) ? false : true
        this.error = (this.value) ? false : true

        this.tree = (this.open) 
        ? new this.parent.constructor({target: this.value, depth: this.parent.depth + 1, onClick: this.onClick}) // Create new tree from parent constructor (to avoid circular dependency)
        : undefined

        return html`
        <li class="${`${this.editing ? 'editing' : ``} ${this.error ? 'error' : ``}`}">
        <div @click=${() => {

          if (!this.editing && !this.error) {
            this.li = this.shadowRoot.querySelector('li')

            this.li.classList.add('last')
            this.li.classList.add('selected')

            const remove = () => {
              this.removeClass('last')
              window.removeEventListener('click', remove)
            }

            window.addEventListener('mousedown', remove)
    
            // Switch Icons (if ready)
              if (this.type === 'file'){
                if (this.key && this.value){
                  if (this.onClick instanceof Function) this.onClick(this.key, this.value)
                }
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
            }
          }}>
            <div style="padding-left: ${leftPad}px">
             ${icon}
            <span class="name">
              ${content}
            </span>
            </div>
          </div>
          ${this.tree}
        </li>
      `
    }
  }
  
  customElements.get('visualscript-tree-item') || customElements.define('visualscript-tree-item',  TreeItem);