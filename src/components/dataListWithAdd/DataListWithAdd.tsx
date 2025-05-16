import { useEffect, useState } from 'react';
import Button from '../button/Button';
import Searchbar from '../searchbar/Searchbar';

interface DataListWithAddProps {
  headerTitle: string;
  buttonTitle: string;
  showSearch?: boolean;
  dataType:
    | 'countries'
    | 'cities'
    | 'offices'
    | 'departments'
    | 'teams'
    | 'users'
    | 'domains';
}

type GenericDataItem = Record<string, any>;

export default function DataListWithAdd({
  buttonTitle,
  headerTitle,
  showSearch = false,
  dataType,
}: DataListWithAddProps) {
  const [data, setData] = useState<GenericDataItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/${dataType}`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error(`Failed to fetch ${dataType}:`, error);
      }
    }

    fetchData();
  }, [dataType]);

  // 🧠 Smarter label extractor
  function getDisplayLabel(item: GenericDataItem): string {
    switch (dataType) {
      case 'teams':
        return item.team_name;
      case 'users':
        return item.first_name + ' ' + (item.last_name || '');
      case 'countries':
      case 'cities':
      case 'offices':
      case 'departments':
      case 'domains':
        return item.name;
      default:
        return JSON.stringify(item);
    }
  }

  return (
    <div className="bg-palette-transparent-oceanblue w-full rounded-md overflow-hidden flex flex-col gap-8 justify-between]">
      <div className="bg-palette-transparent-oceanblue py-6 px-5 pb-4 text-palette-color-secondary">
        <h2 className="text-xl select-none">{headerTitle}</h2>
      </div>

      {showSearch && (
        <div className="px-5">
          <Searchbar />
        </div>
      )}

      <div className="mx-5 bg-palette-background-transparent rounded-md shadow-[0_0_0_3px_rgba(28,45,67,0.5)] overflow-y-auto  p-3 text-sm text-white h-40">
        {data.length > 0 ? (
          <ul className="list-disc pl-4">
            {data.map((item, idx) => (
              <li key={idx}>{getDisplayLabel(item)}</li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-400">No data found.</p>
        )}
      </div>

      <div className="w-full pb-8 px-5 flex items-center justify-center">
        {buttonTitle && (
          <Button
            buttonTitle={buttonTitle}
            buttonType="submit"
            buttonIcon="plus"
          />
        )}
      </div>
    </div>
  );
}
