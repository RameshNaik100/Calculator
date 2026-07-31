let history =
    JSON.parse(localStorage.getItem("history"))
    || [];

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const themeBtn = document.getElementById("themeBtn");
const clearHistoryBtn =
    document.getElementById("clearHistory");

updateHistory();

/* Button Clicks */

buttons.forEach(function(button){

    button.addEventListener("click", function(){

        const value = button.innerText;

        if(value === "AC"){

            display.value = "";

        }
        else if(value === "DEL"){

            display.value =
                display.value.slice(0,-1);

        }
        else if(value === "="){

            calculate();

        }
        else{

            display.value += value;

        }

    });

});

/* Keyboard Support */

document.addEventListener("keydown", function(e){

    const key = e.key;

    if(
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"
    ){

        display.value += key;

    }
    else if(key === "Enter"){

        calculate();

    }
    else if(key === "Backspace"){

        display.value =
            display.value.slice(0,-1);

    }
    else if(key === "Escape"){

        display.value = "";

    }

});

/* Calculation */

function calculate(){

    try{

        const expression =
            display.value;

        const result =
            eval(expression);

        display.value = result;

        history.push(
            `${expression} = ${result}`
        );

        localStorage.setItem(
            "history",
            JSON.stringify(history)
        );

        updateHistory();

    }
    catch{

        display.value = "Error";

    }

}

/* History */

function updateHistory(){

    const historyDiv =
        document.getElementById("history");

    historyDiv.innerHTML = "";

    history.forEach(function(item){

        historyDiv.innerHTML +=
            `<p>${item}</p>`;

    });

}

clearHistoryBtn.addEventListener(
    "click",
    function(){

        history = [];

        localStorage.removeItem(
            "history"
        );

        updateHistory();

    }
);

/* Theme */

if(
    localStorage.getItem("theme")
    === "dark"
){
    document.body.classList.add("dark");
    themeBtn.innerText =
        "☀️ Light Mode";
}

themeBtn.addEventListener(
    "click",
    function(){

        document.body.classList.toggle(
            "dark"
        );

        if(
            document.body.classList.contains(
                "dark"
            )
        ){

            localStorage.setItem(
                "theme",
                "dark"
            );

            themeBtn.innerText =
                "☀️ Light Mode";

        }
        else{

            localStorage.setItem(
                "theme",
                "light"
            );

            themeBtn.innerText =
                "🌙 Dark Mode";

        }

    }
);