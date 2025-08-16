import {view} from "@risingstack/react-easy-state";
import {App} from "./App";
import {Homepage} from "./Homepage";
<<<<<<< HEAD
import {AppSelection} from "./AppSelection";
import {TextBehindImageApp} from "./TextBehindImageApp";
=======
>>>>>>> origin/master
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
<<<<<<< HEAD
        case Routes.AppSelection:
            return <AppSelection/>;
        case Routes.MockupApp:
            return <App/>;
        case Routes.TextBehindImageApp:
            return <TextBehindImageApp/>;
=======
        case Routes.App:
            return <App/>;
>>>>>>> origin/master
        case Routes.Home:
            return <Homepage />;
        default:
            //todo - add 404 page
            return <Homepage />;
    }
});