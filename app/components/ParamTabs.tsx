"use client";

type Props = {
  active: string;
  setActive: (tab: string) => void;
  isAdmin?: boolean;
};

const allTabs = [
  "Firma",
  "Profil",
  "Ispuna",
  "Okov",
  "Roletna",
  "Komarnik",
  "Tehnicki",
  "Cene",
  "Dod. elementi",
  "Valuta",
  "Formule",
  "Reklame",
  "Uređivanje uputstva",
];

export default function ParamTabs({
  active,
  setActive,
  isAdmin,
}: Props) {

  const tabs = isAdmin
    ? allTabs
    : allTabs.filter(
        (t) =>
          t !== "Formule" &&
          t !== "Reklame" &&
          t !== "Uređivanje uputstva" &&
          t !== "Prevodi"  
      );

  return (
  <div className="w-full overflow-x-auto">
    <div className="flex gap-2 w-max px-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-5 py-2 rounded whitespace-nowrap text-sm ${
            active === tab
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);
}