import { useState, useMemo } from 'react'
import { searchMovies } from '../services/movies'
import { useRef } from 'react'
import { useCallback } from 'react'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    if (!movies) return
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : [...movies].sort((a, b) => b.year - a.year)
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, error }
}
