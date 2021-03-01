import React from 'react'
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './style.css';

export interface Movie {
  id: number;
  title: string;
  director: string;
  release_year: string;
  genre: string;
  mpaa_rating: string;
  ratings: string;
}

interface MovieItemsProps {
  movie: Movie;
}

const MovieItem:React.FC<MovieItemsProps> = ({ movie }) => {
  return (
    <article className="teacher-item">
      <header>
        <div>
          <Link to={{
            pathname: "/movie",
            state: movie
          }}>
            <strong>{ movie.title }</strong>
          </Link>
        </div>
      </header>
      <p>{ movie.genre }</p>
      <p>{ movie.release_year }</p>
      <span>{ movie.director }</span>
      <footer>
        <p>
          <strong>{ movie.mpaa_rating }</strong>
        </p>
      </footer>
    </article>
  );
}

export default MovieItem;