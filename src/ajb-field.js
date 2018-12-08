import {bind,wire} from 'hyperhtml';
import delegate from 'dom-delegate';
import './ajb-field.css';
console.log('ajb-field imported')

class AjbField extends HTMLElement {
    static get observedAttributes() { return ['type','value','label']; }

    connectedCallback() {
        this.connected = true;
        this.html = bind(this);
        this.type = this.getAttribute('type');
        this.formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 });
        this.render(this.html);
        this.addEventListeners();
    }

    disconnectedCallback() {}

    attributeChangedCallback(attr, oldValue, newValue) {
            console.log(`attr: ${attr} ${newValue}`);
            if (oldValue !== newValue) {
                this[attr] = newValue;
                this.render(this.html);
            }
        if (this.connected) {
        }
    }

    propertyChangeCallback(prop, oldValue, newValue) {
        if (this.connected) {
            console.log(`prop: ${prop} ${newValue}`);
            if (oldValue !== newValue) {
                this.setAttribute(prop, newValue);
                this.render(this.html);
            }
        }
    }

    addEventListeners() {
        this.delegateEl = delegate(this);
        this.delegateEl.on('change', 'input', e => {
            const value = e.target.value;
            if (this.type === 'dollar') {
                if (!isNaN(value) || value === 0) {
                    this.value = `$${this.formatter.format(value)}`;
                    this.errors = '';
                } else {
                    this.errors = 'Please enter a number.'
                }
                if (value !== '') {
                    if (this.errors) {
                        this.querySelector('.ajb-field__container').classList.add('has-errors');
                        this.querySelector('.ajb-field__container').classList.remove('has-value');   
                    } else {
                        this.querySelector('.ajb-field__container').classList.add('has-value');
                        this.querySelector('.ajb-field__container').classList.remove('has-errors');
                    }
                } else {
                    this.querySelector('.ajb-field__container').classList.remove('has-value');
                    this.querySelector('.ajb-field__container').classList.remove('has-errors');
                }
                this.render(this.html);
            }
        });
    }

    render(html) {
        return html`
            <div class="ajb-field__container">
                <input name="ajb-field" type=${this.type} value=${this.value} />
                <label for="ajb-field">${this.label}</label>
                <div class="errors">${this.errors ? this.errors : ''}</div>
            </div>
        `;
    }
}

customElements.define('ajb-field', AjbField);
