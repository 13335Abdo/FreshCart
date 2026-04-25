
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLoggedUserWithList, GetWithListUser } from '@/CallingAPIs/AllProdects';


export const y = createAsyncThunk("whithListItems/apii", async function () {

    const logUser = await GetWithListUser()

    const withListUser = await getLoggedUserWithList()

    return {logUser,withListUser}


})

export const numberOfWithList = createSlice({
    name: "whithListItems",
    initialState: {
        noOfWithList: 0,
        allItemsInWithList: [] as {}[],
        isLoading: false
    },
    reducers: {
        isClik:function(prev,y){
            prev.noOfWithList=y.payload.count
        }
    },
    extraReducers: function (builder) {
        builder.addCase(y.pending, function (prev) {
            prev.isLoading = true

        })
        builder.addCase(y.rejected, function (prev) {
            prev.isLoading = false

        })
        builder.addCase(y.fulfilled, function (prev, y) {
            prev.isLoading = false
            console.log("yyyyy", y);

            prev.noOfWithList = y.payload.withListUser?.count ?? 0 

            prev.allItemsInWithList = y.payload.withListUser?.data ?? [] 


        })


    }


})
export const finalNoOfWithList = numberOfWithList.reducer
export const {isClik} = numberOfWithList.actions