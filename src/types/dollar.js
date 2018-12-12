import {setLabel} from '../common/utils';

export function handleDollarLogic(el, val) {
    const value = val.replace('$','').replace(/\s*,\s*|\s+,/g,'')

    if (!isNaN(value) || value === 0) {
        el.value = `${el.formatter.format(value)}`;
        el.errors = '';
    } else {
        el.errors = 'Please enter a number.'
    }
    setLabel({el, value});
    el.render(el.html);
}