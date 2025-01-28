import { BookOpenText, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";

import CopyButton from "@/app/(home)/copy-button";

const ReceivedMessage = ({ message }: { message: string }) => {

  return (
    <div className="flex gap-5 self-start py-3">
      <div>
        <div>{message}</div>
        <div className="flex gap-4 my-4">
          <CopyButton 
            text={message}
            className="rounded-lg shadow-none border border-[hsl(0,0%,92%)] bg-white text-[hsl(0,0%,8%)] hover:bg-white hover:brightness-95 dark:bg-[hsl(0,0%,16%)] dark:text-white dark:border-[hsl(0,0%,18%)]"
          />
          <Button className="rounded-lg shadow-none border border-[hsl(0,0%,92%)] bg-white text-[hsl(0,0%,8%)] hover:bg-white hover:brightness-95 dark:bg-[hsl(0,0%,16%)] dark:text-white dark:border-[hsl(0,0%,18%)]">
            <RotateCw />
            Regenerate
          </Button>
        </div>

        {/* <Separator className="bg-[hsl(0,0%,92%)] dark:bg-[hsl(0,0%,18%)] my-5" /> */}

        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-[hsl(0,0%,54%)]">References</span>
          <div className="w-fit flex items-center gap-2.5 text-green py-0.5 px-2 rounded-lg bg-green/10 border border-green/30">
            <BookOpenText className="shrink-0" />
            <p>Schaum&apos;s Outline of Engineering Mechanics... - pg 114</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceivedMessage;