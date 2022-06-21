
import { LitElement, html, css } from 'lit';
import { Tab } from './Tab';
import { Sidebar } from '..';
import { TabContainer } from './TabContainer';

// TODO: Remove long-winded references to the Global Main


export type TabToggleProps = {
  selected: boolean
}


export const TabTogglePropsLit = {
  name : {
    type: String,
    reflect: true
  },
  selected: {
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
      flex-grow: 1;
      user-select: none;
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
  
      button.selected {
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
      
        button.selected {
        background: rgb(60,60,60);
        }

      }
    `;
  }
    
    static get properties() {
      return TabTogglePropsLit;
    }


    constructor(tab: Tab) {
      super();
        this.to = tab
    }

    select = (toggles?) => {

      this.to.on(this)

        // Show Correct Tab

        if (!toggles){
          const parent = this.parentNode // ASSUMPTION: Always within a tabBar
          const tabContainer = (parent.getRootNode() as any).host as TabContainer // ASSUMPTION: Always within a tabBar
          toggles = Array.from(tabContainer.tabs.values()).map(tab => tab.toggle)
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
      <button class="${(this.selected) ? 'selected' : ''}"  @click=${() => this.select()}>${this.to.name ?? `Tab`}</button>
    `
    }
  }
  
  customElements.define('visualscript-tab-toggle', TabToggle);