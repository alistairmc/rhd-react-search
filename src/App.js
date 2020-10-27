import React from "react";
import axios from "axios";
import Results from "./Results/Results";
import Facets from "./Facets/Facets";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Grid, GridItem, Spinner } from '@patternfly/react-core';

//import patternfly styles
import "@patternfly/patternfly/patternfly.css"

//base app styles
import "./App.css";


class App extends React.Component {
  constructor(props) {
    super(props);

    //set to output debug to console
    this.isDebug = true;
    this.useAlternateUrl = false;

    //track app debug refresh
    this.appUpdateCount = 0;

    // Bind the this context to the handler functions
    this.searchInputHandler = this.searchInputHandler.bind(this);
    this.searchFacetHandler = this.searchFacetHandler.bind(this);

    // Set app state
    this.state = {
      searchQuery: "rhel",
      searchApiUrl: "https://api.developers.redhat.com/search/v1/?",
      searchAlternateApiUrl: "/test-results/results.json?",
      searchQueryParam: "q",
      searchFetchRows: 10,
      searchFetchRowsParam: "rows",
      searchFetchStart: 0,
      searchFetchStartParam: "start",
      searchFetchSort: "", // The name of any field ASC or DESC
      searchFetchSortParam: "sort",
      searchFacetQuery: "type",
      searchLoading: true,
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
          facet_fields: {},
          facet_ranges: {},
          facet_intervals: {},
          facet_heatmaps: {},
        },
      },
    };
  }

  //Search update handeler
  searchInputHandler(value) {
    this.debugThis(
      this.appUpdateCount,
      "processSearchSubmit",
      value
    );
    if(!value) {
      return;
    }
    this.setState({
      searchQuery: value
    },
    function () {
      this.loadSearchData();
    })
  }

  //Search update handeler
  searchFacetHandler(value) {
    this.debugThis(
      this.appUpdateCount,
      "processSearchClick",
      value
    );
    if(!value) {
      return;
    }
    this.setState({
      searchQuery: value
    },
    function () {
      this.loadSearchData();
    })
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
    let tmpSearchUrl = this.useAlternateUrl ? this.state.searchAlternateApiUrl : this.state.searchApiUrl;
    let urlString = `${tmpSearchUrl + this.state.searchQueryParam}=${this.state.searchQuery}&${this.state.searchFetchStartParam}=${this.state.searchFetchStart}&${this.state.searchFetchRowsParam}=${this.state.searchFetchRows}`;
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
  }

  //Run New Search process
  runNewSearch() {
    //check if search already running
    if(this.state.searchLoading) {
      return;
    }

    this.setState(
      {
        searchLoading: true
      },
      function () {
        this.loadSearchData();
      }
    );

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
            searchLoading: false,
            searchResults: result.data
          },
          function () {
            this.processSearchResults();
          }
        );
      })
      .catch((error) =>
        this.setState(
          {
            searchLoading: false,
            error
          }
        )
      );
  }

  componentDidMount() {
    this.debugThis(this.appUpdateCount, "componentDidMount", "");

    this.loadSearchData();
  }

  render() {
    this.appUpdateCount++
    this.debugThis(this.appUpdateCount, "render", "");
    return (
      <div className="rhd-c-search">
        <Grid hasGutter>
          <GridItem span={12}>
            <Header state={this.state} searchInputHandler={this.searchInputHandler}/>
          </GridItem>
          <GridItem  span={3}>
            {this.state.searchLoading 
              ? <Spinner></Spinner>
              : <Facets state={this.state}/>
            }
          </GridItem>
          <GridItem span={9}>
            {this.state.searchLoading 
              ? <Spinner></Spinner>
              : <Results searchResults={this.state.searchResults.response.docs} />
            }
          </GridItem>
          <GridItem span={12}>
            <Footer state={this.state}/>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default App;
