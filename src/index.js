import '../src/ajb-field';

(function() {

  function component(type, label) {
    var div = document.createElement('div');
    div.classList.add('container');
    var ajbField = document.createElement('ajb-field');
    ajbField.setAttribute('label', label);
    ajbField.setAttribute('type',type);

    div.appendChild(ajbField);

    return div;
  }

  document.body.appendChild(component('text', 'First Name'));
  document.body.appendChild(component('text', 'Last Name'));
  document.body.appendChild(component('dollar', 'Salary'));
  document.body.appendChild(component('ssn', 'Social Security Number'));
})()