import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
  maxRows?: number;
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, minRows = 1, maxRows = 6, onChange, ...props }, ref) => {
    const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

    // Sync forwarded ref
    React.useImperativeHandle(ref, () => inputRef.current as HTMLTextAreaElement);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = inputRef.current;
      if (!textarea) return;
      textarea.style.height = "auto";
      const lineHeight = 24; // px, sesuaikan jika perlu
      const maxHeight = maxRows * lineHeight;
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
      if (onChange) onChange(e);
    };

    React.useEffect(() => {
      if (inputRef.current) {
        const textarea = inputRef.current;
        textarea.style.height = "auto";
        const lineHeight = 24;
        const maxHeight = maxRows * lineHeight;
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
        textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
      }
    }, [props.value, maxRows]);

    return (
      <Textarea
        autoComplete="off"
        ref={inputRef}
        name="message"
        rows={minRows}
        className={cn(
          // Tambahkan padding kanan agar tombol tidak menimpa teks
          "px-4 py-3 bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md flex items-center resize-none transition-all duration-100",
          className
        )}
        style={{ overflow: "hidden" }}
        onInput={handleInput}
        {...props}
      />
    );
  }
);
ChatInput.displayName = "ChatInput";

export { ChatInput };