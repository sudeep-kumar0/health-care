import { configureStore } from "@reduxjs/toolkit";
import { bookingReducer, userReducer, cartReducer } from "./reducer";


export const storedata = configureStore({
    reducer:{
        usersData: userReducer,
        bookingsData: bookingReducer,
        cartData: cartReducer,
    }

    
})