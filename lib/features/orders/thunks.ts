import { Order } from "@/types/order";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem } from "../products/products.slice";

export const getOrders = createAsyncThunk<Order[]>(
  "chats/getOrders",
  async (_, { rejectWithValue }) => {
    const response = await fetch(`api/proxy/orders`, {
      method: "GET",
    });

    if (!response.ok) {
      return rejectWithValue('Error fetching orders');
    }
    const data = await response.json();
    return data;
  },
);

export const createOrder = createAsyncThunk<void, { items: CartItem[], user_id: string }>(
  "chats/createOrder",
  async ({ items, user_id }, { rejectWithValue }) => {

    const products = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const order = {
      userId: user_id,
      products: products,
    };

    console.log(order);
    /*     const response = await fetch(`api/proxy/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });
    
        if (!response.ok) {
          return rejectWithValue('Error creating order');
        }
        const data = await response.json();
        return data; */
  },
);