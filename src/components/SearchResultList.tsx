import * as React from "react";
import { SearchData } from "../models/SearchModel";

type Props = {
  list: SearchData[];
};

const SearchResultList: React.FC<Props> = props => {
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
