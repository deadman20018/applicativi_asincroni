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
            reject(new Error('Errore di rete'));
        };
        xhr.send();
    });
}

async function displayUserData() {
    try {
        const output = document.getElementById('output');
        output.textContent = 'Caricamento dati utenti...';
        
        const users = await loadUserData(); 
        output.textContent = '';
        
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user-entry';
            userDiv.innerHTML = `
                id: ${user.id}, nome: ${user.name}
            `;
            output.appendChild(userDiv);
        });
    } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
        document.getElementById('output').textContent = 'Errore nel caricamento dei dati';
    }
}


document.getElementById('loadDataButton').addEventListener('click', displayUserData);
