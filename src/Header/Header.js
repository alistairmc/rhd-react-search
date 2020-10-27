import React from "react";
import { SearchInput, Form, Button, Grid, GridItem, Title, TitleSizes } from '@patternfly/react-core';


class Header extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.state.searchQuery,
            resultsCount: 0
        };

        this.handleChange = (value, event) => {
            this.setState({
                value: value
            });
        };

        this.handleClear = (event) => {
            this.setState({
                value: ''
            });
        };

        this.handleSubmit = (value, event) => {
            this.props.searchInputHandler(this.state.value);
        };
    }

    render() {
        return (
        <>  
            <Form>
                <Grid hasGutter>
                    <GridItem span={12}>
                        <Title headingLevel="h1" size={TitleSizes['4xl']}>
                            Search Test Component
                        </Title>
                    </GridItem>
                    <GridItem span={10}>
                        <SearchInput 
                            id='searchInput'
                            placeholder='Search' 
                            value={this.state.value} 
                            onChange={this.handleChange}
                            onClear={this.handleClear}
                        />
                    </GridItem>
                    <GridItem  span={2}>
                        <Button isBlock onClick={this.handleSubmit} type="button">Search</Button>
                    </GridItem>
                </Grid>
            </Form>
        </>
        )
    }
}

export default Header