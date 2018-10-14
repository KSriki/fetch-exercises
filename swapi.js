// Add your code for SWAPI here!

document.addEventListener("DOMContentLoaded",function(){
    addCrawlListener();
    addPlanetListener();
    addDroids();

});

function fetchAllSW(){
    let promiseForData = fetch('https://swapi.co/api/films/1/');
    promiseForData
      .then(res => res.json())
      .then(json => console.log(json));

}

//renders

function renderCrawl(crawl){
    document.getElementById("crawlDiv").innerHTML = crawl;
}

function renderPlanet(planet){
    document.getElementById("planetData").innerHTML =
    `Planet Name: ${planet.name} <br> Planet Climate: ${planet.climate} <br>`;
}


function renderHome(home,e){


    let details =  document.getElementById(`${e.target.dataset.name}-home-details`);

    details.innerHTML = "Home Planet: " + home.name + "<br>";
    // document.getElementById(event.target.id).innerHTML += home.name
}


function fetchHome(e) {
    let homeworld = fetch(e.target.dataset.home);
    homeworld
    .then(resp => resp.json())
    .then(json =>
        renderHome(json,e));
}

function renderChar(chara){
    let data = document.getElementById("droidData")
    let details = document.createElement("div");
    details.id = chara.name + "-details";
    details.innerHTML
    =
    `Name: ${chara.name}, Height: ${chara.height}, Mass: ${chara.mass} <br/>`

    let button = document.createElement("button");
    button.innerHTML = "Show Homeworld Details";
    button.id = chara.name + "-button";
    button.dataset.home = chara.homeworld;
    button.dataset.name = chara.name;

    details.appendChild(button);


    let innerDetails = document.createElement("div");
    innerDetails.id = chara.name + "-home-details";

    details.appendChild(innerDetails);
    data.appendChild(details);
    //this breaks the listener
    // data.innerHTML += "<br>"
    details.innerHTML += "<br>"
    // debugger;
    document.getElementById(chara.name + "-button").addEventListener("click",fetchHome);


}


//fetch data

function fetchCrawl(){
    let promiseForData = fetch('https://swapi.co/api/films/1/');
    promiseForData
      .then(res => res.json())
      .then(json =>
          renderCrawl(json.opening_crawl));

}

function fetchPlanet(planetId){
    if(isNaN(planetId) || planetId > 61 || planetId < 1){
        document.getElementById("planetData").innerHTML = "Invalid planet id";
        return;
    }
    let promiseForData = fetch(`https://swapi.co/api/planets/${planetId}/`);
    promiseForData
      .then(res => res.json())
      .then(json =>
          renderPlanet(json));
}


function processDroid(url){
    let droid = fetch(url);
    droid
    .then(res => res.json())
    .then(json => renderChar(json));
}


function addCrawlListener(){
    let crawl = document.getElementById("crawlBtn");
    crawl.addEventListener("click",function(){
        fetchCrawl();
    });
}

function addPlanetListener(){


    let form = document.getElementById("planetForm");
        // debugger;
    form.addEventListener("submit",function(e){

        e.preventDefault();
        let planetID = document.getElementById("planetInput");
        fetchPlanet(planetID.value);

    });
}


function addDroids(){

    //r2
    processDroid("https://www.swapi.co/api/people/3");
    //c3
    processDroid("https://www.swapi.co/api/people/2");

}
