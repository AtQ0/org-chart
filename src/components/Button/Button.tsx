interface Button {
  buttonTitle: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ buttonTitle, type }: Button) => {
  return (
    <button
      className="bg-palette-skyblue py-2 px-8 pb-1.5 rounded-md cursor-pointer text-white"
      type={type}
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
