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

for (var i = 0; i < 2; i++) {
    let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
    b = prompt("Во сколько обойдется?", "");
    if(typeof(a)==='string' && (typeof(a) != null && 
    (typeof(b)!=null) && a != '' && b != '')) {
        console.log("done");
        appData.expenses[a] = b;
    } else {}
}

appData.moneyPerDay = appData.budget/30;

alert("daily budget: " + appData.moneyPerDay);

if(appData.moneyPerDay < 100) {
    console.log("минимальный уровень дохода");
} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
    console.log("средний уровень дохода");
} else if (appData.moneyPerDay > 2000) {
    console.log("высокий уровень дохода");
}else {
    throw("произошла ошибка в вводе данных");
}