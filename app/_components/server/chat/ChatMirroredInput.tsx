import { formatMessageToRichText } from "@/app/helpers/chatMessageHelpers";
import { forwardRef, useEffect, useState } from "react";
import { EmoteSize } from "../../emote/interfaces/DiscordEmote";
import { cn } from "@/lib/utils";

interface ChatMirroredInputProps {
  targetRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  mirroredText: string;
  showMirroredCaret: boolean;
  className?: string | undefined;
}

const ChatMirroredInput = forwardRef<HTMLDivElement, ChatMirroredInputProps>(
  (
    { targetRef, mirroredText, showMirroredCaret, className, ...props },
    ref
  ) => {
    const [caretPos, setCaretPos] = useState(0);
    const [showPlaceHolderText, setShowPlaceHolderText] =
      useState<boolean>(true);

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

    useEffect(() => {
      setShowPlaceHolderText(!mirroredText?.length);
    }, [mirroredText]);

    const handleFocus = () => {
      targetRef.current?.focus();
    };

    const caretJSX = (
      <span
        className="inline-block w-[1px] bg-accent-x2 animate-blink align-text-bottom"
        style={{
          height: "1em",
        }}
      />
    );

    return (
      <div
        tabIndex={0}
        className={cn(
          "relative block cursor:text disabled:cursor-not-allowed disabled:opacity-50 md:text-sm break-all whitespace-pre-wrap w-full text-center",
          className
        )}
        ref={ref}
        onFocus={handleFocus}
        {...props}
      >
        {showPlaceHolderText ? (
          <>
            {showMirroredCaret && caretJSX}
            <span className="text-muted-foreground">
              Type your message here...
            </span>
          </>
        ) : (
          <>
            <div className="inline">
              {formatMessageToRichText(beforeCaret, EmoteSize.SMALL)}
            </div>
            {showMirroredCaret && caretJSX}
            <div className="inline ">
              {formatMessageToRichText(afterCaret, EmoteSize.SMALL)}
            </div>
          </>
        )}
      </div>
    );
  }
);
export default ChatMirroredInput;
