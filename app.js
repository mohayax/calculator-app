class Calculator {
    constructor(prevOutputTextElement, currOutputTextElement){
        this.prevOutputTextElement = prevOutputTextElement
        this.currOutputTextElement = currOutputTextElement
        this.clear()
    };

    clear() {
        this.currOutput = ''
        this.prevOutput = ''
        this.operation = undefined
    };

    delete() {
        this.currOutput = this.currOutput.toString().slice(0, -1)
    };

    appendNum(num) {
        if (num ==='.' && this.currOutput.includes('.')) return
        this.currOutput = this.currOutput.toString() + num.toString()
    };

    chooseOperation(operation) {
        if (this.currOutput ==='') return
        if (this.prevOutput !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOutput = this.currOutput
        this.currOutput = ''
    };

    compute() {
        let computation
        const prev = parseFloat(this.prevOutput)
        const current = parseFloat(this.currOutput)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return

        }
        this.currOutput = computation
        this.operation = undefined
        this.prevOutput = ''
    };

    updateDisplay() {
        this.currOutputTextElement.innerText = this.currOutput
        this.prevOutputTextElement.innerText = this.prevOutput
        if (this.operation !== null){
            this.prevOutputTextElement.innerText =
            `${this.prevOutput} ${this.operation}`
        } 
        
    };
}


const numBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
const prevOutputTextElement = document.querySelector('[data-prev-Output]');
const currOutputTextElement = document.querySelector('[data-curr-Output]');

const calculator = new Calculator(prevOutputTextElement, currOutputTextElement);

numBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNum(btn.innerText)
        calculator.updateDisplay()
    })
})

operationBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', (button) => {
    calculator.compute()
    calculator.updateDisplay()
})

clearBtn.addEventListener('click', (button) => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', (button) => {
    calculator.delete()
    calculator.updateDisplay()
})