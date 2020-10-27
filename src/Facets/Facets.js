import React from "react";
import Facet from "./Facet";

class Facets extends React.Component { 
    render() {
        return (
             <>
                <div className="facets">
                    {Object.keys(this.props.state.searchResults.facet_counts.facet_fields).map((facet, key) => (
                        <Facet key={key} facet={facet} facetValues={this.props.state.searchResults.facet_counts.facet_fields[facet]}/>
                    ))}
                </div>
            </>
        )
    }
}

export default Facets