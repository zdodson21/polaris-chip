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
            .change-18 {
                background-color: blue;
            }
            
            

            /* When we hit 21 on the counter, the color of the number should change */



            /* When we hit min or max the color fo the number should change */



        `;
    }

    render() {
        return html `
            <confetti-container id="confetti">
                <h2 style='text-align: center; font-size: 72px;'>${this.name}</h2>
                <p style='text-align: center; font-size: 60px;'>${this.counter}</p>
                <div class='buttons'>
                    <button @click=${this.minusButton} class='btn' id='minus' style='margin-right: 16px;' ?disabled="${this.min === this.counter}">-</button> 
                    <button @click=${this.plusButton} class='btn' id='plus' style='margin-left: 16px;' ?disabled="${this.max === this.counter}">+</button>
                </div>
            </confetti-container>
        `;
    }

    minusButton() {
        // console.log('minus pressed. counter = ' + this.counter);
        if (this.counter > this.min) {
            this.counter--;
        }
        this.colorCheck()
    }

    plusButton() {
        // console.log('plus pressed. counter = ' + this.counter);
        if (this.counter < this.max) {
            this.counter++;
        }
        this.colorCheck(this.id)
    }

    colorCheck() {        
        // console.log('color checking...')
        // this.updated(this.counter);

        // Get the name attribute from the HTML tag, if it is equal to counterName, then proceed

        const counterName = this.name;
        const tagName = document.querySelector('counter-app').getAttribute('name'); // THIS IS THE PART TO FIGURE OUT!!!

        console.log(counterName);
        console.log(tagName);

        if (this.counter === 18 && this.name === this.name) {
            
            
        } else if (this.counter === 21) {
            
        } else if (this.counter === this.max || this.counter === this.min) {

        }
    }

    // updated(changedProperties) {
    //     console.log(changedProperties);
    //     if (changedProperties.has('counter') === 21) {
    //       this.makeItRain;
    //     }
    // }
      
    // makeItRain() {
    //     // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    //     // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    //     // will only run AFTER the code is imported and available to us
    //     import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
    //         (module) => {
    //         // This is a minor timing 'hack'. We know the code library above will import prior to this running
    //         // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
    //         // this "hack" ensures the element has had time to process in the DOM so that when we set popped
    //         // it's listening for changes so it can react
    //         setTimeout(() => {
    //             // forcibly set the poppped attribute on something with id confetti
    //             // while I've said in general NOT to do this, the confetti container element will reset this
    //             // after the animation runs so it's a simple way to generate the effect over and over again
    //             this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
    //         }, 0);
    //         }
    //     );
    // }

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