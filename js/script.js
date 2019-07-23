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
expensesItem = document.getElementsByClassName('expenses-item')[0],
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

//функия обернута в обработчик событий addEventListener
//функция спрашивает пользователя дату и бюджет по клику и выводит полученые данные в appData.
//данные нужно ввести корректно (наверное можно прописать требованием в хтмл)
startButton.addEventListener('click', function() {
    money = +prompt("Ваш бюджет на месяц?", "");
time = prompt("Введите дату в формате YYYY-MM-DD", "");
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
dayValue.value = new Date(Date.parse(time)).getDay();
});

expensesButton.addEventListener('click', function() {
let sum = 0;
//в счетчик заводится количество инпутов псевдомассива expensesItem,
//т.е. столько, сколько нужно пользователю
for (var i = 0; i < expensesItem.length; i++) {
    //в а пойдет наименование расхода, вводимое пользователем в инпут (ключ)
    let a = expensesItem[i].value,
    //префиксным инкрементом получаем следующий за а инпут пользователя (цену(значение))
     b = expensesItem[++i].value;
    if(typeof(a)==='string' && (typeof(a) != null && 
    (typeof(b)!=null) && a != '' && b != '')) {
        console.log("done");
        appData.expenses[a] = b;
        //+b, чтобы поймать данные не в виде строки
        sum += +b;
    } else {
       i = i - 1;
    }
    //вывод полученной общей суммы расходов на экран
    expensesValue.textContent = sum;
}});

//23.07. 23:28. далее код не менялся.
optionalExpensesButton.addEventListener('click', function(){
    for (var i = 0; i < 3; i++) {
        var c = prompt("Статья необязательных расходов?", "");
        if(typeof(c)==='string' && (typeof(c) != null && c != '')) {
            console.log("done");
        } else {
           i = i - 1;
        }
     }
});
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
   
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.budget/30).toFixed();
        alert("Бюджет на день: " + appData.moneyPerDay);
    },
    detectLevel: function() {
        if(appData.moneyPerDay < 100) {
            console.log("минимальный уровень дохода");
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
            console.log("средний уровень дохода");
        } else if (appData.moneyPerDay > 2000) {
            console.log("высокий уровень дохода");
        }else {
            throw("произошла ошибка в вводе данных");
        }
    },
    checkSavings: function() {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?", ""),
        percent = +prompt("Под какой процент?","");
        appData.monthIncome = save/100/12*percent;
        alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
        }
    },

    chooseIncome: function() {
        for (var i = 0; i < 1; i++) {
       var items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)","");
       appData.income.push(prompt ("Может что-то ещё?", ""));
       if(typeof(items)==='string' && (typeof(items) != null && items != '')) {
           console.log("ответ принят");
       } else {
        i = i - 1;
               alert("введите корректные данные");
       }
       appData.income = items.split(",");
       appData.income.sort();
    }
       appData.income.forEach(function(items, i, income) {
        for (let key of income) {
            console.log(key + "Cпособ дополнительного заработка: " + items);
        }
    });
    for (let key in appData) {
        console.log("свойство " + key + " имеет значение " + appData[key]);
    }
    console.log("всего в объекте " + Object.keys(appData).length + " пары ключ-значение");
}};




