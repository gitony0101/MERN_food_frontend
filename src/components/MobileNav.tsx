import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from './ui/sheet';
import { CircleUserRound, Menu } from 'lucide-react';
import MobileNavLinks from './MobileNavLinks ';

export default function MobileNav() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu className="text-orange-500" />
        </SheetTrigger>
        <SheetContent className="spac e-y-3">
          <SheetTitle>
            {isAuthenticated ? (
              <span className="flex items-center font-bold gap-2">
                <CircleUserRound className="text-orange-500" />
                {user?.email}
              </span>
            ) : (
              <span>Welcome to MernEats.com!</span>
            )}
          </SheetTitle>
          <Separator>
            <SheetDescription className="flex flex-col gap-4">
              {isAuthenticated ? (
                <MobileNavLinks />
              ) : (
                <Button
                  onClick={() => loginWithRedirect()}
                  className="flex-1 font-bold bg-orange-500"
                >
                  Log In
                </Button>
              )}
            </SheetDescription>
          </Separator>
        </SheetContent>
      </Sheet>
    </div>
  );
}
