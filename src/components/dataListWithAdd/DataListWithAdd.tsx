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
    <div className="bg-palette-transparent-oceanblue min-w-[20rem] w-[20rem]  rounded-md overflow-hidden flex flex-col gap-8 justify-between">
      <div className="bg-palette-transparent-oceanblue py-6 px-5 pb-4 text-palette-color-secondary">
        <h2 className="text-xl select-none">{headerTitle}</h2>
      </div>

      <div className="h-40 mx-5 bg-palette-background-transparent rounded-md shadow-[inset_0_0_0_3px_rgba(28,45,67,0.5)]"></div>

      <div className=" w-full pb-8 px-5 flex items-center justify-center">
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
