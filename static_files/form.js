const form = document.getElementById("foodForm");
const container = document.getElementById("foodContainer");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("foodname").value.trim();
    const desc = document.getElementById("fooddesc").value.trim();
    const img = document.getElementById("foodimg").value.trim();
    const rank = document.getElementById("foodrank").value.trim();

    if (!name || !desc || !img || !rank) {
        alert("Please fill out all fields!");
        return;
    }

    const rankNum = parseInt(rank);

    if (rankNum < 1) {
        alert("Rank must be atleast 1");
        return;
    }

    const foods = container.querySelectorAll(".food-design");

    if (foods.length >= 1) {
        for (let i = 0; i < foods.length; i++) {
            if (parseInt(foods[i].getAttribute("foodrank")) == rankNum) {
                alert("There is already food with this rank");
                return;
            }
        }
    }

    const food = document.createElement("div");
    food.classList.add("food-design");
    food.setAttribute("foodrank", rankNum);

    let inserted = false;

    for (let i = 0; i < foods.length; i++) {
        const currentRank = parseInt(foods[i].getAttribute("foodrank"));

        if (rankNum < currentRank) {
            container.insertBefore(food, foods[i]);
            inserted = true;
            break;
        }

    }

    if (!inserted) {
        container.appendChild(food);
    }

    food.innerHTML = `
        <p><strong>Rank:</strong> ${rankNum}</p>
        <img src="${img}" alt="${name}" width="150">
        <h3>${name}</h3>
        <p>${desc}</p>
        <button type="button" class="delete-button">Delete Food</button>
    `;

    food.querySelector(".delete-button").addEventListener("click", function () {
        food.remove();
    });

    form.reset();
});