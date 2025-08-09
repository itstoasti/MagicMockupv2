import {store} from "@risingstack/react-easy-state";

export enum Routes {
    App,
    Home,
}

export const RouteConfig = {
    [Routes.App]: {
        path: '/app',
        regex: /^\/?app$/,
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
        
        // Check each route configuration
        if (RouteConfig[Routes.App].regex.test(pathname)) {
            routeStore.currentRoute = Routes.App;
        } else if (RouteConfig[Routes.Home].regex.test(pathname)) {
            routeStore.currentRoute = Routes.Home;
        } else {
            // Default to home if no match
            routeStore.currentRoute = Routes.Home;
        }
    }

} as IRouteStore);