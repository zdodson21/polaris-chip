import { LitElement, html, css } from 'lit';

export class WarningNotification extends LitElement {

    static get tag() {
        return 'warning-notification';
    }

    constructor() {
        super();
        this.date = '#';
        this.text ='#'; // don't know if need this or can implement some other way
        this.status = '#';
        this.open = true;
        this.scrolls = false;
    }

    static get styles() {
        return css`
            
            /* Generic */
            :host .left, :host .right {
                background-color: burlywood;
            }
            
            :host .middle {
                background-color: green;
            }
            
            /* Notices */
            :host([status="notice"]) .left, :host([status="notice"]) .right{
                background-color: #cfeceb;
            }
            
            :host([status="notice"]) .middle {
                background-color: #ffffff;
                color: black;
            }

            /* Warnings */
            :host([status="warning"]) .left, :host([status="warning"]) .right {
                background-color: #bf8226;
            }
            
            :host([status='warning']) .middle {
                background-color: #ffd100;
            }

            /* Alerts */
            :host([status='alert']) .left, :host([status='alert']) .right {
                background-color: #e7a23c;
            }
            
            :host([status='alert']) .middle {
                background-color: #e74c3c;
                color: white;
            }

            :host([scrolls]) {
                position: fixed;
                display: inline-flex;
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
            }
            
            .left, .right {
                display: flex;
                align-items: center;
                width: 25%
            }

            .middle {
                width: 50%;
            }

            .notice-middle {
                background-color: blue;
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
                    <h4>${this.text}</h4>
                </div>    
                <div class="right">
                    <button id=close-btn>Close Notification</button>
                </div>
            </div>
        `
    }
    

    static get properties() {
        return {
            date: { type: String},
            text: { type: String},
            status: { type: String },
            open: { type: Boolean },
            sticky: {type: Boolean},
        };
    }
}

globalThis.customElements.define(WarningNotification.tag, WarningNotification);