import React from "react";

const SearchResultList = props => {
  return (
    <div id="search-result">
      <ul>
        {props.list.map(d => (
          <li key={d.id}>
            <img src={d.image} alt={d.name} title={d.name} />
            {d.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultList;
