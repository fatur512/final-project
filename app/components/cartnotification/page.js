import { BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link"; // Import Link from next/link

export default function CartNotification({ badgeCount }) {
  return (
    <Link
      href="/carts" // Navigate to /carts when clicked
      passHref
      className="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">View notifications</span>
      <BellIcon aria-hidden="true" className="size-6" />
      {badgeCount > 0 && (
        <span className="absolute top-0 right-0 flex items-center justify-center block w-4 h-4 text-xs text-white bg-red-500 rounded-full">
          {badgeCount}
        </span>
      )}
    </Link>
  );
}
