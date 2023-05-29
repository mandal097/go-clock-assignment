import React, { useEffect, useRef } from 'react'
import styles from './Message.module.scss'
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';

const Message = ({ message }) => {
  const { currentUser } = useSelector((state) => state.user);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
  }, [message]);

  //checking wether the message is our or not
  const own = Object.values(message?.sender).includes(currentUser?._id);

  return (
    <div className={`${styles.message} ${own && styles.own}`} ref={scrollRef}>
      <div className={styles.wrapper}>
        <p>{message?.content}</p>
      </div>
      <div className={` ${own ? styles.own_time : styles.time}`}>{format(message?.createdAt)}</div>
    </div>
  )
}

export default Message