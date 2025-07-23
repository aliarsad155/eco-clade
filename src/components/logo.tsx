import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary"
      >
        <path d="M12 22c-2 0-4-1-5-2-1-2-2-4-2-6 0-2 1-4 2-5 2-2 4-3 6-3s4 1 6 3c1 1 2 3 2 5 0 2-1 4-2 6-1 1-3 2-5 2Z" />
        <path d="M12 2a7 7 0 0 0-7 7c0 2 1 4 2 5" />
      </svg>
      <span className="text-lg font-semibold tracking-tighter">EcoClade</span>
    </div>
  );
}
