import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import { css, html } from 'lit';


/**
 * https://github.com/elmsln/issues/issues/1950
 * @author {Zach Dodson}
 */

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
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

                /*               
                CSS is based around variables / standards of 'Design, Develop, Destroy' (DDD). Styleguide for DDD can be found at the link below

                https://oer.hax.psu.edu/bto108/sites/haxcellence/documentation/ddd 
                */
                :host {
                    font-family: "Press Start 2P", var(--ddd-font-primary);
                }
                
                .haxcms-party-container {
                    border: var(--ddd-border-md);
                    border-color: black;
                    padding: var(--ddd-spacing-2);
                    /* set width using @media */
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

                .party {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .party-showcase {
                    max-width: 575px;
                    /* min-width: 0px; */
                    display: flex;
                    flex: 1;
                    justify-content: center;
                    flex-wrap: wrap;
                    padding: var(--ddd-spacing-2);
                    overflow-y: auto; /* For some reason does not work??? */
                }

                .border {
                    border-style: solid;
                }

                .user-character {
                    display: flex;
                    justify-content: center;
                    width: 115px;
                    flex-wrap: wrap;
                    flex-direction: column;
                }

                .confirmation-control {
                    display: flex;
                    justify-content: center;
                }

                .to-remove {
                    opacity: 0.5;
                }

                .delete-btn {
                    opacity: 1;
                    width: 95%;
                    background-color: var(--ddd-theme-default-discoveryCoral);
                    color: white;
                }

                .to-remove .delete-btn {
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
            <div class='haxcms-party-container'>
                <div class='add-members'>
                    <h2 style='text-align: center;'>Add Members</h2>
                    <form class='add-input' @submit=${this.addUser}>
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
                    <confetti-container id='confetti'>
                        <div class='party-showcase'>
                            ${this.partyMembers.map((rpgCharacter) => html`
                                <div class='user-character'>
                                    <rpg-character seed="${rpgCharacter.seed}" hat='${rpgCharacter.hat}' id='rpg-${rpgCharacter.id}' class='${rpgCharacter.seed}'></rpg-character> 
                                    <p style='text-align: center' class='${rpgCharacter.seed}'>${rpgCharacter.seed}</p>
                                    <button class='delete-btn' rpgID='${rpgCharacter.id}' @click=${this.removeUser}>Delete</button>
                                </div>
                            `)}
                        </div>
                    </confetti-container>
                </div>
                <div class='confirmation-control'>
                    <button id='save' style='margin-top: var(--ddd-spacing-2);' @click=${this.saveParty}>Save</button>
                </div>
            </div>
        `
    }


    /**
     * Pulls the value from the text input box, which is used to name the character and adds it to partyMembers[]
     */
    addUser(e) {
        e.preventDefault(); // prevents page refresh on form submission
        
        const newMemberField = this.shadowRoot.querySelector('#add-user-text');
        const hatSelection = this.shadowRoot.querySelector('#hat-select').value;
        const memberName = newMemberField.value.toLowerCase(); // TODO change to regex
        let similarName = false;

        this.partyMembers.forEach((i) => {
            // console.log('checking similarities')
            if (memberName == i.seed) {
                // console.log('found similarity')
                similarName = true;
            }
        })

        if (memberName === '') {
            alert('Please input a name for your new party member!');
        } else if (memberName.length > 10) {
            alert('Please shorten your member name to be less than 10 characters!');
        } else if (similarName === true) {
            alert('Party member already exists!');
            newMemberField.value = '';
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
        this.rpgId++;
        this.borderController();
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
        if (this.partyMembers.length <= 0) {
            alert('No party members!');
        } else {
            for (let i = 0; i < this.removeQueue.length; i++) {
                for (let j = 0; j < this.partyMembers.length; j++) {
                    if (this.partyMembers[j].id == this.removeQueue[i].id) {
                        this.partyMembers.splice(j, 1);
                        this.requestUpdate();
                    }
                }
            }

            if (this.removeQueue.length > 0) {
                this.removeQueue.length = 0;
            }


            if (this.partyMembers.length > 0) {
                this.makeItRain();
            }
            
            this.formatFixer();
            this.borderController();
            console.log(this.partyMembers);
        }
    }

    makeItRain() {
        // console.log('makeItRain() called...')
        import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
          (module) => {
            // console.log('module')
            // This is a minor timing 'hack'. We know the code library above will import prior to this running
            // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
            // this "hack" ensures the element has had time to process in the DOM so that when we set popped
            // it's listening for changes so it can react
            setTimeout(() => {
                // console.log('timeout')
              // forcibly set the poppped attribute on something with id confetti
              // while I've said in general NOT to do this, the confetti container element will reset this
              // after the animation runs so it's a simple way to generate the effect over and over again
              this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
            }, 0);
          }
        );
      }

    formatFixer() {
        const fixClassList = this.shadowRoot.querySelectorAll('.user-character');
        const fixButtonText = this.shadowRoot.querySelectorAll('.delete-btn');

        fixClassList.forEach((element) => {
            if (element.classList.contains('to-remove')) {
                element.classList.remove('to-remove');
            }
        })

        fixButtonText.forEach((element) => {
            element.innerText = 'Delete';
        })
    }

    borderController() {
        const showcase = this.shadowRoot.querySelector('.party-showcase');
        
        if (this.partyMembers.length === 0) {
            showcase.classList.remove('border');
        } else {
            showcase.classList.add('border');
        }
    }

    static get properties() {
        return {
            ...super.properties,
            
        }
    }
}

globalThis.customElements.define(HaxCMSParty.tag, HaxCMSParty);