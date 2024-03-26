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
            css`
                /* https://oer.hax.psu.edu/bto108/sites/haxcellence/documentation/ddd */
                .party-showcase {
                    display: flex;
                    flex-wrap: wrap;
                }

                .to-remove {
                    opacity: 0.5
                }

                #delete-btn {
                    opacity: 1;
                    width: 95%;
                    background-color: var(--ddd-theme-default-discoveryCoral);
                    color: white;
                }

                .to-remove #delete-btn{
                    opacity: 1.5;
                    background-color: var(--ddd-theme-default-futureLime);
                    color: black;
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
                    <input type="submit" value='Add User'> <br>
                    <label for="hats">Please Select a Hat:</label><br>
                    <select name="hats" id="hat-select">
                        <option value="none">--Please Select a Hat--</option>
                        <option value="bunny">Bunny</option>
                        <option value="coffee">Coffee</option>
                        <option value="construction">Construction</option>                        
                        <option value="cowboy">Cowboy</option>
                        <option value="education">Education</option>
                        <option value="knight">Knight</option>
                        <option value="ninja">Ninja</option>
                        <option value="party">Party</option>
                        <option value="pirate">Pirate</option>
                        <option value="watermelon">Watermelon</option>
                    </select>
                </form>
            </div>
            <div class='party'>
                <h2>Your Current Party</h2>
                <div class='party-showcase'>
                    ${this.partyMembers.map((rpgCharacter) => html`
                        <div class='user-character'>
                            <rpg-character seed="${rpgCharacter.seed}" hat='${rpgCharacter.hat}' class='${rpgCharacter.seed}'></rpg-character> 
                            <p style='text-align: center' class='${rpgCharacter.seed}'>${rpgCharacter.seed}</p>
                            <button id='delete-btn' name='${rpgCharacter.seed}' @click=${this.removeUser}>Delete</button>
                        </div>
                    `)}
                </div>
            </div>
            <div class='confirmation-control'>
                <button id='save' @click=${this.saveParty}>Save</button>
                
            </div>
        `
    }

    addUser(e) { // needs to make text change to lower case
        // console.log('Add User Pressed...');
        e.preventDefault(); // prevents page refresh on form submission
        
        // const partyShowcaseSelector = document.querySelector('haxcms-party').shadowRoot.querySelector('.party .party-showcase');
        const newMemberField = document.querySelector('haxcms-party').shadowRoot.querySelector('#add-user-text');
        const hatSelection = document.querySelector('haxcms-party').shadowRoot.querySelector('#hat-select').value;
        // console.log(hatSelection);
        const memberName = newMemberField.value;

        if (memberName === '') {
            alert('Please input a name for your new party member!')
        } else {
            newMemberField.value = '';

            const rpgCharacter = {
                seed: memberName,
                hat: hatSelection,
            }
            this.partyMembers.push(rpgCharacter);
            this.requestUpdate();
        }
    }


    removeUser(e) {
        const targetClassList = e.target.parentNode.classList;
        const memberName = e.target.getAttribute('name');
        // console.log(memberName)
        
        const removeName = {
            seed: memberName,
        }

        // console.log('removeUser called...');

        if (targetClassList.contains("to-remove")) { // removes character from the deletion queue
            // console.log('removing from delete queue...')
            targetClassList.remove("to-remove");
            // console.log(targetClassList)
            const index = this.removeQueue.indexOf(removeName) + 1;
            // console.log(index)
            if (index > -1) {
                this.removeQueue.splice(index, 1);
            }
            e.target.innerText = 'Delete';
            // console.log(this.removeQueue);
        } else { // Adds character to the deletion queue
            // console.log('adding to delete queue');
            targetClassList.add("to-remove");
            e.target.innerText = 'Undo Delete';
            // console.log(targetClassList)
            this.removeQueue.push(removeName);
            this.requestUpdate();
            // console.log(this.removeQueue);
        }

    }

    saveParty() {
        console.log('Save pressed...')

        if (this.partyMembers.length <= 0) {
            alert('No party members');
        } else {
            
            /*
                Steps:
                1. use for each loop (or for loop) to remove each member from partyMembers who is also in removeQueue
                2. Confetti
            */
            this.partyMembers.forEach((i) => {
                console.log('found item in party')
                this.removeQueue.forEach((j) => {
                    console.log('found item for removal');
                    if (i === j) {
                        console.log('found similarity')
                    }
                })
            })
            alert('Saved party');
        }
        // needs to be able to to save to local storage any party member that is not part of a 'removed' class
        // could use array to store changes (maybe)???
    }

    // create a "reset" debug command, comment out when done, for testing purposes only

    static get properties() {
        return {
            ...super.properties,
            
        }
    }
}

globalThis.customElements.define(HaxCMSParty.tag, HaxCMSParty);