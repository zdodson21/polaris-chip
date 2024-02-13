import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {

    static get tag() {
        return 'counter-app';
    }

    constructor() {
        super();
        this.counter = 15;
        this.min = 10;
        this.max = 25;
    }

    static get styles() {
        return css`
            :host {
                display: block;
            }


        `;
    }

    render() {
        return html `

        `;
    }

    static get properties() {
        return {
            counter: { type: int },
            min: { type: int},
            max: { type: int},
        };
    }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);