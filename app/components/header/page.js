import { Disclosure } from "@headlessui/react";
import CartNotification from "../cartnotification/page";
import ProfileDropdown from "../profile/page";
import MyTransaction from "../mytransaction/page";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function Header({ badgeCount }) {
  return (
    <Disclosure as="nav" className="bg-fixed bg-blue-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0">
            <img alt="Tripper" src="../public/logotripper.png" className="size-8" />
          </div>

          <div className="hidden md:block">
            <div className="flex items-center ml-4 md:ml-6">
              <MyTransaction />

              <CartNotification badgeCount={badgeCount} />

              <ProfileDropdown user={user} userNavigation={userNavigation} />
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
