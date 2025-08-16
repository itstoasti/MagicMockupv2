import {store} from "@risingstack/react-easy-state";

export enum Routes {
    AppSelection,
    MockupApp,
    TextBehindImageApp,
    Home,
}

export const RouteConfig = {
    [Routes.AppSelection]: {
        path: '/app',
        regex: /^\/?app$/,
    },
    [Routes.MockupApp]: {
        path: '/app/mockup',
        regex: /^\/?app\/mockup$/,
    },
    [Routes.TextBehindImageApp]: {
        path: '/app/text-behind-image',
        regex: /^\/?app\/text-behind-image$/,
    },
    [Routes.Home]: {
        path: '/',
        regex: /^\/$/,
    }
}

interface IRouteStore {
    currentRoute: Routes | null;

    goToRoute(route: Routes): void;

    determineRoute(): void;
}

export const routeStore = store({
    currentRoute: null,

    goToRoute: (route: Routes) => {
        if (route !== routeStore.currentRoute) {
            window.history.pushState(null, null, RouteConfig[route].path);
            dispatchEvent(new PopStateEvent('popstate', null));
        }
    },
    determineRoute: () => {
        const pathname = window.location.pathname;
        
        // Check each route configuration (order matters - more specific routes first)
        if (RouteConfig[Routes.MockupApp].regex.test(pathname)) {
            routeStore.currentRoute = Routes.MockupApp;
        } else if (RouteConfig[Routes.TextBehindImageApp].regex.test(pathname)) {
            routeStore.currentRoute = Routes.TextBehindImageApp;
        } else if (RouteConfig[Routes.AppSelection].regex.test(pathname)) {
            routeStore.currentRoute = Routes.AppSelection;
        } else if (RouteConfig[Routes.Home].regex.test(pathname)) {
            routeStore.currentRoute = Routes.Home;
        } else {
            // Default to home if no match
            routeStore.currentRoute = Routes.Home;
        }
    }

} as IRouteStore);