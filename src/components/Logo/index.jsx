import React from "react";
import "./index.css";
import logo from "./img/logo.svg";
import { Link } from 'react-router-dom';

const Logo = ({className, href, ...props}) => {
	return (
		<Link to={href} className={className? className: "logo"} {...props}>
			<img src={logo} alt="logo" className="logo__pic"/>
		</Link>
	);
};

export default Logo;
