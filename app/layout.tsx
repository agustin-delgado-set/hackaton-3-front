import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { ProductsProvider } from "@/lib/context/products.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Product Catalog",
  description: "A beautiful product catalog built with Next.js and shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <StoreProvider>
            <ProductsProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
              >
                {children}
                <Toaster position="bottom-center" theme="light" />
              </ThemeProvider>
            </ProductsProvider>
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}