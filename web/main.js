fetch('http://localhost:1234/movies')
    .then (res => res.json())
    .then (movies => {
        const html = movies.map(movie => {
            return `
                <article data-id="${movie.id}">
                    <h2>${movie.title}</h2>
                    <img src="${movie.poster}" alt="${movie.title}">
                    <p>${movie.duration} minutes</p>

                    <button>Eliminar</button>
                </article>
            `
        }).join('')

        document.querySelector('main').innerHTML = html

        document.addEventListener('click', (event) => {
            if (event.target.matches('button')){
                const article = event.target.closest('article')
                const id = article.dataset.id

                fetch(`http://localhost:1234/movies/${id}`, {
                    method: 'DELETE',
                })
                .then(res => {
                    if(res.ok){
                        article.remove()
                    }
                })
            }
        })
    })