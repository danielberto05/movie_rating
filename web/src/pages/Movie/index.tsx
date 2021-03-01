import React, { useState, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';

import api from '../../services/api';

import './styles.css';

interface Movie {
  id: number;
  title: string;
  director: string;
  release_year: string;
  genre: string;
  mpaa_rating: string;
  ratings: string;
}

function Movie() {
  let location:any = useLocation()
  const movie:Movie = location.state;
  console.log(movie)
  // const { match: { params } } = params;

  
  // async function searchTeacher(e: FormEvent) {
  //   e.preventDefault();

  //   const response = await api.get('classes', {
  //     params: {
  //       subject,
  //       week_day,
  //       time,
  //     }
  //   })

  //   setTeachers(response.data);
  // }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title={ movie.title } description= { movie.release_year }>
        <span>Rating: { movie.mpaa_rating } </span>
        <p>Public evaluation: <strong>{ movie.ratings }</strong></p>
      </PageHeader>

      <main>
        <p>Genre: <strong>{ movie.genre }</strong></p>
        <p>Director: <strong>{ movie.director }</strong></p>
      </main>
    </div>
  );
}

export default Movie;