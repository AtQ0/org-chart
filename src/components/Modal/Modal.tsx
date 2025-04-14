interface Modal {
  headerTitle: string;
  inputFields: string[];
}
const Modal = ({ headerTitle, inputFields }: Modal) => {
  return (
    <div className="bg-palette-transparent-oceanblue min-h-[400px]  rounded-md overflow-hidden flex flex-col justify-between">
      <div className="bg-palette-transparent-oceanblue min-h-15 p-6 text-palette-color-secondary">
        <h2 className="text-2xl">{headerTitle}</h2>
      </div>

      <form className="p-5 flex flex-col">
        {inputFields.map((input, index) => (
          <div key={index} className="mb-5">
            <label>{input}</label>
            <input
              type="text"
              name={input.toLowerCase().replace(/\s+/g, "_")}
              className="border p-2 w-full"
            />
          </div>
        ))}
      </form>

      <div className="bg-palette-transparent-oceanblue min-h-18"></div>
    </div>
  );
};

export default Modal;
