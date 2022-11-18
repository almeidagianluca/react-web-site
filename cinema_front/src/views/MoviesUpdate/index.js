import React, { useState, useEffect } from 'react'
import axios from "axios";

import './style.css';

const user = JSON.parse(localStorage.getItem("user"));

export default function MoviesUpdate() {

  const urlAPI = "http://localhost:5254/api/Movie";

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [director, setDirector] = useState('');
  const [runningTime, setRunningTime] = useState('');

  const [movieList, setMovieList] = useState(
    [{ "id": 0, "name": "", "category": "", "director": "", "runningTime": "" }]
  )

  useEffect(() => {
    axios(urlAPI, { headers: { Authorization: 'Bearer ' + user.token } })
      .then(resp => {
        setMovieList(resp.data);
      })
  }, []);

  useEffect(() => {
    (async () => {
      const result = await axios(urlAPI);
      setMovieList(result.data);
    })();
  }, [movieList]);

  const save = () => {
    const newMovie = { id, name, category, director, runningTime };
    newMovie.id = Number(newMovie.id);
    const metodo = newMovie.id ? "put" : "post";
    const url = newMovie.id ? `${urlAPI}/${newMovie.id}` : urlAPI;
    axios[metodo](url, newMovie, {
      headers: {
          Authorization:
              'Bearer ' + user.token
      }
  })
    .catch((error) => {
      alert("Unauthorized")
    })
  }

  const remove = (movie) => {
    const url = urlAPI + "/" + movie.id;
    if (window.confirm("Are tou sure?")) {
      axios["delete"](url, {
        headers: {
          Authorization:
              'Bearer ' + user.token
      }
      })
      .catch((error) => {
        console.log(`Bearer ${user.token}`)
        alert("Unauthorized")
      })
    }
  }

  const update = (movie) => {
    setId(movie.id);
    setName(movie.name);
    setCategory(movie.category);
    setDirector(movie.director);
    setRunningTime(movie.runningTime)
  }

  const cancel = (movie) => {
    setId(0);
    setName("");
    setCategory("");
    setDirector("");
    setRunningTime("");
  }

  return (
    <div className='movie-container'>
      <div>
        <label> Name: </label>
        <input
          type="text"
          id="name"
          placeholder="Movie name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label> Category: </label>
        <input
          type="text"
          id="category"
          placeholder="Movie category"
          name="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <label> Director: </label>
        <input
          type="text"
          id="director"
          placeholder="Movie director"
          name="director"
          value={director}
          onChange={e => setDirector(e.target.value)}
        />
        <label> Running Time: </label>
        <input
          type="text"
          id="runningTime"
          placeholder="Movie running time"
          name="runningTime"
          value={runningTime}
          onChange={e => setRunningTime(e.target.value)}
        />
        <button onClick={save}>
          Save
        </button>
        <button onClick={cancel}>
          Cancel
        </button>
      </div>
      <table className="movie-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Director</th>
            <th>Running Time</th>
          </tr>
        </thead>
        <tbody>
          {
            movieList.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.name}</td>
                <td>{movie.category}</td>
                <td>{movie.director}</td>
                <td>{movie.runningTime}</td>
                <td>
                  <button onClick={() => update(movie)}
                  >Update</button>
                </td>
                <td>
                  <button onClick={() => remove(movie)}
                  >Remove</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}