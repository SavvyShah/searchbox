import React from 'react';
import { SearchBox, SearchComponent } from '@appbaseio/react-searchbox';

import './styles.css';

const App = () => {
  return (
    <div>
      <SearchBox id="search" enablePopularSuggestions autosuggest={false} />
      <SearchComponent
        id="results"
        react={{ and: ['search'] }}
        aggregationField="genres_data.keyword"
      >
        {({ results, loading, size, setValue, setFrom }) => {
          console.log({ results, loading });
          return <div></div>;
        }}
      </SearchComponent>
    </div>
  );
};

export default App;
