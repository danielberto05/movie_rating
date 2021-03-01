import React, { useState, FormEvent, useEffect } from 'react';

import PageHeader from '../../components/PageHeader';
import MovieItem, { Movie } from '../../components/MovieItem';
import Input from '../../components/Input';
// import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

function Home() {
  
  const [movie, setMovie] = useState([]);

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [mpaa_rating, setMpaaRating] = useState('');

  useEffect(() => {
    api.get('movies').then((response) => {
      console.log(response.data)
      setMovie(response.data);
    })
  }, [])
  
  async function searchMovie(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('movies', {
      params: {
        title,
        genre,
        year,
        mpaa_rating,
      }
    })
    console.log(response.data)
    setMovie(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Search movie">
        <form id="search-teachers" onSubmit={searchMovie}>
          {/* <Select
            name="subject"
            label="Matéria"
            value={ subject }
            onChange={ e => { setSubject(e.target.value) }}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação física', label: 'Educação física' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
            ]}
          />

          <Select
            name="week-day"
            label="Dia da semana"
            value={ week_day }
            onChange={ e => { setWeekDay(e.target.value) }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          /> */}
          <Input
            name="title"
            label="Title"
            onChange={e => { setTitle(e.target.value) }}
          />
          <Input
            name="genre"
            label="Genre"
            onChange={e => { setGenre(e.target.value) }}
          />
          <Input
            name="release_year"
            label="Release Year"
            type="number"
            onChange={e => { setYear(e.target.value) }}
          />
          <Input
            name="mpaa_rating"
            label="Rating"
            onChange={e => { setMpaaRating(e.target.value) }}
          />
          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        { movie.map((movie: Movie) => {
          return <MovieItem key={ movie.id } movie={movie} />
        }) }
      </main>
    </div>
  );
}

export default Home;