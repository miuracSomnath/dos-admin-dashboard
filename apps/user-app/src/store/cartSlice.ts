import { createSlice } from '@reduxjs/toolkit'
import { produstsType } from './storeFrontslice'

type cartProduct = {
    product: produstsType
    size: string
}

type localCart = {
    productID: string,
    size: string
}

type cartType = {
    cartProductList: cartProduct[],
    localCart: localCart[]
}

const initialState: cartType = {
    cartProductList: [],
    localCart: []
}

export const CartSlice = createSlice({
    name: 'cartProducts',
    initialState,
    reducers: {
        setCartProducts: (state, action) => {
            state.cartProductList.push(action.payload)
        },
        setLocatCart: (state, action) => {
            state.localCart.push(action.payload)
        }
    },
})

export const { setCartProducts, setLocatCart } = CartSlice.actions

export default CartSlice.reducer