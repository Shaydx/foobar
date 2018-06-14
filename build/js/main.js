"use strict";

document.addEventListener("DOMContentLoaded", loadScript);

let bar;
let tap;
let beerTypesShown = false;

function loadScript() {
    let data = FooBar.getData();
    bar = JSON.parse(data);

    //console.log(bar);

    // Beer Types - See if the data is already retrived, if true, then don't show more.
    if (beerTypesShown === false) {
        // Find Template
        let beerTemplate = document.querySelector("#beerTypes").content;
        // ForEach BeerTypes
        bar.beertypes.forEach(function (beertype) {
            let beer = beerTemplate.cloneNode(true);

            //Clone Elements
            beer.querySelector(".name").textContent = beertype.name + " (" + beertype.alc + "%)";
            beer.querySelector(".category").textContent = beertype.category;
            beer.querySelector(".description").textContent = beertype.description.appearance;
            //beer.querySelector(".popularity").textContent = beertype.popularity;
            //beer.querySelector(".pouringSpeed").textContent = beertype.pouringSpeed;
            beer.querySelector(".poster").src = "img/beers/" + beertype.label;

            // Appending the cloned Templates
            document.querySelector(".beerType").appendChild(beer);
        });
        beerTypesShown = true;
    }

    // Find Template
    let bartenderTemplate = document.querySelector("#bartenders").content;

    //Clear Template
    document.querySelector("#bartendersWrap").innerHTML = "";


    // Bartenders Working
    document.querySelector(".bartendersIn").textContent = "There are currently " + bar.bartenders.length + " Bartenders at work";

    // ForEach Bartenders
    bar.bartenders.forEach(function (bartender) {
        let bartenderClone = bartenderTemplate.cloneNode(true);

        //Clone Elements
        bartenderClone.querySelector(".bartenderName").textContent = bartender.name;
        bartenderClone.querySelector(".bartenderWorking").textContent = bartender.status;

        // Beautifying the status.
        switch (bartender.status) {
            case 'READY':
                bartenderClone.querySelector(".bartender").style.borderColor = "green";
                bartenderClone.querySelector(".bartenderWorking").textContent = "";
                break;
            case 'WORKING':
                bartenderClone.querySelector(".bartender").style.borderColor = "orange";
                bartenderClone.querySelector(".bartenderWorking").textContent = "";
                break;
        }

        // checking if serving customers
        if (bartender.servingCustomer == null) {
            bartenderClone.querySelector(".servingCustomer").textContent = "Currently Serving No Customer";
        } else {
            bartenderClone.querySelector(".servingCustomer").textContent = "Currently Serving Customer " + bartender.servingCustomer;
        }

        bartenderClone.querySelector(".statusDetail").textContent = "StatusDetail " + bartender.statusDetail;

        switch (bartender.statusDetail) {
            case 'waiting':
                bartenderClone.querySelector(".statusDetail").textContent = "Waiting";
                bartenderClone.querySelector(".statusDetail").style.color = "green";
                break;
                case 'startServing':
                bartenderClone.querySelector(".statusDetail").textContent = "New Customer";
                break;
                case 'reserveTap':
                bartenderClone.querySelector(".statusDetail").textContent = "Reserve Tap";
                break;
            case 'pourBeer':
                bartenderClone.querySelector(".statusDetail").textContent = "Pouring";
                break;
            case 'releaseTap':
                bartenderClone.querySelector(".statusDetail").textContent = "Released Tap";
                break;
            case 'receivePayment':
                bartenderClone.querySelector(".statusDetail").textContent = "Receiving Payment";
                break;
            default:
                bartenderClone.querySelector(".usingTap").textContent = "Not Pouring";
                break;
        }

        // Bar Taps
        bartenderClone.querySelector(".usingTap").textContent = "Using Tap " + bartender.usingTap;

        // Showing which beer tap is being used with name instead of ID. (KAN GØRES BEDRE MED FORLOOP)
        switch (bartender.usingTap) {
            case 0:
                bartenderClone.querySelector(".usingTap").textContent = "Pouring " + bar.taps[0].beer;
                break;
            case 1:
                bartenderClone.querySelector(".usingTap").textContent = "Pouring " + bar.taps[1].beer;
                break;
            case 2:
                bartenderClone.querySelector(".usingTap").textContent = "Pouring " + bar.taps[2].beer;
                break;
            case 3:
                bartenderClone.querySelector(".usingTap").textContent = "Pouring " + bar.taps[3].beer;
                break;
            case 4:
                bartenderClone.querySelector(".usingTap").textContent = "Pouring " + bar.taps[4].beer;
                break;
            case 5:
                bartenderClone.querySelector(".usingTap").textContent = "Pouring " + bar.taps[5].beer;
                break;
            case 6:
                bartenderClone.querySelector(".usingTap").textContent = "Pouring " + bar.taps[6].beer;
                break;
            default:
                bartenderClone.querySelector(".usingTap").textContent = "Not Pouring";
                break;
        }

        document.querySelector("#bartendersWrap").appendChild(bartenderClone);

        // Kegs Capacity!

        let percentageLeft = "";
        let i;
        document.querySelector("#tapsLevel").innerHTML = "";
        for (i = 0; i < bar.taps.length; i++) {
            percentageLeft = Math.round(bar.taps[i].level / bar.taps[i].capacity * 100);

            let tapWrapper = document.createElement("div");
            tapWrapper.className = "tapContainer";
            tapWrapper.innerHTML = "<p class='beerLabel'>" + bar.taps[i].beer + " " + "(" + percentageLeft + "%)" + "</p>";

            let tapContent = document.createElement('div');
            tapContent.id = "tap-" + bar.taps[i].id; tapContent.className = "beer" + bar.taps[i].id;
            document.querySelector("#tapsLevel").appendChild(tapWrapper);
            tapWrapper.append(tapContent);

            let height = bar.taps[i].level / bar.taps[i].capacity * 100;
            tapContent.style.height = height + "%";

            if (height == 0) {
                tapContent.style.background = "red";
                tapContent.style.color = "white";
            }
        }
  });

    // Storage

    let x;
    document.querySelector("#storage").innerHTML = "";
    for (x = 0; x < bar.storage.length; x++) {

        let storageWrapper = document.createElement("div");
        storageWrapper.className = "storageContainer";
        storageWrapper.innerHTML = "<p>" + bar.storage[x].name + " - " + bar.storage[x].amount + " left" + "</p>";

        document.querySelector("#storage").appendChild(storageWrapper);
    }


    

    ////////////////////////////////////////////////////////////////////
    // SERVINGS - PEOPLE WHO ORDERED
    // Find Template
    let servingTemplate = document.querySelector("#servings").content;

    //Clear Template
    document.querySelector(".serving").innerHTML = "";

    // ForEach BeerTypes
    bar.serving.forEach(function (serving) {
        let servings = servingTemplate.cloneNode(true);

        //Clone Elements
        servings.querySelector(".servingOrder").textContent = serving.order.join(", ");

        // Appending the cloned Templates
        document.querySelector(".serving").appendChild(servings);
    });


    // People in Queue
    document.querySelector("#queue").innerHTML = "<h3>" + bar.queue.length + "</h3>" + " People in line";
    document.querySelector("#served").innerHTML = "<h3>" + bar.serving.length + "</h3>" + " Are currently being served";

    // CLOSING IN TIME 
    let today = new Date();
    let closeTime = new Date(0, 0, 0, 21, 59, 0, 0);
    let timeLeftHour = (closeTime.getHours() - today.getHours() + " Hours & ") + (closeTime.getMinutes() - today.getMinutes() + " Minutes");

    document.querySelector("#closingIn").textContent = bar.bar.name + " is closing in " + timeLeftHour;

}

// Navigation

// Update script every 5 seconds.
setInterval(function () {
    loadScript();
}, 5000);