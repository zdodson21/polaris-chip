import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import { css, html } from 'lit';

/**
 * ISSUES LINK HERE
 * @author {Zach Dodson}
 * Replace all instances of 'FinalProject' with appropriate name for whichever project I am assigned
 */

export class FinalProject extends DDD {
    
    static get tag() {

    }

    constructor() {
        super();
    }

    static get styles() {
        return [ 
            super.styles,
            css`
                /*               
                CSS is based around variables / standards of 'Design, Develop, Destroy' (DDD). Styleguide for DDD can be found at the link below:

                https://oer.hax.psu.edu/bto108/sites/haxcellence/documentation/ddd 
                */


            `
        ]
    }

    render() {
        
    }

    static get properties() {
        return {
            ...super.properties,
        }
    }
}

globalThis.customElements.define(FinalProject.tag, FinalProject);