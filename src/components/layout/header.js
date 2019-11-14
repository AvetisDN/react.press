import React, {Component} from 'react';
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import logo from '../../logo.svg';
import axios from 'axios';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            is_open: false
        };
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount()
    {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/menus/v1/menus/api-menu`)
            .then(response => {
                this.setState({ menu: response.data.items });
                // console.log(this.state.menu);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    toggle() {
        this.setState({ is_open: !this.state.is_open });
    }
    renderNavItems() {
        const items = this.state.menu.map(item => {
            let display = '';
            if(!item.child_items) {
                let href = item.url.replace(process.env.REACT_APP_WP_BASE_URL,'');
                display = (
                    <NavItem key={item.ID}>
                        <NavLink exact to={href} className='nav-link'>{item.title}</NavLink>
                    </NavItem>
                );
            } else {
                let subItems = item.child_items.map(subItem => {
                    let href = subItem.url.replace(process.env.REACT_APP_WP_BASE_URL,'');
                    return (
                        <DropdownItem href={href} key={subItem.ID}>
                            {subItem.title}
                        </DropdownItem>
                    )
                });
                display = (
                    <UncontrolledDropdown nav inNavbar key={item.ID}>
                        <DropdownToggle nav caret>
                            {item.title}
                        </DropdownToggle>
                        <DropdownMenu right>
                            {subItems}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
            }
            return display;
        });
        return (
            <Nav className="ml-auto" navbar>
                {items}
            </Nav>
        )
    }
    render() {
        return (
            <Container fluid={true} className="bg-secondary">
                <Container>
                    <Navbar color="secondary" dark expand="md" className='px-0'>
                        <NavbarBrand href="/">
                            <img src={logo} alt="reactpress" />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.is_open} navbar>
                            {this.renderNavItems()}
                        </Collapse>
                    </Navbar>
                </Container>
            </Container>
        );
    }
}
