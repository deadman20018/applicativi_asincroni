let selectedPizzas = [];
let pizzaCounter = 1; 

function addPizzaToOrder(pizza) {
    const pizzaName = `${pizza} n${pizzaCounter}`; // Aggiunge un identificativo univoco
    selectedPizzas.push(pizzaName);
    document.getElementById("orderMessage").innerText = `${pizzaName} aggiunta all'ordine.`;
    pizzaCounter++; // Incrementa il contatore per il prossimo identificativo
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

    let racePromises = selectedPizzas.map((pizza) => {
        return orderPizza(pizza)
            .then(() => {
                return pizza; 
            });
    });

    Promise.race(racePromises)
        .then((winnerPizza) => {
            updateOrderMessage(`La pizza ${winnerPizza} è stata completata per prima!`);
        })
        .catch((error) => {
            updateOrderMessage(`Errore nella preparazione della pizza: ${error}`);
        });
}

function cancelOrder() {
    selectedPizzas = [];
    document.getElementById("orderMenu").classList.add("hidden");
    document.getElementById("orderMessage").innerText = "Ordine annullato.";
}

function orderPizza(pizza) {
    let currentState = 'impastamento';

    const updateState = (state) => {
        currentState = state;
        updateOrderMessage(`Stato della pizza ${pizza}: ${state}`);
    };

    const transitionTo = (state) => {
        const randomDelay = Math.floor(Math.random() * 3000) + 1000; // Ritardo casuale tra 1 e 4 secondi
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                updateState(state);
                resolve();
            }, randomDelay);
        });
    };

    const states = {
        impastamento: () => transitionTo('condimento'),
        condimento: () => transitionTo('forno'),
        forno: () => {
            let success = Math.random() > 0.2;
            if (success) {
                return transitionTo('pronta');
            } else {
                return transitionTo('bruciata');
            }
        }
    };

    const nextState = () => {
        const nextStateFunction = states[currentState];
        if (nextStateFunction) {
            return nextStateFunction();
        }
        return Promise.reject(`Errore: Stato sconosciuto ${currentState}`);
    };

    const runStateMachine = () => {
        return nextState().then(() => {
            if (currentState !== 'pronta' && currentState !== 'bruciata') {
                return runStateMachine();
            }
        });
    };

    updateState('impastamento');
    return runStateMachine().then(() => {
        if (currentState === 'pronta') {
            updateOrderMessage(`La pizza ${pizza} è pronta!`);
        } else if (currentState === 'bruciata') {
            updateOrderMessage(`La pizza ${pizza} è stata bruciata da gino!`);
        }
    });
}

function updateOrderMessage(message) {
    const orderMessage = document.getElementById("orderMessage");
    orderMessage.innerText += `\n${message}`;
}
