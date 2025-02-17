import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";

export const useAdminRoutes = ({routes, replaceComponentWith, condition}: {routes: RouteObject[], replaceComponentWith: ReactNode, condition: boolean}) => {
    return routes.map(route => {
        if(condition){
            console.log(route);
            return {...route, element: replaceComponentWith}
        }
        
        return route
    })
}