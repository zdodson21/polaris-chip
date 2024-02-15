import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {

    static get tag() {
        return 'counter-app';
    }

    constructor() {
        super();
        this.name = 'Counter App';
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

            .btn:hover, .btn:focus {
                background-color: yellow;
            }

            /* When we hit 18 the on the counter the color should change */

            

            /* When we hit 21 on the counter, the color of the number should change */



            /* When we hit min or max the color fo the number should change */



        `;
    }

    render() {
        return html `
            <h2 style='text-align: center; font-size: 72px;'>${this.name}</h2>
            <p style='text-align: center; font-size: 60px;'>${this.counter}</p>
            <div class='buttons'>
                <button @click=${this.minusButton} class='btn' id='minus' style='margin-right: 16px;' ?disabled="${this.min === this.counter}">-</button> 
                <button @click=${this.plusButton} class='btn' id='plus' style='margin-left: 16px;' ?disabled="${this.max === this.counter}">+</button>
            </div>
        `;
    }

    minusButton() {
        console.log('minus pressed. counter = ' + this.counter);
        if (this.counter > this.min) {
            this.counter--;
        }
        
    }

    plusButton() {
        console.log('plus pressed. counter = ' + this.counter);
        if (this.counter < this.max) {
            this.counter++;
        }
    }

    static get properties() {
        return {
            name: { type: String },
            counter: { type: Number },
            min: { type: Number },
            max: { type: Number },
        };
    }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);

// button logic???

// document.querySelector('#minus').addEventListener('click', (e) => {
//     console.log('minus pressed');
// })