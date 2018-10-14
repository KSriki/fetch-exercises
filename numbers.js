// Add your code for the numbers API here!
document.addEventListener("DOMContentLoaded", function() {
    addOneListener();
    addRandomNumberListener();
    addYearFacts();
    addHundredNums();
});

function renderOne(res) {
    // debugger;
    document.getElementById("one-facts").innerHTML = res

}

function renderRandom(res) {
    document.getElementById("random-math-fact").innerHTML = res;
}

function renderYear(res){
    document.getElementById("year-history").innerHTML = res;
}

function renderNumbers(res){

    let number = document.createElement("div");
    number.id = res;
    number.innerHTML = res + "<br><br>";
    document.getElementById("all-the-numbers").appendChild(number);
}

function fetchNumFact(num) {

    let onePromise = fetch(`http://numbersapi.com/${num}/trivia`);
    return onePromise.then(res => res.text())

}

function fetchOneFact() {
    // debugger;
    fetchNumFact(1).then(text => renderOne(text));

}

function addOneListener() {

    document.getElementById("number-one").addEventListener("click", fetchOneFact);

}

// #random-math-fact
function fetchRandom(num) {
    // debugger;
    if (isNaN(num)) {
        document.getElementById("random-math-fact").innerHTML = "Thats not a number!";
    } else {
        //if empty string reset
        if (!!num) {
            fetchNumFact(num).then(text => renderRandom(text));
        } else {
            document.getElementById("random-math-fact").innerHTML  = "";
        }
    }
}

function addRandomNumberListener() {
    let input = document.getElementById("pick-a-number");
    input.addEventListener("input", function() {
        // debugger;
        fetchRandom(input.value);
    });
}

function fetchDate(num){
    let yearFact = fetch(`http://numbersapi.com/${num}/year`);
    yearFact
        .then(res => res.text())
        .then(text => renderYear(text));



}

function addYearFacts(){

    let num = new Date().getFullYear();
    fetchDate(num);
    let interval = setInterval(function(){
        num-=1;
        fetchDate(num);
    },5000);
}


function fetchHundred(){
    for(let i = 0; i <100;i++){
        // debugger;
        fetchNumFact(Math.floor((Math.random() * 100) + 1))
        .then(text => renderNumbers(text));
    }
}

function addHundredNums(){
    let numbers = document.getElementById("all-numbers-button");
    numbers.addEventListener("click",function(){
        fetchHundred();
    });
}
