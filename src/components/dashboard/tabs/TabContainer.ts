
import { LitElement, html, css } from 'lit';
import { Tab } from './Tab';
import './TabToggle';
import './TabBar';

export type TabContainerProps = {

}

export class TabContainer extends LitElement {

  tabs: Map<string, Tab> = new Map();
  tabLabels: string[]= []

  static get styles() {
    return css`

    :host {
      box-sizing: border-box;
      grid-area: main;
      overflow: hidden;
      background: inherit;
      color: inherit;
      position: relative;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-areas:
          "tabs"
          "content";
      grid-template-rows: min-content 1fr;
    }

    :host * {
      box-sizing: border-box;
    }

    #notabs {
      width: 100%;
      height: 100%;
      display: flex; 
      align-items: center;
      justify-content: center;
      font-size: 80%;
    }
    `;
  }
    
    static get properties() {
      return {
        tabLabels: {
          type: Object,
          reflect: true
        },
        tabs: {
          type: Object,
          // reflect: true
        }
      };
    }

    constructor(props: TabContainerProps = {}) {
      super();
    }

    addTab = (tab) => {
      this.insertAdjacentElement('beforeend', tab)
      this.tabs.set(tab.name, tab)
      this.updateTabs()
    }

    removeTab = (tab: Tab | string) => {
      if (tab instanceof Tab) tab = tab.name
      const tabObj = this.tabs.get(tab)
      tabObj.remove()
      this.updateTabs()
      this.tabs.delete(tab)
    }

    updateTabs = () => {
      this.tabLabels = Array.from(this.tabs.values()).map(t => t.name)
    }
    
 
    getTabs = () => {
      this.tabs = new Map()

      // Tabs
      for(var i=0; i<this.children.length; i++){        
        const child = this.children[i] as Tab
        if (child instanceof Tab) this.tabs.set(child.name, child)
      }
      
      this.updateTabs()

      return Array.from(this.tabs.values())
    }
    
    render() {

      const tabs = this.getTabs()
      const toggles = tabs.map((t,i) => {
        if (i !== 0) t.style.display = 'none' // Hide tabs other than the first
        return t.toggle
      })

      const firstToggle = toggles[0]
      if (firstToggle) firstToggle.select(toggles)

      return html`
      <visualscript-tab-bar style="${toggles.length < 1 ? 'display: none;' : ''}">${toggles}</visualscript-tab-bar>
      <slot><div id="notabs">No Tabs Open</div></slot>
    `
    }
  }
  
  customElements.define('visualscript-tab-container', TabContainer);