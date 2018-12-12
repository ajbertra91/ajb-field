import {bind} from 'hyperhtml';
import delegate from 'dom-delegate';
import './ajb-field.css';
import {handleDollarLogic} from './types/dollar';
import {handleTextLogic} from './types/text';
import {handleSsnLogic} from './types/ssn';

class AjbField extends HTMLElement {
    static get observedAttributes() { return ['type','value','label']; }

    connectedCallback() {
        this.connected = true;
        this.html = bind(this);
        this.type = this.getAttribute('type');
        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
        this.render(this.html);
        this.addEventListeners();
    }

    disconnectedCallback() {
        this.delegateEl.off();
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[attr] = newValue;
            this.render(this.html);
        }
    }

    propertyChangeCallback(prop, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.setAttribute(prop, newValue);
            this.render(this.html);
        }
    }

    addEventListeners() {
        this.delegateEl = delegate(this);
        this.delegateEl.on('change', 'input', e => {
            const value = e.target.value;
            if (this.type === 'dollar') {
                handleDollarLogic(this, value);
            } else if (this.type === 'text') {
                handleTextLogic(this, value);
            } else if (this.type === 'ssn') {
                handleSsnLogic(this, value)
            }
        });
    }

    render(html) {
        if (!this.connected) { return '';}
        return html`
            <div class="ajb-field__container">
                <input name="ajb-field" type=${this.type} value=${this.value} maxlength=${this.type==='ssn' ? 9 : ''}/>
                <label for="ajb-field">${this.label}</label>
                <div class="errors">${this.errors ? this.errors : ''}</div>
            </div>
        `;
    }
}

customElements.define('ajb-field', AjbField);
