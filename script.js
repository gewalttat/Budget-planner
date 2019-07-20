let money, time;


function start(){
    money = +prompt("Ваш бюджет на месяц?", "");
time = prompt("Введите дату в формате YYYY-MM-DD", "");
while (isNaN(money)||(money=='')||(money==null)) {
    alert("введите корректные данные");
    money = +prompt("Ваш бюджет на месяц?", "");
}
}
start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {
        1 : "",
        2 : ""
    },
    income: [],
    savings: true,
    chooseExpenses: function() {
        for (var i = 0; i < 2; i++) {
            let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
             b = prompt("Во сколько обойдется?", "");
            if(typeof(a)==='string' && (typeof(a) != null && 
            (typeof(b)!=null) && a != '' && b != '')) {
                console.log("done");
                appData.expenses[a] = b;
            } else {
               i = i - 1;
            }
        }
    },
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
    chooseOptExpenses: function(){
        for (var i = 0; i < 3; i++) {
            var c = prompt("Статья необязательных расходов?", "");
            if(typeof(c)==='string' && (typeof(c) != null && c != '')) {
                console.log("done");
            } else {
               i = i - 1;
            }
         }
    },
    chooseIncome: function(){
       let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)","");
       appData.income = items.split(","); 
    }
    };




