import { html, css } from 'lit';
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import { DDD } from "@lrnwebcomponents/d-d-d";


export class HaxCMSParty extends DDD {

    static get tag() {
        return 'haxcms-party';
    }

    constructor() {
        super();
    }

    static get styles() {
        return css`
            
        `
    }

    render() {
        return html `
            <div class='add-members'>
                <input type='text'></input>
                <button id='add-user-btn'>Add User</button>
            </div>
            <div class='party-section'>
                <h2>Your Current Party</h2>
                <div class='party-members'>

                </div>
            </div>
            <div class='confirmation-control'>

            </div>
        `
    }

    addUser() {

    }

    static get properties() {

    }
}

globalThis.customElements.define(HaxCMSParty.tag, HaxCMSParty);