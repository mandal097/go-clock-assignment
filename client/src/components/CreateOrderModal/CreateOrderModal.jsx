import React, { useEffect, useState } from 'react'
import styles from './CreateOrderModal.module.scss'
import { GiTireIronCross } from 'react-icons/gi'
import axios from '../../config/axios'
import { useDispatch, useSelector } from 'react-redux'
import { addNewOrder } from '../../redux/orderRedux'
import { setCurrentChat } from '../../redux/chatRedux'

const CreateOrderModal = ({ setShowForm }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const [transporters, setTransporters] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [address, setAddress] = useState(user && user?.address)
    const [selectedTransporter, setSeletedTransporter] = useState('');

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('')

    useEffect(() => {
        const fetchTransporter = async () => {
            try {

                const res = await axios.get('/user/get-all-transporters', {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.data.status === 'err') {
                    console.log('error');
                }
                if (res.data.status === 'success') {
                    setTransporters(res.data.data)
                }
            } catch (error) {
                console.log('error');
            }
        }
        fetchTransporter()
    }, [])


    const createOrder = async (e) => {
        e.preventDefault();
        if (!quantity && !address && !selectedTransporter) {
            // toast.error('Please add all inputs')
            console.log('fill all fields');
            return;
        }
        setLoading(true)
        try {
            const data = {
                quantity,
                address,
                transporter: selectedTransporter,
            }
            const token = localStorage.getItem('token')
            const res =
                await axios.post('/order/create', data,
                    {
                        headers: {
                            token: `Bearer ${token}`
                        }
                    })

            if (res.data.status === 'err') {
                setResponseMessage(res.data.message)
            }
            if (res.data.status === 'success') {
                setLoading(false);
                setResponseMessage(res.data.message)
                dispatch(addNewOrder(res.data.data))
                dispatch(setCurrentChat(res.data.data))
                setTimeout(() => {
                    setShowForm(false)
                }, 1000);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false)
            setResponseMessage('something went wrong')
        }
    }

    return (
        <div className={styles.create_order}>
            <div className={styles.container}>
                <div className={styles.close} onClick={() => setShowForm(false)}>
                    <GiTireIronCross className={styles.icon} />
                </div>
                <h1>Create order</h1>
                <div className={styles.input_field}>
                    <label htmlFor="">Order Id :</label>
                    <input
                        type="text"
                        placeholder='Auto populated from backend...'
                        readOnly
                    />
                </div>
                {/* <div className={styles.input_field}>
                    <label htmlFor="">From :</label>
                    <input
                        type="text"
                        placeholder='write sender of the message....'
                        value={from}
                        required
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </div> */}
                <div className={styles.input_field}>
                    <label htmlFor="">Quantity :</label>
                    <select required onChange={(e) => setQuantity(e.target.value)}>
                        <option value="" >Select quantity </option>
                        <option value="1 ton">1 ton</option>
                        <option value="2 ton">2 ton</option>
                        <option value="3 ton">3 ton</option>
                    </select>
                </div>
                <div className={styles.input_field}>
                    <label htmlFor="">Address :</label>
                    <input
                        type="text"
                        placeholder='write address here....'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className={styles.input_field}>
                    <label htmlFor="">Transporter :</label>
                    <select required onChange={(e) => setSeletedTransporter(e.target.value)}>
                        <option value="" >Select transporter </option>
                        {
                            transporters?.map(ele => (
                                <option key={ele?._id} value={ele?._id}>{ele?.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className={styles}>
                    <p style={{ color: 'hotpink', fontSize: "1rem" }}>{responseMessage}</p>
                </div>

                <div className={styles.input_field} style={{ flexDirection: 'row', gap: '1rem' }}>
                    <button onClick={createOrder} >{loading ? 'loading...' : 'Push'}</button>
                </div>
            </div>
        </div>
    )
}

export default CreateOrderModal