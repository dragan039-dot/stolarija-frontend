"use client";

type Props = {
  active: string;
  setActive: (tab: string) => void;
  isAdmin?: boolean;
};

const baseTabs = ["Forma", "Ponude", "Radna lista", "Slike", "Uputstvo", "Parametri"];

export default function Tabs({ active, setActive, isAdmin }: Props) {
  const tabs = isAdmin ? [...baseTabs, "Uputstva", "Administracija"] : baseTabs;

  return (
    <div className="sticky top-0 z-50 bg-white border-b mb-6 py-3">
      <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`min-w-[130px] px-4 py-2 rounded font-semibold transition ${
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