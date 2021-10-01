import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  const [movieName, setMovieName] = useState('');
  const [description, setDescription] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data)
    })
  }, [movieList])

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      description: description,
    }).then(() => {
      alert('success insert');
    });
  }

  const deleteMovie = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  }

  const updateDescription = (movie) => {
    Axios.put("http://localhost:3001/api/update/", {
      movieName: movie,
      description: newDescription,
    });
  };


  return (
    <div className="App">
      <h1>CRUD APP</h1>
      <div className="form">

        <label>Movie Name</label>
        <input type="text" name="movieName" onChange={(e) => {
          setMovieName(e.target.value)
        }} />
        <label>Movie Description</label>
        <input type="text" name="description" onChange={(e) => {
          setDescription(e.target.value)
        }} />

        <button onClick={submitReview}>Submit</button>

        {movieList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.description}</p>

              <div className="actions">
                <button onClick={() => {deleteMovie(val.movieName)}}>Delete</button>
                <input type="text" onChange={(e) => {
                  setNewDescription(e.target.value)
                }}/>
                <button onClick={() => {updateDescription(val.movieName)}}>Update</button>
              </div>
            </div>
          )

        })}
      </div>
    </div>
  );
}

export default App;
