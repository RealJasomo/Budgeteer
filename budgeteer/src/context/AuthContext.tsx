import React, { createContext,  useReducer } from 'react';

interface AuthState{
    user: Object | null,
    loaded: boolean
}

interface AuthAction{
    type: "login" | "logout",
    payload: Object | null
}
interface Auth{
    state: AuthState, 
    dispatch: React.Dispatch<any>
}

const initialState: AuthState = {user: null, loaded: false}

const reducer = (state: AuthState, action: AuthAction): AuthState => {
    if(action.type === "login"){
        return {...state, user: action.payload as AuthState};
    }
    if (action.type === "logout"){
        return {... state, user: null};
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