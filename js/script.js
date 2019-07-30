let money, time;
//получение переменных из макета
let startButton = document.getElementById('start'),
budgetValue = document.getElementsByClassName('budget-value')[0],
dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
levelValue = document.getElementsByClassName('level-value')[0],
expensesValue = document.getElementsByClassName('expenses-value')[0],
optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
incomeValue = document.getElementsByClassName('income-value')[0],
monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

expensesItem = document.getElementsByClassName('expenses-item'),
expensesButton = document.getElementsByTagName('button')[0],
optionalExpensesButton = document.getElementsByTagName('button')[1],
countButton = document.getElementsByTagName('button')[2],
optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
incomeItem = document.querySelector('.choose-income'),
checkSavings = document.querySelector('#savings'),
sumValue = document.querySelector('.choose-sum'),
percentValue = document.querySelector('.choose-percent'),
yearValue = document.querySelector('.year-value'),
monthValue = document.querySelector('.month-value'),
dayValue = document.querySelector('.day-value');


//функция спрашивает пользователя дату и бюджет по клику, выводит полученые данные в appData.
//данные нужно ввести корректно (наверное можно прописать требованием в форме хтмл, может быть потом реализую)
startButton.addEventListener('click', function() {
    //для юзабилити это нужно завернуть в форму, но пока промпт.
    //потому что %обыватель% может не понять, почему первое, что просит сайт - ввести количество его денег.
    money = +prompt("Ваш бюджет на месяц?", "");
    //это тоже лучше обернуть в форму с требованием шаблонного ввода
    //потому что определенные категории пользователей введут формат YYYY-MM-DD с 1488 попытки.
time = prompt("Введите дату в формате YYYY-MM-DD", "");
//проверка на нормальность заполнения
while (isNaN(money)||(money=='')||(money==null)) {
    alert("введите корректные данные");
    money = +prompt("Ваш бюджет на месяц?", "");
}
//перевод значений в appData
appData.budget = money;
appData.timeData = time;
budgetValue.textContent = money.toFixed();
//yearvalue присваивается значение метода Data, который в свою очередь парсит time от пользователя в текущий год.
yearValue.value = new Date(Date.parse(time)).getFullYear();
//[0]!=[1]
monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
dayValue.value = new Date(Date.parse(time)).getDate();
});

//подсчёт обязательных расходов
expensesButton.addEventListener('click', function() {
let sum = 0;
//в счетчик заводится количество инпутов псевдомассива expensesItem,
//т.е. столько, сколько нужно пользователю
for (let i = 0; i < expensesItem.length; i++) {
    //в var а пойдет наименование расхода, вводимое пользователем в input (ключ)
    let a = expensesItem[i].value,
    //префиксным инкрементом получаем следующий за а input пользователя (значение)
     b = expensesItem[++i].value;
     //на данный момент проверка не нужна, но пусть валяется.
     if (typeof (a) === 'string' &&
     (typeof (a)) != null && (typeof (b)) != null &&
     a != '' && b != '' && a.length < 50) {
     appData.expenses[a] = b;
     sum += +b;
    } else {
        //зацикливание ввода расходов
       i = i - 1;
    }
}
    //вывод полученной общей суммы расходов на экран
    expensesValue.textContent = sum;
});

//расчет необязательных расходов
optionalExpensesButton.addEventListener('click', function(){
    //получаем инпуты от пользователя
    //цикл для снятия ограничений на количество расходов (число зависит от пользователя)
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        //присвоение
        let c = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = c;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
     }
});

//функции подсчета дневного бюджета и определения уровня доходла были объединены
//раньше уровень дохода выводился только в лог.
//добавлено условие на != undefined, для того, чтобы программа не работала с NaN при пустом поле.
countButton.addEventListener('click', function() { 
    //проверка на NaN
    if (appData.budget != undefined) {
        //формула подсчета с округлением
appData.moneyPerDay = ((appData.budget - expensesValue.textContent) / 30).toFixed();
//dayBudgetValue ловит moneyPerDay. присвоение.
dayBudgetValue.textContent = appData.moneyPerDay;

if(appData.moneyPerDay < 100) {
    levelValue.textContent = "минимальный уровень дохода";
} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
    levelValue.textContent = "средний уровень дохода";
} else if (appData.moneyPerDay > 2000) {
    levelValue.textContent = "высокий уровень дохода";
}else {
    levelValue.textContent = 'произошла ошибка в вводе данных';
}}else {
    levelValue.textContent = 'произошла ошибка в вводе данных';
}});
//добавлен фокус на input, для того, чтобы статьи дохода сразу прописывались в правом блоке.
//можно заменить input на change. предположительно вкусовщина, но input на первый взгляд юзабельней. 
incomeItem.addEventListener('input', function(){
    //значения получаются от пользователя
    let items = incomeItem.value;
    //данные пишутся в массив через запятую
appData.income = items.split(', ');
//данные incomeValue дублируют ввод income при введении
incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
//CHECKBOX_bicycle.jpg ¯\_(ツ)_/¯ 
//проверяет, включена ли галочка чекбокса.
    if (appData.savings == true) {
    appData.savings = false;
} else {
    appData.savings = true;
}
});

//обработка инпутов по сумме накоплений и %
sumValue.addEventListener('input', function(){
    //проверяет включена ли галочка
if(appData.savings == true){
    //выводит данные пользователя в int с помощью +%переменная%
let sum = +sumValue.value,
percent = +percentValue.value;
//формула расчета дохода в месяц и в год
appData.monthIncome = sum/100/12*percent;
appData.yearIncome = sum/100*percent;
//вывод на экран с округлением до десятых долей
monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
}
});
//то же самое для input процентов вклада
percentValue.addEventListener('input', function(){
    //чекбокс
if(appData.savings == true){
    //вывод в int
    let sum = +sumValue.value,
    percent = +percentValue.value;
    //формула
    appData.monthIncome = sum/100/12*percent;
    appData.yearIncome = sum/100*percent;
    //вывод с округлением до десятых
    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1); 
}
});
//два условия завязаны друг на друге, для того, чтобы подсчет работал только при заполнении обоих полей (sumValue & percentValue).
//велосипед по сути, вероятно можно сделать иначе, как только я узнаю как.

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};