import { html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";



export class HaxCMSParty extends DDD {

    static get tag() {
        return 'haxcms-party';
    }

    constructor() {
        super();
        this.partyMembers = [];
        this.removeQueue = [];
    }

    static get styles() {
        return [
            super.styles,
            css `
                .party-showcase {
                    display: flex;
                    flex-wrap: wrap;
                }

                .to-remove {
                    opacity: 0.5
                }

                .remove-character {
                    opacity: 1;
                }
            `
        ]
    }

    render() {
        return html `
            <div class='add-members'>
                <h2>Add Members</h2>
                <form class='add-input' @submit=${this.addUser}> <!-- User will input a name for their party member, which will go through addUser() to generate a character -->
                    <label for="character-name">Party Member Name:</label><br>
                    <input type='text' name='character-name' placeholder='Type Name Here...' id='add-user-text'/>
                    <!-- <button id='add-user-btn' @click=${this.addUser}>Add User</button> -->
                    <input type="submit" value='Add User'>
                </form>
            </div>
            <div class='party'>
                <h2>Your Current Party</h2>
                <div class='party-showcase'>
                    ${this.partyMembers.map((rpgCharacter) => html`
                        <div class='user-character'>
                            <rpg-character seed="${rpgCharacter.seed}"></rpg-character>
                            <button class='remove-character' style='opacity: 1' onclick='parentNode.classList.add("to-remove"); this.removeQueue.push("${rpgCharacter}");'>X</button>
                            <p>${rpgCharacter.seed}</p>
                        </div>
                    `)}
                </div>
            </div>
            <div class='confirmation-control'>
                <button id='save' @click=${this.saveParty}>Save</button>
                <button id='cancel' @click=${this.cancelChanges}>Cancel</button>
            </div>
        `
    }

    addUser(e) {
        // console.log('Add User Pressed...');
        e.preventDefault(); // prevents page refresh on form submission
        
        const partyShowcaseSelector = document.querySelector('haxcms-party').shadowRoot.querySelector('.party .party-showcase');
        const newMemberField = document.querySelector('haxcms-party').shadowRoot.querySelector('#add-user-text');
        const memberName = newMemberField.value;

        if (memberName === '') {
            alert('Please input a name for your new party member!')
        } else {
            newMemberField.value = '';

            const rpgCharacter = {
                seed: memberName,
            }
            this.partyMembers.push(rpgCharacter);
            this.requestUpdate();
        }
    }

    // removeUser() {
    //     parentNode.remove
    // }

    saveParty() {
        console.log('Save pressed...')
        // needs to be able to to save to local storage any party member that is not part of a 'removed' class
        // could use array to store changes (maybe)???
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