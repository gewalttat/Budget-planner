let money = +prompt("Ваш бюджет на месяц?", "");
let time = prompt("Введите дату в формате YYYY-MM-DD");
let appData = {
budget: money,
timeData: time,
expenses: {},
optionalExpenses: {},
income: [],
savings: false,
};
let firstQuestion = prompt("Введите обязательную статью расходов в этом месяце", ""),
    secondQuestion = prompt("Во сколько обойдется?", "");
appData.expenses.frstQuestion = firstQuestion;
appData.expenses.scndQuestion = secondQuestion;
alert(appData.budget / 30);