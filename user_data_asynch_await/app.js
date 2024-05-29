function loadUserData() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'user_data.json', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error('Errore nel caricamento dei dati'));
            }
        };
        xhr.onerror = function() {
            reject(new Error('Errore di caricamento dei dati'));
        };
        xhr.send();
    });
}

async function searchUserByName(name) {
    try {
        const users = await loadUserData();
        const user = users.find(user => user.name.toLowerCase() === name.toLowerCase());
        return user;
    } catch (error) {
        throw new Error('Errore nella ricerca dell\'utente: ' + error.message);
    }
}

async function displayUserInfo() {
    const name = document.getElementById('nameInput').value.trim();
    if (name === '') {
        alert('Inserisci un nome utente.');
        return;
    }

    try {
        const output = document.getElementById('output');
        output.textContent = 'Ricerca utente...';
        
        const user = await searchUserByName(name);
        output.textContent = '';
        
        if (user) {
            const userInfoDiv = document.createElement('div');
            userInfoDiv.textContent = 'ID: ' + user.id + ', Nome: ' + user.name;
            output.appendChild(userInfoDiv);
        } else {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = 'Nessun utente trovato con il nome "' + name + '".';
            output.appendChild(resultDiv);
        }
    } catch (error) {
        console.error(error);
        document.getElementById('output').textContent = 'Errore nella ricerca dell\'utente.';
    }
}

async function displayAllUsers() {
    try {
        const output = document.getElementById('output');
        output.textContent = 'Caricamento dati utenti...';
        
        const users = await loadUserData();
        output.textContent = '';
        
        users.forEach(user => {
            const userInfoDiv = document.createElement('div');
            userInfoDiv.textContent = 'ID: ' + user.id + ', Nome: ' + user.name;
            output.appendChild(userInfoDiv);
        });
    } catch (error) {
        console.error(error);
        document.getElementById('output').textContent = 'Errore nel caricamento dei dati utenti.';
    }
}

document.getElementById('searchButton').addEventListener('click', displayUserInfo);
document.getElementById('showAllButton').addEventListener('click', displayAllUsers);
