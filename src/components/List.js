import React, { Component } from "react";
import ListInfo from "./ListInfo";

class List extends Component {
  render() {
    return (
      <div>
        <ul className="list">
          {this.props.list.map((li, i) => (
            <ListInfo
              li={li}
              i={i}
              type={this.props.type}
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
