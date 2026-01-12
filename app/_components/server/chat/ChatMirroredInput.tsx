import { formatMessageToRichText } from "@/app/helpers/chatMessageHelpers";
import { forwardRef, useEffect, useState } from "react";
import { EmoteSize } from "../../emote/interfaces/DiscordEmote";
import { cn } from "@/lib/utils";

interface ChatMirroredInputProps {
  targetRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  mirroredText: string;
  className?: string | undefined;
}

const ChatMirroredInput = forwardRef<HTMLDivElement, ChatMirroredInputProps>(
  ({ targetRef, mirroredText, className, ...props }, ref) => {
    const [caretPos, setCaretPos] = useState(0);

    const beforeCaret = mirroredText.slice(0, caretPos);
    const afterCaret = mirroredText.slice(caretPos);

    useEffect(() => {
      const textarea = targetRef.current;
      if (!textarea) return;

      const updateCaret = () => setCaretPos(textarea.selectionStart);

      textarea.addEventListener("input", updateCaret);
      textarea.addEventListener("keydown", updateCaret);
      textarea.addEventListener("click", updateCaret);
      textarea.addEventListener("select", updateCaret);

      setCaretPos(textarea.selectionStart);

      return () => {
        textarea.removeEventListener("input", updateCaret);
        textarea.removeEventListener("keydown", updateCaret);
        textarea.removeEventListener("click", updateCaret);
        textarea.removeEventListener("select", updateCaret);
      };
    }, [targetRef]);

    useEffect(() => {
      const textarea = targetRef.current;
      if (!textarea) return;

      setCaretPos(textarea.selectionStart);
    }, [mirroredText, targetRef]);

    const handleFocus = () => {
      targetRef.current?.focus();
    };

    return (
      <div
        tabIndex={0}
        className={cn(
          "relative flex items-center cursor:text disabled:cursor-not-allowed disabled:opacity-50 md:text-sm break-all",
          className
        )}
        ref={ref}
        onFocus={handleFocus}
        {...props}
        style={{ whiteSpace: "pre-wrap" }}
      >
        <div className="flex items-center">
          {formatMessageToRichText(beforeCaret, EmoteSize.SMALL)}
        </div>
        <span
          className="w-[1px] bg-accent-x2 animate-blink align-bottom"
          style={{
            height: "1em",
          }}
        />
        <div className="flex items-center">
          {formatMessageToRichText(afterCaret, EmoteSize.SMALL)}
        </div>
      </div>
    );
  }
);
export default ChatMirroredInput;
