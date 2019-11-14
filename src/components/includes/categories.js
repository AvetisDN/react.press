import React, {Component} from 'react';
import axios from 'axios';

export default class Categories extends Component{
    constructor(props) {
        super(props);
        this.state= {
            catIds: this.props.cat,
            catLinks: []
        };
    }

    componentDidMount() {
        // console.log(this.state.catIds)
        this.props.cat.map(id => {
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/categories/${id}`)
                .then(response => {
                    this.state.catLinks.push(`<a class="mr-2" href="/category/${response.data.slug}">${response.data.name}</a>`)
                })
                .catch(error => {
                    console.log(error)
                });
            return true;
        });
    }
    renderCategories() {
        let links = this.state.catLinks.map(link => {
            return link;
        });
        return links;
    }
    render() {
        return (
            <div>
                <span dangerouslySetInnerHTML={{__html: this.state.catLinks.length>0 ? this.renderCategories() : ''}}></span>
            </div>
        );
    }
}
