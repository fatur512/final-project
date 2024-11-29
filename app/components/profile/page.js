import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function ProfileDropdown({ user, userNavigation }) {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <img alt="" src={user.imageUrl} className="rounded-full size-8" />
        </MenuButton>
      </div>
      <MenuItems className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5">
        {userNavigation.map((item) => (
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
