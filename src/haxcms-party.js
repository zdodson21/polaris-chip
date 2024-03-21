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
                <form class='add-input' @submit=${this.addUser}> <!-- User will input a name for their party member, which will go through addUser() to generate a character -->
                    <label for="character-name">Party Member Name:</label><br>
                    <input type='text' name='character-name' id='add-user-text'/>
                    <!-- <button id='add-user-btn' @click=${this.addUser}>Add User</button> -->
                    <input type="submit" value='Add User'>
                </form>
            </div>
            <div class='party'>
                <h2>Your Current Party</h2>
                <div class='party-showcase'> <!-- This section will be a showcase of the 'party members', users can also remove party members -->

                </div>
            </div>
            <div class='confirmation-control'>
                <button id='save' @click=${this.saveParty}>Save</button>
                <button id='cancel' @click=${this.cancelChanges}>Cancel</button>
            </div>
        `
    }

    addUser(e) {
        /* 
        TODO:
            3. Create tag for new rpg-character, assign 'seed' attribute to the value of newPartyMember
            4. Add button (or image if I have it) that can be used to to remove party member (fades sprite (again, if possible))
        */
        e.preventDefault();
        console.log('Add User Pressed...');
        const partyShowcaseSelector = document.querySelector('haxcms-party').shadowRoot.querySelector('.party .party-showcase');
        let newMemberField = document.querySelector('haxcms-party').shadowRoot.querySelector('#add-user-text');
        let memberName = newMemberField.value;

        if (memberName === '') {
            alert('Please input a name for your new party member!')
        } else {
            // start process of adding character to party (instructions above)
            newMemberField.value = '';
            console.log(memberName);
        }
    }

    saveParty() {
        console.log('Save pressed...')
        // in this case, hopefully can get this to work with local storage
    }

    cancelChanges() {
        console.log('Cancel pressed...')
        // refreshing the page would be a quick option to cancel changes???
        // is canceling even really needed???
    }

    static get properties() {
        return {
            ...super.properties,
            
        }
    }
}

globalThis.customElements.define(HaxCMSParty.tag, HaxCMSParty);