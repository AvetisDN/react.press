import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import Sidebar from './layout/sidebar';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: []
        }
    }

    componentDidMount() {
        this.props.hideLoading();
    }

    render(){
        return (
            <Row>
                <Col xs={12} md={9}>
                    Homepage
                </Col>
                <Col xs={12} md={3}>
                    <Sidebar/>
                </Col>
            </Row>
        );
    }
}
