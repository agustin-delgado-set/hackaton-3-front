import Image from "next/image";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { toast } from "sonner"
import { addToCart } from "@/lib/features/products/products.slice";

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart", {
      description: `${product.name} has been added to your cart.`,
    })
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg"
            priority
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 line-clamp-1">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-4">
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        <Button onClick={handleAddToCart} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}