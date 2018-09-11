import {Component} from "react";
import {Button, Container, Menu, Responsive, Segment, Visibility} from "semantic-ui-react";
import PropTypes from "prop-types";
import React from "react";
import {Link} from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

/*
* Neither Semantic UI nor Semantic UI React offer a responsive navbar
* */
class DesktopContainer extends Component {
    state = {activeItem: 'home',
             authenticated: null
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    checkAuthentication = async() => {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    }

    async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {
        this.checkAuthentication();
    }

    login = async() => {
        this.props.auth.login('/');
    }

    logout = async() => {
        this.props.auth.logout('/');
    }

    render() {
        const { children } = this.props
        const { fixed } = this.state
        const { activeItem } = this.state

        return (
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        // style={{ minHeight: 700, padding: '1em 0em' }}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                                {/*<Menu.Item>*/}
                                {/*<Image src='/logo.png' size='tiny'/>*/}
                                {/*</Menu.Item>*/}
                                <Menu.Item name='home'
                                           active={activeItem === 'home'}
                                           onClick={this.handleItemClick}
                                           as={Link}
                                           to='/'>
                                    Home
                                </Menu.Item>
                                <Menu.Item name='work'
                                           active={activeItem === 'work'}
                                           onClick={this.handleItemClick}
                                           as={Link}
                                           to='/work'>
                                    Work
                                </Menu.Item>
                                <Menu.Item name='about' active={activeItem === 'about'}
                                           onClick={this.handleItemClick}
                                           as={Link}
                                           to='/about'>
                                    About
                                </Menu.Item>
                                <Menu.Item name='group'
                                           active={activeItem === 'group'}
                                           onClick={this.handleItemClick}
                                           as={Link} to='/group'>
                                    Group
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    {
                                        this.state.authenticated ?( <Button onClick={this.logout} inverted={!fixed}>
                                            Logout
                                        </Button>):( <Button onClick={this.login} inverted={!fixed}>
                                            Log in
                                        </Button>)
                                    }
                                    <Button as={Link} to='/myprofile' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                                        MyProfile
                                    </Button>
                                </Menu.Item>
                            </Container>
                        </Menu>
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}


export default withAuth(DesktopContainer);
