import {view} from "@risingstack/react-easy-state";
import {App} from "./App";
import {Homepage} from "./Homepage";
import {AppSelection} from "./AppSelection";
import {TextBehindImageApp} from "./TextBehindImageApp";
import {Blog} from "./Blog";
import {BlogPostView} from "./BlogPost";
import {BlogAdmin} from "./BlogAdmin";
import React, {useEffect} from "react";
import {Routes, routeStore} from "../../stores/routeStore";

export const MainApp = view(() => {
    if (routeStore.currentRoute === null) {
        routeStore.determineRoute();
    }

    useEffect(() => {
        window.addEventListener('popstate', routeStore.determineRoute);
        return () => window.removeEventListener('popstate', routeStore.determineRoute);
    });

    switch (routeStore.currentRoute) {
        case Routes.AppSelection:
            return <AppSelection/>;
        case Routes.MockupApp:
            return <App/>;
        case Routes.TextBehindImageApp:
            return <TextBehindImageApp/>;
        case Routes.Blog:
            return <Blog/>;
        case Routes.BlogPost:
            return <BlogPostView/>;
        case Routes.BlogAdmin:
            return <BlogAdmin/>;
        case Routes.Home:
            return <Homepage />;
        default:
            //todo - add 404 page
            return <Homepage />;
    }
});