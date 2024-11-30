"use client";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function MyTransaction({}) {
  return (
    <Link
      href="/my-transaction"
      passHref
      className="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">View notifications</span>
      <ShoppingBagIcon aria-hidden="true" className="size-6" />
    </Link>
  );
}
