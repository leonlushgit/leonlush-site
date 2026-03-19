import { ReactNode } from "react";

interface LinkButtonProps {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  variant?: "default" | "youtube" | "featured";
}

export default function LinkButton({
  href,
  icon,
  children,
  variant = "default",
}: LinkButtonProps) {
  const variantStyles = {
    default:
      "bg-white/5 hover:bg-white/10 backdrop-blur-md text-white",
    youtube:
      "bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-900/20 text-white",
    featured:
      "bg-gradient-to-r from-orange-500 to-amber-400 shadow-lg shadow-orange-900/20 text-[#0F0F0F]",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between px-5 h-16 rounded-xl active:scale-95 transition-transform ${variantStyles[variant]}`}
    >
      <span className="font-bold text-base">{children}</span>
      {icon && <span className="flex-shrink-0">{icon}</span>}
    </a>
  );
}
