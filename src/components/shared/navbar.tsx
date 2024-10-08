"use client";

import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { useTranslations } from 'next-intl';
import ThemeButton from "./theme-button";
import LocaleSwitcher from "./locale-switcher";
import { getNavComponents } from "@/utils/navItem";
import CustomSearchCombobox from "./site-search";

interface NavbarProps {
  appName: string;
}

const Navbar: React.FC<NavbarProps> = ({ appName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  const navComponents = getNavComponents(t);

  // Handle click and close Sheet after link click
  const handleLinkClick = () => {
    setIsOpen(false);  // Close the sheet when a link is clicked
  };

  return (
    <nav className="fixed w-full flex items-center justify-between flex-wrap border-b p-4 bg-background z-50">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center flex-shrink-0 mr-6">
          <span className="text-xl font-semibold tracking-tight w-full text-primary">
           <Link href="/">{appName}</Link>
          </span>
        </div>
        <div className="hidden lg:flex items-end justify-end w-full space-x-4 mr-4">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t('Navbar.tools')}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {navComponents.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        icon={component.icon}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeButton />
          <CustomSearchCombobox />
          {/* <LocaleSwitcher /> */}
        </div>
        <div className="block lg:hidden ml-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant={"outline"}
                className="flex items-center px-2 py-2 rounded"
              >
                {isOpen ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xl tracking-tight">
                    {appName}
                  </span>
                </div>
                <div className="flex flex-col space-y-4">
                  {navComponents.map((item, index) => (
                    <Link key={index} href={item.href} className="block mt-4 mr-4" onClick={handleLinkClick}>
                      <Button variant={"ghost"}>{item.title}</Button>
                    </Link>
                  ))}
                </div>
                <Separator orientation="horizontal" />
                <div className="absolute bottom-4">
                  <div className="flex space-x-4 mt-4">
                    <LocaleSwitcher />
                    <ThemeButton />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav >
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string, icon: React.ComponentType }
>(({ className, title, icon: Icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-2">
            <Icon />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
