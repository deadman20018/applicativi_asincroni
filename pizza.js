let selectedPizzas = [];

function addPizzaToOrder(pizza) {
    selectedPizzas.push(pizza);
    document.getElementById("orderMessage").innerText = `${pizza} aggiunta all'ordine.`;
}

function showOrderMenu() {
    if (selectedPizzas.length === 0) {
        alert("Seleziona almeno una pizza prima di confermare l'ordine.");
        return;
    }

    const orderList = document.getElementById("orderList");
    orderList.innerHTML = "";
    selectedPizzas.forEach((pizza) => {
        const li = document.createElement("li");
        li.innerText = pizza;
        orderList.appendChild(li);
    });

    document.getElementById("orderMenu").classList.remove("hidden");
}

function confirmOrder() {
    document.getElementById("orderMessage").innerText = "Preparazione delle pizze in corso...";
    document.getElementById("orderMenu").classList.add("hidden");

    let orderPromises = selectedPizzas.map((pizza) => orderPizza(pizza));

    orderPromises.forEach((promise, index) => {
        promise
            .then(() => {
                updateOrderMessage(`La pizza ${selectedPizzas[index]} è pronta!`);
            })
            .catch((error) => {
                updateOrderMessage(`Errore nella preparazione della pizza ${selectedPizzas[index]}: ${error}`);
            });
    });

    Promise.all(orderPromises)
        .then(() => {
            document.getElementById("orderMessage").innerText += "\nOrdine completato!";
            selectedPizzas = [];
        })
        .catch(() => {
        });
}

function cancelOrder() {
    selectedPizzas = [];
    document.getElementById("orderMenu").classList.add("hidden");
    document.getElementById("orderMessage").innerText = "Ordine annullato.";
}

function orderPizza(pizza) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = Math.random() > 0.2;

            if (success) {
                resolve(`La pizza ${pizza} è pronta!`);
            } else {
                reject(`La pizza ${pizza} è stata bruciata da gino.`);
            }
        }, 3000); 
    });
}

function updateOrderMessage(message) {
    const orderMessage = document.getElementById("orderMessage");
    orderMessage.innerText += `\n${message}`;
}
