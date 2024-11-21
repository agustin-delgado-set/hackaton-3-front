"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { removeProduct, updateQuantity } from "@/lib/features/products/products.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useAuth } from "@clerk/nextjs";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CartSheet({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isSignedIn } = useAuth();

  const cart = useAppSelector((state) => state.products.cart);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription className="sr-only">
            {cart.length} items in your cart
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-205px)] mt-4">
          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Your cart is empty
            </p>
          ) : (
            <div className="space-y-4">
              {cart?.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                      priority
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          className="h-7 w-7"
                          size="icon"
                          onClick={() =>
                            dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          className="h-7 w-7"
                          size="icon"
                          onClick={() =>
                            dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="destructive"
                        className="h-7 text-xs"
                        size="sm"
                        onClick={() => dispatch(removeProduct({ id: item.id }))}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {cart.length > 0 && (
          <div className="mt-4">
            <Separator className="my-4" />
            <div className="flex justify-between">
              <span className="font-medium">Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <Button
              className="w-full mt-4"
              onClick={() => {
                if (isSignedIn) {
                  router.push("/checkout");
                } else {
                  router.push("/sign-in?redirect=/checkout");
                }
              }}
            >
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}