"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Search, ShoppingCart, User } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => {
    return pathname === path ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600";
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            Orbista
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`${isActive("/")} transition-colors duration-200`}>
              Home
            </Link>
            <Link href="/products" className={`${isActive("/products")} transition-colors duration-200`}>
              Products
            </Link>
            <Link href="/categories" className={`${isActive("/categories")} transition-colors duration-200`}>
              Categories
            </Link>
            <Link href="/about" className={`${isActive("/about")} transition-colors duration-200`}>
              About
            </Link>
            <Link href="/contact" className={`${isActive("/contact")} transition-colors duration-200`}>
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
              <Search size={20} />
            </button>

            <Link
              href="/cart"
              className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {session ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                  >
                    My Account
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                  >
                    Orders
                  </Link>
                  {session.user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                <User size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 