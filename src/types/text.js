import {setLabel} from '../common/utils';

export function handleTextLogic(el, value) {
    console.log(/^[a-zA-Z]+$/.test(value))
    if (/^[a-zA-Z]+$/.test(value)) {
        el.value = value;
        el.errors = '';
    } else {
        el.errors = 'Please enter a string.'
    }
    setLabel({el, value});
    el.render(el.html);
}