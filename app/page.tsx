"use client";

import { CartSheet } from "@/components/cart-sheet";
import { OrdersSheet } from "@/components/orders-sheet";
import { ProductCard } from "@/components/product-card";
import ProductSkeleton from "@/components/product-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/hooks";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Box, Search, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const { isSignedIn, isLoaded } = useAuth();

  const [search, setSearch] = useState("");

  const cart = useAppSelector((state) => state.products.cart);
  const products = useAppSelector((state) => state.products.products);
  const loadingProducts = useAppSelector((state) => state.products.loading);

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Catalog</h1>
        <div className="flex items-center gap-4">
          {!isSignedIn && isLoaded ? (
            <Button
              onClick={() => router.push("/sign-in")}
              variant="ghost"
            >
              Sign In
            </Button>
          ) : (
            <UserButton />
          )}
          <CartSheet>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </CartSheet>
          <OrdersSheet>
            <Button variant="outline" size="icon" className="relative">
              <Box className="h-4 w-4" />
            </Button>
          </OrdersSheet>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loadingProducts
          ? Array(4).fill(0).map((_, index) => <ProductSkeleton key={index} />)
          : filteredProducts?.map(product => <ProductCard key={product.id} product={product} />)
        }
        {!loadingProducts && filteredProducts?.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No products found.
          </div>
        )}
      </div>
    </main>
  );
}