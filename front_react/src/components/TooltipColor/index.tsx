import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import appColors from "@/utils/appColors";

interface TooltipColorProps {
  value: string;
  onClick(): void;
  className: string;
  selected: boolean;
}

export function TooltipColor({ selected, ...props }: TooltipColorProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem
            {...props}
            style={{
              outline: selected ? "2px solid #000" : undefined,
              border: "none",
            }}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{appColors[Number(props.value)].label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
