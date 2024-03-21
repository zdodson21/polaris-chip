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
            css `
            
            `
        ]
    }

    render() {
        return html `
            <div class='add-members'>
                <h2>Add Members</h2>
                <form class='add-input'> <!-- User will input a name for their party member, which will go through addUser() to generate a character -->
                    <input type='text' id='add-user-text'></input>
                    <button id='add-user-btn' @click=${this.addUser}>Add User</button>
                </form>
            </div>
            <div class='party'>
                <h2>Your Current Party</h2>
                <div class='party-showcase'> <!-- This section will be a showcase of the 'party members', users can also remove party members -->

                </div>
            </div>
            <div class='confirmation-control'>
                <button id='save'>Save</button>
                <button id='cancel'>Cancel</button>
            </div>
        `
    }

    // add script for pressing enter when input box, pressing enter does same as clicking 'Add user' button (may have to use script tag above)
    // https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
    

    addUser() {
        /* 
        TODO:
            
            2. Clear name from text input
            3. Create tag for new rpg-character, assign 'seed' attribute to the value of newPartyMember
            4. Add button (or image if I have it) that can be used to to remove party member (fades sprite (again, if possible))
        */
        const partyShowcaseSelect = document.querySelector('haxcms-party').shadowRoot.querySelector('.party .party-showcase');
        let newPartyMember = document.querySelector('haxcms-party').shadowRoot.querySelector('#add-user-text').value;
        console.log(newPartyMember);

        
    }

    static get properties() {
        return {
            ...super.properties,
            
        }
    }
}

globalThis.customElements.define(HaxCMSParty.tag, HaxCMSParty);