import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Route, Redirect} from 'react-router-dom';

interface ProtectedRouteProps{
    to: string,
    path: string,
    children: React.ReactNode
}

export default function ProtectedRoute({to, path, children}: ProtectedRouteProps) {
    const auth = useContext(AuthContext);
    if(auth.state.user){
        return (<Route path={path}>{children}</Route>);
    }
    else{
        return (<Redirect to={to}></Redirect>);
    }
}
