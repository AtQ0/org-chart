import { MagnifyingGlass } from '@phosphor-icons/react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Searchbar({ value, onChange }: Props) {
  return (
    <form className="w-full rounded-md bg-palette-background-transparent">
      <label className="relative block">
        <MagnifyingGlass
          aria-hidden="true"
          className="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 text-palette-oceanblue"
        />
        <input
          className="w-full rounded-md bg-palette-background-transparent py-1.5 pl-10 pr-3 outline-none placeholder-palette-foreground/60 border border-palette-oceanblue"
          placeholder="Search…"
          type="search"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </label>
    </form>
  );
}
