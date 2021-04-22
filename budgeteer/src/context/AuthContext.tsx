import React, { createContext,  useReducer } from 'react';
import * as cookie from 'js-cookie';

interface AuthState{
    user: string | null
}

interface AuthAction{
    type: "login" | "logout",
    payload: string | null
}
interface Auth{
    state: AuthState, 
    dispatch: React.Dispatch<any>
}

const initialState: AuthState = { user: cookie.get("token") || null}

const reducer = (state: AuthState, action: AuthAction): AuthState => {
    if(action.type === "login"){
        return {user: action.payload};
    }
    if (action.type === "logout"){
        cookie.remove("token");
        return { user: null };
    }
    return state;
}

const AuthContext: React.Context<Auth> = createContext<Auth>({state: initialState, dispatch: () => null});

const AuthProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (<AuthContext.Provider value={{state, dispatch}}>
        { children }
    </AuthContext.Provider>)
}

export { AuthContext, AuthProvider};