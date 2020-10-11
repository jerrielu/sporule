import React from "react";
import Config from "../_config";
import TemplateConfig from "./_templateConfig";
import { Link } from "react-router-dom";

const NavTemplate = (props) => {

    let onSubmit = () => {
        let search_route = "/posts/?pagetype=search";
        document.getElementById('main').click();
        props.searchAction(search_route);
    }
    return (
        <React.Fragment>
        <header id="header">
        <h1><Link to="/" title={Config.site}>{Config.site}</Link></h1>
        <nav className="links">
            <ul>
                {
                    TemplateConfig.navs.map((item, key) => {
                        return (
                            <li key={item.title}><Link to={item.link} title={item.title}>{item.title}</Link></li>
                        );
                    })
                }
            </ul>
        </nav>
        <nav className="main">
            <ul>
                <li className="search">
                    <a className="fa-search" href="#search">搜索</a>
                    <form id="search" method="get" onSubmit={onSubmit}>
                        <input type="text" name="search" placeholder="搜索" />
                    </form>
                </li>
                <li className="menu">
                    <a className="fa-bars" href="#menu">菜单</a>
                </li>
            </ul>
        </nav>
    </header>

    <section id="menu">
            <section>
                    <form id="search" method="get" onSubmit={onSubmit}>
                        <input type="text" name="search" placeholder="搜索" />
                    </form>
            </section>

            <section>
                <ul className="links">
                {
                    TemplateConfig.navs.map((item, key) => {
                        return (
                            <li key={item.title}>
                                <Link to={item.link} title={item.title}>
                                    <h3>{item.title}</h3>
                                 </Link>
                            </li>
                        );
                    })
                }
                </ul>
            </section>
    </section>
    </React.Fragment>  
    );
}


export default NavTemplate
