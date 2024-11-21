"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import Image from "next/image";
import { useRouter } from "next/navigation";

export function OrdersSheet({ children }: { children: React.ReactNode }) {
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
          <SheetTitle>Your orders</SheetTitle>
          <SheetDescription className="sr-only" />
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-205px)] mt-4">
          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              You have no orders yet.
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
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))
                        }
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                        }
                      >
                        +
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => dispatch(removeProduct({ id: item.id }))}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}