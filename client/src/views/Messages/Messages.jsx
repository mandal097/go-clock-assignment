import React from 'react'
import styles from './Messages.module.scss'
import List from '../../components/List/List'
import DefaultChat from '../../components/Chats/DefaultChat'
import Chat from '../../components/Chats/Chat'
import { useSelector } from 'react-redux'

const Messages = () => {
    const { currentChat } = useSelector(state => state.chat);
    return (
        <div className={styles.messages}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <List />
                </div>
                <div className={styles.right}>
                    {
                        currentChat ? <Chat /> : <DefaultChat />
                    }

                </div>
            </div>
        </div>
    )
}

export default Messages