import { LitElement, html, css } from 'lit';


type MenuItem = {
  text: string;
  onclick: (e:any) => any
}


type Response = {
  condition: (target: HTMLElement) => boolean
  contents: (ev: MouseEvent) => MenuItem[];
}

export interface ContextMenuProps {
}


// Is automatically instantiated globally on import
export class ContextMenu extends LitElement {

  static get styles() {
    return css`

  :host { 
    border-radius: 10px;
    box-shadow: 0 1px 5px 0 rgb(0 0 0 / 20%);

    position:absolute; 
    display:none; 
    z-index: 10000;
  }
  
   ul, li {
      list-style:none;
      margin:0; padding:0;
      background:white;
  }
  
   li { 
    cursor: pointer;
    border-bottom:solid 1px #CCC; 
    padding: 5px 10px;
  }
  
   li:last-child { border:none; }

   li:hover {
    background: #EEE;
   }

    @media (prefers-color-scheme: dark) {

      ul, li {
        background:black;
      }
    }

    `;
  }
    
    static get properties() {
      return {

      };
    }

    list = document.createElement('ul')
    responses: Map<string,Response> = new Map()

    constructor(props: ContextMenuProps = {}) {
      super();
    }

    onClick = () => {
      this.style.display = 'none';
    }

    set = (id, info:Response) => this.responses.set(id, info)

    delete = (id) => this.responses.delete(id)

    onContextMenu = (e) => {
      
        const selected = e.path[0]
        // console.log(selected)

        this.responses.forEach((o) => {
          // console.log(o, o.condition(selected))

          const isMatch = o.condition(selected)
          if (isMatch) {
            e.preventDefault();

            // Correct for Parent Window Offset
            let parent = (this.parentNode as any)
            if (parent.host) parent = parent.host // LitElement correction
            var rect = parent.getBoundingClientRect()
            this.style.left = e.pageX - rect.left + 'px'
            this.style.top = e.pageY - rect.top + 'px'
            this.style.display = 'block'
            const list = o.contents(e) ?? []
            
            this.list.innerHTML = ''
            
            list.forEach(item => {
              const li = document.createElement('li')
              li.innerHTML = item.text
              li.onclick = item.onclick
              this.list.appendChild(li)
            })
          }
        })
    }

    updated = () => {

      /** close the right click context menu on click */
      window.addEventListener('click', this.onClick)

      /** 
       present the right click context menu ONLY for the elements having the right class
      */
      window.addEventListener('contextmenu', this.onContextMenu)


    }
  
    render() {
      return this.list
    }
  }
  
  customElements.get('visualscript-context-menu') || customElements.define('visualscript-context-menu',  ContextMenu);