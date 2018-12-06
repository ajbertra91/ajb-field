import {bind} from 'hyperhtml';
import './ajb-field.css';
console.log('ajb-field imported')

class AjbField extends HTMLElement {
    static get observedAttributes() { return ['type','value']; }

    // get value() {
    //  return this.value;
    // }

    // set value(value) {
    //  this.value = value;
    //  this.setAttribute('value', value);
    // }

    connectedCallback() {
        this.connected = true;
        this.html = bind(this);
        this.type = this.getAttribute('type');
        this.render(this.html);
    }

    disconnectedCallback() {}

    attributeChangedCallback(attr, oldValue, newValue) {
        if (this.connected) {
            console.log(`attr: ${attr} ${newValue}`)
            if (oldValue !== newValue) {
                this[attr] = newValue;
                this.render(this.html);
            }
        }
    }

    propertyChangeCallback(prop, oldValue, newValue) {
        if (this.connected) {
            console.log(`prop: ${prop} ${newValue}`);
            if (oldValue !== newValue) {
                this.setAttribute(prop, newValue)
                this.render(this.html);
            }
        }
    }

    render(html) {
        console.log('render called')
        return html`
            <label for="ajb-field">ajb-field type: ${this.type}</label>
            <input name="ajb-field" type=${this.type} value=${this.value} />
        `;
    }
}

customElements.define('ajb-field', AjbField);
