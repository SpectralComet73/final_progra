document.addEventListener('DOMContentLoaded', function(event) {
  const search = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  let data = [];
  let search_term = '';

  // Cargar datos del JSON
  fetch('/final_progra/search.json')
    .then(response => response.json())
    .then(data_server => {
      data = data_server;
    })
    .catch(error => console.error('Error fetching search data:', error));

  // Escuchar cambios en el campo de búsqueda
  search.addEventListener('input', event => {
    search_term = event.target.value.toLowerCase();
    showList();
  });

  // Función para mostrar la lista de resultados
  const showList = () => {
    results.innerHTML = '';
    if (search_term.length <= 0) return;

    const match = new RegExp(`${search_term}`, 'gi');
    const result = data.filter(article => match.test(article.title) || match.test(article.content));

    if (result.length == 0) {
      const li = document.createElement('div');
      li.innerHTML = `No se encontraron resultados :(`;
      results.appendChild(li);
    } else {
      result.forEach(article => {
        const div = document.createElement('div');
        div.innerHTML = `<h2><a href="${article.url}">${article.title}</a>`;
        results.appendChild(div);
      });
    }
  };
});
