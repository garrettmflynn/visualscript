
import { LitElement, html, css } from 'lit';
import Prism from 'prismjs';
// window.Prism = Prism
// import 'prismjs/components/prism-c';
// import 'prismjs/components/prism-glsl';
// import "prism-themes/themes/prism-vsc-dark-plus.css"


export type CodeEditorProps = {
  value?: string
  onInput?: Function,
  onSave?: Function,
  onReset?: Function,
  onClose?: Function
}

export class CodeEditor extends LitElement {

  static get styles() {
    return css`

    
    :host {
      
      width: 100%; 
      height: 100%; 
      overflow: scroll;
      background: rgb(205,205,205);

    }

    :host * {
      box-sizing: border-box;
      
    }

    :host > * {
      overflow: hidden;
    }

    #editorContainer {
      position: relative;
       width: 100%; 
       height: 100%;
    }

    h3 {
      margin: 0;
    }

    #actions {
      display: flex; 
      align-items: center; 
      justify-content: space-between; 
      padding: 10px 25px;
      z-index: 2;
    }

  button {
      margin: 0px;
      border-radius: 0px;
      border: 1px solid rgb(35,35,35);
      padding: 0px 15px;
      font-size: 60%;
  }
  
  textarea {
      border: none;
  }
  
  #editor {
      background: transparent;
      z-index: 1;
  }
  
  
  #highlight {
      // background-color: rgba(0,0,0,0.8) !important; 
      z-index: -1 !important;
      white-space: pre !important;
      position:absolute !important;
      top: 0 !important;
      left: 0 !important;
  }
  
  #editor, #highlight {
    margin: 0px !important;
    width: 100% !important;
    height: 100% !important;
    overflow: auto !important;
    white-space: nowrap !important;
    padding: 25px !important;
    resize: none !important;
    -moz-tab-size : 4 !important;
      -o-tab-size : 4 !important;
         tab-size : 4 !important;
  }
  
  #editor, #highlight, #highlight code {
      font-size: 12px !important;
      font-family: monospace !important;
      line-height: 20pt !important;
      box-sizing: border-box !important;
  }
  
  @media (prefers-color-scheme: dark) {

    #editorContainer {
      background-color: rgb(20, 20, 20);
    }

    #editor {
      caret-color: white;
    }
  }

    `;
  }
    
    static get properties() {
      return {
        value: {
          type: String,
          reflect: true,
        },
      };
    }

    value: CodeEditorProps['value']
    onInput: CodeEditorProps['onInput']
    onSave: CodeEditorProps['onSave']
    onReset: CodeEditorProps['onReset']
    onClose: CodeEditorProps['onClose']

    textArea: HTMLTextAreaElement = document.createElement('textarea')


    constructor(props: CodeEditorProps = {}) {
      super();

      this.value = props.value ?? ''
      if (props.onInput) this.onInput = props.onInput
      if (props.onSave) this.onSave = props.onSave
      if (props.onReset) this.onReset = props.onReset
      if (props.onClose) this.onClose = props.onClose

      this.textArea.id = 'editor'
      this.textArea.spellcheck = false
      this.textArea.oninput = (ev) => {
        this.text(this.textArea.value)
        this.scroll(ev.target)
        if (this.onInput instanceof Function) this.onInput(ev)
    }

    }
    
    willUpdate(changedProps:any) {

    }

    text = (text) => {
      const highlight = this.shadowRoot.getElementById('highlight')
      if (highlight){
        const el = highlight.querySelector('code')
        let replacedText = text.replace(new RegExp("\&", "g"), "&amp").replace(new RegExp("\<", "g"), "&lt;"); // Don't Actually Create New HTML
        el.innerHTML = replacedText;
        Prism.highlightElement(el);
      }
    }

  scroll = (element) => {
    const highlight = this.shadowRoot.getElementById('highlight')
    if (highlight){
      highlight.scrollTop = element.scrollTop;
      if (highlight.scrollTop < element.scrollTop) element.scrollTop = highlight.scrollTop
      highlight.scrollLeft = element.scrollLeft;
    }
    }
  
    render() {

      const language = 'javascript'
      this.textArea.placeholder = `Write your ${language} code...`
      this.textArea.value = this.value

      return html`
      <div id='editorContainer'>
        ${this.textArea}"
          <pre id="highlight" aria-hidden="true">
            <code class="language-${language}"></code>
        </pre>
    </div>
    `
    }
  }
  
  customElements.define('visualscript-code-editor', CodeEditor);