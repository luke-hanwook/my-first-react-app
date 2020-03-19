import * as React from "react";

export type SearchState = {
  keyword: string;
};

type SearchProps = {
  onQuery: (data: string) => void;
  onReset: () => void;
  onCreate: (state: SearchState) => void;
  query: string;
};

class SearchForm extends React.Component<SearchProps, SearchState> {
  state: SearchState = {
    keyword: ""
  };

  static getDerivedStateFromProps(nextProps: SearchProps, prevState: SearchState) {
    if (nextProps.query !== prevState.keyword) {
      return { keyword: nextProps.query };
    }
    return null;
  }

  _handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onQuery(e.target.value);
    if (!e.target.value.length) this.props.onReset();
  };

  _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onCreate(this.state);
  };

  _onReset = () => {
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
