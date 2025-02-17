import { useRouteError } from "react-router-dom";

export function DynamicImportFailBoundary() {
    let error: any = useRouteError();
    const errors = ['Failed to fetch dynamically imported module', 'Unable to preload CSS', 'error loading dynamically imported module'];
    console.log(error);
    
    // if (error.message.includes('Failed to fetch dynamically imported module')) {
    //     window.location.reload()
    // }
    if (errors.some((e) => error.data?.includes(e))) {
        window.location.reload()
    }
    return <>{error.data}</>
}