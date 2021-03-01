import React, { useState, FormEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';

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
  const history = useHistory();

  const [stars, setStars] = useState('');

  let location:any = useLocation()
  const movie:Movie = location.state;
  console.log(movie)

  function handleEvaluation(e:FormEvent) {
    e.preventDefault();

    api.post('rating', {
      rating: stars,
      movie_id: movie.id
    }).then(() => {
      alert("Cadastro realizado com sucesso!");
      history.push('/');
    }).catch(err => {
      console.log(err);
      alert("Erro no cadastro");
    });
  }
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
      <footer>
        <form onSubmit={ handleEvaluation }>
          <Select
            name="stars"
            label="Rate this movie."
            value={ stars }
            onChange={ e => { setStars(e.target.value) }}
            options={[
              { value: '0', label: '0' },
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              { value: '5', label: '5' },
            ]}
          />
          <button type="submit">
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}

export default Movie;