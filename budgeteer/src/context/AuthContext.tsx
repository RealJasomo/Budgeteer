import React, { createContext } from 'react';

interface AuthState{
    user: Object | null,
    loaded: boolean
}

export const AuthContext: React.Context<AuthState> = createContext<AuthState>({user: null, loaded: false});
