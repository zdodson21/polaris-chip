import { LitElement, html, css } from 'lit';

export class WarningNotification extends LitElement {

    static get tag() {
        return 'warning-notification';
    }

    constructor() {
        super();
        this.topic = '#' // used to determine which card is being called
        this.date = '#';
        this.text ='#'; // don't know if need this or can implement some other way
        this.notice = true; //want to make it so user will set this value to true or false in HTML for notice, warning, and alert. need to figure out code
        /* 
        Side Color = 
        */
        this.warning = false;
        /*
            Side Color = background-color: #bf8226; color: #ffffff;
            Middle Color = background-color: #ffd100; color: #000321;
        */
        this.alert = false;
        
    }

    static get styles() {
        return css`
            .notification-box {
                display: inline-flex;
                width: 106%; /* ??? */
                margin: 0px;
                padding: 0px;
            }
            
            .left, .right { /* Will end up removing */
                background-color: #bf8226;
                width: 25%;
                color: #ffffff;
            }

            .middle {
                background-color: #ffd100;
                width: 50%;
                color: #000321;
            }
        `
    }

    render() {
        return html `
            <div class='notification-box'>
                <div class='left' style='width: 20%'>
                    <h1>${this.date}</h1>
                </div>
                <div class="middle"> 
                    <p>${this.text}</p>
                </div>    
                <div class="right">
                    <p>Close Warning</p>
                </div>
            </div>
        `
    }

    warningColor() { // I don't think this will work since I won't have a button to call it
        const warningSelector = document.querySelector('[name=' + CSS.escape(this.topic) + ']').shadowRoot.querySelector('.notification-box')
        
        if (this.notice) {
            warningSelector.classList.add('notice')
        }
        else if (this.warning) {

        }
        else if (this.warning) {

        }

    }

    static get properties() {
        return {
            topic: {type: String},
            date: { type: String},
            text: { type: String},
            notice: { type: Boolean },
            warning: { type: Boolean},
            alert: { type: Boolean},
        };
    }
}

globalThis.customElements.define(WarningNotification.tag, WarningNotification);