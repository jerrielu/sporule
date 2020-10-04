import React from "react";
import TemplateConfig from "../_templateConfig";

const AboutUs = (props) => {
    return (
       
        <main role="main-inner-wrapper" className="container">
            <div className="row">
            	<section className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                	<article role="pge-title-content">
                    	<header>
                        	<h2><span>{TemplateConfig.aboutUs.title}</span>{TemplateConfig.aboutUs.subTitle}</h2>
                        </header>
                        <p>{TemplateConfig.aboutUs.description}</p>
                    </article>
                </section>
                <section className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                	<article className="about-content">
                    	<p>{TemplateConfig.aboutUs.content}</p>
                    </article>
                </section>
                <div className="clearfix"></div>
            </div>
        </main>
    );
}


export default AboutUs