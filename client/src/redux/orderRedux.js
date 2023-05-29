import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orders: null
}

const orderSlice = createSlice({
    name: "orders",
    initialState: initialState,
    reducers: {
        setOrdersList: (state, action) => {
            state.orders = action.payload
        },
        addNewOrder: (state, action) => {
            state.orders.unshift(action.payload)
        },
        clearOrders: (state, action) => {
            state.orders = null
        }
    }
})


export const { setOrdersList, addNewOrder,clearOrders } = orderSlice.actions;

export default orderSlice.reducer