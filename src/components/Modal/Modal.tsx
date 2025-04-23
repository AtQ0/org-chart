import Button from '../button/Button';
import Checkbox from '../checkbox/Checkbox';

interface ModalProps<T> {
  buttonTitle?: string;
  headerTitle: string;
  inputLabels: string[];
  formData: T;
  setFormData: (val: T) => void;
}

export default function Modal<T extends Record<keyof T, string>>({
  buttonTitle,
  headerTitle,
  inputLabels: inputFields,
  formData,
  setFormData,
}: ModalProps<T>) {
  return (
    <div className="bg-palette-transparent-oceanblue min-w-[410px] rounded-md overflow-hidden flex flex-col gap-3 justify-between">
      <div className="bg-palette-transparent-oceanblue py-6 pl-5 pb-4 text-palette-color-secondary">
        <h2 className="text-xl select-none">{headerTitle}</h2>
      </div>

      <div className="p-5 flex flex-col">
        {inputFields.map((label, index) => {
          const name = label.toLowerCase().replace(/\s+/g, '_') as keyof T;
          return (
            <label className="mb-5 select-none" key={index}>
              {label}
              <input
                className="border p-2 w-full rounded-md bg-palette-background-transparent border-none"
                name={String(name)}
                type="text"
                value={formData[name]}
                onChange={e =>
                  setFormData({ ...formData, [name]: e.target.value })
                }
              />
            </label>
          );
        })}
        <Checkbox labelText="Save password" />
      </div>

      <div className="bg-palette-transparent-oceanblue w-full py-6 pl-5 flex items-center justify-between">
        {buttonTitle ? <Button buttonTitle={buttonTitle} type="submit" /> : ''}
      </div>
    </div>
  );
}
