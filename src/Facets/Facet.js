import React from "react";
import { Accordion, AccordionItem, AccordionContent, AccordionToggle } from '@patternfly/react-core';

class Facet extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            expanded: ''
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

    render() {
        const onToggle = id => {
            if (id === this.state.expanded) {
                this.setState({expanded: ''});
            } else {
                this.setState({expanded: id })
            }
        };

        var facetValueList = this.props.facetValues.map(function(name, key){ 
            if(key%2 === 0 && (name !== null && name !== "")) {
                return <li key={key}>{name.replace(/_/g, " ")}</li>; 
            } else {
                return ""
            }
        });

        return (
        <>
           <div className="facet">
            <Accordion asDefinitionList>
                <AccordionItem>
                    <AccordionToggle onClick={() => {onToggle(this.props.facet)}} isExpanded={this.state.expanded===this.props.facet} id={this.props.facet}>
                        <h3>{this.getFacetTypeLabel(this.props.facet)}</h3>
                    </AccordionToggle>
                    <AccordionContent id={this.props.facet+"_expanded"} isHidden={this.state.expanded !== this.props.facet}>
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

