import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import { css, html } from 'lit';


/**
 * https://github.com/elmsln/issues/issues/1950
 * @author {Zach Dodson}
 */

export class HaxCMSParty extends DDD {

    static get tag() {
        return 'haxcms-party-ui';
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
                /*               
                CSS is based around variables / standards of 'Design, Develop, Destroy' (DDD). Styleguide for DDD can be found at the link below:

                https://oer.hax.psu.edu/bto108/sites/haxcellence/documentation/ddd 
                */
                :host {
                    font-family: "Press Start 2P", var(--ddd-font-primary);
                }
                
                .haxcms-party-container {
                    border: var(--ddd-border-md);
                    border-color: var(--ddd-theme-default-potentialMidnight);
                    padding: var(--ddd-spacing-2);
                    background-color: var(--simple-colors-default-theme-grey-2);

                }

                .details-container {
                    display: flex;
                    justify-content: center;
                }

                .rules {
                    width: 50%;
                    border: var(--ddd-border-md);
                    padding: var(--ddd-spacing-2);
                    border-color: var(--ddd-theme-default-potentialMidnight);
                    text-align: center;
                    border-radius: var(--ddd-radius-md);
                    background-color: var(--ddd-theme-default-limestoneMaxLight);
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
                    max-width: 664px;
                    /* min-width: 0px; */
                    display: flex;
                    flex: 1;
                    justify-content: center;
                    flex-wrap: wrap;
                    padding: var(--ddd-spacing-2);
                    overflow-y: auto; /* For some reason does not work??? */
                    max-height: 524px;
                }

                .border {
                    border: var(--ddd-border-md);
                    border-color: var(--ddd-theme-default-potentialMidnight);
                }

                .user-character {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    max-width: 200px;
                    min-width: 140px;
                    flex-wrap: wrap;
                    flex-direction: column;
                    border: var(--ddd-border-md);
                    margin: var(--ddd-spacing-1) var(--ddd-spacing-1);
                    padding: var(--ddd-spacing-1);

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
                    color: var(--ddd-theme-default-white);
                    font-size: 11px;
                    height: 24px;
                }

                .to-remove .delete-btn {
                    opacity: 1 !important; 
                    background-color: var(--ddd-theme-default-futureLime);
                    color: var(--ddd-theme-default-potentialMidnight);
                }

                h2 {
                    text-align: center;
                    font-family: "Press Start 2P", var(--ddd-font-primary);
                    font-size: 24px;
                    text-decoration: underline;
                }

                button, input, select {
                    font-family: "Press Start 2P", var(--ddd-font-primary);
                    font-size: 16px;
                }

                rpg-character {
                    max-width: 142px;
                }

            `
        ]
    }

    render() {
        return html `
            <div class='haxcms-party-container'>
                <confetti-container id='confetti'>
                    <div class='add-members'>
                        <h2 style='text-align: center;'>Add Members</h2>
                        <div class='details-container'>
                            <details class='rules'>
                                <summary>Naming Rules</summary>
                                <p>Names must consist of <u>lowercase letters</u> and <u>numbers</u>!</p>
                            </details>
                        </div>
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
                            <h2 class='party-members-header'>No Party Members</h2>
                            
                                <div class='party-showcase'>
                                    ${this.partyMembers.map((rpgCharacter) => html`
                                        <div class='user-character'>
                                            <rpg-character seed="${rpgCharacter.seed}" hat='${rpgCharacter.hat}' id='rpg-${rpgCharacter.id}' class='${rpgCharacter.seed}' alt='A user generated rpg character named ${rpgCharacter.seed}'></rpg-character> 
                                            <p style='text-align: center' class='${rpgCharacter.seed}'>${rpgCharacter.seed}</p>
                                            <button style='opacity: 1;' class='delete-btn' rpgID='${rpgCharacter.id}' @click=${this.removeUser}>Delete</button>
                                        </div>
                                    `)}
                                </div>
                            
                        </div>
                    <div class='confirmation-control'>
                        <button id='save' style='margin-top: var(--ddd-spacing-2);' @click=${this.saveParty}>Save Members to Party</button>
                    </div>
                </confetti-container>
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
        const memberName = newMemberField.value.toLowerCase();
        const regex = /^[a-z0-9]+$/;
        let similarName = false;

        this.partyMembers.forEach((i) => {
            // console.log('checking similarities')
            if (memberName == i.seed) {
                // console.log('found similarity')
                similarName = true;
            }
        })

        if (memberName === '') { // Empty Input
            alert('Please input a name for your new party member!');
        } else if (memberName.length > 10) { // Input greater than 10 characters
            alert('Please shorten your member name to be less than 10 characters!');
        } else if (similarName === true) { // Name already exists
            alert('Party member already exists!');
            newMemberField.value = '';
        } else if (regex.test(memberName)) { // Correct name, passes restrictions
            newMemberField.value = '';

            const rpgCharacter = {
                seed: memberName,
                hat: hatSelection,
                id: this.rpgId,
            }
            this.partyMembers.push(rpgCharacter);
            this.requestUpdate();
        } else { // Name does not pass restrictions
            alert('Please use only lowercase letters and numbers. Spaces and special characters are not allowed!');
            newMemberField.value = '';
        }

        this.rpgId++;
        this.borderController();
    }

