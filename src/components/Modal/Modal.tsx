"use client"; // Add this line at the top of the file
import Button from "../Button/Button";

interface Modal {
  buttonTitle?: string;
  headerTitle: string;
  inputLabels: string[];
}
const Modal = ({
  buttonTitle,
  headerTitle,
  inputLabels: inputFields,
}: Modal) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-palette-transparent-oceanblue min-h-[400px] rounded-md overflow-hidden flex flex-col gap-3 justify-between"
    >
      <div className="bg-palette-transparent-oceanblue py-6 pl-5 pb-4 text-palette-color-secondary">
        <h2 className="text-xl">{headerTitle}</h2>
      </div>

      <div className="p-5 flex flex-col">
        {inputFields.map((label, index) => (
          <label key={index} className="mb-5">
            {label}
            <input
              type="text"
              name={label.toLowerCase().replace(/\s+/g, "_")}
              className="border p-2 w-full rounded-md bg-palette-background-transparent border-none"
            />
          </label>
        ))}
        <label className="relative w-fit flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="peer appearance-none w-6 h-6 bg-palette-background-transparent rounded-md border border-gray-400 checked:bg-blue-500"
          />
          {/* SVG tick shown only when checked */}
          <svg
            className="absolute left-0 top-0 w-6 h-6 pointer-events-none hidden peer-checked:block text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          save password
        </label>
      </div>

      <div className="bg-palette-transparent-oceanblue w-full py-6 pl-5 flex items-center justify-between">
        {buttonTitle ? <Button buttonTitle={buttonTitle} /> : ""}
      </div>
    </form>
  );
};

export default Modal;
