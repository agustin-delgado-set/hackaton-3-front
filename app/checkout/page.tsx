'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createOrder } from "@/lib/features/orders/thunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();

  const { userId } = useAuth();

  const [loading, setLoading] = useState(false);

  const cart = useAppSelector((state) => state.products.cart);

  const handleCreateOrder = async () => {
    if (!userId) return toast.error('You need to be signed in to create an order');

    await dispatch(createOrder({
      items: cart,
      user_id: userId
    }));
  }

  const handleConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4">
        <CardHeader className="text-center">
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          {cart.map((product) => (
            <div key={product.id} className="flex items-center mb-4">
              <Image
                src={product.image}
                alt={product.name}
                width={64}
                height={64}
                className="rounded"
              />
              <div className="ml-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">
                    {product.quantity} x
                  </span>
                  <p className="font-bold">{product.price}</p>
                </div>
              </div>
            </div>
          ))}
          <Separator />
        </CardContent>
        <CardFooter>
          <div className="flex justify-between w-full">
            <p className="text-center">
              Total:
            </p>
            <p className="text-center font-bold">
              ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </p>
          </div>
        </CardFooter>
        <Button
          onClick={() => {
            handleCreateOrder();
            handleConfetti();
          }}
          disabled={loading}
          className="w-full mt-4"
        >
          {loading ? 'Processing...' : 'Pay'}
        </Button>
      </Card>
    </div>
  )
}