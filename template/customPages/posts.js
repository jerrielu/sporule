import React from "react";
import TemplateConfig from "../_templateConfig";
import Config from "../../_config";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Posts = (props) => {
    var prev;
    var next;
    var categories;

    if (props.prev) {
        prev = <span className="prev">
            <Link to="#" className="fas fa-arrow-left nav-icon" onClick={props.prev}>
            </Link>
        </span>;
    }
    if (props.next) {
        next = <span className="next">
            <Link to="#" className="fas fa-arrow-right nav-icon" onClick={props.next}>
            </Link>
        </span>;
    }
    if (props.categories.length > 0) {
        categories = props.categories[0];
    }
    var pageType = TemplateConfig.pageTypes[new URLSearchParams(window.location.search).get("pagetype")] || TemplateConfig.pageTypes["all"];
    return (
        <React.Fragment>
            <Helmet>
                <title>{Config.site} - {pageType.title}</title>
                <meta name="description" content={pageType.description} ></meta>
            </Helmet>
            <main role="main-inner-wrapper" className="container">
                <div className="row">
                    <article role="pge-title-content" className="blog-header">
                        <header>
                            <h2><span>{pageType.title}</span>{pageType.subTitle}</h2>
                        </header>
                        <p>{pageType.description}</p>
                        <div className="filterTagContainer">
                            {
                                pageType.filterTags.map((tag, index) => {
                                    var link = "/posts/categories/" + props.categories[0] + "?pagetype=" + pageType.pageType + "&tags=" + [...pageType.tags, tag].join(",") + "&extags=" + [...pageType.extags];
                                    return (
                                        <Link key={index} className="filterTag" to={link}>{tag}</Link>
                                    );
                                })
                            }
                        </div>
                    </article>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                        <ul className="grid-lod effect-2" id="grid">
                            {
                                props.posts.items.filter((o, i) => i % 2 == 0).map((md, index) => {
                                    let title = md.title;
                                    md.metas.tags.forEach(o => {
                                        if (TemplateConfig.titleTags.includes(o)) {
                                            title = "[" + o + "] " + title;
                                        }
                                    });
                                    return (
                                        <li key={index}>
                                            <section className="blog-content">
                                                <Link to={"/" + md.link}>
                                                    <figure>
                                                        <div className="post-date">
                                                            <span>{new Date(md.metas.date).getDate()}</span> {md.metas.date.substring(0, 7)}
                                                        </div>
                                                        <img src={md.metas.coverimage} alt="" className="img-responsive" />
                                                    </figure>
                                                </Link>
                                                <article>
                                                    {title}
                                                </article>
                                            </section>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <ul className="grid-lod effect-2" id="grid">
                            {
                                props.posts.items.filter((o, i) => i % 2 != 0).map((md, index) => {
                                    let title = md.title;
                                    md.metas.tags.forEach(o => {
                                        if (TemplateConfig.titleTags.includes(o)) {
                                            title = "[" + o + "] " + title;
                                        }
                                    });
                                    return (
                                        <li key={index}>
                                            <section className="blog-content">
                                                <Link to={"/" + md.link}>
                                                    <figure>
                                                        <div className="post-date">
                                                            <span>{new Date(md.metas.date).getDate()}</span> {md.metas.date.substring(0, 7)}
                                                        </div>
                                                        <img src={md.metas.coverimage} alt="" className="img-responsive" />
                                                    </figure>
                                                </Link>
                                                <article>
                                                    {title}
                                                </article>
                                            </section>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </main>
            <div className="container">
                <div className="col-full">
                    <nav className="pgn">
                        <ul>
                            {prev}
                            {next}
                        </ul>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    )
}


export default Posts