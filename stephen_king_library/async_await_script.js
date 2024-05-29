document.getElementById('show-all-button').addEventListener('click', async function() {
    const booksList = document.getElementById('books-list');
    try {
        const response = await fetch('https://stephen-king-api.onrender.com/api/books');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const books = Array.isArray(data.data) ? data.data : [data.data];
        booksList.innerHTML = '';
        books.forEach(book => {
            const formattedBook = {
                title: book.Title,
                year: book.Year,
                publisher: book.Publisher,
                isbn: book.ISBN,
                pages: book.Pages,
                notes: Array.isArray(book.Notes) ? book.Notes.join(', ') : ''
            };
            
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Titolo:</strong> ${formattedBook.title}<br>
                <strong>Anno:</strong> ${formattedBook.year}<br>
                <strong>Editore:</strong> ${formattedBook.publisher}<br>
                <strong>ISBN:</strong> ${formattedBook.isbn}<br>
                <strong>Pagine:</strong> ${formattedBook.pages}<br>
                <strong>Note:</strong> ${formattedBook.notes}<br>
            `;
            booksList.appendChild(li);
        });
    } catch (error) {
        const listItem = document.createElement('li');
        listItem.innerHTML = 'Ci è stato un problema con la connessione al server, error';
        booksList.appendChild(listItem);
        console.error('Ci è stato un problema con la operazione di fetch:', error);
    }
});

