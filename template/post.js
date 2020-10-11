import React from "react"
import TemplateConfig from "./_templateConfig";
import { Link } from "react-router-dom";
import Config from "../_config";


const PostTemplate = (props) => {
    let title = props.post.title;
    props.post.metas.tags.forEach(o => {
        if (TemplateConfig.titleTags.includes(o)) {
            title = "[" + o + "] " + title;
        }
    });
    return (
        <React.Fragment>
            <div id="main">
                <article className="post">
                    <header>
                        <div className="title">
                            <h2><Link to={props.post.link}>{title}</Link></h2>
                        </div>
                        <div className="meta">
                            <time className="published" dateTime="{props.post.metas.date}">{props.post.metas.date}</time>
                        </div>
                    </header>
                    {props.content}
                    <footer>
                        <ul className="stats">
                            <li>分类:</li>
                            {props.post.metas.categories.map((category, index) => {
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
                            {props.post.metas.tags.map((tag, index) => {
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
                {props.disqus}
                <section id="footer">
                    <p className="copyright">&copy; {new Date().getFullYear()} <Link to="/">{Config.site}</Link>, Template By <a rel="nofollow" target="_blank" href="https://html5up.net">HTML5 UP</a>. Powered By <a href="https://www.sporule.com" target="_blank" >Sporule</a>. </p>
                </section>
            </div>

        </React.Fragment>


    )
}


export default PostTemplate