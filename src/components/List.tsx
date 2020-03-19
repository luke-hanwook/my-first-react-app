import * as React from "react";
import ListInfo from "./ListInfo";
import { KeywordData } from "../models/KeywordModel";
import { HistoryData } from "../models/HistoryModel";

type ListProps = {
  list: Array<KeywordData | HistoryData>;
  onClickKeyword: (data: string) => void;
  onClickRemove: (data: string) => void;
};

class List extends React.Component<ListProps, {}> {
  render() {
    return (
      <div>
        <ul className="list">
          {this.props.list.map((li, i) => (
            <ListInfo
              li={li}
              i={i}
              key={i}
              onClickKeyword={this.props.onClickKeyword}
              onClickRemove={this.props.onClickRemove}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
