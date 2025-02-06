import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Heart, LogOut, Settings, User } from "lucide-react";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogin?: () => void;
  onLogout?: () => void;
  onRegister?: () => void;
}

const Header = ({
  user,
  onLogin = () => {},
  onLogout = () => {},
  onRegister = () => {},
}: HeaderProps) => {
  return (
    <header className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-primary">
              AutoTrader
            </a>
          </div>

          {/* Navigation */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Buy</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <a
                      href="#"
                      className="group block space-y-1 p-3 rounded-lg hover:bg-accent"
                    >
                      <div className="font-medium">Search Cars</div>
                      <div className="text-sm text-muted-foreground">
                        Find your perfect vehicle
                      </div>
                    </a>
                    <a
                      href="#"
                      className="group block space-y-1 p-3 rounded-lg hover:bg-accent"
                    >
                      <div className="font-medium">New Cars</div>
                      <div className="text-sm text-muted-foreground">
                        Browse the latest models
                      </div>
                    </a>
                    <a
                      href="#"
                      className="group block space-y-1 p-3 rounded-lg hover:bg-accent"
                    >
                      <div className="font-medium">Used Cars</div>
                      <div className="text-sm text-muted-foreground">
                        Great deals on used vehicles
                      </div>
                    </a>
                    <a
                      href="#"
                      className="group block space-y-1 p-3 rounded-lg hover:bg-accent"
                    >
                      <div className="font-medium">Car Reviews</div>
                      <div className="text-sm text-muted-foreground">
                        Expert reviews and ratings
                      </div>
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Sell</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <a
                      href="#"
                      className="group block space-y-1 p-3 rounded-lg hover:bg-accent"
                    >
                      <div className="font-medium">List Your Car</div>
                      <div className="text-sm text-muted-foreground">
                        Create an attractive listing
                      </div>
                    </a>
                    <a
                      href="#"
                      className="group block space-y-1 p-3 rounded-lg hover:bg-accent"
                    >
                      <div className="font-medium">Dealer Portal</div>
                      <div className="text-sm text-muted-foreground">
                        For registered dealers
                      </div>
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Finance</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <a
                      href="#"
                      className="group block space-y-1 p-3 rounded-lg hover:bg-accent"
                    >
                      <div className="font-medium">Car Loans</div>
                      <div className="text-sm text-muted-foreground">
                        Find the best rates
                      </div>
                    </a>
                    <a
                      href="#"
                      className="group block space-y-1 p-3 rounded-lg hover:bg-accent"
                    >
                      <div className="font-medium">Insurance</div>
                      <div className="text-sm text-muted-foreground">
                        Protect your vehicle
                      </div>
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={onLogin}>
                  Log in
                </Button>
                <Button onClick={onRegister}>Register</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
