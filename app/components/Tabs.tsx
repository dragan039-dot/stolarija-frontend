"use client";

type Props = {
  active: string;
  setActive: (tab: string) => void;
  isAdmin?: boolean;
  translate?: (key: string) => string;
};

const baseTabs = [
  "Forma",
  "Ponude",
  "Radna lista",
  "Slike",
  "Uputstvo",
  "Parametri",
];

export default function Tabs({
  active,
  setActive,
  isAdmin,
  translate,
}: Props) {
  const tabs = isAdmin
    ? [...baseTabs, "Uputstva", "Administracija"]
    : baseTabs;

  return (
    <div className="bg-white border-b mb-2 py-2">

      {/* Telefon */}
      <div className="grid grid-cols-3 gap-2 sm:hidden">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-2 py-3 rounded font-semibold transition text-sm ${
              active === t
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {translate ? translate(t) : t}
          </button>
        ))}
      </div>

      {/* Računar */}
      <div className="hidden sm:flex justify-center gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-5 py-3 rounded font-semibold transition text-sm whitespace-nowrap ${
              active === t
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {translate ? translate(t) : t}
          </button>
        ))}
      </div>

    </div>
  );
}