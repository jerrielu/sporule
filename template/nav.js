import React from "react";
import Config from "../_config";
import TemplateConfig from "./_templateConfig";
import { Link } from "react-router-dom";

const NavTemplate = (props) => {

    let onSubmit = () => {
        let search_route = "/posts/?pagetype=search";
        //close the menu button;
        document.getElementById('menu-button').click();
        props.searchAction(search_route);
    }
    return (
        <header role="header">
            <div className="container">
                <h1>
                    <Link to="/" title={Config.site}><img src={Config.logo} title={Config.site} alt={Config.site} className="logo" /></Link>
                </h1>
                <nav role="header-nav" className="navy" id="nav-bar">
                    <ul>
                        <li>
                            <form role="search" className="searchBox" method="get" onSubmit={onSubmit}>
                                <input type="text" placeholder="输入关键字搜索" name="search" onChange={o => { }} />
                            </form>
                        </li>
                        {
                            Object.keys(TemplateConfig.navs).map((index, key) => {
                                return (
                                    <li className="nav-item" key={index}><Link to={TemplateConfig.navs[index]} title={index}>{index}</Link></li>
                                );
                            })
                        }

                    </ul>

                </nav>
            </div>
        </header>
    );
}


export default NavTemplate
