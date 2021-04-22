import React, { useState } from 'react'
import { useRegister } from '../hooks';

import styles from '../css/signup.module.css';

export default function Signup() {
    const [page, setPage] = useState<number>(0);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [birthdate, setBirthdate] = useState<string>("");

    //mutation hook
    const [registerStatus, applyRegister] = useRegister(email, password);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        switch(page){
            case 0:
                const result = await applyRegister();
                if(result){
                    setPage(page+1);
                }
                break;
            case 1:
                break;
            default:
                break;
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const value: string = event.currentTarget.value;
        switch(event.currentTarget.name){
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "name":
                setName(value);
                break;
            case "lastname":
                setLastName(value);
                break;
            case "birthdate":
                setBirthdate(value);
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <h1 className={styles.header}>Sign Up</h1>
            <form onSubmit={handleSubmit} className={styles.mform}>
                <div className={styles.mformnav}></div>
                <div className={styles.card}>
                    {page===0&&<div className={styles.formGroup}>
                        <div className={styles.formItem}>
                            <h1>Email</h1>
                            <input type="email" name="email" placeholder="email" value={email} onChange={handleChange}/>
                        </div>
                        <div className={styles.formItem}>
                            <h1>Password</h1>
                            <input type="password" name="password" placeholder="password" value={password} onChange={handleChange}/>
                        </div>
                    </div>}
                    {page===1&&<div className={styles.formGroup}>
                        <div className={styles.formItem}>
                            <h1>First Name</h1>
                            <input type="text" name="name" placeholder="first name"  value={name} onChange={handleChange}/>
                        </div>
                        <div className={styles.formItem}>
                            <h1>Last Name</h1>
                            <input type="text" name="lastname" placeholder="last name" value={lastName}  onChange={handleChange}/>
                        </div>
                        <div className={styles.formItem}>
                            <h1>Birthday</h1>
                            <input type="date" name="birthdate" value={birthdate} onChange={handleChange}/>
                        </div>
                    </div>}
                    <button type="submit" className={`${page===0?styles.next:styles.submit} ${styles.button}`}>{page===0?"next":"submit"}</button>
                </div>
            </form>
        </div>
    )
}
