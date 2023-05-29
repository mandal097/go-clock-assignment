import React from 'react'
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.home}>
            <div className={styles.home_wrap}>
                <h1>Welcome to MERN Dashboard</h1>
                <p className={styles.about_app}>Our web dashboard simplifies communication and collaboration between Manufacturers and Transporters. Easily send and receive messages, track orders, and stay organized.</p>
                <h2 className={styles.choose_message}>Register As</h2>
                <div className={styles.btns}>
                    <button onClick={()=>navigate('/register/as-transporter')}>Transporter</button>
                    <span>or</span>
                    <button onClick={()=>navigate('/register/as-manufacturer')}>Manufacturer</button>
                </div>
            </div>
        </div>
    )
}

export default Home