import React, { useEffect, useRef, useState } from 'react'
import styles from './Chat.module.scss'
import OrderDetails from '../OrderDetails/OrderDetails'
import { BsFillSendFill } from 'react-icons/bs'
import Message from '../Message/Message'
import { useSelector } from 'react-redux'
import axios from '../../config/axios'

const Chat = () => {
    const user = useSelector(state => state.user.currentUser);
    const { currentChat } = useSelector(state => state.chat)
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false)
    const [placeholder, setPlaceholder] = useState('Reply your message here...')
    const inputRef = useRef(null);
    const replyActionsRef = useRef(null);

    const [priceFlag, setPriceFlag] = useState('');

    const inputFocus = () => {
        inputRef.current.focus();
        setPlaceholder('Enter yout price (in ₹)')
        setPriceFlag('Price : ₹ ')
        inputRef.current.style.border = '1.5px solid var(--textSoft)'
    }

    useEffect(() => {
        const checkClick = (e) => {
            if (!inputRef.current.contains(e.target)) {
                inputRef.current.style.border = '1px solid var(--border-color)'
                setPlaceholder('Reply your message here...')
            }
        }
        document.addEventListener('mousedown', checkClick);
        return () => {
            document.removeEventListener('mousedown', checkClick);
        }
    }, []);

    useEffect(() => {
        const checkClick = (e) => {
            if (!replyActionsRef.current.contains(e.target)) {
                replyActionsRef.current.style.border = '1px solid var(--border-color)'
                setPriceFlag('')
            }
        }
        document.addEventListener('mousedown', checkClick);
        return () => {
            document.removeEventListener('mousedown', checkClick);
        }
    }, []);

    const letter = (str) => {
        return str.charAt(0)
    }

    //messaging features .....


    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await axios.get(`/message/fetch/${currentChat?._id}`, {
                headers: {
                    token: `Bearer ${token}`
                },
            });
            setMessages(res.data.data);
            setLoading(false);
        }
        fetchMessages();
    }, [currentChat]);



    const postMessage = async (e) => {
        e.preventDefault();
        if (!newMessage) {
            console.log('Please type reply');
            return;
        }

        const token = localStorage.getItem('token')
        const res = await axios.post(`/message/post/${currentChat?._id}`, {
            content: priceFlag + newMessage
        }, {
            headers: {
                token: `Bearer ${token}`
            }
        })
        if (res.data.status === 'err') {
            console.log(res.data.message)
        }
        if (res.data.status === 'success') {
            setMessages([...messages, res.data.data])
            setNewMessage('');
            setTimeout(() => {
                setPriceFlag('')
            }, 1000);
        }
    }

    return (
        <div className={styles.chat_box}>
            <div className={styles.chat_details}>
                <div className={styles.circle}>
                    {
                        user?.role === 'transporter'
                            ? <span>{letter(currentChat?.from)}</span>
                            : <span>{letter(currentChat?.to)}</span>
                    }
                </div>
                {
                    user?.role === 'transporter'
                        ? <p>{currentChat?.from} <br /> {currentChat && <span>{currentChat?.manufacturerId?.role}</span>}</p>
                        : <p>{currentChat?.to} <br /> {currentChat && <span>{currentChat?.transporter?.role}</span>}</p>
                }
                <div className={styles.right}>
                    <p><span>Order Id : </span> {currentChat?._id}</p>
                    <button onClick={()=>window.location.reload()}>Reload chats</button>
                </div>
            </div>
            <div className={styles.chats}>
                <OrderDetails inputFocus={inputFocus} />
                {
                    loading && <div className={styles.loading}>loading...</div>
                }
                {
                    messages &&
                    messages?.map(message => (
                        <Message key={message?._id} message={message} />
                    ))
                }
            </div>
            <div className={styles.reply_actions} ref={replyActionsRef}>
                <div className={styles.left}>
                    <span>Reply form </span>
                </div>
                <div className={styles.middle}>
                    <input
                        type="text"
                        placeholder={placeholder}
                        ref={inputRef}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                </div>
                <div className={styles.right}>
                    <button onClick={postMessage}><BsFillSendFill className={styles.icon} /></button>
                </div>
            </div>
        </div>
    )
}

export default Chat