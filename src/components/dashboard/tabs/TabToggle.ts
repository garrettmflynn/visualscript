
import { LitElement, html, css } from 'lit';
import { Tab } from './Tab';
import { Sidebar } from '..';
import { TabBar } from './TabBar';

// TODO: Remove long-winded references to the Global Main


export type TabToggleProps = {
  tab: Tab,
  selected?: boolean,
  grow?: boolean
}


export const TabTogglePropsList = {
  // name : {
  //   type: String,
  //   reflect: true
  // },
  selected: {
    type: Boolean,
    reflect: true
  },
  grow: {
    type: Boolean,
    reflect: true
  }
}

export class TabToggle extends LitElement {

  to: Tab
  selected: TabToggleProps['selected']

  static get styles() {
    return css`

    :host {
      user-select: none;
    }

    :host([grow]) {
      flex-grow: 1;
    }

    :host * {
      box-sizing: border-box;
    }

    button {
        color: black;
        background: rgb(205,205,205);
        border-right: 1px solid rgb(230,230,230);
        border: 0px;
        padding: 6px 20px;
        text-align: center;
        font-size: 80%;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }

    button > span {
      font-size: 60%;
    }

    button:hover {
        background: rgb(230,230,230);
      }
  
      button:active {
        background: rgb(210,210,210);
      }
  
      :host([selected]) button {
        background: rgb(230,230,230);
      }


      @media (prefers-color-scheme: dark) {
        button {
            color: white;
            background: rgb(50,50,50);
            border-right: 1px solid rgb(25,25,25);
        }

        button:hover {
            background: rgb(60,60,60);
        }
      
        button:active {
        background: rgb(75,75,75);
        }
      
        :host([selected]) button {
          background: rgb(60,60,60);
        }

      }
    `;
  }
    
    static get properties() {
      return TabTogglePropsList;
    }

    grow: TabToggleProps['grow'] = false

    constructor(props: TabToggleProps) {
      super();
        this.to = props.tab
        if (props.grow) this.grow = props.grow
        if (props.selected) this.selected = props.selected
    }

    select = (toggles?) => {

      if (this.to.on instanceof Function) this.to.on(this)

        // Show Correct Tab
        if (!toggles){
          let parent = this.parentNode as TabBar | any
          let bar = ((!(parent instanceof HTMLElement)) ? parent.host : parent) as TabBar
           toggles = bar.querySelectorAll('visualscript-tab-toggle') // Get toggles
           if (toggles.length === 0) toggles = bar.shadowRoot.querySelectorAll('visualscript-tab-toggle')
        }
       
        if (toggles){
          this.selected = true

          // if (this.to.style.display === 'none') {
            toggles.forEach(t => {

              if (t != this) { 
                t.selected = false
                t.to.style.display = 'none' 
                t.to.off(this)
              } else { t.to.style.display = ''} // hide other tabs

            })
          // }
        } else console.warn('No TabBar instance in the global Main')

        // Swap Sidebar Content
        const dashboard = this.to.dashboard 

        if (dashboard){
          const sidebar = dashboard.querySelector('visualscript-sidebar') as Sidebar
          
          if (sidebar) {
            sidebar.content = (this.to.controlPanel.children.length) ? this.to.controlPanel : ''
          }
        }
    }
    
    render() {

      return html`
      <button @click=${() => this.select()}>${this.to.name ?? `Tab`}</button>
    `
    }
  }
  
  customElements.define('visualscript-tab-toggle', TabToggle);