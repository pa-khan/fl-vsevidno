"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Input {
  constructor(element) {
    _defineProperty(this, "elemName", 'input');

    _defineProperty(this, "classError", '--error');

    _defineProperty(this, "classNumber", '--number');

    _defineProperty(this, "className", '--name');

    _defineProperty(this, "classPhone", '--phone');

    var input = element.querySelector('input');

    input.addEventListener('focusin', () => {
      element.classList.add('--focus');
    });


    if (element.classList.contains(this.classPhone)) {
      IMask(input, {
        mask: '+{7} (000) 000-00-00'
      });
    } else if (element.classList.contains(this.classNumber)) {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/, '');
      });
    } else if (element.classList.contains(this.className)) {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/\d/, '');
      });
    }

    input.addEventListener('focusin', () => {
      element.classList.remove(this.classError);
    });
  }

}

var inputs = document.querySelectorAll('.input');
inputs.forEach(input => {
  new Input(input);
});