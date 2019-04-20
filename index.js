function checkCashRegister(price, cash, cid) {
  let total = calculateDrawerTotal(cid);
  let changeArray = getChangeArrayInOrder(cid);
  let billsArray = [100, 20, 10, 5, 1, 0.25, 0.10, 0.05, 0.01];
  let changeToGive = cash - price;

  if (total < changeToGive) {
      let finalObj = { status: 'INSUFFICIENT_FUNDS', change: []};
      return finalObj;
  }
  if (total == changeToGive) {
      let finalObj = { status: 'CLOSED', change: cid};
      return finalObj;
  }
  let openChange = checkIfEnoughChange(changeToGive, changeArray, billsArray);
  return openChange;



  function checkIfEnoughChange(changeNeeded, arrayWithChange, billsArray) {
    let changeArray = [];
    for (let i = 0; i < billsArray.length; i++) {
      while (changeNeeded >= billsArray[i]) {
        // if (changeNeeded - billsArray[i] < 0) continue;
        if (arrayWithChange[i] - billsArray[i] < 0) break;
        changeNeeded = (changeNeeded - billsArray[i]).toFixed(2);
        arrayWithChange[i] = (arrayWithChange[i] - billsArray[i]).toFixed(2);
        changeArray.push(billsArray[i]);
        if (arrayWithChange[8] && changeNeeded > 0 && arrayWithChange[8] == 0) {
            let finalObj = { status: 'INSUFFICIENT_FUNDS', change: []};
            return finalObj;
        }
      }
    }

    let pennies = 0;
    let nickels = 0;
    let dimes = 0;
    let quarters = 0;
    let one = 0;
    let five = 0;
    let ten = 0;
    let twenty = 0;

    for (let item of changeArray) {
        switch(item) {
            case 20: 
                twenty += 20;
                break;
            case 10:
                ten += 10;
                break;
            case 5:
                five += 5;
                break;
            case 1:
                one += 1;
                break;
            case 0.25:
                quarters += 0.25;
                break;
            case 0.1:
                dimes += 0.1;
                break;
            case 0.05:
                nickels += 0.05;
                break;
            case 0.01:
                pennies += 0.01;
                break;
        }
    }

    let cashArray = [twenty, ten, five, one, quarters, dimes, nickels, pennies];
    let newCashArray = cashArray.map(item => {
        switch(item) {
            case twenty:
                return ['TWENTY', twenty];
            case ten:
                return ['TEN', ten];
            case five: 
                return ['FIVE', five];
            case one:
                return ['ONE', one];
            case quarters:
                return ['QUARTER', quarters];
            case dimes:
                return ['DIME', dimes];
            case nickels:
                return ['NICKEL', nickels];
            case pennies:
                return ['PENNY', pennies];
        }
    });
    let finalArray = [];
    for (let item of newCashArray) {
        if (item[1] != 0) {
            finalArray.push(item);
        }
    };
    let finalObj = {
        status: 'OPEN', 
        change: finalArray
    };
    return finalObj;
  }
  
  function getChangeArrayInOrder(money) {
    let moneyArray = money.map(item => {
      return item[1];
    }).reverse();
    return moneyArray;                      
  }
  
  function calculateDrawerTotal(money) {
    let moneyArray = Number(money.map(item => {
      return item[1];
    }).reduce((a, b) => a + b).toFixed(2));
    return moneyArray;
  }
}


console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));