import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductSkeleton() {

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="p-0">
        <Skeleton className="aspect-square rounded-t-lg" />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Skeleton className="h-5 w-4/5 mb-2" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-6 w-1/4 mt-4" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}