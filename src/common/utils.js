export function setLabel(specs) {
    const {el,value} = specs;
    if (value !== '') {
        if (el.errors) {
            el.querySelector('.ajb-field__container').classList.add('has-errors');
            el.querySelector('.ajb-field__container').classList.remove('has-value');
        } else {
            el.querySelector('.ajb-field__container').classList.add('has-value');
            el.querySelector('.ajb-field__container').classList.remove('has-errors');
        }
    } else {
        el.querySelector('.ajb-field__container').classList.remove('has-value');
        el.querySelector('.ajb-field__container').classList.remove('has-errors');
    }
}