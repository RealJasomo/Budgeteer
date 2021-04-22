import React, {useState} from 'react';
import { useLogin } from '../hooks';

import styles from '../css/signup.module.css';
import { Redirect } from 'react-router';

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loginSuccess, login] = useLogin(email, password);


    const handleSubmit = async (event: React.FormEvent) => { 
        event.preventDefault();
        await login();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.currentTarget.value;
        switch(event.currentTarget.name){
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    }
    if(loginSuccess){
        return <Redirect to="/"/>
    }
    return (
        <div>
            <h1 className={styles.header}>Login</h1>
            <form className={styles.mform} onSubmit={handleSubmit}>
                <div className={styles.card}>
                    <div className={styles.formGroup}>
                        <div className={styles.formItem}>
                            <h1>Email</h1>
                            <input type="email" name="email" placeholder="email" value={email} onChange={handleChange}/>
                        </div>
                        <div className={styles.formItem}>
                            <h1>Password</h1>
                            <input type="password" name="password" placeholder="password" value={password} onChange={handleChange}/>
                        </div>
                    </div>
                    <button type="submit" className={`${styles.button}`}>Login</button>
                </div>
            </form>
        </div>
    )
}
