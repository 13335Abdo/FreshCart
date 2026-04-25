
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GerLogedUser, GetAllProdectsInCartUser } from '@/CallingAPIs/AllProdects';

export const p = createAsyncThunk("cartItems/api", async function () {

    const logUser = await GerLogedUser()
    const allProdectsInCart = await GetAllProdectsInCartUser()
    return { logUser, allProdectsInCart }


})

export const numberOfCart = createSlice({
    name: "cartItems",
    initialState: {
        cartId:"",
        noOfcart: 0,
        isLoading: false,
        allProdects:  [] as {}[],
        totalPriceOfCart: 0,
        product: null,
    },
    reducers: {
        // NoOfCartItemsSlice.ts
        updateCartItem: () => {},
        DeleteItemFromCart: () => {},
    },
    extraReducers: function (builder) {
        builder.addCase(p.pending, function (prev) {
            prev.isLoading = true

        })
        builder.addCase(p.rejected, function (prev) {
            prev.isLoading = false

        })
        builder.addCase(p.fulfilled, function (prev, y) {

            prev.isLoading = false

            console.log("yyyyy", y);

            prev.cartId = y.payload.logUser?.cartId ?? ""

            prev.noOfcart = y.payload.logUser?.numOfCartItems ?? 0

            prev.allProdects = y.payload.allProdectsInCart?.data.products ?? []

            prev.totalPriceOfCart=y.payload.logUser?.data.totalCartPrice ?? 0



        })


    }


})
export const finalNoOfCart = numberOfCart.reducer
export const { updateCartItem } = numberOfCart.actions