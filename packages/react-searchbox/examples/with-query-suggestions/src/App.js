import React from 'react';
import { SearchBox, SearchComponent } from '@appbaseio/react-searchbox';

import './styles.css';

const App = () => {
  return (
    <div>
      <SearchBox id="search" autosuggest={false} />
      <SearchComponent
        id="results"
        react={{ and: ['search'] }}
        aggregationField="genres_data.keyword"
        enablePopularSuggestions
      >
        {({ results, loading, query }) => {
          const key = 'genres_data.keyword';
          const searchQuery = query && query[1];
          console.log({ results });
          if (!searchQuery) {
            return null;
          }
          if (loading) {
            return <div className="display">Loading</div>;
          }
          return (
            <div className="result">
              <div className="resultSuggestion list">
                <div className="listHead">Suggestions</div>
                <div className="listBody">
                  {results.data.map(res => (
                    <div className="suggestion">
                      <div>{res.original_title}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="resultCategory list">
                <div className="listHead">Genres</div>
                <div className="listBody">
                  {results.raw &&
                    results.raw.aggregations[key].buckets.map(res => (
                      <div>{res.key[key]}</div>
                    ))}
                </div>
              </div>
              <div className="resultPopular list">
                <div className="listHead">Popular in "{searchQuery.value}"</div>
                <div className="listBody">
                  {results.data.map(res => (
                    <div className="suggestion">
                      <div>{res.original_title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }}
      </SearchComponent>
    </div>
  );
};

export default App;
