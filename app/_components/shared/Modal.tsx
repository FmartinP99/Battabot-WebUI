import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

interface ModalContextProps {
  name: string;
  close?: VoidFunction;
  open?: (name: string) => void;
}

const initialState: ModalContextProps = {
  name: "",
  close: undefined,
  open: undefined,
};

interface OpenProps {
  children: ReactElement;
  opens: string;
}

interface ModalProps {
  children: ReactNode;
}

interface WindowProps {
  children: ReactElement;
  name: string;
  position?: WindowPosition;
}

type WindowPosition = "center" | "top" | "bottom";

const positionMap: Record<WindowPosition, string> = {
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  top: "top-12 left-1/2  -translate-x-1/2",
  bottom: "bottom-12 left-1/2 -translate-x-1/2",
};

const ModalContext = createContext<ModalContextProps>(initialState);

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ name: openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open?.(opensWindowName) });
}

export function Window({ children, name, position = "center" }: WindowProps) {
  const { name: openName, close } = useContext(ModalContext);
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <div
      className="
    fixed inset-0
    w-full h-screen
    bg-black/40 backdrop-blur-sm
    z-[1000]
    transition-all duration-500
  "
    >
      <div
        ref={ref}
        className={`
    fixed ${positionMap[position] ?? ""}
    bg-slate-800 rounded-xl shadow-xl
    p-8 md:p-10
    transition-all duration-500
    max-h-[80vh] overflow-auto
  `}
      >
        <button
          onClick={close}
          className=" absolute top-3 right-5
    bg-transparent border-none p-1
    rounded-md
    translate-x-3
    transition-all duration-200
    hover:bg-red-500"
        >
          <HiXMark className="w-6 h-6 text-gray-200" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
