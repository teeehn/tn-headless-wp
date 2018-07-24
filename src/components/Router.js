import React, { Component } from 'react';

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: undefined
        }
    }

    componentDidMount() {
        this.setState({
            location: window.location.pathname
        });
    }

    render () {
        
        const childProps = Object.assign({}, this.props, { router: this.state });

        return (
            <div>
                {
                    React.Children.map(
                       this.props.children, 
                       child => React.cloneElement(child, childProps)
                    )
                }
            </div>
        )
    }
}

export default Router;
