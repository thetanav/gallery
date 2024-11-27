import { CalendarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

export default function CreatorCard() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="opacity-70 hover:opacity-100">developer @tanavindev</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://pbs.twimg.com/profile_images/1858556239443075072/TDmADeAx_400x400.jpg" />
            <AvatarFallback>TP</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <a href="https://x.com/tanavindev" target="_blank" rel="noreferrer"><h4 className="text-sm font-semibold">@tanavindev</h4></a>
            <p className="text-sm">
              A passionate developer who loves to create and maintain open-source.
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2022
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
