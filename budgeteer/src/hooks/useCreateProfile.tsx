import { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { validate } from 'graphql';

const PROFILE = gql`
    mutation CreateProfile($userId: String!, $firstName: String!, $lastName: String!, $dateOfBirth: String!){
        createProfile(userId: $userId, firstName: $firstName, lastName:$lastName, dateOfBirth: $dateOfBirth){
           _id
        }
    }
`;

const USER = gql`
    query GetUserId{
        currentUser{
            _id
        }
    }
`;

export default function useCreateProfile(firstName: string, lastName: string, dateOfBirth: string):[boolean, () => Promise<any>]{
    const [createProfile, {error}] = useMutation(PROFILE);
    const { refetch: getUser, data  }= useQuery(USER, {
        fetchPolicy: "network-only"
    });

    const [created, setCreated] = useState<boolean>(false);
    
    const invalidate = (): boolean =>{
        const invalid_firstName = !firstName || firstName.length < 2;
        const invalid_lastName = !lastName || lastName.length < 2;
        const invalid_dateOfBirth = new Date().getFullYear() -  new Date(dateOfBirth).getFullYear() <= 18;
        return invalid_firstName || invalid_lastName || invalid_dateOfBirth;
    }
    const handleCreateProfile = async () => {
        await getUser();

        if(!data.currentUser){
            return null;
        }else{
            if(invalidate()){
                return null;
            }
        const {data : result, errors} = await createProfile({
            variables: {
                userId: data.currentUser["_id"],
                firstName,
                lastName,
                dateOfBirth
            }
        });

        if(errors){
            console.log("error:",errors);
        }
        await setCreated(true);
        return true;
        }
    }

    return [created, handleCreateProfile];
}