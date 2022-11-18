import React from 'react'

import './style.css';

export default function Movie(props) {

    return (
        <div className='card'>
            <div><img alt='asdasd' src={props.movie.imageLink}></img></div>
            <p><b>Name: </b>{props.movie.name}</p>
            <p><b>Genre: </b>{props.movie.category}</p>
            <p><b>Diretor: </b>{props.movie.director}</p>
            <p><b>Running Time: </b>{props.movie.runningTime}</p>
        </div>
    )
}