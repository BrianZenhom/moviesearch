import { useState } from 'react'
import { useCallback } from 'react'
import './App.css'

import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300),
    [getMovies]
  )

  const handleSubmit = event => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = event => {
    const newSearch = event.target.value
    updateSearch(event.target.value)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className="content">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form_slots">
            <input
              style={{
                border: '1px solid transparent',
                borderColor: error ? 'red' : 'transparent',
              }}
              onChange={handleChange}
              value={search}
              name="query"
              type="text"
              placeholder="Avengers, Deadpool, The Matrix..."
            />
            <button onClick={handleSort}>
              Sort {sort ? 'Newest' : 'Alphabetically'}
            </button>
            <button>Buscar</button>
          </div>
          <span className="error_slot">{error}</span>
        </form>
      </header>

      <main>{loading ? 'Cargando...' : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App
