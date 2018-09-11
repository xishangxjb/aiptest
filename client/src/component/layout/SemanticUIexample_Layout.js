import React from "react"
import MobileContainer from "./SemanticUIexample_MobileContainer";
import DesktopContainer from "./SemanticUIexample_Navbar";
import PropTypes from "prop-types";

class Layout extends React.Component{
    render(){
        return(
            <div>
                <DesktopContainer>{this.props.children}</DesktopContainer>
                <MobileContainer>{this.props.children}</MobileContainer>
            </div>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.node,
}

export default Layout;
