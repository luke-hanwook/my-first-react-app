import React, { Component, Fragment } from "react";
import Header from "../src/components/Header";
import SearchForm from "../src/components/SearchForm";
import SearchResultList from "../src/components/SearchResultList";
import Tab from "../src/components/Tab";
import List from "../src/components/List";

import SearchModel from "../src/models/SearchModel";
import KeywordModel from "../src/models/KeywordModel";
import HistoryModel from "../src/models/HistoryModel";

class App extends Component {
  state = {
    searchList: [],
    keywordList: [],
    historyList: [],
    tabs: ["추천 검색어", "최근 검색어"],
    selectedTab: "",
    isSubmit: false,
    query: ""
  };

  componentDidMount() {
    // api 호출
    this._fetchKeyword();
    this._fetchHistory();
    this.setState({
      selectedTab: this.state.tabs[0]
    });
  }

  _fetchKeyword = _ => {
    KeywordModel.list().then(res => {
      this.setState({
        keywordList: res
      });
    });
  };

  _fetchHistory = _ => {
    HistoryModel.list().then(res => {
      this.setState({
        historyList: res
      });
    });
  };

  _fetchSearch = keyword => {
    SearchModel.list(keyword).then(res => {
      this.setState({
        searchList: res,
        isSubmit: true
      });
    });
    HistoryModel.add(keyword);
    this._fetchHistory();
  };

  // handle the SearchForm
  _handleCreate = data => {
    const { keyword } = data;
    this._fetchSearch(keyword);
  };

  _handleQuery = data => {
    this.setState({
      query: data
    });
  };

  _handleReset = _ => {
    this.setState({
      searchList: [],
      isSubmit: false,
      query: ""
    });
  };

  // handle the tabs
  _handleChangeTab = t => {
    this.setState({
      selectedTab: t
    });
  };

  // handle the List
  _handleClickKeyword = data => {
    this.setState({
      query: data
    });
    this._fetchSearch(data);
  };

  _handleClickRemoveBtn = data => {
    HistoryModel.remove(data);
    this._fetchHistory();
  };

  // condition rendering
  _renderList = () => {
    let list = this.state.keywordList;
    let type = "keyword";
    if (this.state.selectedTab !== this.state.tabs[0]) {
      list = this.state.historyList;
      type = "history";
    }

    return (
      <Fragment>
        <Tab
          tabs={this.state.tabs}
          selectedTab={this.state.selectedTab}
          onChangeTab={this._handleChangeTab}
        />
        <List
          list={list}
          type={type}
          onClickKeyword={this._handleClickKeyword}
          onClickRemove={this._handleClickRemoveBtn}
        />
      </Fragment>
    );
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <SearchForm
            onCreate={this._handleCreate}
            onReset={this._handleReset}
            onQuery={this._handleQuery}
            query={this.state.query}
          />
          <div className="content">
            {this.state.isSubmit ? (
              <SearchResultList list={this.state.searchList} />
            ) : (
              this._renderList()
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
