import Button from '../button/Button';

interface DataListWithAddProps {
  headerTitle: string;
  buttonTitle: string;
}

export default function DataListWithAdd({
  buttonTitle,
  headerTitle,
}: DataListWithAddProps) {
  return (
    <div className="bg-palette-transparent-oceanblue min-w-[410px] rounded-md overflow-hidden flex flex-col gap-3 justify-between">
      <div className="bg-palette-transparent-oceanblue py-6 pl-5 pb-4 text-palette-color-secondary">
        <h2 className="text-xl select-none">{headerTitle}</h2>
      </div>

      <p>heeeej</p>

      <div className="bg-palette-transparent-oceanblue w-full py-6 pl-5 flex items-center justify-between">
        {buttonTitle ? (
          <Button
            buttonTitle={buttonTitle}
            buttonType="submit"
            buttonIcon="plus"
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
