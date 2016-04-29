/*global APP*/

window.addEventListener('load', function () {
    'use strict';
    
    var i;
    
    APP.buttons = {
        textToMorse: document.getElementById('text-to-morse-button'),
        morseToText: document.getElementById('morse-to-text-button'),
        theCode: document.getElementById('the-code-button'),
        textTranslate: document.getElementById('text-translate-button'),
        morseTranslate: document.getElementById('morse-translate-button'),
        play: document.getElementById('play-button'),
        backButtons: document.getElementsByClassName('btn-back'),
        morseInput: {
            dot: document.getElementById('dot-input-button'),
            dash: document.getElementById('dash-input-button'),
            slash: document.getElementById('slash-input-button'),
            space: document.getElementById('space-input-button')
        }
    };
    
    APP.pages = {
        home: document.getElementById('home-page'),
        textInput: document.getElementById('text-input-page'),
        morseDisplay: document.getElementById('morse-display-page'),
        morseInput: document.getElementById('morse-input-page'),
        textDisplay: document.getElementById('text-display-page'),
        theCode: document.getElementById('the-code-page'),
        play: document.getElementById('play-page'),
        previousActive: []
    };
    APP.pages.active = APP.pages.home;
    
    APP.input = {
        text: document.getElementById('text-input-box'),
        morse: document.getElementById('morse-input-box')
    };
    
    APP.output = {
        text: document.getElementById('text-output-box'),
        morse: document.getElementById('morse-output-box')
    };
    
    APP.playEnabled = true;
    
    APP.showPage = function (page) {
        APP.pages.active.classList.remove('active');
        page.classList.add('active');
        APP.pages.previousActive.push(APP.pages.active);
        APP.pages.active = page;
    };
    APP.hidePage = function (e) {
        if (e) {
            e.preventDefault();
        }
        var active = APP.pages.previousActive.pop();
        APP.pages.active.classList.remove('active');
        active.classList.add('active');
        APP.pages.active = active;
    };
    
    APP.translateText = function () {
        var inputString,
            outputString = '',
            character,
            morseCode;
        inputString = APP.input.text.value.toLowerCase().trim().replace(/ +(?= )/g, '');
        
        for (i = 0; i < inputString.length; i += 1) {
            character = inputString[i];
            morseCode = APP.morse[character];
            if (morseCode) {
                if (i === 0) {
                    outputString += morseCode;
                } else {
                    outputString += ' ' + morseCode;
                }
            } else if (character === ' ') {
                outputString += ' /';
            }
        }
        APP.output.morse.innerText = outputString;
        setTimeout(function () {
            APP.input.text.value = '';
        }, 500);
    };
    APP.translateMorse = function () {
        var inputString,
            outputString = '',
            morse,
            character;
        inputString = APP.input.morse.value.replace(/\//g, ' / ').trim().replace(/ +(?= )/g, '');
        inputString = inputString.split(' ');
        
        for (i = 0; i < inputString.length; i += 1) {
            morse = inputString[i];
            character = APP.text[morse];
            if (character) {
                outputString += character;
            } else if (morse === '/') {
                outputString += ' ';
            }
        }
        APP.output.text.innerText = outputString;
        setTimeout(function () {
            APP.input.morse.value = '';
        }, 500);
    };
    APP.play = function () {
        var inputString = APP.output.morse.innerText,
            i = 0;
        function toBlack() {
            APP.pages.play.children[0].classList.remove('white');
        }
        function toWhite() {
            APP.pages.play.children[0].classList.add('white');
        }
        (function play() {
            var character;
            if (i < inputString.length && APP.playEnabled === true) {
                character = inputString[i];
                i += 1;
                if (character === '.') {
                    setTimeout(toWhite, 200);
                    setTimeout(function () {
                        toBlack();
                        play();
                    }, 400);
                } else if (character === '_') {
                    setTimeout(toWhite, 200);
                    setTimeout(function () {
                        toBlack();
                        play();
                    }, 800);
                } else if (character === ' ') {
                    setTimeout(function () {
                        toBlack();
                        play();
                    }, 400);
                } else if (character === '/') {
                    setTimeout(function () {
                        toBlack();
                        play();
                    }, 1200);
                }
            } else {
                APP.hidePage();
                APP.playEnabled = true;
            }
        }());
    };
    
    APP.buttons.textToMorse.addEventListener('click', function () {
        APP.showPage(APP.pages.textInput);
    });
    APP.buttons.morseToText.addEventListener('click', function () {
        APP.showPage(APP.pages.morseInput);
    });
    APP.buttons.theCode.addEventListener('click', function () {
        APP.showPage(APP.pages.theCode);
    });
    APP.buttons.textTranslate.addEventListener('click', function (e) {
        e.preventDefault();
        APP.translateText();
        APP.showPage(APP.pages.morseDisplay);
    });
    APP.buttons.morseTranslate.addEventListener('click', function (e) {
        e.preventDefault();
        APP.translateMorse();
        APP.showPage(APP.pages.textDisplay);
    });
//    APP.buttons.morseInput.dot.addEventListener('mousedown', function () {
//        APP.input.morse.value += '.';
//    });
//    APP.buttons.morseInput.dash.addEventListener('mousedown', function () {
//        APP.input.morse.value += '_';
//    });
//    APP.buttons.morseInput.slash.addEventListener('mousedown', function () {
//        APP.input.morse.value += '/';
//    });
//    APP.buttons.morseInput.space.addEventListener('mousedown', function () {
//        APP.input.morse.value += ' ';
//    });
    APP.buttons.morseInput.dot.addEventListener('touchstart', function () {
        APP.input.morse.value += '.';
    });
    APP.buttons.morseInput.dash.addEventListener('touchstart', function () {
        APP.input.morse.value += '_';
    });
    APP.buttons.morseInput.slash.addEventListener('touchstart', function () {
        APP.input.morse.value += '/';
    });
    APP.buttons.morseInput.space.addEventListener('touchstart', function () {
        APP.input.morse.value += ' ';
    });
    APP.buttons.play.addEventListener('click', function (e) {
        e.preventDefault();
        APP.showPage(APP.pages.play);
        setTimeout(function () {
            APP.play();
        }, 500);
    });
    for (i = 0; i < APP.buttons.backButtons.length; i += 1) {
        APP.buttons.backButtons[i].addEventListener('click', APP.hidePage);
    }
    APP.pages.play.addEventListener('click', function () {
        APP.playEnabled = false;
    });
});
