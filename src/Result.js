import React from "react";
import "@patternfly/pfe-icon-panel";
import "@patternfly/pfe-icon";
import "./App.css";

class Result extends React.Component {
  render() {
    return (
      <>
        <pfe-icon-panel icon="rh-icon-aed" pfe-color="complement" pfe-circled>
          <h3 slot="pfe-icon-panel--header">{this.props.searchResult.og_title_str}</h3>
          <p>{this.props.searchResult.og_description_str}</p>
          <pfe-cta slot="pfe-icon-panel--footer">
            <a href={this.props.searchResult._lw_parser_absolute_resource_name_s} >{this.props.searchResult._lw_parser_absolute_resource_name_s}</a>
          </pfe-cta>
        </pfe-icon-panel>
      </>
    );
  }
}

export default Result;
