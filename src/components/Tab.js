import React, { Component } from "react";
import classNames from "classnames";

class Tab extends Component {
  _handleTab = e => {
    this.props.onChangeTab(e.target.dataset.tabName);
  };

  render() {
    return (
      <ul className="tabs" onClick={this._handleTab}>
        {this.props.tabs.map((tab, i) => (
          <li
            data-tab-name={tab}
            key={i}
            className={classNames({ active: tab === this.props.selectedTab })}
          >
            {tab}
          </li>
        ))}
      </ul>
    );
  }
}

export default Tab;
