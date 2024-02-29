import { LitElement, html, css } from 'lit';

export class WarningNotification extends LitElement {

    static get tag() {
        return 'warning-notification';
    }

    constructor() {
        super();
        this.date = '#';
        this.title = '#'
        this.text ='#';
        this.status = '#';
        this.open = true; // USE THIS FOR OPENING AND CLOSING CARDS... maybe
        this.scrolls = false;

        // local storage in here

    }

    static get styles() {
        return css`

            /* Notices */
            :host([status="notice"]) .left, :host([status="notice"]) .right, :host([status="notice"]) .notification-box{
                background-color: #cfeceb;
            }
            
            :host([status="notice"]) .middle {
                background-color: #ffffff;
                color: black;
            }

            /* Warnings */
            :host([status="warning"]) .left, :host([status="warning"]) .right, :host([status="warning"]) .notification-box{
                background-color: #bf8226;
            }
            
            :host([status='warning']) .middle {
                background-color: #ffd100;
            }

            /* Alerts */
            :host([status='alert']) .left, :host([status='alert']) .right, :host([status='alert']) .notification-box{
                background-color: #3498DB;
            }
            
            :host([status='alert']) .middle {
                background-color: #e74c3c;
                color: white;
            }

            /* All the rest of the stuff */

            :host([scrolls]) {
                position: fixed;
                display: sticky;
                z-index: 100;
                width: 100%;
                top: 0;
            }
            
            .notification-box {
                display: inline-flex;
                width: 100%; /* ??? */
                margin: 0px;
                padding: 0px;
                border-style: solid;
            }

            .left, .middle, .right {
                padding: 5px;
                 // change so background is it's own thing, then middle is it's own thing and becomes skewed
            }

            .unskew {
                transform: skew(-20deg);
            }
            
            .left, .right { 
                display: flex;
                align-items: center;
                width: 25%
            }

            .middle {
                width: 50%;
                padding: 16px;
                transform: skew(20deg);
            }
        `
    }

    render() {
        return html `
            <div class='notification-box'>
                <div class='left' style='width: 20%'>
                    <h1 class="hideable">${this.date}</h1>
                </div>
                <div class="middle"> 
                    <h2 class="unskew">${this.title}</h2>
                    <slot><h4 class="hideable unskew">${this.text}</h4></slot>
                </div>    
                <div class="right">
                    <button id=close-btn @click=${this.openClose}>Open / Close Notification</button>
                </div>
            </div>
        `
    }
    
    openClose() {
        console.log('current state: ' + this.open)
        this.open = !this.open
        console.log(this.open)
    }

    static get properties() {
        return {
            date: { type: String},
            title: { type: String},
            text: { type: String},
            status: { type: String },
            open: { type: Boolean },
            sticky: {type: Boolean},
        };
    }
}

globalThis.customElements.define(WarningNotification.tag, WarningNotification);