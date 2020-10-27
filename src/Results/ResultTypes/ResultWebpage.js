import React from "react";
import { Card, CardTitle, CardBody, CardFooter } from '@patternfly/react-core';

class ResultWebpage extends React.Component {
  render() {
    return (
      <>
        <Card isCompact>
          <CardTitle>{this.props.searchResult.og_title_str && (<h2>{this.props.searchResult.og_title_str}</h2>)}</CardTitle>
          <CardBody>{this.props.searchResult.og_description_str && (<p>{this.props.searchResult.og_description_str}</p>)}</CardBody>
          <CardFooter><a href={this.props.searchResult._lw_parser_absolute_resource_name_s} >{this.props.searchResult._lw_parser_absolute_resource_name_s}</a></CardFooter>
        </Card>
      </>
    );
  }
}

export default ResultWebpage;
