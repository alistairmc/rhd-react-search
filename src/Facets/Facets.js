import React from "react";
import Facet from "./Facet";
import { Card, CardTitle, CardBody } from '@patternfly/react-core';

class Facets extends React.Component { 
    render() {
        return (
             <>
                <Card className="facets" isCompact>
                    <CardTitle>Filter Results</CardTitle>
                    <CardBody>
                        {Object.keys(this.props.state.searchResults.facet_counts.facet_fields).map((facet, key) => (
                            <Facet key={key} facet={facet} facetValues={this.props.state.searchResults.facet_counts.facet_fields[facet]}/>
                        ))}
                    </CardBody>
                </Card>
            </>
        )
    }
}

export default Facets