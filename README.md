# MyMortgageApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Mortgage Calculator App:

User can change default value in the Payment Plan form, and click Calculate.

The monthly mortgage payment value will show subsequently.

For the currently version, the calcultion does not include Prepayment Plan.

Manual tests applied, the details please see below:

Test Plan for Payment Plan and Calculate functions:
Note: For each test cases, all the other field are kept the same, except the field being tested. The Monthly Mortgage Payment(MMP) value will be observed.
| Test Cases                           | Procedure                                       | Result                                          |
| -------------------------------------|:-----------------------------------------------:| -----------------------------------------------:|
| 01: Verify Mortgage Amount field     | Increase and decrease Mortgage Amount Value     |  MMP increased and decreased accordingly, pass  |
| 02: Verify Interest Rate field       | Increase and decrease Interest Rate Value       |  MMP increased and decreased accordingly, pass  |
| 03: Verify Amortization Period field | Increase and decrease Amortization Period Value |  MMP decreased and increased accordingly, pass  |
| 04: Verify Payment Frequency field   | Increase and decrease Payment Frequency Value   |  MMP decreased and increased accordingly, pass  |
| 05: Verify Term field                | Increase and decrease Term Value                |  MMP value does not change, pass                |

For the test case 05 pass, the reason is the current Monthly Mortgage Payment calculation formular does not include the term parameter, so the change of term value should not alters the result.