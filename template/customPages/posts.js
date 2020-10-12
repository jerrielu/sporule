import React, { Fragment } from "react";
import { Link } from "react-router-dom"
import TemplateConfig from "../_templateConfig";
import Config from "../../_config";
import { Helmet } from "react-helmet";

const Posts = (props) => {
    var prev;
    var next;
    if (props.prev) {
        prev = <li>
            <a href="#" className="button large previous" onClick={props.prev}>
                Previous Page
            </a>
        </li>;
    }
    if (props.next) {
        next = <li className="next">
            <a href="#" className="button large next" onClick={props.next}>
                Next Page
        </a>
        </li>;
    }
    let matchedPageTypes = TemplateConfig.navs.filter(o=>decodeURIComponent(window.location.href).includes(o['link']))
    let helmet = <Helmet></Helmet>
    if (matchedPageTypes.length>0)
    {
        helmet = <Helmet>
                <title>{Config.site} - {matchedPageTypes[0]['title']} </title>
                <meta name="description" content={matchedPageTypes[0]['description']} />
                </Helmet>
    }else if(props.categories.length>0 || props.tags.length>0){
                helmet = <Helmet>
                <title>{Config.site} - {props.categories.join(' | ')}  {props.tags.join(' | ')} </title>
                <meta name="description" content={TemplateConfig.aboutUs['content']} />
                </Helmet>
    }
    return (
        <React.Fragment>
            {helmet}
            <div id="main">
                {props.posts.items.map((item, index) => {
                    let title = item.title;
                    item.metas.tags.forEach(o => {
                        if (TemplateConfig.titleTags.includes(o)) {
                            title = "[" + o + "] " + title;
                        }
                    });
                    return (
                        <article className="post" key={index}>
                            <header>
                                <div className="title">
                                    <h2><Link to={"/" + item.link}>{title}</Link></h2>
                                </div>
                                <div className="meta">
                                    <time className="published" dateTime={item.metas.date}> {item.metas.date}</time>
                                </div>
                            </header>
                            <Link to={"/" + item.link} className="image featured"><img src={item.metas.coverimage} alt={title} /></Link>
                            <p>{item.excerpt.replaceAll(">", "")}</p>
                            <ul className="actions">
                                <li><Link to={"/" + item.link} className="button large">阅读全文</Link></li>
                            </ul>
                            <footer>
                                <ul className="stats">
                                    <li>分类:</li>
                                    {item.metas.categories.map((category, index) => {
                                        return (
                                            <li key={index}>
                                                <Link to={"/posts/categories/" + category + "?pagetype=search"}>{category.toUpperCase()}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </footer>
                            <footer>
                                <ul className="stats">
                                    <li>标签:</li>
                                    {item.metas.tags.map((tag, index) => {
                                        return (
                                            <li key={index}>
                                                <Link to={"/posts/?pagetype=search&tags=" + tag}>
                                                    {tag.toUpperCase()}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </footer>
                        </article>
                    )
                })}

                <ul className="actions pagination">
                    {prev}
                    {next}
                </ul>
                <section id="footer">
                    <p className="copyright">&copy; {new Date().getFullYear()} <Link to="/">{Config.site}</Link>, Template By <a rel="nofollow" target="_blank" href="https://html5up.net">HTML5 UP</a>. Powered By <a href="https://www.sporule.com" target="_blank" >Sporule</a>. </p>
                </section>
            </div>
            <section id="sidebar">
                <section id="intro">
                    <Link to="/" className="logo"><img src={Config.logo} alt={Config.site} /></Link>
                    <header>
                        <h2>{Config.site}</h2>
                        <p>{Config.subTitle}</p>
                    </header>
                </section>
                <section >
                    <div className="mini-posts">
                        {
                            TemplateConfig.navs.map((item, index) => {
                                return (

                                    <article className="mini-post" key={index}>
                                        <header>
                                            <h3><Link to={item.link}>{item.title}</Link></h3>
                                        </header>
                                        <Link to={item.link} className="image"><img className="cover" src={item.coverImage} alt={item.subTitle} /></Link>
                                    </article>

                                );
                            })
                        }
                    </div>
                </section>
                <section>
                    <ul className="posts">
                        {props.pinnedPosts.items.sort(() => .5 - Math.random()).map((item, i) => {
                            let title = item.title;
                            item.metas.tags.forEach(o => {
                                if (TemplateConfig.titleTags.includes(o)) {
                                    title = "[" + o + "] " + title;
                                }
                            });
                            return (
                                <li key={i}>
                                    <article>
                                        <header>
                                            <h3><Link to={"/" + item.link}>{title}</Link></h3>
                                            <time className="published" dateTime={item.metas.date}> {item.metas.date}</time>
                                        </header>
                                        <Link to={"/" + item.link} className="image"><img src={item.metas.coverimage} alt={title} /></Link>
                                    </article>
                                </li>
                            );
                        })}
                    </ul>
                </section>
                <section className="blurb">
                    <h2>关于{Config.site}</h2>
                    <p>{TemplateConfig.aboutUs.description}</p>
                    <p>{TemplateConfig.aboutUs.content}</p>
                    {/* <ul className="actions">
                        <li><a href="#" className="button">Learn More</a></li>
                    </ul> */}
                </section>
            </section>
        </React.Fragment>
    );
}

export default Posts
