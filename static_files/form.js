const form = document.getElementById("foodForm");
const container = document.getElementById("foodContainer"); //declaration of the form and the container for the present ranked food

form.addEventListener("submit", function (e) {
    e.preventDefault();
    // so no reload while

    const name = document.getElementById("foodname").value.trim();
    const desc = document.getElementById("fooddesc").value.trim();
    const img = document.getElementById("foodimg").value.trim();
    const rank = document.getElementById("foodrank").value.trim();
    //get the inputs from the input data in form

    if (!name || !desc || !img || !rank) {
        alert("Please fill out all fields!");
        return; //everthing is kinda required so yeah
    }

    const rankNum = parseInt(rank);

    if (rankNum < 1) {
        alert("Rank must be atleast 1");
        return; //since no rank 0 or negative
    }

    const foods = container.querySelectorAll(".food-design"); //checks in container for all cards  

    if (foods.length >= 1) {
        for (let i = 0; i < foods.length; i++) {
            if (parseInt(foods[i].getAttribute("foodrank")) == rankNum) {
                alert("There is already food with this rank"); //if food with same rank requests another
                return;
            }
        }
    }

    const food = document.createElement("div");
    food.classList.add("food-design");
    food.setAttribute("foodrank", rankNum); //design for food card object, attribute si rank para madali maaccess

    let inserted = false;

    for (let i = 0; i < foods.length; i++) {
        const currentRank = parseInt(foods[i].getAttribute("foodrank")); // extracts the rank from each card

        if (rankNum < currentRank) {
            container.insertBefore(food, foods[i]); //inserts where specific food should be based on rank   
            inserted = true;
            break;
        }

    }

    if (!inserted) {
        container.appendChild(food);//if not inserted then current food will just be appended
    }
    //design for food card with this
    food.innerHTML = `
        <p><strong>Rank:</strong> ${rankNum}</p>
        <img src="${img}" alt="${name}" width="150"> 
        <h3>${name}</h3>
        <p>${desc}</p>
        <button type="button" class="delete-button">Delete Food</button>
    `;
    //creates the delete button which removes the food 
    food.querySelector(".delete-button").addEventListener("click", function () {
        food.remove();
    });

    form.reset();//reset 
});