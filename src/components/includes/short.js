import React, {Component} from 'react';
import {
    Card, CardLink, CardImg, CardTitle, CardBody
} from 'reactstrap';

export default class Short extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.postObj.title.rendered,
            slug: '/post/' + this.props.postObj.slug,
            image: this.props.postObj.better_featured_image.media_details.sizes.medium_large.source_url
        }
    }
    render(){
        return(
            <Card>
                <CardImg top width="100%" src={this.state.image} alt="{this.state.title}" />
                <CardBody>
                    <CardTitle><h3 dangerouslySetInnerHTML={{__html: this.state.title}}></h3></CardTitle>
                    <CardLink href={this.state.slug}>Read More...</CardLink>
                </CardBody>
            </Card>
        );
    }
}
