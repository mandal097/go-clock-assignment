import React, { useEffect, useState } from 'react'
import styles from './List.module.scss'
import axios from '../../config/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChat } from '../../redux/chatRedux'
import { setOrdersList } from '../../redux/orderRedux'
import { BiSearch } from 'react-icons/bi'
import { FaFilter } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

const ListItem = ({ ele }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser)
  const { currentChat } = useSelector(state => state.chat)
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (currentChat?._id === ele?._id) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [ele, currentChat])

  const viewOrder = (ele) => {
    dispatch(setCurrentChat(ele));
  }

  return (
    <div className={`${styles.list_item} ${active && styles.active_list_item}`} onClick={() => viewOrder(ele)}>
      <div className={styles.details}>
        <p><small>Order Id :</small> {ele?._id}</p>
        <p>
          <small>{user?.role === 'transporter' ? 'Received from :' : 'Sent to :'}</small>{' '}
          {user?.role === 'transporter' ? ele?.from : ele?.to}
        </p>
      </div>
    </div>
  )
}

const List = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.currentUser)
  const orders = useSelector(state => state.orders.orders)

  const [showFilter, setShowFilter] = useState(true) //for handling icon
  const [showSearch, setShowSearch] = useState(false) //for showing search box
  const [searchText, setSearchText] = useState('')

  const [searchedOrders, setSearchedOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = user?.role === 'transporter' ?
          await axios.get(`/order/get/transporter-orders/${user?._id}`, {
            headers: {
              token: `Bearer ${localStorage.getItem('token')}`
            }
          })
          : await axios.get('/order/get/manufacturer-orders', {
            headers: {
              token: `Bearer ${localStorage.getItem('token')}`
            }
          })
        if (res.data.status === 'err') {
          console.log('error');
        }
        if (res.data.status === 'success') {
          dispatch(setOrdersList(res.data.data))
        }
      } catch (error) {
        console.log('error');
      }
    }
    fetchOrders()
  }, [user, dispatch]);

  const handleFilterIcon = () => {
    setShowFilter(!showFilter);
    setShowSearch(!showSearch)
    setSearchText('')
  }

  useEffect(() => {
    const search = orders?.filter((order) => {
      if (searchText === '') {
        return false
      } else if (order?.to?.toLowerCase().includes(searchText.toLowerCase())) {
        return order
      } else if (order?.from?.toLowerCase().includes(searchText.toLowerCase())) {
        return order
      } else if (order?._id?.toLowerCase().includes(searchText.toLowerCase())) {
        return order
      }
      return false;
    });
    setSearchedOrders(search);
  }, [searchText, orders])


  return (
    <div className={styles.list}>
      <div className={styles.head}>
        {user?.role === 'transporter'
          ? <h2>Orders received from manufactures</h2>
          : <h2>Orders sent to transporters</h2>
        }
        <div className={styles.filter} onClick={handleFilterIcon}>
          <FaFilter className={styles.icon} />
        </div>
      </div>

      {showSearch && <div className={styles.search_box}>
        <div className={styles.icons}><BiSearch className={styles.icon} /></div>
        <input
          type="text"
          placeholder={`Search by orderId / ${user?.role === 'transporter' ? 'received from' : 'transported to'}`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className={styles.icons} onClick={() => {
          setShowSearch(false)
          setSearchText('')
        }}>
          <AiOutlineClose className={styles.icon} /></div>
      </div>}

      {orders?.length === 0 && <div className={styles.no_list}>
        <p>No orders yet</p>
      </div>}

      {searchedOrders?.length === 0 && searchText && <div className={styles.no_list}>
        <p>No orders found</p>
      </div>}
      {
        orders && !searchText &&
        orders?.map(ele => (
          <ListItem key={ele?._id} ele={ele} />
        ))
      }
      {
        orders && searchText && searchedOrders &&
        searchedOrders?.map(ele => (
          <ListItem key={ele?._id} ele={ele} />
        ))
      }
    </div>
  )
}



export default List