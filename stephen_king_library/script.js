fetch('https://stephen-king-api.onrender.com/api/books')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const booksList = document.getElementById('books-list');
    const books = Array.isArray(data.data) ? data.data : [data.data];
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
        <strong>Title:</strong> ${formattedBook.title}<br>
        <strong>Year:</strong> ${formattedBook.year}<br>
        <strong>Publisher:</strong> ${formattedBook.publisher}<br>
        <strong>ISBN:</strong> ${formattedBook.isbn}<br>
        <strong>Pages:</strong> ${formattedBook.pages}<br>
        <strong>Notes:</strong> ${formattedBook.notes}<br>
      `;
      booksList.appendChild(li);
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
