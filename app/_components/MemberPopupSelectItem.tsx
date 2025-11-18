export default function MemberPopupItemSelect({
  text,
  isSelected,
  handleClick,
}: {
  text: string;
  isSelected: boolean;
  handleClick: () => void;
}) {
  return (
    <div
      onClick={handleClick}
      className={`mt-1  text-lg leading-3 cursor-pointer ${
        isSelected ? "font-bold text-xl" : "text-lg"
      }`}
    >
      {text}
    </div>
  );
}
