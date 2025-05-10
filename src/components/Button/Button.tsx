import { Divide, Plus } from '@phosphor-icons/react';

interface ButtonProps {
  buttonTitle: string;
  buttonType: 'button' | 'submit' | 'reset';
  buttonIcon?: 'none' | 'plus';
}

export default function Button({
  buttonTitle,
  buttonType,
  buttonIcon,
}: ButtonProps) {
  return (
    <button
      className="inline-flex items-center gap-0.25 bg-palette-skyblue py-2.5 px-8 rounded-md cursor-pointer text-white"
      type={buttonType}
    >
      {buttonIcon === 'plus' ? (
        <Plus size={20} weight="bold" className="inline-block align-middle" />
      ) : null}
      <span className="flex items-center justify-center leading-3 pt-0.75">
        {buttonTitle}
      </span>
    </button>
  );
}
