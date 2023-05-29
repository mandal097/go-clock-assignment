import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Styles.module.scss'
import { BiArrowBack, BiHide, BiShow } from 'react-icons/bi'
import { login } from '../../redux/userRedux'
import { useDispatch } from 'react-redux'
import axios from '../../config/axios'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false); // for hiding password field

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [responseMessage,setResponseMessage] = useState('')

    const submit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setResponseMessage('All fields are required')
        }
        setLoading(true);
        try {
            const res = await axios.post('user/login', {
                email: email,
                password: password
            });
            if (res.data.status === 'success') {
                setResponseMessage(res.data.message);
                localStorage.setItem('token', res.data.token);
                dispatch(login(res.data.data))
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }
            if (res.data.status === 'err') {
                setResponseMessage(res.data.message);
            }
            setTimeout(() => {
                setResponseMessage('')
            }, 4000);
            setLoading(false);
        } catch (error) {
            setResponseMessage('Something went wrong')
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className={styles.auth_page}>
            <div className={styles.form}>
                <div className={styles.form_wrap}>
                    <h1>Login form </h1>
                    <div className={styles.navigate_back} onClick={() => navigate(-1)}>
                        <BiArrowBack className={styles.icon} />
                    </div>
                    <div className={styles.input_field}>
                        <label htmlFor="">Email :</label>
                        <input
                            type="email"
                            required
                            placeholder='write your email...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.input_field}>
                        <label htmlFor="">password :</label>
                        <input
                            type={show ? 'text' : 'password'}
                            required
                            placeholder='write your password...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className={styles.show_hide} onClick={() => setShow(!show)}>
                            {show ? <BiHide className={styles.icon} /> : <BiShow className={styles.icon} />}
                        </div>
                    </div>
                    <div className={styles.input_field}>
                        <button onClick={submit}>{loading ? 'loading...' : 'SUBMIT'}</button>
                    </div>

                    <div className={styles.navigate}>
                        <p style={{color:'hotpink'}}>{responseMessage}</p>
                    </div>
                    <div className={styles.navigate}>
                        <p>Don't have an account <span onClick={() => navigate('/')}>register</span></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login