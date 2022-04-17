import { data } from './data.js';


//Variables
let buttonFiftyClickChecker = 0;
let buttonGoogleClickChecker = 0;
let answersIndex = 0;
let questionIndex = 1;
let dataIndexArray = 0;
let timer = 30;
let prizeBackColor = 14


let nameChange = data[dataIndexArray].options[answersIndex].name
let boolean = data[dataIndexArray].options[answersIndex].correct

// DOM elements
let answers = document.querySelectorAll('.option');
let google = document.querySelector('.friend')
let fifty = document.querySelector('.fifty')
let time = document.querySelector('.wrapTimer');
let saveSumPop = document.querySelector('.saveSumPopUp')
let prizeWin = document.querySelectorAll('.saveSumPopUp p')
let prizeWinBtn = document.querySelector('.saveSumPopUp button')
let countdown = document.querySelector('.googlePopUp')
let question = document.querySelector('.questions p')
let questionCounter = document.querySelector('.question')
let prize = document.querySelectorAll('.container p')
let next = document.querySelector('.next')
let previous = document.querySelector('.previous')
let newGame = document.querySelector('.new')


window.onload = function () {
    prize[prizeBackColor].style.color = " #ffff00";
    prize[prizeBackColor].style.fontSize = "28px";
    generateElements();
    answersIndex = 0;
}

function generateElements() {

    questionCounter.textContent = `Question ${questionIndex}`
    question.textContent = data[dataIndexArray].question;

    for (let el of answers) {
        el.style.visibility = "";
        boolean = data[dataIndexArray].options[answersIndex].correct
        nameChange = data[dataIndexArray].options[answersIndex].name
        el.textContent = nameChange;
        el.style.backgroundColor = ""
        el.setAttribute('checker', boolean);
        answersIndex++;
    }
};

function buttonJokerClickChecker() {

    if (buttonFiftyClickChecker === 0) {
        fifty.disabled = false;
        fifty.setAttribute("id", "fiftyHover");
    };

    if (buttonGoogleClickChecker === 0) {
        google.disabled = false;
        google.setAttribute("id", "hover");
    };
};

//Гугъл жокер
google.addEventListener('click', (e) => {
    buttonGoogleClickChecker++;

    let confirmation = confirm("Наистина ли искате да използвате помощ от Гугъл? Ако го използвате ще имате 30 секунди на разположение.")
    if (confirmation) {
        time.style.display = 'flex';
        let a = setInterval(myFunc, 1000)

        function myFunc() {
            if (timer == 0) {
                time.style.display = "none";
                clearInterval(a)
                timer = 30;
            }
            countdown.textContent = timer
            return timer -= 1;
        }
    } else {
        return;
    }
    if (buttonGoogleClickChecker > 0) {
        //Понякога когато натиска на Гугъл жокера хваща бутона,а не гугъл изображението, затова правя проверка за parentElementa!
        if (e.target.parentElement.className === "jokers") {
            e.target.parentElement.children[1].style.backgroundColor = "red"
            e.target.parentElement.children[1].disabled = true;
            e.target.parentElement.children[1].removeAttribute("id");
        } else {
            e.target.parentElement.style.backgroundColor = "red"
            e.target.parentElement.disabled = true;
            e.target.parentElement.removeAttribute("id");
        }
    }
});


// 50:50 жокер

fifty.addEventListener("click", fiftyPercent)

function fiftyPercent(e) {
    buttonFiftyClickChecker++;
    let one = Math.floor(Math.random() * 4);

    let two = Math.floor(Math.random() * 4);

    if (answers[one] !== answers[two] && answers[one].getAttribute("checker") === "false" && answers[two].getAttribute("checker") === "false") {
        let confirmation = confirm("Наистина ли искате да използвате 50 на 50?");
        if (confirmation) {
            answers[one].style.visibility = "hidden";
            answers[two].style.visibility = "hidden";
            e.target.disabled = true;
            e.target.style.backgroundColor = "red";
            e.target.removeAttribute("id");
        }
    } else {
        fiftyPercent(e);
    }

};

