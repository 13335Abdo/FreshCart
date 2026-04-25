

import { configureStore } from '@reduxjs/toolkit'
import { finalNoOfCart } from './NoOfCartItemsSlice'
import { finalNoOfWithList } from './NoOfWithListItems'


export const store = configureStore({
    reducer:{
        changeNoOFCartItem:finalNoOfCart,
        changeNoOFWithListItem:finalNoOfWithList
    }
})


export type AppDispatch = typeof store.dispatch