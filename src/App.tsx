import React from "react";
import Header from "./components/Header";
import SearchForm, { SearchState } from "./components/SearchForm";
import SearchResultList from "./components/SearchResultList";
import Tab from "./components/Tab";
import List from "./components/List";

import SearchModel, { SearchData } from "./models/SearchModel";
import KeywordModel, { KeywordData } from "./models/KeywordModel";
import HistoryModel, { HistoryData } from "./models/HistoryModel";

type State = {
  searchList: SearchData[];
  keywordList: KeywordData[];
  historyList: HistoryData[];
  tabs: ["추천 검색어", "최근 검색어"];
  selectedTab: "추천 검색어" | "최근 검색어";
  isSubmit: boolean;
  query: string;
};

class App extends React.Component<{}, State> {
  state: State = {
    searchList: [],
    keywordList: [],
    historyList: [],
    tabs: ["추천 검색어", "최근 검색어"],
    selectedTab: "추천 검색어",
    isSubmit: false,
    query: ""
  };

  componentDidMount() {
    // api 호출
    this._fetchKeyword();
    this._fetchHistory();
  }

  _fetchKeyword = () => {
    KeywordModel.list().then(res => {
      this.setState({
        keywordList: res
      });
    });
  };

  _fetchHistory = () => {
    HistoryModel.list().then(res => {
      this.setState({
        historyList: res
      });
    });
  };

  _fetchSearch = (keyword: string) => {
    SearchModel.list().then(res => {
      this.setState({
        searchList: res,
        isSubmit: true
      });
    });
    HistoryModel.add(keyword);
    this._fetchHistory();
  };

  // handle the SearchForm
  _handleCreate = (data: SearchState) => {
    const { keyword } = data;
    this._fetchSearch(keyword);
  };

  _handleQuery = (data: string) => {
    this.setState({
      query: data
    });
  };

  _handleReset = () => {
    this.setState({
      searchList: [],
      isSubmit: false,
      query: ""
    });
  };

  // handle the tabs
  _handleChangeTab = (t: "추천 검색어" | "최근 검색어") => {
    this.setState({
      selectedTab: t
    });
  };

  // handle the List
  _handleClickKeyword = (data: string) => {
    this.setState({
      query: data
    });
    this._fetchSearch(data);
  };

  _handleClickRemoveBtn = (data: string) => {
    HistoryModel.remove(data);
    this._fetchHistory();
  };

  // condition rendering
  _renderList = () => {
    let list = this.state.keywordList;
    if (this.state.selectedTab !== this.state.tabs[0]) {
      list = this.state.historyList;
    }

    return (
      <React.Fragment>
        <Tab
          tabs={this.state.tabs}
          selectedTab={this.state.selectedTab}
          onChangeTab={this._handleChangeTab}
        />
        <List
          list={list}
          onClickKeyword={this._handleClickKeyword}
          onClickRemove={this._handleClickRemoveBtn}
        />
      </React.Fragment>
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
