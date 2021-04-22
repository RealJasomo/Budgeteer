import { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import * as cookie from 'js-cookie';

const LOGIN = gql`
    mutation Login($email:  String!, $password: String!){
        login(email: $email, password: $password){
            email
        }
    }
`
export default function useLogin(email: string, password: string): [boolean, () => Promise<void>]{
    const [login] = useMutation(LOGIN);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    
    const auth = useContext(AuthContext);
    
    const handleSubmit = async () => {
        var { data} = await login({
            variables: {
                email,
                password
            }});
        if(data){
            auth.dispatch({
                type: "login",
                payload: cookie.get("token")
            });
            setLoggedIn(true);
        } 
    }

     return [loggedIn, handleSubmit];
}