import React, { Component } from "react";

class SearchForm extends Component {
  state = {
    keyword: ""
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.query !== prevState.keyword) {
      return { keyword: nextProps.query };
    }
    return null;
  }

  _handleInputValue = e => {
    this.props.onQuery(e.target.value);
    if (!e.target.value.length) this.props.onReset();
  };

  _handleSubmit = e => {
    e.preventDefault();
    this.props.onCreate(this.state);
  };

  _onReset = _ => {
    this.props.onReset();
  };

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <input
          onChange={this._handleInputValue}
          type="text"
          value={this.state.keyword}
          placeholder="검색어를 입력하세요"
        />
        {this.state.keyword.length > 0 && (
          <button type="reset" className="btn-reset" onClick={this._onReset} />
        )}
      </form>
    );
  }
}

export default SearchForm;
