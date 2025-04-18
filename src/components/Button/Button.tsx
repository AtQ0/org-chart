interface Button {
  buttonTitle: string;
}

const Button = ({ buttonTitle }: Button) => {
  return (
    <button className="bg-palette-skyblue py-2 px-8 pb-1.5 rounded-md cursor-pointer text-white">
      {buttonTitle}
    </button>
  );
};

export default Button;
