let startBtn = document.querySelector("#start");
let budgetValue = document.querySelector(".budget-value");
let dayBudgetValue = document.querySelector(".daybudget-value");
let levelValue = document.querySelector(".level-value");
let expensesValue = document.querySelector(".expenses-value");
let optionalExpensesValue = document.querySelector(".optionalexpenses-value");
let incomeValue = document.querySelector(".income-value");
let monthSavingsValue = document.querySelector(".monthsavings-value");
let yearSavingsValue = document.querySelector(".yearsavings-value");
let year = document.querySelector(".year-value");
let month = document.querySelector(".month-value");
let day = document.querySelector(".day-value");

//Поля вводов
let expensesItem = document.querySelectorAll(".expenses-item");
let optionalexpensesItem = document.querySelectorAll(".optionalexpenses-item");

//Buttons

let expensesStart = document.querySelector(".expenses-item-btn");
let optionalStart = document.querySelector(".optionalexpenses-btn");
let count = document.querySelector(".count-budget-btn");

let incomeItem = document.querySelector(".choose-income");
let checkSavings = document.querySelector("#savings");
let sumValue = document.querySelector(".choose-sum");
let percentValue = document.querySelector(".choose-percent");
let yearValue = document.querySelector(".year-value");
let monthValue = document.querySelector(".month-value");
let dayValue = document.querySelector(".day-value ");

let money, time;

// count.setAttribute("disabled", "disabled");

startBtn.addEventListener("click", () => {
  time = prompt("Введите дату в формате YYYY-MM-DD", "");
  money = +prompt("Ваш бюджет на месяц?", "");

  while (isNaN(money) || money == "" || money == null)
    money = prompt("Ваш бюджет", "");
  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  yearValue = new Date(Date.parse(time)).getFullYear();
  yearValue = new Date(Date.parse(time)).getMonth() + 1;
  yearValue = new Date(Date.parse(time)).getDate();
});

expensesStart.addEventListener("click", () => {
  if (isNaN(money) || money == "" || money == null) {
    expensesStart.setAttribute("disabled");
  } else {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
      let a = expensesItem[i].value;
      let b = expensesItem[++i].value;
      if (
        typeof a === "string" &&
        typeof a != null &&
        typeof b != null &&
        a != "" &&
        b != "" &&
        a.length < 50
      ) {
        appData.expenses[a] = b;
        sum += +b;
      } else {
        i--;
      }
    }
    expensesValue.textContent = sum;
    appData.expenses = sum;
  }
});

optionalStart.addEventListener("click", () => {
  if (isNaN(money) || money == "" || money == null) {
    optionalStart.setAttribute(("disabled", "disabled"));
  } else {
    for (let i = 0; i < optionalexpensesItem.length; i++) {
      let option = optionalexpensesItem[i].value;
      if (typeof option === "string" && typeof option != null && option != "") {
        appData.optionalExpenses[i] = option;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ", ";
      }
    }
  }
});

count.addEventListener("click", () => {
  if (isNaN(money) || money == "" || money == null) {
    count.setAttribute(("disabled", "disabled"));
  } else {
    if (appData.budget != undefined) {
      appData.moneyPerDay = (
        (appData.budget - appData.expenses) /
        30
      ).toFixed();
      dayBudgetValue.textContent = appData.moneyPerDay;

      if (appData.moneyPerDay < 100) {
        levelValue.textContent = "Нужно больше золота";
      } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 1000) {
        levelValue.textContent = "Среднее количество золота";
      } else if (appData.moneyPerDay > 1000) {
        levelValue.textContent = "У Вас много золота";
      } else {
        levelValue.textContent = "Ты по-моему перепутал";
      }
    } else {
      dayBudgetValue.textContent = "Произошла ошибка";
    }
  }
});

incomeItem.addEventListener("input", () => {
  let items = incomeItem.value;
  appData.income = items.split(", ");
  incomeValue.textContent = appData.income;
});

checkSavings.addEventListener("click", () => {
  if (isNaN(money) || money == "" || money == null) {
    expensesStart.setAttribute(("disabled", "disabled"));
  } else {
    if (appData.savings == true) {
      appData.savings = false;
    } else {
      appData.savings = true;
    }
  }
});

sumValue.addEventListener("input", () => {
  if (appData.savings == true) {
    let sum = +sumValue.value;
    let percent = +percentValue.value;

    appData.monthInCome = (sum / 100 / 12) * percent;
    appData.yearInCome = (sum / 100) * percent;

    monthSavingsValue.textContent = appData.monthInCome.toFixed(1);
    yearSavingsValue.textContent = appData.yearInCome.toFixed(1);
  }
});

percentValue.addEventListener("input", () => {
  let sum = +sumValue.value;
  let percent = +percentValue.value;

  appData.monthInCome = (sum / 100 / 12) * percent;
  appData.yearInCome = (sum / 100) * percent;

  monthSavingsValue.textContent = appData.monthInCome.toFixed(1);
  yearSavingsValue.textContent = appData.yearInCome.toFixed(1);
});

let appData = {
  budget: money,
  timeData: time,
  savings: false,
  expenses: {},
  optionalExpenses: {},
  income: [],
  expenses: 0,
  calcBudget: function () {},
  detectLevel: function () {},
  chooseOptExpenses: function () {},
  checkSavings: function () {
    if (appData.savings == true) {
      let save = +prompt("Какова сумма вложений?", "");
      let percent = +prompt("Под какой процент?", "");
      appData.monthInCome = (save / 100 / 12) * percent;
      console.log(`Ваш доход ${appData.monthInCome}  `);
    }
  },
  chooseInCome: function () {
    let items;
    while (items == "" || items == null) {
      items = prompt(
        "Что принесет вам доп доход?(перечислите через запятую)",
        ""
      );
    }
    appData.income = items.split(", ");
    appData.income.push(prompt("Может что-то еще,а?"));
    appData.income.forEach((item, index) =>
      console.log(`Способы доп. заработка: ${index + 1}. ${item}`)
    );
  },
};

for (let key in appData) {
  console.log(`Наша программа включает в себя данные: ${key}`);
}
