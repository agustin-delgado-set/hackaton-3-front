import { Order } from '@/types/order';
import { createSlice } from '@reduxjs/toolkit';

export interface OrdersState {
  orders: Order[] | undefined;
  loading: boolean;
}

const initialState: OrdersState = {
  orders: undefined,
  loading: false,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {

  },
})

export const { } = ordersSlice.actions

export default ordersSlice.reducer