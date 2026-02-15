'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, User, LogOut } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,

} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <Image
              src="/assets/logo3.png"
              alt="Tyre Anti-Puncture"
              width={40}
              height={40}
              className="transition-transform group-hover:scale-110"
            />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden xs:block">
              SafeTyres
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Your Orders Link - Visible when authenticated */}
            {isAuthenticated && (
              <Link
                href="/orders"
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                Your Orders
              </Link>
            )}

            <div className="flex items-center gap-3 ml-4 border-l pl-6 border-border/50">
              {/* Cart Button */}
              <Link href="/cart">
                <Button variant="outline" size="icon" className="relative group">
                  <ShoppingCart className="h-5 w-5 transition-colors group-hover:text-primary" />
                  {totalItems > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-scale-in"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Auth Section */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <User className="h-4 w-4" />
                      <span className="max-w-[100px] truncate">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="cursor-pointer">
                        Order History
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-3">
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-3 pb-6 border-b border-border/50">
                    <Image
                      src="/assets/logo3.png"
                      alt="SafeTyres Logo"
                      width={32}
                      height={32}
                    />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      SafeTyres
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium hover:text-primary transition-colors py-2 px-1 rounded-md hover:bg-muted/50"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {isAuthenticated ? (
                    <div className="border-t pt-6">
                      <div className="flex items-center gap-3 mb-6 bg-muted/30 p-4 rounded-xl">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Logged in as</p>
                          <p className="font-semibold">{user?.name}</p>
                        </div>
                      </div>

                      <Link
                        href="/orders"
                        className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors mb-6 py-2 px-1"
                      >
                        Order History
                      </Link>

                      <Button
                        variant="destructive"
                        className="w-full h-12 text-lg"
                        onClick={logout}
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="border-t pt-6 space-y-4">
                      <Link href="/login" className="block w-full">
                        <Button className="w-full h-12 text-lg">Login</Button>
                      </Link>
                      <Link href="/register" className="block w-full text-center">
                        <p className="text-sm text-muted-foreground">
                          Don't have an account? <span className="text-primary font-medium">Register</span>
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
