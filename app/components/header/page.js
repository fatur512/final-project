"use client";
import { Button, Disclosure } from "@headlessui/react";
import CartNotification from "../cartnotification/page";
import ProfileDropdown from "../profile/page";
import MyTransaction from "../mytransaction/page";
import { useEffect, useState } from "react";

export default function Header({ token }) {
  const [badgeCount, setBadgeCount] = useState(0);
  const [error, setError] = useState(null);
  const [loadingCart, setLoadingCart] = useState(true);
  const [islogin, setIsLogin] = useState(false);

  useEffect(() => {
    const fetchCartDataLength = async () => {
      if (token) {
        try {
          const cartData = await getCart();
          if (cartData && cartData.data) {
            setBadgeCount(cartData.data.length);
          } else {
            throw new Error("Cart data is empty or malformed.");
          }
        } catch (error) {
          const errorMessage = error?.message || "Failed to fetch cart data. Please try again.";
          setError(errorMessage); // Set the error message here
          setBadgeCount(0); // Reset badge count on error
          console.log("Error fetching cart data:", error); // Keep the error in the console for debugging
        } finally {
          setLoadingCart(false);
        }
        setIsLogin(true);
      }
    };

    fetchCartDataLength(); // Trigger cart data fetch
  }, [token]);

  return (
    <Disclosure as="nav" className="bg-fixed bg-blue-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0">
            <img alt="Tripper" src="../public/logotripper.png" className="size-8" />
          </div>

          <div className="hidden md:block">
            <div className="flex items-center ml-4 md:ml-6">
              {islogin ? (
                <>
                  <MyTransaction />

                  <CartNotification badgeCount={badgeCount} />

                  <ProfileDropdown />
                </>
              ) : (
                <button>Login</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
