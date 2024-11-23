import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";

interface Props {
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ClearChatButton = ({ disabled, onClick }: Props) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant="destructive"
      className="whitespace-nowrap flex gap-2"
    >
      <Trash2 />
      Clear chat
    </Button>
  );
};
