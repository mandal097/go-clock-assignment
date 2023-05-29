import React, { useState } from 'react'
import styles from './Navbar.module.scss'
import { useNavigate } from 'react-router-dom'
import { IoMdLogIn } from 'react-icons/io'
import { CgMathPlus } from 'react-icons/cg'
import CreateOrderModal from '../CreateOrderModal/CreateOrderModal'
import { logout } from '../../redux/userRedux'
import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentChat } from '../../redux/chatRedux'
import { clearOrders } from '../../redux/orderRedux'

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const [showForm, setShowForm] = useState(false);

    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.clear();
        dispatch(logout());
        dispatch(clearCurrentChat());
        dispatch(clearOrders())
        navigate('/login');
    };

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.wrapper}>
                    <div className={styles.logo} onClick={() => navigate('/')}>
                        MERN DASHBOARD
                        {user && <span>{`{ ${user?.role} }`}</span>}
                    </div>
                    <div className={styles.right}>
                        {user?.role === 'manufacturer' && <button onClick={() => setShowForm(true)}> <CgMathPlus className={styles.icon} />Create Order</button>}
                        {!user ?
                            <button onClick={() => navigate('/login')}>
                                <IoMdLogIn className={styles.icon} />Login</button>
                            : <>
                                <button onClick={logoutUser}><IoMdLogIn className={styles.icon} />Logout</button>
                                <div className={styles.user_name}>
                                    <p>{user?.name}</p>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            {showForm && <CreateOrderModal setShowForm={setShowForm} />}
        </>
    )
}

export default Navbar