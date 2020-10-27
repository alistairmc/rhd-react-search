import React from "react";
import ResultWebpage from "./ResultTypes/ResultWebpage.js";
import ResultArticleWebpage from "./ResultTypes/ResultArticleWebpage.js";
import ResultProductWebpage from "./ResultTypes/ResultProductWebpage.js";
import { Banner } from "@patternfly/react-core";

class Results extends React.Component {

  //Return Result Type from type array
  getResultType(typeArray) {
    let typeString = "";
    if(!typeArray || typeArray.length <= 0) {
      return typeString;
    }
    typeArray.sort();
    typeString = typeArray.join("_")
    return typeString;
  }

  displayResult(index, result) {
    switch(this.getResultType(result.type)) {
      case "webpage":
        return <ResultWebpage key={index} searchResult={result}/>
      case "article_webpage":
        return <ResultArticleWebpage key={index} searchResult={result}/>
      case "product_webpage":
        return <ResultProductWebpage key={index} searchResult={result}/>
      default:
        return "";
    }
  }

  render() {
    if(this.props.searchResults.length <= 0) {
      return (         
        <>
          <div className="rhd-c-search-results-container">
            <Banner variant="info">Sorry no results available for that search query.</Banner>
          </div>
        </>
      );
    }
    return (         
      <>
        <div className="rhd-c-search-results-container">
            {this.props.searchResults.map((result, index) => (
              this.displayResult(index, result)
            ))}
        </div>
      </>
    );
  }

}

export default Results;