import React, {Component} from 'react';
import axios from 'axios';
import Categories from './includes/categories';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            excerpt: '',
            content: '',
            image: '',
            date: '',
            author: {},
            categories: []
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/posts?slug=${this.props.match.params.slug}`)
            .then(response => {
                this.setState({
                    title: response.data[0].title.rendered,
                    excerpt: response.data[0].excerpt.rendered,
                    content: response.data[0].content.rendered,
                    image: response.data[0].better_featured_image.media_details.sizes['post-thumbnail'].source_url,
                    date: response.data[0].date,
                    categories: response.data[0].categories
                });
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/users/${response.data[0].author}`)
                    .then(response => {
                        this.setState({
                            author: response.data
                        });
                        this.props.hideLoading();
                    })
                    .catch(error => {
                        console.error(error);
                        this.props.redirectToError();
                    });
            })
            .catch(error => {
                console.error(error);
                this.props.redirectToError();
            });
    }

    render(){
        let excerptText = this.state.excerpt.split('&hellip;')[0];
        let date = new Date(this.state.date);
        document.querySelector('title').innerText = this.state.title;
        return(
            <article className="single-post">
                <header style={{
                    backgroundImage: `url(${this.state.image})`
                }}>
                    <h1>
                        {this.state.title}
                    </h1>
                </header>
                <main className="py-3 text-dark">
                    <div className="lead" dangerouslySetInnerHTML={{__html: excerptText}}></div>
                    <hr/>
                    <div dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                </main>
                <footer className="text-black-50">
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <span>
                            {this.state.categories.length>0 &&
                                <Categories cat={this.state.categories}/>
                            }
                        </span>
                        <i>
                            <a href={`/author/${this.state.author.slug}`}>{this.state.author.name}</a>
                            , {date.toLocaleString()}
                        </i>
                    </div>
                </footer>
            </article>
        );
    }
}
