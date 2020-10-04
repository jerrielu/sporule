import React from "react";
import Config from "../_config";
import TemplateConfig from "./_templateConfig";
import {Link} from "react-router-dom";

const FooterTemplate = () => {
    return (
        <React.Fragment>
            <footer role="footer">
                <h1>
                    <Link to="/" title={Config.site}><img src={Config.logo} title={Config.site} alt={Config.site} className="logo"/></Link>
                </h1>
                <nav role="footer-nav">
                    <ul>
                        {
                            Object.keys(TemplateConfig.navs).map((index, key) => {
                                return (
                                    <li key={index}><Link to={TemplateConfig.navs[index]} title={index}>{index}</Link></li>
                                );
                            })
                        }
                    </ul>
                </nav>
                <p className="copy-right">Copyright (c) 2020 <Link to="/">{Config.site}</Link>, Template By <a rel="nofollow" target="_blank" href="http://www.designstub.com">DesignStub</a>. Powered By <a href="https://www.sporule.com" target="_blank" >Sporule</a>. </p>
            </footer>
        </React.Fragment>

    );
}


export default FooterTemplate