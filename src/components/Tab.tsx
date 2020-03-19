import * as React from "react";
import classNames from "classnames";

type SearchTabProps = {
  tabs: ["추천 검색어", "최근 검색어"];
  selectedTab: "추천 검색어" | "최근 검색어";
  onChangeTab: (t: "추천 검색어" | "최근 검색어") => void;
};

class Tab extends React.Component<SearchTabProps, {}> {
  _handleTab = (e: any) => {
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
