interface ButtonProps {
  buttonTitle: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ buttonTitle, type = 'button' }: ButtonProps) {
  return (
    <button
      className="bg-palette-skyblue py-2 px-8 pb-1.5 rounded-md cursor-pointer text-white"
      type={type}
    >
      {buttonTitle}
    </button>
  );
}
