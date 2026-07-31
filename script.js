let history = [];
const themeBtn = document.getElementById("themeBtn");
const display = document.getElementById("display");
console.log(display);

const buttons = document.querySelectorAll(".btn");

buttons.forEach(function(button) {

   
    button.addEventListener("click", function () {

    const value = button.innerText;

    if (value === "AC") {
        display.value = "";
    }
    else if (value === "DEL") {
        display.value = display.value.slice(0, -1);
    }
    else if (value === "=") {

        //display.value = eval(display.value);
        const expression = display.value;
const result = eval(expression);

display.value = result;

history.push(`${expression} = ${result}`);
localStorage.setItem(
    "history",
    JSON.stringify(history)
);
updateHistory();

    }
    else {
        display.value += value;
    }

});

});
// Keyboard Support
document.addEventListener("keydown", function(e) {

    const key = e.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "."
    ) {
        display.value += key;
    }

    else if (key === "Enter") {
        try {
            display.value = eval(display.value);
        }
        catch {
            display.value = "Error";
        }
    }

    else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }

    else if (key === "Escape") {
        display.value = "";
    }

});
// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerText = "☀️ Light Mode";
}

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeBtn.innerText = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.innerText = "🌙 Dark Mode";
    }

});
function updateHistory() {

    const historyDiv = document.getElementById("history");

    historyDiv.innerHTML = "";

    history.forEach(function(item) {

        historyDiv.innerHTML += `<p>${item}</p>`;

    });

}
const clearHistoryBtn =
    document.getElementById("clearHistory");
    clearHistoryBtn.addEventListener("click", function() {

    history = [];

    updateHistory();

});
localStorage.setItem(
    "history",
    JSON.stringify(history)
);
