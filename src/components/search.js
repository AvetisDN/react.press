import React, {Component} from 'react';

export default class Search extends Component {
    componentDidMount() {
        this.props.hideLoading();
    }
    render(){
        document.querySelector('title').innerText = process.env.REACT_APP_TITLE + ": Search results";
        return (
            <div>
                search results
            </div>
        );
    }
}