    /**
     * Adds or removes the target partyMember to the removeQueue[], characters are not deleted here
     */
    removeUser(e) {
        const targetClassList = e.target.parentNode.classList;
        const rpgID = e.target.getAttribute('rpgID');
        // console.log(memberName)
        
        const removeID = {
            id: rpgID,
        }

        // console.log('removeUser called...');

        if (targetClassList.contains("to-remove")) { // removes character from the deletion queue
            // console.log('removing from delete queue...')
            targetClassList.remove("to-remove");
            // console.log(targetClassList)
            const index = this.removeQueue.findIndex((object) => {
                return object.id === rpgID;
            });
            console.log('Index: ' + index); // always outputting 'Index 0'
            if (index > -1) {
                this.removeQueue.splice(index, 1); // always deleting first index for some reason
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
        console.log(this.removeQueue)

    }

    /**
     * Deletes objects in partyMembers[] who have the same 'rpgID' as the objects in removeQueue[]
     */
    saveParty() {
        console.log(this.removeQueue)
        if (this.partyMembers.length <= 0) {
            alert('No party members!');
        } else {
            for (let i = 0; i < this.removeQueue.length; i++) {
                for (let j = 0; j < this.partyMembers.length; j++) {
                    if (this.partyMembers[j].id == this.removeQueue[i].id) {
                        this.partyMembers.splice(j, 1);
                    }
                }
            }
            this.requestUpdate();
            

            if (this.removeQueue.length > 0) {
                this.removeQueue.length = 0;
            }


            if (this.partyMembers.length > 0) {
                this.makeItRain();
                this.playCoinSound();
            }
            
            this.formatFixer();
            this.borderController();
            console.log(this.partyMembers);
            /*
                The above console.log is for the last bullet point in the JS Logic Requirements.
                I felt an alert was too intrusive and interruptive in this scenario, so it'll
                console.log the array of party members as the visual.
            */
        }
    }

    /**
     * Confetti!!!
     */
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

    /**
     * Fixes a formatting bug where some party members would inherit the 'to-remove' class from a deleted object, ensures formatting is correct after save
     */
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

    /**
     * Adds or removes '.border' to party showcase when characters are added or removed
     */
    borderController() {
        const showcase = this.shadowRoot.querySelector('.party-showcase');
        const header = this.shadowRoot.querySelector('.party-members-header');
        
        if (this.partyMembers.length === 0) {
            showcase.classList.remove('border');
            header.innerText = 'No Party Members'
        } else {
            showcase.classList.add('border');
            header.innerText = 'Current Party Members';
        }
    }

    // Sounds
    playClickSound() {
        const clickSound = new Audio();
        clickSound.play();
    }
    
    playCoinSound() {
        const coinSound = new Audio('../media/media_coin sound.wav');
        coinSound.play;
    }


    static get properties() {
        return {
            ...super.properties,
        }
    }
}

globalThis.customElements.define(HaxCMSParty.tag, HaxCMSParty);