import { html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";



export class HaxCMSParty extends DDD {

    static get tag() {
        return 'haxcms-party';
    }

    constructor() {
        super();

    }

    static get styles() {
        return [
            super.styles,
            css`
            
            `
        ]
    }

    render() {
        return html `
            <div class='add-members'>
                <h2>Add Members</h2>
                <div class='add-input'>
                    <input type='text'></input>
                    <button id='add-user-btn'>Add User</button>
                </div>
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
        return {
            ...super.properties,
            
        }
    }
}

globalThis.customElements.define(HaxCMSParty.tag, HaxCMSParty);