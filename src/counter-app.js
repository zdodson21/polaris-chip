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
                width: 400px;
                background-color: #121212;
                color: white;
            }
            
            .buttons {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 100%;
            }

            .btn {
                font-size: 48px;
                width: 60px;
                height: 60px;
                margin-bottom: 15px;
            }
        `;
    }

    render() {
        return html `
            <h2 style='text-align: center; font-size: 60px;'>Counter</h2>
            <p style='text-align: center; font-size: 48px;'>${this.counter}</p>
            <div class='buttons'>
                <button class='btn' id='minus' style='margin-right: 15px;'>-</button> 
                <button class='btn' id='plus' style='margin-left: 15px;'>+</button>
            </div>
        `;
    }

    static get properties() {
        return {
            counter: { type: Number },
            min: { type: Number },
            max: { type: Number },
        };
    }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);

// button logic???

document.querySelector('#minus').addEventListener('click', (e) => {
    console.log('minus pressed');
})