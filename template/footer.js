import React from "react";
import Config from "../_config";
import TemplateConfig from "./_templateConfig";
import {Link} from "react-router-dom";

const FooterTemplate = () => {
    return (
        <React.Fragment>
            {/* <section id="footer">
						  <ul className="icons">
							<li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
							<li><a href="#" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
							<li><a href="#" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
							<li><a href="#" className="icon solid fa-rss"><span className="label">RSS</span></a></li>
							<li><a href="#" className="icon solid fa-envelope"><span className="label">Email</span></a></li>
						</ul>  
                        <p className="copyright">&copy; {new Date().getFullYear()} <Link to="/">{Config.site}</Link>, Template By <a rel="nofollow" target="_blank" href="https://html5up.net">HTML5 UP</a>. Powered By <a href="https://www.sporule.com" target="_blank" >Sporule</a>. </p>
            </section> */}
        </React.Fragment>

    );
}


export default FooterTemplate