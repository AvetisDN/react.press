import React, {Component} from 'react';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import axios from 'axios';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: []
        }
    }
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/wp-rest-api-sidebars/v1/sidebars/sidebar-1`)
            .then(response => {
                this.setState({
                    widgets: response.data.widgets
                });
            })
            .catch(error => {
                console.error(error)
            })
    }

    renderWidgets(){
        let result = this.state.widgets.map((widget, index) => {
            let rendered = widget.rendered.replace(/http:\/\/api.react.press/gi,'');
            return (
                <div className="widget" key={index} dangerouslySetInnerHTML={{__html: rendered}}/>
            )
        });
        return result;
    }

    render(){
        return (
            <aside>
                <form action="/search" method="get">
                    <InputGroup>
                        <Input name="q" placeholder="Search request..." />
                        <InputGroupAddon addonType="append">
                            <Button type="submit" color="primary">Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </form>
                {this.renderWidgets()}
            </aside>
        );
    }
}
