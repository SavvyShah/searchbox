import React from 'react';
import { SearchBox, SearchComponent } from '@appbaseio/react-searchbox';

import './styles.css';

const App = () => {
  return (
    <div>
      <SearchBox
        id="search"
        aggregationField="genres_data.keyword"
        size={5}
        aggregationSize={5}
        enablePopularSuggestions
        render={({ data, value, loading, rawData }) => {
          const key = 'genres_data.keyword';
          if (!value || loading) return null;
          return (
            <div className="result">
              <div className="resultSuggestion list">
                <div className="listHead">Suggestions</div>
                <div className="listBody">
                  {data
                    .filter(res => res._suggestion_type === 'index')
                    .map(res => (
                      <div className="suggestion">
                        <div>{res.original_title}</div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="resultCategory list">
                <div className="listHead">Genres</div>
                <div className="listBody">
                  {rawData.aggregations &&
                    rawData.aggregations[key].buckets.map(res => (
                      <div>{res.key[key]}</div>
                    ))}
                </div>
              </div>
              <div className="resultPopular list">
                <div className="listHead">Popular in "{value}"</div>
                <div className="listBody">
                  {data
                    .filter(
                      res =>
                        res._suggestion_type === 'popular' &&
                        res.indices.includes('movies-store-app')
                    )
                    .map(res => (
                      <div className="suggestion">
                        <div>{res.value}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default App;
