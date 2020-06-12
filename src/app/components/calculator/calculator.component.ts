import { Component, OnInit } from '@angular/core';
import { ChildActivationEnd } from '@angular/router';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.sass']
})
export class CalculatorComponent implements OnInit {
  show: Array<any> = [];
  showString: string = this.show.join('');
  operand1: string = null;
  operand2: string = null;
  isOperandSet: boolean = false;
  isOperatorSet: boolean;
  operator: string = null;
  result: number = null;
  operators: Array<string> = ['-','+','x','/'];
  operatorsBack: Array<string> = ['-','+','x','/'];

  constructor() { }

  ngOnInit() {
    this.clear();
  }
  
  pressKey(key: string) {
    this.showKey(key);
    if (key == '+' || key == '-' || key == 'x' || key == '/') {
      if (this.operand1 != null) {
        if (this.isOperatorSet) {
          this.calculateResult();
          this.operand1 = this.result.toString();
          this.operand2 = null;
        }
        this.isOperandSet = true;
        switch(key) {
          case '+':
            this.operator = 'add';
            break;
          case '-':
            this.operator = 'sub';
            break;
          case 'x':
            this.operator = 'mul';
            break;
          case '/':
            this.operator = 'div';
        }
        this.isOperatorSet = true;
      }
    }

    else if(!this.isOperandSet) {
      if (this.operand1 == null) {
        this.operand1 = key;
      }
      else {
      this.operand1 += key;
      }
    }

    else if(this.isOperatorSet) {
      if (this.operand2 == null) {
        this.operand2 = key;
      }
      else {
      this.operand2 += key;
      }
    }

  }

  showKey(key: string) {
    if (this.operators.includes(key)) {
      if (this.operators.includes(this.show[this.show.length - 1] || this.isOperandSet == false)) {
        console.log(key);
        return;
      }
    }

    this.show = this.show.slice();
    this.show.push(key);
    this.showString = this.show.join('');
  }

  addition(a: number, b: number) {
    this.result = a + b;
    this.showString = this.result.toString();
  }

  subtract(a: number, b: number) {
    this.result = a - b;
    this.showString = this.result.toString();
  }

  multiply(a: number, b: number) {
    this.result = a * b;
    this.showString = this.result.toString();
  }

  divide(a: number, b: number) {
    this.result = a / b;
    this.showString = this.result.toString();
  }

  calculateResult() {
    if (this.isOperatorSet && this.operand2) {
      let a = parseInt(this.operand1);
      let b = parseInt(this.operand2);
      switch(this.operator) {
        case "add":
            this.addition(a, b);
            break;
        case "sub":
            this.subtract(a, b);
            break;
        case "mul":
            this.multiply(a, b);
            break;
        case "div":
            this.divide(a, b);
            
      }
    }
  }
  
  clear() {
    this.show = [];
    this.showString = '0';
    this.operand1 = null;
    this.operand2 = null;
    this.isOperandSet = null;
    this.isOperatorSet = null;
    this.operator = null;
    this.result = null;
  }

  /*
  backSpace() {
    if (this.operatorsBack.includes(this.show[this.show.length -1])){
      this.operator = null;
      this.isOperatorSet = false;
      return;
    }
    if(!this.isOperandSet) {
      if (this.operand1 == null) {
        return;
      }
      else {
        this.operand1.slice(0,this.operand1.length-1);
        if (this.operand1.length == 0) {
          this.isOperandSet = false;
        }
        return;
      }
    }
    else if(this.isOperatorSet) {
      this.operand2.slice(0,this.operand2.length-1);
      }
    this.show = this.show.slice();
    this.show.pop();
    this.showString = this.show.join('');
    
  }*/
}
