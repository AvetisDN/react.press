import React, {Component} from 'react';
import axios from 'axios';
import Short from './includes/short';
import Paginator from './includes/pagination';
import {CardColumns} from 'reactstrap';

export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            descr: '',
            title: '',
            slug: '',
            page: this.props.match.params.page || 1,
            total_pages: 1
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/categories?slug=${this.props.match.params.slug}`)
            .then(response => {
                this.setState({
                    descr: response.data[0].description,
                    title: response.data[0].name,
                    slug: response.data[0].slug
                });
                let catID = response.data[0].id;
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/posts?per_page=${process.env.REACT_APP_PER_PAGE}&page=${this.state.page}&categories=${catID}&orderby=date&order=desc`)
                    .then(response => {
                        this.setState({
                            posts: response.data,
                            total_pages: response.headers['x-wp-totalpages']
                        });
                        this.props.hideLoading();
                    })
                    .catch(error => {
                        console.error(error);
                        this.props.redirectToError();
                    })
            })
            .catch(error => {
                console.error(error);
                this.props.redirectToError();
            })
    }

    render(){
        let posts = this.state.posts.map(post => {
           return (
               <Short key={post.id} postObj={post} />
           )
        });
        document.querySelector('title').innerText = process.env.REACT_APP_TITLE + ": " + this.state.title;
        return(
            <div>
                <h1>{this.state.title}</h1>
                <p>{this.state.descr}</p>
                <hr/>
                <CardColumns>
                    {posts}
                </CardColumns>
                {this.state.total_pages > 1 &&
                    <Paginator page={this.state.page} total_pages={this.state.total_pages}
                           slug={'category/' + this.state.slug}/>
                }
            </div>
        );
    }
}
