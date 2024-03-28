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
        this.rpgId = 0;
    }

    static get styles() {
        return [
            super.styles,
            css`
                /* https://oer.hax.psu.edu/bto108/sites/haxcellence/documentation/ddd */
                :host {
                    font-family: var(--ddd-font-primary)
                }
                
                .add-input {
                    text-align: center;
                    
                }

                .select-hat {
                    margin-top: var(--ddd-spacing-2);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
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

                h2 {
                    text-align: center;
                }

            `
        ]
    }

    render() {
        return html `
            <div class='add-members'>
                <h2 style='text-align: center;'>Add Members</h2>
                <form class='add-input' @submit=${this.addUser}> <!-- User will input a name for their party member, which will go through addUser() to generate a character -->
                    <div class='add-party-member'>
                        <label for="character-name">Party Member Name:</label><br>
                        <input type='text' name='character-name' placeholder='Type Name Here...' id='add-user-text'/>
                        <input type="submit" value='Add User'> <br>
                    </div>
                    <div class='select-hat'>
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
                    </div>
                </form>
            </div>
            <div class='party'>
                <h2>Your Current Party</h2>
                <div class='party-showcase'>
                    ${this.partyMembers.map((rpgCharacter) => html`
                        <div class='user-character'>
                            <rpg-character seed="${rpgCharacter.seed}" hat='${rpgCharacter.hat}' id='rpg-${rpgCharacter.id}' class='${rpgCharacter.seed}'></rpg-character> 
                            <p style='text-align: center' class='${rpgCharacter.seed}'>${rpgCharacter.seed}</p>
                            <button id='delete-btn' rpgID='${rpgCharacter.id}' @click=${this.removeUser}>Delete</button>
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
        const memberName = newMemberField.value.toLowerCase();

        if (memberName === '') {
            alert('Please input a name for your new party member!')
        } else if (memberName.length > 10) {
            alert('Please shorten your member name to be less than 10 characters!')
        } else {
            newMemberField.value = '';

            const rpgCharacter = {
                seed: memberName,
                hat: hatSelection,
                id: this.rpgId,
            }
            this.partyMembers.push(rpgCharacter);
            this.requestUpdate();
        }
        this.rpgId += 1;
    }


    removeUser(e) {
        const targetClassList = e.target.parentNode.classList;
        const rpgID = e.target.getAttribute('rpgID');
        // console.log(memberName)
        
        const removeID = {
            id: rpgID
        }

        // console.log('removeUser called...');

        if (targetClassList.contains("to-remove")) { // removes character from the deletion queue
            // console.log('removing from delete queue...')
            targetClassList.remove("to-remove");
            // console.log(targetClassList)
            const index = this.removeQueue.indexOf(removeID) + 1;
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
            this.removeQueue.push(removeID);
            this.requestUpdate();
            // console.log(this.removeQueue);
        }

    }

    saveParty() {
        console.log('Save pressed...')

        let minusTrigger = false;

        if (this.partyMembers.length <= 0) {
            alert('No party members');
        } else {
            
            /*
                Steps:
                1. use for each loop (or for loop) to remove each member from partyMembers who is also in removeQueue
                2. Confetti
            */
            this.partyMembers.forEach((i) => {
                console.log('found item in party');
                console.log(i);
                console.log('Element ID: ' + i.id);
                this.removeQueue.forEach((j) => {
                    console.log('found item for removal');
                    console.log(j);
                    if (i.id == j.id) {
                        console.log('deleting partyMember.id: ' + i.id + ' & removeQueue.id: ' + j.id)
                        this.partyMembers.splice(j.id, 1);
                        this.removeQueue.splice(j.id, 1)
                        // bug: removes first applicable ID, but because array shifts it then removes 'incorrect' ID
                        minusTrigger = true;
                        this.requestUpdate();
                        if (minusTrigger === true) {
                            console.log('trigger tripped...');
                            i--;
                            minusTrigger = false;
                        }
                    }
                    // need to compare rpgIDs and go from there for deletion
                })
                
            })
            
            if (this.removeQueue.lengh > 0) {
                this.removeQueue.length = 0;
            }
            // alert('Saved party');
        }

        document.querySelector('haxcms-party').shadowRoot.querySelectorAll('#delete-btn').classList.remove('to-remove'); //need to figure out how to make this work
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