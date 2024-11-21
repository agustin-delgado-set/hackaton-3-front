import { Product } from '@/types/product'
import { createSlice } from '@reduxjs/toolkit'
import { getProducts } from './thunks';

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductsState {
  cart: CartItem[];
  products: Product[] | undefined;
  loading: boolean;
}

const initialState: ProductsState = {
  cart: [],
  products: undefined,
  loading: true,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  },
  extraReducers(builder) {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.loading = false
    });
  },
})

export const { addToCart, updateQuantity, removeProduct, setCart } = productsSlice.actions

export default productsSlice.reducer