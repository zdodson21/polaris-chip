import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {

    static get tag() {
        return 'counter-app';
    }

    constructor() {

    }

    static get styles() {
        return css`

        `;
    }

    render() {
        return html ``;
    }

    static get properties() {
            
    }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);