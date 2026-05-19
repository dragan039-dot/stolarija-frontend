"use client";

import { useEffect, useState } from "react";

type Offer = {
  id: number;
  naziv: string;
  adresa: string;
  telefon: string;
  pib: string;
  maticni: string;
  datum: string;
  vrsta_ponude: string;
  valuta: string;
  popust: string;
  napomena: string;
};

type Position = {
  vrsta_stolarije: string;
  vrsta_prozora: string;
  slika: number | null;
  a: number;
  b: number;
  c: number;
  d: number;
  profil: string;
  ispuna: string;
  okov: string;
  otvaranje: string;
  roletna: string;
  komarnik: string;
  kolicina: number;
};

export default function Home() {

  // ---------------- STATE ----------------


const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";



  const [offers, setOffers] = useState<Offer[]>([]);

  const [form, setForm] = useState<Offer>({
    id: 0,
    naziv: "",
    adresa: "",
    telefon: "",
    pib: "",
    maticni: "",
    datum: "",
    vrsta_ponude: "",
    valuta: "",
    popust: "",
    napomena: "",
  });

  const [positions, setPositions] = useState<Position[]>(
    Array.from({ length: 10 }, () => ({
      vrsta_stolarije: "",
      vrsta_prozora: "",
      slika: null,
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      profil: "",
      ispuna: "",
      okov: "",
      otvaranje: "",
      roletna: "",
      komarnik: "",
      kolicina: 1,
    }))
  );

  // ---------------- LISTE ----------------
  const prozori = [
    { id: 1, naziv: "Fiksni prozor" },
    { id: 2, naziv: "Jednokrilni prozor" },
    { id: 3, naziv: "Dvokrilni prozor (šloga)" },
    { id: 4, naziv: "Dvokrilni prozor (T-prečka)" },
    { id: 5, naziv: "Prozor + fiks" },
    { id: 6, naziv: "Trokrilni prozor (šloga)" },
    { id: 7, naziv: "Trokrilni prozor (T-prečka)" },
    { id: 8, naziv: "Trokrilni prozor (2 fiksa) A" },
    { id: 9, naziv: "Trokrilni prozor (fiks + T-prečka) A" },
    { id: 10, naziv: "Trokrilni prozor (fiks + šloga) A" },
    { id: 11, naziv: "Trokrilni prozor (2 fiksa)" },
    { id: 12, naziv: "Trokrilni prozor (fiks + T-prečka)" },
    { id: 13, naziv: "Trokrilni prozor (fiks + šloga)" },
    { id: 14, naziv: "Jednokrilni prozor (nadsvetlo)" },
    { id: 15, naziv: "Prozor + fiks (nadsvetlo)" },
    { id: 16, naziv: "Dvokrilni prozor (šloga, nadsvetlo)" },
    { id: 17, naziv: "Dvokrilni prozor (T-prečka, nadsvetlo)" },
    { id: 18, naziv: "Jednokrilni prozor (nadsvetlo-kip)" },
    { id: 19, naziv: "Prozor + fiks (nadsvetlo-kip)" },
    { id: 20, naziv: "Dvokrilni prozor (šloga, nadsvetlo-kip)" },
    { id: 21, naziv: "Dvokrilni prozor (T-prečka, nadsvetlo-kip)" },
  ];

  const dimensionRules: Record<string, string[]> = {
  // samo A i B
  "Fiksni prozor": ["a", "b"],
  "Jednokrilni prozor": ["a", "b"],
  "Dvokrilni prozor (šloga)": ["a", "b"],
  "Dvokrilni prozor (T-prečka)": ["a", "b"],
  "Prozor + fiks": ["a", "b"],
  "Trokrilni prozor (šloga)": ["a", "b"],
  "Trokrilni prozor (T-prečka)": ["a", "b"],
  "Trokrilni prozor (2 fiksa) A": ["a", "b"],
  "Trokrilni prozor (fiks + T-prečka) A": ["a", "b"],
  "Trokrilni prozor (fiks + šloga) A": ["a", "b"],

  // A B C
  "Trokrilni prozor (2 fiksa)": ["a", "b", "c"],
  "Trokrilni prozor (fiks + T-prečka)": ["a", "b", "c"],
  "Trokrilni prozor (fiks + šloga)": ["a", "b", "c"],

  // A B D
  "Jednokrilni prozor (nadsvetlo)": ["a", "b", "d"],
  "Prozor + fiks (nadsvetlo)": ["a", "b", "d"],
  "Dvokrilni prozor (šloga, nadsvetlo)": ["a", "b", "d"],
  "Dvokrilni prozor (T-prečka, nadsvetlo)": ["a", "b", "d"],
  "Jednokrilni prozor (nadsvetlo-kip)": ["a", "b", "d"],
  "Prozor + fiks (nadsvetlo-kip)": ["a", "b", "d"],
  "Dvokrilni prozor (šloga, nadsvetlo-kip)": ["a", "b", "d"],
  "Dvokrilni prozor (T-prečka, nadsvetlo-kip)": ["a", "b", "d"],
};

const showField = (type: string, field: string) => {
  if (!type) return false; // ⛔ sada sakriva dok nema izbora
  return dimensionRules[type]?.includes(field);
};

  const stolarija = ["PVC", "ALU"];
  const profili = ["Profil 70", "Profil 80"];
  const ispune = ["Dvoslojno", "Troslojno"];
  const okovi = ["Standard", "Premium"];
  const otvaranja = ["Levo", "Desno"];
  const roletne = ["Ne", "Da"];
  const komarnici = ["Ne", "Da"];

  // ---------------- LOAD OFFERS ----------------
  const loadOffers = async () => {
    const res = await fetch(`${API_URL}/offers`);
    const data = await res.json();
    setOffers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadOffers();
  }, []);

  // ---------------- OPEN FROM TABLE ----------------
  const openFromTable = async (id: number) => {
    const res = await fetch(`${API_URL}/offers/${id}`);
    const data = await res.json();

    if (!data.offer) return alert("Nema ponude za ovaj ID");

    setForm({
  id: data.offer.id || "",
  naziv: data.offer.naziv || "",
  adresa: data.offer.adresa || "",
  telefon: data.offer.telefon || "",
  pib: data.offer.pib || "",
  maticni: data.offer.maticni || "",
  datum: data.offer.datum || "",
  vrsta_ponude: data.offer.vrsta_ponude || "",
  valuta: data.offer.valuta || "",
  popust: data.offer.popust || "",
  napomena: data.offer.napomena || "",
});

    // popuni 10 pozicija
    const filled = Array.from({ length: 10 }, (_, i) => data.items[i] || {
      vrsta_stolarije: "",
      vrsta_prozora: "",
      slika: null,
      a: 0, b: 0, c: 0, d: 0,
      profil: "",
      ispuna: "",
      okov: "",
      otvaranje: "",
      roletna: "",
      komarnik: "",
      kolicina: 1,
    });

    setPositions(filled);
  };

  // ---------------- SAVE ----------------
  const saveOffer = async () => {

  // 👉 AKO POSTOJI ID → UPDATE
  if (form.id) {

    await fetch(`${API_URL}/offers/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        positions
      })
    });

    alert("Izmenjeno!");

  } else {
    // 👉 NOVA PONUDA → CREATE

    const res = await fetch(`${API_URL}/offers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        positions
      })
    });

    const data = await res.json();

    alert("Sačuvano ID: " + data.id);
  }

  loadOffers();   // refresh tabele
  clearForm();    // očisti formu
};

  // ---------------- CLEAR ----------------
  const clearForm = () => {
    setForm({
      id: 0,
      naziv: "",
      adresa: "",
      telefon: "",
      pib: "",
      maticni: "",
      datum: "",
      vrsta_ponude: "",
      valuta: "",
      popust: "",
      napomena: "",
    });

    setPositions(
      Array.from({ length: 10 }, () => ({
        vrsta_stolarije: "",
        vrsta_prozora: "",
        slika: null,
        a: 0, b: 0, c: 0, d: 0,
        profil: "",
        ispuna: "",
        okov: "",
        otvaranje: "",
        roletna: "",
        komarnik: "",
        kolicina: 1,
      }))
    );
  };

  // ---------------- UPDATE ----------------
  const update = (i: number, field: string, value: any) => {
    const copy = [...positions];
    (copy[i] as any)[field] = value;
    setPositions(copy);
  };

  const selectProzor = (i: number, naziv: string) => {
    const p = prozori.find(x => x.naziv === naziv);
    const copy = [...positions];
    copy[i].vrsta_prozora = naziv;
    copy[i].slika = p ? p.id : null;
    setPositions(copy);
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">FORMA</h1>

      {/* TABELA */}
      <div className="border mb-6">
        <div style={{ maxHeight: "220px", overflowY: "auto" }}>
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Naziv</th>
                <th className="border p-2">Adresa</th>
                <th className="border p-2">Telefon</th>
                <th className="border p-2">PIB</th>
              </tr>
            </thead>
            <tbody>
              {offers.map(c => (
                <tr key={c.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => openFromTable(c.id)}>
                  <td className="border p-2">{c.id}</td>
                  <td className="border p-2">{c.naziv}</td>
                  <td className="border p-2">{c.adresa}</td>
                  <td className="border p-2">{c.telefon}</td>
                  <td className="border p-2">{c.pib}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORMA */}
      <div className="grid grid-cols-4 gap-2 mb-6">

        <input value={form.id || ""} readOnly className="border p-2 bg-gray-100"/>

        <input placeholder="Kupac" value={form.naziv || ""}
          onChange={e => setForm({ ...form, naziv: e.target.value })}
          className="border p-2"/>

        <input placeholder="Adresa" value={form.adresa || ""}
          onChange={e => setForm({ ...form, adresa: e.target.value })}
          className="border p-2"/>

        <input placeholder="Telefon" value={form.telefon || ""}
          onChange={e => setForm({ ...form, telefon: e.target.value })}
          className="border p-2"/>

        <input placeholder="PIB" value={form.pib || ""}
          onChange={e => setForm({ ...form, pib: e.target.value })}
          className="border p-2"/>

        <input placeholder="Matični" value={form.maticni || ""}
          onChange={e => setForm({ ...form, maticni: e.target.value })}
          className="border p-2"/>

        <input type="date" value={form.datum || ""}
          onChange={e => setForm({ ...form, datum: e.target.value })}
          className="border p-2"/>

        <input placeholder="Vrsta ponude" value={form.vrsta_ponude || ""}
          onChange={e => setForm({ ...form, vrsta_ponude: e.target.value })}
          className="border p-2"/>

        <input placeholder="Valuta" value={form.valuta || ""}
          onChange={e => setForm({ ...form, valuta: e.target.value })}
          className="border p-2"/>

        <input placeholder="Popust" value={form.popust || ""}
          onChange={e => setForm({ ...form, popust: e.target.value })}
          className="border p-2"/>

        <input placeholder="Napomena" value={form.napomena || ""}
          onChange={e => setForm({ ...form, napomena: e.target.value })}
          className="border p-2 col-span-4"/>

      </div>

      {/* DUGMAD */}
      <div className="flex gap-3 mb-8">
        <button onClick={saveOffer} className="bg-blue-600 text-white px-4 py-2 rounded">Sačuvaj</button>
        <button onClick={clearForm} className="bg-red-600 text-white px-4 py-2 rounded">Obriši formu</button>
      </div>

      {/* POZICIJE (NE DIRAMO) */}
      {positions.map((p, i) => (
        <div key={i} className="border rounded p-4 mb-6">

          <h2 className="font-bold mb-3">Pozicija {i + 1}</h2>

          <div className="grid grid-cols-4 gap-2">

            <select onChange={e => update(i, "vrsta_stolarije", e.target.value)} className="border p-2">
              <option>Vrsta stolarije</option>
              {stolarija.map((v, idx) => <option key={idx}>{v}</option>)}
            </select>

            <select onChange={e => selectProzor(i, e.target.value)} className="border p-2">
              <option>Vrsta prozora</option>
              {prozori.map(x => <option key={x.id}>{x.naziv}</option>)}
            </select>

{showField(p.vrsta_prozora, "a") && (
  <div className="flex flex-col">
    <label className="text-sm font-semibold">A - širina</label>
    <input
      type="number"
      value={p.a || ""}
      onChange={e => update(i, "a", Number(e.target.value))}
      className="border p-2"
    />
  </div>
)}

{showField(p.vrsta_prozora, "b") && (
  <div className="flex flex-col">
    <label className="text-sm font-semibold">B - visina</label>
    <input
      type="number"
      value={p.b || ""}
      onChange={e => update(i, "b", Number(e.target.value))}
      className="border p-2"
    />
  </div>
)}

{showField(p.vrsta_prozora, "c") && (
  <div className="flex flex-col">
    <label className="text-sm font-semibold">C - širina krila</label>
    <input
      type="number"
      value={p.c || ""}
      onChange={e => update(i, "c", Number(e.target.value))}
      className="border p-2"
    />
  </div>
)}

{showField(p.vrsta_prozora, "d") && (
  <div className="flex flex-col">
    <label className="text-sm font-semibold">D - visina krila</label>
    <input
      type="number"
      value={p.d || ""}
      onChange={e => update(i, "d", Number(e.target.value))}
      className="border p-2"
    />
  </div>
)}

            <select onChange={e => update(i, "profil", e.target.value)} className="border p-2">
              <option>Profil</option>
              {profili.map((v, idx) => <option key={idx}>{v}</option>)}
            </select>

            <select onChange={e => update(i, "ispuna", e.target.value)} className="border p-2">
              <option>Ispuna</option>
              {ispune.map((v, idx) => <option key={idx}>{v}</option>)}
            </select>

            <select onChange={e => update(i, "okov", e.target.value)} className="border p-2">
              <option>Okov</option>
              {okovi.map((v, idx) => <option key={idx}>{v}</option>)}
            </select>

            <select onChange={e => update(i, "otvaranje", e.target.value)} className="border p-2">
              <option>Otvaranje</option>
              {otvaranja.map((v, idx) => <option key={idx}>{v}</option>)}
            </select>

            <select onChange={e => update(i, "roletna", e.target.value)} className="border p-2">
              <option>Roletna</option>
              {roletne.map((v, idx) => <option key={idx}>{v}</option>)}
            </select>

            <select onChange={e => update(i, "komarnik", e.target.value)} className="border p-2">
              <option>Komarnik</option>
              {komarnici.map((v, idx) => <option key={idx}>{v}</option>)}
            </select>

            <input placeholder="Količina" type="number"
              onChange={e => update(i, "kolicina", Number(e.target.value))}
              className="border p-2"
            />

          </div>

          {p.slika && (
            <img src={`/prozori/${p.slika}.jpg`} className="mt-4 w-48 border"/>
          )}

        </div>
      ))}

    </main>
  );
}