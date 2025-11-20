interface MemberPopupItemSelectParams {
  text: string;
  isSelected: boolean;
  handleClick: VoidFunction;
}

export default function MemberPopupItemSelect({
  text,
  isSelected,
  handleClick,
}: MemberPopupItemSelectParams) {
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
