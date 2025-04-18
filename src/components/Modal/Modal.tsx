import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';

interface ModalProps {
  buttonTitle?: string;
  headerTitle: string;
  inputLabels: string[];
}

const Modal = ({
  buttonTitle,
  headerTitle,
  inputLabels: inputFields,
}: ModalProps) => {
  return (
    <div className="bg-palette-transparent-oceanblue min-h-[400px] rounded-md overflow-hidden flex flex-col gap-3 justify-between">
      <div className="bg-palette-transparent-oceanblue py-6 pl-5 pb-4 text-palette-color-secondary">
        <h2 className="text-xl select-none">{headerTitle}</h2>
      </div>

      <div className="p-5 flex flex-col">
        {inputFields.map((label, index) => (
          <label className="mb-5 select-none" key={index}>
            {label}
            <input
              className="border p-2 w-full rounded-md bg-palette-background-transparent border-none"
              name={label.toLowerCase().replace(/\s+/g, '_')}
              type="text"
            />
          </label>
        ))}
        <Checkbox labelText="Save password" />
      </div>

      <div className="bg-palette-transparent-oceanblue w-full py-6 pl-5 flex items-center justify-between">
        {buttonTitle ? <Button buttonTitle={buttonTitle} /> : ''}
      </div>
    </div>
  );
};

export default Modal;
