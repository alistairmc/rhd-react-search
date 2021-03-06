import React from "react";
import { Accordion, AccordionItem, AccordionContent, AccordionToggle, Checkbox } from '@patternfly/react-core';

class Facet extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            expanded: this.props.facet+"_filter",
            facets: this.populateFacetsAsObject(this.props.facetValues)
        };
    }

    getFacetTypeLabel(facet) {
        let facetLabel = "";
        if(!facet) {
            return facetLabel;
        }
        facetLabel = facet.replace("rhd_taxonomy_", "").replace(/_/g, " ");
        return facetLabel;
    }

    populateFacetsAsObject(facetValues) {
        let returnFavetsObject = {};
        if(!facetValues) {
            return returnFavetsObject;
        }
        //convert to array pairs
        let tmpFavetsObject = facetValues.reduce(function(result, value, index, array) {
            if (index % 2 === 0)
              result.push(array.slice(index, index + 2));
            return result;
          }, []);;
        //convert tmpFavetsObject to object
        returnFavetsObject =  Object.fromEntries(tmpFavetsObject);
        return returnFavetsObject;
    }

    render() {
        const onToggle = id => {
            if (id === this.state.expanded) {
                this.setState({expanded: ''});
            } else {
                this.setState({expanded: id })
            }
        };
        
        let tmpFacets = this.state.facets;
        let facetValueList = Object.keys(tmpFacets).map((key) => { 
            return  (
                    <li key={key}>
                        <Checkbox
                            label={key.replace(/_/g, " ")+" - "+tmpFacets[key]} 
                            isChecked=""
                            onChange=""
                            aria-label={this.props.facet+"-"+key.replace(/_/g, " ")} 
                            id={this.props.facet+"_"+key}
                            name={this.props.facet+"_"+key}
                        />                        
                    </li>
                    ); 
        });

        return (
        <>
           <div className="facet">
            <Accordion asDefinitionList>
                <AccordionItem>
                    <AccordionToggle onClick={() => {onToggle(this.props.facet)}} isExpanded={this.state.expanded===this.props.facet} id={this.props.facet}>
                        <h3>{this.getFacetTypeLabel(this.props.facet)}</h3>
                    </AccordionToggle>
                    <AccordionContent id={this.props.facet+"_filter"} isHidden={this.state.expanded !== this.props.facet}>
                        <ul>
                            {facetValueList}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
           </div>
        </>
        )
    }
}

export default Facet

