"use client";

type Props = {
  active: string;
  setActive: (tab: string) => void;
  isAdmin?: boolean;
};

const baseTabs = [
  "Forma",
  "Ponude",
  "Radna lista",
  "Slike",
  "Uputstvo",
  "Parametri",
];

export default function Tabs({ active, setActive, isAdmin }: Props) {
  const tabs = isAdmin
    ? [...baseTabs, "Uputstva", "Administracija"]
    : baseTabs;

  return (
    <div className="w-full bg-white border-b py-2">
      <div className="w-full overflow-x-auto">
        <div className="flex gap-1 sm:gap-2 w-max mx-auto px-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-2 sm:px-4 py-2 rounded font-semibold transition whitespace-nowrap text-xs sm:text-sm ${
                active === t
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}