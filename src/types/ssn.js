import {setLabel} from '../common/utils';

export function handleSsnLogic(el, value) {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{2})(\d{4})$/)
    if (match) {
        el.value = [match[2], '-', match[3], '-', match[4]].join('');
        el.errors = '';
    } else {
        el.errors = 'Please enter a valid SSN.'
    }
    setLabel({el, value});
    el.render(el.html);
}