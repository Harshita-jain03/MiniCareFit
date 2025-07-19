import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  text: string;
  iconUrl: string;
  iconPosition: "left" | "right";
  onClick: () => void;
};

export default function PaginationButton({ text, iconUrl, iconPosition, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 py-2 rounded text-[#667085]"
    >
      {iconPosition === "left" && <ArrowLeft className="w-4 h-4" />}
      {text}
      {iconPosition === "right" && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}