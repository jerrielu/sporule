import React from "react"
import TemplateConfig from "./_templateConfig";
import {Link} from "react-router-dom";

const PostTemplate = (props) => {
    let title = props.post.title;
    props.post.metas.tags.forEach(o => {
        if (TemplateConfig.titleTags.includes(o)) {
            title = "[" + o + "] " + title;
        }
    });
    return (
        <main role="main-inner-wrapper" className="container">
            <div className="blog-details">
                <article className="post-details" id="post-details">
                    <header role="bog-header" className="bog-header text-center">
                        <h3>{props.post.metas.date}</h3>
                        <h2> {title}</h2>
                    </header>
                    <div className="enter-content">
                        {props.content}
                    </div>
                </article>
                <div className="entry__taxonomies">
                    <div className="entry__cat">
                        <h5>Posted In: </h5>
                        {props.post.metas.categories.map((category, index) => {
                            return (
                                <span className="entry__tax-list" key={index}>
                                    <Link to={"/posts/categories/" + category+"?pagetype=search"}>{category.toUpperCase()}</Link>
                                </span>
                            );
                        })}
                    </div>

                    <div className="entry__tags">
                        <h5>Tags: </h5>
                        <span className="entry__tax-list entry__tax-list--pill">
                            {props.post.metas.tags.map((tag, index) => {
                                return (
                                    <Link key={index} to={"/posts/?pagetype=search&tags=" + tag}>
                                        {tag}
                                    </Link>
                                );
                            })}
                        </span>
                    </div>
                </div>
                {props.disqus}
            </div>
        </main>

    )
}


export default PostTemplate