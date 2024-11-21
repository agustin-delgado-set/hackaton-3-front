'use client'

import React, { createContext, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { getProducts } from '../features/products/thunks';
import { setCart } from '../features/products/products.slice';

const ProductsContext = createContext<undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const test = await dispatch(getProducts());
      console.log(test);
    })();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(setCart(JSON.parse(savedCart)));
    }
  }, []);

  return (
    <ProductsContext.Provider value={undefined}>
      {children}
    </ProductsContext.Provider>
  );
};
