import { Product } from "@/types/product";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk<Product[]>(
  "chats/getProducts",
  async (_, { rejectWithValue }) => {
    const response = await fetch(`api/proxy/products`, {
      method: "GET",
      cache: 'no-store',
    });

    if (!response.ok) {
      return rejectWithValue('Error fetching products');
    }
    const data = await response.json();
    return data;
  },
);