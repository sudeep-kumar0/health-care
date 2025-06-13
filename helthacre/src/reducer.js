import { createSlice } from "@reduxjs/toolkit";
import { users } from "./users";

// Users slice
const userslice = createSlice({
  name: "users",
  initialState: users,
  reducers: {
    // Define any user-related actions here
  }
});

// Booking slice
const bookingslice = createSlice({
  name: "booking", // Updated name to match the booking-related state
  initialState: [],
  reducers: {
    saveFormData: (state, action) => {
      state.push(action.payload); // Add booking form data to state
    },
    clearData: () => {
      return []; // Clear booking data
    },
  },
});

// Cart Slice Reducer
// Cart Slice Reducer
const cartSlice = createSlice({
  name: "cart",
  initialState: [], // Initial cart state
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload); // Add item to cart
    },
    // Remove item based on heading (e.g., only remove if heading matches)
    removeFromCart: (state, action) => {
      const { heading } = action.payload; // Get heading from payload

      console.log('Item removed with heading:', heading); // Debugging step

      return state.filter(item => item.heading !== heading); // Remove item if heading matches
    },
    clearCart: () => {
      return []; // Clear all items
    }
  }
});

// Export reducers
export const bookingReducer = bookingslice.reducer;
export const userReducer = userslice.reducer;
export const cartReducer = cartSlice.reducer;

// Export actions
export const { saveFormData, clearData } = bookingslice.actions;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
