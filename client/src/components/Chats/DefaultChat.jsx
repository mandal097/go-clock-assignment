import React from 'react'
import styles from './DefaultChat.module.scss'
import {RiMessage3Fill} from 'react-icons/ri'

const DefaultChat = () => {
    return (
        <div className={styles.default_chat}>
            <RiMessage3Fill className={styles.icon}/>
            <p>Details of selected order is being shown here</p>
        </div>
    )
}

export default DefaultChat