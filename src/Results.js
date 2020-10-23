import React from "react";
import Result from "./Result.js"
import "./App.css";

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
      <>
        <div className="rhd-c-search-results-container">
            {this.props.searchResults.response.docs.map((result, index) => (
            <Result key={index} searchResult={result} />
            ))}
        </div>
      </>
    );
  }
}

export default Results;