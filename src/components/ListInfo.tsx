import * as React from "react";

import { KeywordData } from "../models/KeywordModel";
import { HistoryData } from "../models/HistoryModel";

type ListInfoProps = {
  li: KeywordData | HistoryData;
  i: number;
  onClickKeyword: (data: string) => void;
  onClickRemove: (data: string) => void;
};

function isHistory(li: KeywordData | HistoryData): li is HistoryData {
  return (li as HistoryData).date !== undefined;
}

class ListInfo extends React.Component<ListInfoProps, {}> {
  _handleClickKeyword = (e: React.MouseEvent<HTMLLIElement>) => {
    const { li, onClickKeyword } = this.props;
    onClickKeyword(li.keyword);
  };

  _handleClickRemoveBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { li, onClickRemove } = this.props;
    onClickRemove(li.keyword);
  };

  render() {
    const { li, i } = this.props;
    return (
      <li onClick={this._handleClickKeyword}>
        {isHistory(li) && <span className="number">{i + 1}</span>}
        {li.keyword}
        {isHistory(li) && (
          <React.Fragment>
            <span className="date">{li.date}</span>
            <button className="btn-remove" onClick={this._handleClickRemoveBtn} />
          </React.Fragment>
        )}
      </li>
    );
  }
}

export default ListInfo;