// Провери дали отговора е верен
answers.forEach(el => el.addEventListener('click', correctAnswer));
function correctAnswer(e) {

    if (questionIndex == 5 && e.target.getAttribute('checker') === "true") {
        saveSumPop.style.display = "flex";

    } else if (questionIndex == 15 && e.target.getAttribute('checker') === "true") {
        saveSumPop.style.display = "flex";
        prizeWin[0].textContent = "Поздравления спечелихте голямата награда!";
        prizeWin[1].textContent = "100 000 лева";
        prizeWinBtn.textContent = "Нова Игра";
    }

    answersIndex = 0;
    for (let el of answers) {
        if (el.getAttribute('checker') === "true") {
            el.style.backgroundColor = "green";
            ++answersIndex;
        } else {
            if (el.textContent !== "") {
                el.style.backgroundColor = "red";
                ++answersIndex;
            } else {
                el.style.backgroundColor = "none"
            }
        }
    }
    google = document.querySelector('.friend');
    fifty = document.querySelector('.fifty');

    //Забрани жокерите след като си избрал отговор
    google.disabled = true;
    google.removeAttribute("id");
    fifty.disabled = true;
    fifty.removeAttribute("id");


};

prizeWinBtn.addEventListener("click", (e) => {
    if (e.target.textContent === "Продължи") {
        saveSumPop.style.display = "none";
    } else {
        gameNew();
    }
})


// Нова игра бутон
function gameNew() {
    let confirmed = confirm("Сигурни ли сте,че искате да започнете нова игра?")
    if (!confirmed) {
        return;
    }

    saveSumPop.style.display = "none";
    prizeWin[0].textContent = "Поздравления спечелихте първа сигурна сума!";
    prizeWin[1].textContent = "500 лева";
    prizeWinBtn.textContent = "Продължи";
    
    prize[prizeBackColor - questionIndex + 1].style.fontSize = "";
    // Цветова гама за въпроса на който се намираш
    if (prize[prizeBackColor - questionIndex + 1].className === "save") {
        prize[prizeBackColor - questionIndex + 1].style.color = "#e9e6e9f1";
    } else {
        prize[prizeBackColor - questionIndex + 1].style.color = "#e7a818";
    }

    if (buttonGoogleClickChecker > 0) {
        //Понякога когато натиска на Гугъл жокера хваща бутона,а не гугъл изображението, затова правя проверка за parentElementa!
        if (google.parentElement.className === "jokers") {
            google.parentElement.children[1].style.backgroundColor = ""
            google.parentElement.children[1].disabled = false;
            google.parentElement.children[1].setAttribute("id", "hover");
        } else {
            google.parentElement.style.backgroundColor = ""
            google.parentElement.disabled = false;
            googlegoogle.parentElement.setAttribute("id", "hover");
        }
    }

    fifty.disabled = false;
    fifty.style.backgroundColor = "";
    fifty.setAttribute("id", "hover");

    answersIndex = 0;
    questionIndex = 1;
    dataIndexArray = 0;
    buttonFiftyClickChecker = 0;
    buttonGoogleClickChecker = 0;
    timer = 30;
    return window.onload();
}

newGame.addEventListener("click", gameNew);

// Бутон напред
next.addEventListener("click", () => {
    answersIndex = 0;
    // Цветова гама за въпроса на който се намираш
    prize[prizeBackColor - questionIndex].style.color = " #ffff00";
    prize[prizeBackColor - questionIndex].style.fontSize = "28px";
    prize[prizeBackColor - questionIndex + 1].style.fontSize = "";

    // Проверка за сигурна сума
    if (prize[prizeBackColor - questionIndex + 1].className === "save") {
        prize[prizeBackColor - questionIndex + 1].style.color = "#e9e6e9f1";
    } else {
        prize[prizeBackColor - questionIndex + 1].style.color = "#e7a818";
    }
    ++questionIndex;
    ++dataIndexArray;

    //Проверка да не има несъществуващ въпрос
    if (questionIndex > 15) {
        questionIndex = 15;
    }

    generateElements();

    //Провери дали жокерите са използвани и ако не са ги активирай! За справка виж фунцкия correctAnswer

    buttonJokerClickChecker();
});



// Бутон назад
previous.addEventListener("click", () => {
    answersIndex = 0;
    // Проверка да не има отрицателен въпрос
    if (dataIndexArray !== 0) {
        --dataIndexArray;
        --questionIndex;
    }

    // Цветова гама за въпроса на който се намираш
    prize[prizeBackColor - questionIndex + 1].style.color = " #ffff00";
    prize[prizeBackColor - questionIndex + 1].style.fontSize = "28px";
    prize[prizeBackColor - questionIndex].style.fontSize = "";



    if (prize[prizeBackColor - questionIndex].className === "save") {
        prize[prizeBackColor - questionIndex].style.color = "#e9e6e9f1";
    } else {
        prize[prizeBackColor - questionIndex].style.color = "#e7a818";

    }

    generateElements();

    //Провери дали жокерите са използвани и ако не са ги активирай! За справка виж фунцкия correctAnswer

    buttonJokerClickChecker();
})



