import { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import * as cookie from 'js-cookie';

const REGISTER = gql`
    mutation Register($email:  String!, $password: String!){
        register(email: $email, password: $password)
    }
`
export default function useRegister(email: string, password: string): [() => Promise<boolean|void>]{
    const [register] = useMutation(REGISTER);
    
    const auth = useContext(AuthContext);
    
    const handleSubmit = async () => {
       var { data: result }= await register({
            variables: {
                email,
                password
            }});
        console.log(result);
        if(result.register){
            auth.dispatch({
                type: "login",
                payload: cookie.get("token")
            });
            return true;
        }
     }
     return [handleSubmit];
}