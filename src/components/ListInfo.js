import React, { Component, Fragment } from "react";

class ListInfo extends Component {
  _handleClickKeyword = e => {
    const { li, onClickKeyword } = this.props;
    onClickKeyword(li.keyword);
  };

  _handleClickRemoveBtn = e => {
    e.stopPropagation();
    const { li, onClickRemove } = this.props;
    onClickRemove(li.keyword);
  };

  render() {
    const { li, i, type } = this.props;
    return (
      <li onClick={this._handleClickKeyword}>
        {type === "keyword" && <span className="number">{i + 1}</span>}
        {li.keyword}
        {type === "history" && (
          <Fragment>
            <span className="date">{li.date}</span>
            <button
              className="btn-remove"
              onClick={this._handleClickRemoveBtn}
            />
          </Fragment>
        )}
      </li>
    );
  }
}

export default ListInfo;
