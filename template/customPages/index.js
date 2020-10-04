
import Posts from "./posts";
import Home from "./home";
import AboutUs from "./aboutUs";
import TemplateConfig from "../_templateConfig";

const CustomPages = {
    "home": {
        "title": "Home",
        "component": Home,
        "description": TemplateConfig.aboutUs.content
    },
    "posts": {
        "title": "Posts",
        "component": Posts
    },
    "aboutus": {
        "title": "About Us",
        "component": AboutUs,
        "description": TemplateConfig.aboutUs.content
    }
}

export default CustomPages;
