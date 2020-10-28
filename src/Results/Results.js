import React from "react";
import ResultWebpage from "./ResultTypes/ResultWebpage.js";
import ResultArticleWebpage from "./ResultTypes/ResultArticleWebpage.js";
import ResultProductWebpage from "./ResultTypes/ResultProductWebpage.js";
import { Banner } from "@patternfly/react-core";

class Results extends React.Component {
  constructor(props) {
    super(props);

    //Error messages
    this.state = {
      errorMessages: {
        noResultsFound: {
          type: "info",
          message: "Sorry no results available for that search query."
        },
        noSearchParam: {
          type: "info",
          message: "Please enter a search term in the search input field."
        },
        noSearchResults404: {
          type: "danger",
          message: "Sorry there has been a problem getting search results, please try again!"
        }
      }
    }
  }

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

  //get error state messages
  getErrorState() {
    let returnValue = {
      type: "",
      message: ""
    };
    if(this.props.searchResults.length <= 0) {
      returnValue = this.state.errorMessages.noResultsFound;
      if(this.props.state.searchQuery === "") {
        returnValue = this.state.errorMessages.noSearchParam;
      }
      if(this.props.state.searchLoadingError === true) {
        returnValue = this.state.errorMessages.noSearchResults404;
      }
    }
    return returnValue;
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
    
    if(this.props.searchResults.length <= 0 ) {
      let errorMessage = this.getErrorState();
      console.log(errorMessage);
      return (         
        <>
          <div className="rhd-c-search-results-container">
            <Banner variant={errorMessage.type}>{errorMessage.message}</Banner>
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