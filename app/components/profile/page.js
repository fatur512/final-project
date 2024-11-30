"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

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

export default function ProfileDropdown({}) {
  const imageUrl = user?.imageUrl || "/default-image.png";

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <img alt="Profile" src={imageUrl} className="w-8 h-8 rounded-full" />
        </MenuButton>
      </div>
      <MenuItems className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5">
        {userNavigation?.map((item) => (
          <MenuItem key={item.name}>
            <a href={item.href} className="block px-4 py-2 text-sm text-gray-700">
              {item.name}
            </a>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
