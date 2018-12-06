import '../src/ajb-field';

(function() {
	console.log('index.js loaded');

  function component() {
    var div = document.createElement('div');
    var ajbField = document.createElement('ajb-field');
    ajbField.setAttribute('type','number')
 
    div.appendChild(ajbField);

    return ajbField;
  }

  document.body.appendChild(component());
})()