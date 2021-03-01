import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Movie from './pages/Movie';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}/>
      <Route path="/movie" component={Movie}/>
    </BrowserRouter>
  );
}

export default Routes;
