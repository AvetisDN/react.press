import React, {Component} from 'react';
import axios from 'axios';
import Short from './includes/short';
import Paginator from './includes/pagination';
import {CardColumns} from 'reactstrap';

export default class Author extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            descr: '',
            name: '',
            slug: '',
            page: this.props.match.params.page || 1,
            total_pages: 1
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/users?slug=${this.props.match.params.slug}`)
            .then(response => {
                // console.log(response.data[0]);
                this.setState({
                    name: response.data[0].name,
                    descr: response.data[0].description,
                    slug: response.data[0].slug,
                    avatar: response.data[0].avatar_urls['96']
                });
                let authorID = response.data[0].id;
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/posts?per_page=${process.env.REACT_APP_PER_PAGE}&page=${this.state.page}&author=${authorID}`)
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
        document.querySelector('title').innerText = process.env.REACT_APP_TITLE + ": articles by " + this.state.name;
        return(
            <div>
                <h1>{this.state.name}</h1>
                <div className="d-flex">
                    <img src={this.state.avatar} alt="{this.state.name}" className="mr-2"/>
                    <p className='lead'>{this.state.descr}</p>
                </div>
                <hr/>
                <CardColumns>
                    {posts}
                </CardColumns>
                {this.state.total_pages > 1 &&
                    <Paginator page={this.state.page} total_pages={this.state.total_pages}
                           slug={'author/' + this.state.slug}/>
                }
            </div>
        );
    }
}
