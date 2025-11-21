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
      className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 ${
        isSelected 
          ? "bg-accent-x1 text-white shadow-lg shadow-accent-x1/20" 
          : "text-accent-x3 hover:bg-primary-x5 hover:text-accent-x2"
      }`}
    >
      {text}
    </div>
  );
}