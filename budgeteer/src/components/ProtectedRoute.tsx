import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Route, Redirect, useLocation} from 'react-router-dom';

interface ProtectedRouteProps{
    path: string,
    to?: string,
    element?: React.ReactNode,
    children: React.ReactNode,
    exact?: boolean
}

export default function ProtectedRoute({to, path, element, children, exact=false}: ProtectedRouteProps) {
    const auth = useContext(AuthContext);
    const location = useLocation();
    if(auth.state.user){
        return (<Route exact={exact} path={path}>{children}</Route>);
    }else if(exact && location.pathname !== path){
        return <></>
    }
    else{
        return (element||!to?<>{element}</>:<Redirect to={to}></Redirect>);
    }
}
