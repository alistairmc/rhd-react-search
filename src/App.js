import React from "react";
import axios from "axios";
import Results from "./Results.js";
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter";
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
import testResults from "./test-results/results.json";

class App extends React.Component {
  constructor(props) {
    super(props);

    //set to output debug to console
    this.isDebug = true;

    //track app debug refresh
    this.appUpdateCount = 0;

    // Set app state
    this.state = {
      searchQuery: "rhel",
      searchApiUrl: "https://api.developers.redhat.com/search/v1/?",
      searchQueryParam: "q",
      searchResults: {
        response: {
          numFound: 0,
          start: 0,
          maxScore: 0,
          docs: [],
        },
        responseHeader: {},
        highlighting: {},
        facet_counts: {
          facet_queries: {},
          facet_fields: {
            type: [],
            rhd_taxonomy_product: [],
            rhd_taxonomy_product_line: [],
            rhd_taxonomy_topic: [],
          },
          facet_ranges: {},
          facet_intervals: {},
          facet_heatmaps: {},
        },
      },
    };
  }

  //debug output
  debugThis(theCount, theLabel, theValue) {
    if (!this.isDebug) {
      return;
    }
    console.log(
      "( Component Update Count: " +
        theCount +
        " ) " +
        theLabel +
        ": " +
        theValue
    );
  }

  //Build search API URL
  buildSearchApiUrl() {
    let urlString = `${this.state.searchApiUrl + this.state.searchQueryParam}=${
      this.state.searchQuery
    }`;
    this.debugThis(this.appUpdateCount, "buildSearchApiUrl", urlString);
    return urlString;
  }

  //Process Search Results
  processSearchResults() {
    this.debugThis(
      this.appUpdateCount,
      "processSearchResults",
      this.state.searchResults
    );
    console.log(this.state.searchResults);
  }

  //load search data
  loadSearchData() {
    this.debugThis(
      this.appUpdateCount,
      "loadSearchData",
      this.state.searchQuery
    );
    if (!this.state.searchQuery) {
      return;
    }
    let searchApiUrl = this.buildSearchApiUrl();
    axios(searchApiUrl)
      .then((result) => {
        this.setState(
          {
            searchResults: result.data,
          },
          function () {
            this.processSearchResults();
          }
        );
      })
      .catch((error) =>
        this.setState(
          {
            error,
            searchResults: testResults,
          },
          function () {
            this.processSearchResults();
          }
        )
      );
  }

  componentDidMount() {
    this.debugThis(this.appUpdateCount, "componentDidMount", "");

    this.loadSearchData();
  }

  render() {
    this.debugThis(this.appUpdateCount, "render", "");
    return (
      <div className="rhd-c-search">
        <Results searchResults={this.state.searchResults} />
      </div>
    );
  }
}

export default App;
