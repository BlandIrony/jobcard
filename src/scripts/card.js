export class Card {
    // DOM elements
    DOM = {
        // main element
        el: null,
        // Other Elements
        innerCard: null,
    }

    /**
     * Constructor
     * @param {Element} DOM_el - The main element
     */
    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.innerCard = this.DOM.el.querySelectorAll('.card__inner')
    }
}
