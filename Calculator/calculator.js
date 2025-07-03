const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,];
const screen = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
let output = [];


function calculator(button) {
    const symbol = button.textContent;
    
    if (symbol === 'C') {
        output = [];
        screen.textContent = '0';
    } else if (symbol === '⇐') {
        output.pop();
        screen.textContent = output.join("");
      } else if (button.classList.contains("operators")) {
        const lastSymbol = output[output.length - 1];
        if (lastSymbol === "+" || lastSymbol === "−" || lastSymbol === "×" || lastSymbol === "÷") {
          output.pop();
        }
        output.push(symbol);
        screen.textContent = output.join("");
      } else if (symbol === '=') {
        screen.textContent = math.evaluate(output.join("").replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-'));
        output = [];
    } else {
        const symbol = button.textContent;
        output.push(symbol);
        screen.textContent = output.join('');
    }
    console.log (output);
}

buttons.forEach(button => button.addEventListener('click', () => calculator(button)));
// currently parenthesis can bug it out if not used correctly, must make it so that user has no choice but input parenthesis properly
// else if (button.classList.contains("parenthesis")) {
//    const lastSymbol = output[output.length - 1];
//    if (lastSymbol === "(" || lastSymbol === ")") {
//        output.pop();
//    }
//    output.push(symbol);
//    screen.textContent = output.join("");
//  }

//another issue i encuntered, after i get a result i can't continue further operations