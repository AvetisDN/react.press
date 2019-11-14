import React, {Component} from 'react';
import axios from 'axios';
import Short from './includes/short';
import Paginator from './includes/pagination';
import {CardColumns} from 'reactstrap';

export default class Archive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            title: '',
            slug: '',
            page: this.props.match.params.page || 1,
            total_pages: 1
        }
    }

    componentDidMount() {
        let daysQuantity = [31,28,31,30,31,30,31,31,30,31,30,31];
        let currentYear = new Date().getFullYear();
        if(currentYear%4 === 0) daysQuantity[1] = 29;
        let startDate = this.props.match.params.year + '-' + this.props.match.params.month + '-01T00:00:00Z';
        let endDate = this.props.match.params.year + '-' + this.props.match.params.month + '-' + daysQuantity[this.props.match.params.month - 1] + 'T23:59:59Z';
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/posts?per_page=${process.env.REACT_APP_PER_PAGE}&page=${this.state.page}&after=${startDate}&before=${endDate}&orderby=date&order=desc`)
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
    }

    render() {
        let posts = this.state.posts.map(post => {
            return (
                <Short key={post.id} postObj={post}/>
            )
        });
        document.querySelector('title').innerText = process.env.REACT_APP_TITLE + ": " + this.state.title;
        return (
            <div>
                <h1>{this.state.title}</h1>
                <hr/>
                <CardColumns>
                    {posts}
                </CardColumns>
                {this.state.total_pages > 1 &&
                <Paginator page={this.state.page} total_pages={this.state.total_pages}
                           slug={this.props.match.params.year + '/' + this.props.match.params.month}/>
                }
            </div>
        );
    }
}
