export interface CheckboxProps {
  labelText: string;
}

export default function Checkbox({ labelText }: CheckboxProps) {
  return (
    <label className="relative w-fit flex items-center gap-2 cursor-pointer select-none">
      <input
        className="peer appearance-none w-6 h-6 bg-palette-background-transparent rounded-md border border-gray-400 checked:bg-blue-500"
        type="checkbox"
      />
      {/* SVG tick shown only when checked */}
      <svg
        className="absolute left-0 top-0 w-6 h-6 pointer-events-none hidden peer-checked:block text-white"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        viewBox="0 0 24 24"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {labelText}
    </label>
  );
}
