import React, {useState, useEffect} from 'react'
import axios from "axios";

import Movie from '../../components/Movie'
import './style.css';

export default function Catalog() {
    const urlAPI = "http://localhost:5254/api/Movie";

    const [movieList , setMovieList] = useState(
        [{"id":0,"name":"","category":"","director":"","runningTime":"", "imageLink": ""}]
    )

    useEffect(() => {
        (async () => {
          const result = await axios(urlAPI);
          setMovieList(result.data);
        })();
      }, []);
    
  return (
    <div>
        <h1 className='title'>Movie Catalog</h1>
        <div className='catalog'>
            {
            movieList.map(movie => <Movie movie={movie}/>)
            }
        </div>
    </div>
  )
}
