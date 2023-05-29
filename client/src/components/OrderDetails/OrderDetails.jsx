import React from 'react'
import styles from './OrderDetails.module.scss'
import { useSelector } from 'react-redux'

const OrderDetails = ({ inputFocus }) => {
    const { currentChat } = useSelector(state => state.chat)
    const { currentUser } = useSelector(state => state.user)

    return (
        <div className={styles.order_details} style={{ marginLeft: currentUser?.role !== 'transporter' && 'auto' }}>
            <b>Order details</b>
            <div className={styles.details_field}>
                <div className={styles.key}>
                    <span>Order Id : </span>
                </div>
                <div className={styles.value}>
                    <p>{currentChat?._id}</p>
                </div>
            </div>
            <div className={styles.details_field}>
                <div className={styles.key}>
                    <span>To : </span>
                </div>
                <div className={styles.value}>
                    <p>{currentChat?.to}</p>
                </div>
            </div>
            <div className={styles.details_field}>
                <div className={styles.key}>
                    <span>From : </span>
                </div>
                <div className={styles.value}>
                    <p>{currentChat?.from}</p>
                </div>
            </div>
            <div className={styles.details_field}>
                <div className={styles.key}>
                    <span>Quantity : </span>
                </div>
                <div className={styles.value}>
                    <p>{currentChat?.quantity}</p>
                </div>
            </div>
            <div className={styles.details_field}>
                <div className={styles.key}>
                    <span>Address : </span>
                </div>
                <div className={styles.value}>
                    <p>{currentChat?.address} </p>
                </div>
            </div>
            {/* <div className={styles.details_field}>
                <div className={styles.key}>
                    <span>Transporter : </span>
                </div>
                <div className={styles.value}>
                    <p>{currentChat?.transporter?.name} </p>
                </div>
            </div> */}
            {currentUser?.role === 'transporter' && <div className={styles.btn}>
                <button onClick={inputFocus}>Reply</button>
            </div>}
        </div>
    )
}

export default OrderDetails