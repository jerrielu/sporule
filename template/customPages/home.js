import React from "react";
import Config from "../../_config";
import TemplateConfig from "../_templateConfig";
import * as PostHelper from "../../src/helpers/postHelper";
import queryString from 'query-string';
import {Link} from "react-router-dom";

const Home = (props) => {

    return (
        <main role="main-home-wrapper" className="container">
            <div className="row">
                <section className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                    <article role="pge-title-content">
                        <header>
                            <h2><span>{Config.site}</span>{Config.subTitle}</h2>
                        </header>
                        <p>{Config.description}</p>
                    </article>
                </section>
                {
                    TemplateConfig.homeItems.map((item, index) => {
                        const categoriesString = item.link.split('?')[0].split('categories/')[1];
                        const location_search = '?' + item.link.split('?')[1]
                        const tagsString = queryString.parse(location_search).tags;
                        const excludedTagsString = queryString.parse(location_search).extags;
                        const page = 0;
                        const categories = categoriesString ? categoriesString.split(",") : [];
                        const tags = tagsString ? tagsString.split(",") : [];
                        const excludedTags = excludedTagsString ? excludedTagsString.split(",") : [];
                        const searchString = queryString.parse(location_search).search || "";
                        const posts = PostHelper.getPostsByPage(props.posts, page, true, searchString, categories, tags, excludedTags);
                        const post_items = posts.items;
                        while (searchString =="" && posts.hasNextPage){
                            page +=1;
                            posts = PostHelper.getPostsByPage(props.posts, page, true, searchString, categories, tags, excludedTags);
                            post_items = post_items.concat(posts.items);
                        }
                        return (
                            <section key={index} className="col-xs-12 col-sm-6 col-md-6 col-lg-6 grid">
                                <figure className="effect-oscar">
                                    <img src={item.coverImage} alt="" className="img-responsive" />
                                    <figcaption>
                                        <h2>{item.title}<span>{item.titleBold}</span></h2>
                                        <p>{item.subTitle}</p>

                                        <div className='margin-top-30'>
                                            {
                                                post_items.map((post, i) => {
                                                    let title = post.title;
                                                    post.metas.tags.forEach(o => {
                                                        if (TemplateConfig.titleTags.includes(o)) {
                                                            title = "[" + o + "] " + title;
                                                        }
                                                    });
                                                    title = title.length > 20 ? title.substring(0, 20) + '...' : title;
                                                    if (i <= 10) {
                                                        return (
                                                            <p key={i} className='home-post-list'>{post.metas.date} {title}</p>
                                                        )
                                                    }
                                                })}
                                            <p className="home-post-more">等共 {post_items.length} 篇</p>
                                        </div>
                                        <Link to={item.link}>了解更多</Link>
                                    </figcaption>
                                </figure>
                            </section>
                        )
                    })
                }

            </div>
        </main>
    );
}


export default Home