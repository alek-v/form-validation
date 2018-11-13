/*
(c) vavok.net
*/

var validateName = function(inputData) {

  if (inputData.target !== undefined) {
    inputData = inputData.target;
  } else {
    inputData = document.getElementById(inputData);
  }

  var name = inputData.value;

  if (name.length < 2) {
    producePrompt(inputs.name.error, 'name-error', 'red')
    return false;
  }

  producePrompt(inputs.name.valid, 'name-error', 'green');
  return true;
}

function validatePhone(inputData) {

  if (inputData.target !== undefined) {
    inputData = inputData.target;
  } else {
    inputData = document.getElementById(inputData);
  }

  var phone = inputData.value;

  if (phone.length < 6) {
    producePrompt(inputs.phone.error, 'phone-error', 'red');
    return false;
  }

  producePrompt(inputs.phone.valid, 'phone-error', 'green');
  return true;

}

function validateEmail(inputData) {

  if (inputData.target !== undefined) {
    inputData = inputData.target;
  } else {
    inputData = document.getElementById(inputData);
  }

  var email = inputData.value;

  if(email.length == 0) {

    producePrompt(inputs.email.error, 'email-error', 'red');
    return false;

  }

  if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {

    producePrompt(inputs.email.error, 'email-error', 'red');
    return false;

  }

  producePrompt(inputs.email.valid, 'email-error', 'green');
  return true;

}

function validateMessage(inputData) {

  if (inputData.target !== undefined) {
    inputData = inputData.target;
  } else {
    inputData = document.getElementById(inputData);
  }

  var message = inputData.value;

  if (message.length < 5) {

    producePrompt(inputs.message.error, 'message-error', 'red');
    return false;

  }

  producePrompt(inputs.message.valid, 'message-error', 'green');
  return true;

}

var validateForm = function(event) {
  var inputNumber = Object.size(inputs);
  var keyNames = Object.keys(inputs);

  for (var i = 0; i < inputNumber; i++) {
    var inputNames = keyNames[i];

    checkOptions = Object.keys(inputs[inputNames]);
    checkOpitonsLength = checkOptions.length;

    // use functions names in array
    var currentInput = '';
    for(var r in inputs[inputNames]) {

      var currentInput = currentInput.concat(inputs[inputNames][r]);

      if (r == 'func') {
      var checkFunctionName = inputs[inputNames][r];
      } else if (r == 'id') {
      var checkIdName =inputs[inputNames][r];
      }

    }

    // run functions dynamicly
    if (!window[checkFunctionName](checkIdName)) {
    //if(!eval(checkFunctionName)(checkIdName)) {

      jsShow('submit-error');
      producePrompt(formData.error, 'submit-error', 'red');
      setTimeout(function() {
      jsHide('submit-error');
      }, 2000);
      event.preventDefault();
      return false;
    }

  }

}

function jsShow(id) {
  document.getElementById(id).style.display = 'block';
}

function jsHide(id) {
  document.getElementById(id).style.display = 'none';
}

function producePrompt(message, promptLocation, color) {

  document.getElementById(promptLocation).innerHTML = message;
  document.getElementById(promptLocation).style.color = color;

}

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function loadLocalization(file) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', file, false);
  xhr.send();
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.text = xhr.responseText;
  document.head.appendChild(script);
}
var loadLang = document.querySelector("html[lang]").lang;

loadLocalization('../lang/' + loadLang + '/js/forms.js');
//$("head").append('<script type="text/javascript" src="../lang/' + loadLang + '/js/forms.js"></script>'); // jQuery way
