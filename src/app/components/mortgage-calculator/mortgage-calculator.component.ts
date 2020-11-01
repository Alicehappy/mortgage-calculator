import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss']
})
export class MortgageCalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initAmortPeriYears();
    this.initAmortPeriMonths();
    this.initTermArr();
  }
  // Form variables
  monMortPay;
  helpIcon = faQuestionCircle;
  amortPeriYears = [];
  amortPeriMonths = [];
  payFreqArr = [
    'Accelerated Weekly',
    'Weekly',
    'Accelerated Bi-weekly',
    'Bi-Weekly (every 2 weeks)',
    'Semi-monthly(24x per year)',
    'Monthly (12x per year)'
  ]
  termArr = [];

  prepayFreqArr = [
    'One time',
    'Each year',
    'Same as regular payment'
  ]

  // Form variables initialization
  initAmortPeriYears() {
    for (let i = 0; i < 31; i++) {
      if (i == 0) {
        this.amortPeriYears.push('');
      } else if (i == 1) {
        this.amortPeriYears.push(`${i} Year`);
      } else {
        this.amortPeriYears.push(`${i} Years`);
      }
    }
  }

  initAmortPeriMonths() {
    for (let i = 0; i < 11; i++) {
      if (i == 0) {
        this.amortPeriMonths.push('');
      } else if (i == 1) {
        this.amortPeriMonths.push(`${i} Month`);
      } else {
        this.amortPeriMonths.push(`${i} Months`);
      }
    }
  }

  initTermArr() {
    for (let i = 0; i < 10; i++) {
      if (i == 0) {
        this.termArr.push(`${i + 1} Year`);
      } else {
        this.termArr.push(`${i + 1} Years`);
      }
    }
  }

  // Create reactive form
  mortCalcForm = new FormGroup({
    payPlanForm: new FormGroup({
      mortAmoun: new FormControl(100000),
      intereRate: new FormControl(5),
      amortPeriod: new FormControl('25 Years'),
      payFreq: new FormControl('Monthly (12x per year)'),
      term: new FormControl('5 Years')
    }),
    prepayPlanForm: new FormGroup({
      prepayAmoun: new FormControl(0),
      prepayFreq: new FormControl('One time'),
      starPay: new FormControl(1),
    })
  });

  // Show monthly mortgage payment value
  onSubmit() {
    this.monMortPay = this.mortCalc();
  }

  mortCalc() {
    let formVal = this.mortCalcForm.value;
    let amortPeriVal = this.amortPeriYears.indexOf(formVal.payPlanForm.amortPeriod);
    let index = this.payFreqArr.indexOf(formVal.payPlanForm.payFreq);
    let payFreqVal;
    index === 5 ? payFreqVal = 12 : (index === 4 ? payFreqVal = 24 : (index === 3 ? payFreqVal = 26 : (index === 2 ? payFreqVal = 26 : (index === 1 ? payFreqVal = 52 : (index === 0 ? payFreqVal = 52 : 0)))))

    let termVal = this.termArr.indexOf(formVal.payPlanForm.term) + 1;

    /**
     * Calculate monthly mortgage payment
     * @param r: monthly interest rate
     * @param N: the number of monthly payments, also called the loan's term
     * @param P: the loan's principal
     * @return c: the monthly payment, formula used is c = r*P/(1-(1+r)**(-N)) from https://en.m.wikipedia.org/wiki/Mortgage_calculator
     */

    let r = formVal.payPlanForm.intereRate / 12 / 100; // intereRate is a fixed yearly interest rate
    let P = formVal.payPlanForm.mortAmoun;
    let N = amortPeriVal * payFreqVal;
    let c = r * P / (1 - (1 + r) ** (-N));
    c = Math.round(c * 100) / 100

    return c;

  }

}
