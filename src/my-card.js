import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.header = "My Card";
    this.text = "This is filler text"
    this.meme = "#"
    this.buttonText = "Button"
    this.buttonLink = "#"
    this.description = "Default Description"
    this.fancy = false;
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }

      :host([fancy]) {
        display: block;
        background-color: pink;
        border: 2px solid fuchsia;
        box-shadow: 10px 5px 5px red;
      }

      div div {
        width: 300px;
        margin-left: 0px;
        margin-right: 0px;
      }

      details summary {
        text-align: left;
        font-size: 20px;
        padding: 8px 0;
        width: 300px;
      }

      details[open] summary {
        font-weight: bold;
        
      }
  
      details div {
        border: 2px solid black;
        text-align: left;
        padding: 8px;
        height: 70px;
        overflow: auto;
        width: 300px;
      }

      .whole-card {
        background-color: turquoise;
        width: 400px;
        text-align: center;
        margin: 5px;
      }

      div img {
        width: 200px;
      }

      .change-color {
        background-color: orange;
      }
    `;
  }

  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  render() {
    return html`
      <div class='whole-card'>
        <h1 class="card-header">${this.header}</h1>  
        <p>${this.text}</p>  
        <meme-maker></meme-maker>
         <br> 
        <a href="${this.buttonLink}" target="_blank" rel="noopener noreferrer">
          <button>${this.buttonText}</button>
        </a>
        <div>
          <details ?open="${this.fancy}" @toggle="${this.openChanged}">
            <summary>Description</summary>
            <div>
              <slot>${this.description}</slot>
            </div>
          </details>
        </div>
      </div>`;
  }

  static get properties() {
    return {
      header: { type: String },
      text:  { type: String},
      meme:  { type: String},
      buttonText: { type: String, attribute: 'button-text'},
      buttonLink: { type: String, attribute: 'button-link'},
      description: { type: String },
      fancy: { type: Boolean, reflect: true },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
