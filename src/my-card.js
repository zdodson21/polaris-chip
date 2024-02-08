import { LitElement, html, css } from 'lit';

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
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }

      div {
        background-color: turquoise;
        width: 400px;
        text-align: center;
        margin: 5px;
      }

      div img {
        width: 200px;
      }

    `;
  }

  render() {
    return html`<div><h1 class="card-header">${this.header}</h1>  <p>${this.text}</p>  <img src="${this.meme}" alt="This is a meme"> <br> <a href="${this.buttonLink}" target="_blank" rel="noopener noreferrer"><button>${this.buttonText}</button></a></div>`;
  }

  static get properties() {
    return {
      header: { type: String },
      text:  { type: String},
      meme:  { type: String},
      buttonText: { type: String, attribute: 'button-text'},
      buttonLink: { type: String, attribute: 'button-link'},
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
