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
    <div className="bg-white border-b mb-2 py-2">
      <div className="grid grid-cols-3 gap-1 sm:gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-2 sm:px-3 py-2 rounded font-semibold transition text-[11px] sm:text-sm ${
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
  );
}