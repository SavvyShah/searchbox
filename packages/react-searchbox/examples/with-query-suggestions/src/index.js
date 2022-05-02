import React from 'react';
import ReactDOM from 'react-dom';
import { SearchBase } from '@appbaseio/react-searchbox';
import App from './App';

ReactDOM.render(
  <SearchBase
    index="clone-movie-app"
    credentials="debc869e6e67:4bea16ab-554a-4414-9a82-b91a950d8b44"
    url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
  >
    <App />
  </SearchBase>,
  document.getElementById('root')
);
