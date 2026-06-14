"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PublicSite() {
  const [activeTab, setActiveTab] = useState("Početna");

const [siteTranslations, setSiteTranslations] = useState<any[]>([]);
const [siteLanguage, setSiteLanguage] = useState("SR");
const [siteLanguages, setSiteLanguages] = useState<any[]>([]);
const [selectedLanguageId, setSelectedLanguageId] = useState("");
const [languages, setLanguages] = useState<any[]>([]);

  const [requestForm, setRequestForm] = useState({
  firma: "",
  pib: "",
  kontaktOsoba: "",
  telefon: "",
  email: "",
  brojKorisnika: "",
  poruka: "",
  website: "",
});

const [requestMessage, setRequestMessage] = useState("");
const [requestLoading, setRequestLoading] = useState(false);





useEffect(() => {
  const saved = localStorage.getItem("selectedLanguageId");
  if (saved) setSelectedLanguageId(saved);

  fetch("/api/translation/languages")
    .then((res) => res.json())
    .then((data) => setLanguages(Array.isArray(data) ? data : []))
    .catch(() => setLanguages([]));

  fetch("/api/site-translations")
    .then((res) => res.json())
    .then((data) => setSiteTranslations(Array.isArray(data) ? data : []))
    .catch(() => setSiteTranslations([]));
}, []);


const sendRequest = async () => {
  setRequestMessage("");

  if (!requestForm.firma || !requestForm.telefon) {
    setRequestMessage("Firma i telefon su obavezni.");
    return;
  }

  setRequestLoading(true);

  try {
const res = await fetch("/api/site-requests", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(requestForm),
});

    const data = await res.json();

    if (!res.ok) {
      setRequestMessage(data.message || "Greška pri slanju zahteva.");
      return;
    }

    setRequestMessage("Zahtev je uspešno poslat.");

    setRequestForm({
      firma: "",
      pib: "",
      kontaktOsoba: "",
      telefon: "",
      email: "",
      brojKorisnika: "",
      poruka: "",
      website: "",
    });
  } catch (err) {
    setRequestMessage("Greška pri povezivanju sa serverom.");
  } finally {
    setRequestLoading(false);
  }
};

const tabs = [
  "Početna",
  "O aplikaciji",
  "Cene paketa",
  "Zahtev za ponudu",
  "Kontakt",
];

  const videos = [
    {
      title: "Početak rada",
      text: "Osnovno upoznavanje sa aplikacijom.",
      videoId: "eN5z1mu6j4M",
    },
    {
      title: "Kreiranje ponude",
      text: "Kako se unosi kupac, pozicije i čuva ponuda.",
      videoId: "YOUTUBE_VIDEO_ID_2",
    },
    {
      title: "Radna lista",
      text: "Pregled elemenata i priprema za proizvodnju.",
      videoId: "YOUTUBE_VIDEO_ID_3",
    },
    {
      title: "Podešavanje parametara",
      text: "Profili, cene, tehnički parametri i formule.",
      videoId: "YOUTUBE_VIDEO_ID_4",
    },
  ];



const packages = [
  "START - 2 uređaja - 199 € godišnje",
  "BUSINESS - 5 uređaja - 299 € godišnje",
  "PRO - 10 uređaja - 499 € godišnje",
  "ENTERPRISE - 20 uređaja - 1599 € / 10 godina",
];









const t = (key: string) => {
  const lang = (siteLanguage || "SR").toUpperCase();

  const found = siteTranslations.find((x: any) => {
    const itemLang = (x.language || x.lang || x.code || x.languageCode || "").toUpperCase();
    return x.key === key && itemLang === lang;
  });

  return found?.value || found?.text || key;
};



useEffect(() => {
  const savedLang = localStorage.getItem("siteLanguage");
  if (savedLang) setSiteLanguage(savedLang);

  fetch("/api/languages")
    .then((res) => res.json())
    .then((data) => {
      setSiteLanguages(Array.isArray(data) ? data : []);
    })
    .catch(() => {
      setSiteLanguages([]);
    });

  fetch("/api/site-translations")
    .then((res) => res.json())
    .then((data) => {
      setSiteTranslations(Array.isArray(data) ? data : []);
    })
    .catch(() => {
      setSiteTranslations([]);
    });
}, []);


const tSite = (key: string) => {
  if (!selectedLanguageId) return key;

  const found = siteTranslations.find(
    (x: any) =>
      x.key === key &&
      String(x.languageId) === String(selectedLanguageId)
  );

  return found?.value?.trim() || key;
};














  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-2xl font-black tracking-tight">
              PVC Kalkulator
            </div>
            <div className="text-sm text-slate-400">
              Softver za ponude, radne liste i kalkulacije stolarije
            </div>
          </div>

<select
  value={selectedLanguageId}
  onChange={(e) => {
    setSelectedLanguageId(e.target.value);
    localStorage.setItem("selectedLanguageId", e.target.value);
  }}
  className="rounded-xl border border-white/20 bg-slate-900 px-3 py-3 text-white"
>
  <option value="">SR</option>

  {languages
    .filter((l: any) => l.enabled)
    .map((l: any) => (
      <option key={l.id} value={String(l.id)}>
        {l.name}
      </option>
    ))}
</select>

          <a
            href="https://app.pvckalkulator.com"
            className="rounded-xl bg-blue-500 px-7 py-3 text-center font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 active:scale-95"
          >
            {tSite("Login")}
          </a>

        </div>

        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold transition ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              {tSite(tab)}
            </button>
          ))}
        </nav>
      </header>



{activeTab === "Početna" && (
  <>
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-black uppercase tracking-wide text-blue-300">
            {tSite("Moderan · brz · pouzdan")}
          </div>

          <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl">
            {tSite("Profesionalni softver za izradu ponuda i radnih lista PVC i ALU stolarije")}
            
          </h1>

          <p className="mb-4 max-w-2xl text-lg text-slate-300">
            {tSite("Ponuda i radna lista izrađuju se u par klikova, uz automatski obračun profila, ispuna, okova, roletni i ostalih elemenata.")}
          </p>

          <p className="mb-8 max-w-2xl text-slate-400">
            Aplikacija radi online i dostupna je sa laptopa, tableta i telefona.
            Svi podaci su sačuvani i dostupni kad god vam zatrebaju.
          </p>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setActiveTab("Zahtev za ponudu")}
              className="rounded-xl bg-blue-500 px-8 py-4 text-center text-lg font-black shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 active:scale-95"
            >
              {tSite("Besplatna proba 10 dana")}
            </button>

            <a
              href="https://app.pvckalkulator.com"
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-center text-lg font-bold text-white transition hover:bg-white/20 active:scale-95"
            >
              {tSite("Prijava u aplikaciju")}
            </a>
          </div>

          <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            <div>✓ Online pristup</div>
            <div>✓ Sačuvani podaci</div>
            <div>✓ Automatski obračuni</div>
            <div>✓ PDF ponude i radne liste</div>
          </div>
        </div>

<div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl">
  <Image
    src="/site/hero.png"
    alt="PVC Kalkulator aplikacija"
    width={900}
    height={600}
    className="h-full w-full object-cover"
    priority
  />
</div>
        
      </div>
    </section>

    <section className="border-y border-white/10 bg-white/5">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 md:grid-cols-6">
        {[
          ["Ponude", "Izrada ponuda u nekoliko klikova"],
          ["Radne liste", "Detaljni elementi za proizvodnju"],
          ["Obračuni", "Automatski obračun cena"],
          ["PDF dokumenti", "Profesionalna štampa"],
          ["Više korisnika", "Rad više zaposlenih"],
          ["Online", "Pristup sa bilo kog uređaja"],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl bg-slate-900/60 p-4">
            <div className="mb-1 font-black text-blue-300">{title}</div>
            <div className="text-xs text-slate-400">{text}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-2 text-sm font-black uppercase tracking-wider text-blue-300">
            Brzina i jednostavnost
          </div>

          <h2 className="mb-5 text-4xl font-black">
            Ponuda i radna lista u par klikova
          </h2>

          <p className="mb-5 text-lg text-slate-300">
            Nakon unosa dimenzija i izbora sistema, aplikacija automatski
            obračunava profile, ispune, okove, roletne i ostale elemente.
          </p>

          <p className="mb-8 text-lg text-slate-300">
            Za svega nekoliko minuta možete izraditi profesionalnu ponudu i
            kompletnu radnu listu spremnu za proizvodnju.
          </p>
        </div>

<div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl">
  <Image
    src="/site/workflow.png"
    alt="Ponuda i radna lista u par klikova"
    width={900}
    height={600}
    className="h-full w-full object-cover"
  />
</div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 pb-16">
      <h2 className="mb-8 text-center text-4xl font-black">
        Zašto PVC Kalkulator?
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
          <h3 className="mb-3 text-xl font-black">Ušteda vremena</h3>
          <p className="text-slate-300">
            Ponude i radne liste izrađuju se brzo, pregledno i bez ručnog
            računanja.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
          <h3 className="mb-3 text-xl font-black">Manje grešaka</h3>
          <p className="text-slate-300">
            Automatski obračuni smanjuju mogućnost grešaka u dimenzijama i
            cenama.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
          <h3 className="mb-3 text-xl font-black">Rad sa bilo kog mesta</h3>
          <p className="text-slate-300">
            Pristup aplikaciji sa računara, tableta ili telefona, gde god se
            nalazite.
          </p>
        </div>
      </div>

<div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl">
  <Image
    src="/site/devices.png"
    alt="Rad sa bilo kog uređaja"
    width={1200}
    height={700}
    className="h-full w-full object-cover"
  />
</div>

    </section>



  </>
)}





      {activeTab === "O aplikaciji" && (
        <section className="mx-auto max-w-5xl px-4 py-12">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8">
            <h2 className="mb-6 text-4xl font-black">O aplikaciji</h2>

            <div className="grid gap-6 text-slate-300 md:grid-cols-2">
              <p>
                PVC Kalkulator je poslovna web aplikacija namenjena firmama koje
                se bave PVC i ALU stolarijom. Sistem omogućava izradu ponuda,
                radnih lista, obračun elemenata i PDF dokumentaciju.
              </p>

              <p>
                Administrator može da podešava profile, ispune, okove, roletne,
                komarnike, dodatne elemente, tehničke parametre, cene, formule,
                korisnike i jezike.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                "PVC i ALU sistemi",
                "Klizni i podizno-klizni sistemi",
                "Ponude i predračuni",
                "Radni nalozi",
                "PDF štampa",
                "Korisničke licence",
                "Backup i restore",
                "Višejezičnost",
                "Administracija parametara",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl bg-slate-900/70 p-4 font-semibold"
                >
                  ✓ {item}
                </div>
              ))}
            </div>


<div className="mt-10">
  <h3 className="mb-3 text-2xl font-black">
    Video uputstva
  </h3>

  <p className="mb-6 text-slate-300">
    Pogledajte kratka uputstva kako se koristi aplikacija.
  </p>

  <div className="grid gap-6 md:grid-cols-2">
    {videos.map((video) => (
      <div
        key={video.videoId}
        className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
      >
        <h4 className="mb-1 text-lg font-black">
          {video.title}
        </h4>

        <p className="mb-4 text-sm text-slate-300">
          {video.text}
        </p>

        <div className="aspect-video overflow-hidden rounded-xl bg-slate-950">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            allowFullScreen
          />
        </div>
      </div>
    ))}
  </div>
</div>


          </div>
        </section>
      )}



{activeTab === "Cene paketa" && (
  <section className="mx-auto max-w-7xl px-4 py-12">
    <div className="mb-8 rounded-3xl border border-blue-400/20 bg-blue-500/10 p-8">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-300">
            Besplatna proba
          </div>

          <h2 className="mb-3 text-4xl font-black">
            Isprobajte aplikaciju potpuno besplatno 10 dana
          </h2>

          <p className="max-w-3xl text-slate-300">
            Tokom probnog perioda možete koristiti kompletnu aplikaciju:
            ponude, radne liste, parametre, formule, PDF dokumente i rad
            sa više uređaja.
          </p>
        </div>

        <button
          onClick={() => setActiveTab("Zahtev za ponudu")}
          className="rounded-xl bg-blue-500 px-8 py-4 text-lg font-black shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 active:scale-95"
        >
          Zatraži probni period
        </button>
      </div>
    </div>

    <div className="mb-10 text-center">
      <h2 className="mb-3 text-4xl font-black">
        Cene paketa
      </h2>

      <p className="mx-auto max-w-3xl text-slate-300">
        Aplikacija radi online i dostupna je sa laptopa, tableta i telefona.
        Ponuda i radna lista izrađuju se u par klikova, uz automatski obračun
        i čuvanje podataka.
      </p>
    </div>

    <div className="grid gap-6 lg:grid-cols-4">
      {[
        {
          name: "START",
          devices: "2 uređaja",
          price: "199 €",
          period: "godišnje",
          renew: "Produženje: 50% od cene godišnje",
          popular: false,
          features: [
            "2 uređaja",
            "Laptop, tablet i telefon",
            "Online pristup",
            "Tehnička podrška",
          ],
        },
        {
          name: "BUSINESS",
          devices: "5 uređaja",
          price: "299 €",
          period: "godišnje",
          renew: "Produženje: 50% od cene godišnje",
          popular: true,
          features: [
            "5 uređaja",
            "Laptop, tablet i telefon",
            "Online pristup",
            "Prioritetna podrška",
          ],
        },
        {
          name: "PRO",
          devices: "10 uređaja",
          price: "499 €",
          period: "godišnje",
          renew: "Produženje: 50% od cene godišnje",
          popular: false,
          features: [
            "10 uređaja",
            "Neograničen broj ponuda",
            "Više korisnika",
            "Online pristup",
            "Prioritetna podrška",
          ],
        },
        {
          name: "ENTERPRISE",
          devices: "20 uređaja",
          price: "1599 €",
          period: "5 godina",
          renew: "Bez godišnje obnove",
          popular: false,
          features: [
            "20 uređaja",
            "Dugoročna licenca",
            "Online pristup",
            "Prioritetna podrška",
            "Prilagođavanja po zahtevu",
          ],
        },
      ].map((pack) => (
        <div
          key={pack.name}
          className={`relative rounded-3xl border p-6 ${
            pack.popular
              ? "border-blue-400 bg-blue-500/15 shadow-2xl shadow-blue-500/20"
              : "border-white/10 bg-white/10"
          }`}
        >
          {pack.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-xs font-black uppercase">
              Najpopularniji
            </div>
          )}

          <div className="mb-4 text-center">
            <div className="text-sm font-black text-blue-300">
              {pack.name}
            </div>

            <div className="mt-1 text-2xl font-black">
              {pack.devices}
            </div>

            <div className="mt-5">
              <span className="text-5xl font-black">
                {pack.price}
              </span>
              <span className="text-slate-300">
                {" "} / {pack.period}
              </span>
            </div>
          </div>

          <ul className="mb-6 space-y-3 text-sm text-slate-300">
            {pack.features.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>

          <div className="mb-5 rounded-2xl bg-slate-900/70 p-4 text-center text-sm font-bold text-slate-200">
            {pack.renew}
          </div>

          <button
            onClick={() => {
              setRequestForm({
                ...requestForm,
                brojKorisnika: packages.find((p) =>
                  p.startsWith(pack.name)
                ) || "",
              });
              setActiveTab("Zahtev za ponudu");
            }}
            className={`w-full rounded-xl px-5 py-3 font-black transition active:scale-95 ${
              pack.popular
                ? "bg-blue-500 text-white hover:bg-blue-400"
                : "border border-blue-400 text-blue-300 hover:bg-blue-500 hover:text-white"
            }`}
          >
            Izaberi paket
          </button>
        </div>
      ))}
    </div>
  </section>
)}



      {activeTab === "Zahtev za ponudu" && (
        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8">
            <h2 className="mb-4 text-4xl font-black">Zahtev za ponudu</h2>

            <p className="mb-6 text-slate-300">
              Pošaljite osnovne podatke i kontaktiraćemo vas u vezi probnog
              perioda i podešavanja aplikacije.
            </p>


<div className="grid gap-4 md:grid-cols-2">

<select
  className="rounded-xl border border-white/10 bg-slate-900 p-3 md:col-span-2"
  value={requestForm.brojKorisnika}
  onChange={(e) =>
    setRequestForm({
      ...requestForm,
      brojKorisnika: e.target.value,
    })
  }
>
  <option value="">Izaberite paket</option>

  {packages.map((p) => (
    <option key={p} value={p}>
      {p}
    </option>
  ))}
</select>
<br/>
</div>

<div className="grid gap-4 md:grid-cols-2">
  <input
    className="rounded-xl border border-white/10 bg-slate-900 p-3"
    placeholder="Firma / Ime i prezime *"
    value={requestForm.firma}
    onChange={(e) =>
      setRequestForm({ ...requestForm, firma: e.target.value })
    }
  />

  <input
    className="rounded-xl border border-white/10 bg-slate-900 p-3"
    placeholder="PIB"
    value={requestForm.pib}
    onChange={(e) =>
      setRequestForm({ ...requestForm, pib: e.target.value })
    }
  />

  <input
    className="rounded-xl border border-white/10 bg-slate-900 p-3"
    placeholder="Kontakt osoba"
    value={requestForm.kontaktOsoba}
    onChange={(e) =>
      setRequestForm({
        ...requestForm,
        kontaktOsoba: e.target.value,
      })
    }
  />

  <input
    className="rounded-xl border border-white/10 bg-slate-900 p-3"
    placeholder="Telefon *"
    value={requestForm.telefon}
    onChange={(e) =>
      setRequestForm({ ...requestForm, telefon: e.target.value })
    }
  />

  <input
    className="rounded-xl border border-white/10 bg-slate-900 p-3 md:col-span-2"
    placeholder="Email"
    value={requestForm.email}
    onChange={(e) =>
      setRequestForm({ ...requestForm, email: e.target.value })
    }
  />



  {/* Honeypot zaštita - ovo korisnik ne vidi */}
  <input
    className="hidden"
    tabIndex={-1}
    autoComplete="off"
    value={requestForm.website}
    onChange={(e) =>
      setRequestForm({ ...requestForm, website: e.target.value })
    }
  />

  <textarea
    className="min-h-[140px] rounded-xl border border-white/10 bg-slate-900 p-3 md:col-span-2"
    placeholder="Poruka"
    value={requestForm.poruka}
    onChange={(e) =>
      setRequestForm({ ...requestForm, poruka: e.target.value })
    }
  />

  {requestMessage && (
    <div className="rounded-xl bg-white/10 p-3 text-sm md:col-span-2">
      {requestMessage}
    </div>
  )}

  <button
    onClick={sendRequest}
    disabled={requestLoading}
    className="rounded-xl bg-blue-500 px-8 py-4 text-lg font-black shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 active:scale-95 disabled:opacity-60 md:col-span-2"
  >
    {requestLoading ? "Slanje..." : "Pošalji zahtev"}
  </button>
</div>
          </div>
        </section>
      )}

      {activeTab === "Kontakt" && (
        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8">
            <h2 className="mb-6 text-4xl font-black">Kontakt</h2>

            <div className="space-y-3 text-slate-300">
              <p>
                Za dodatne informacije, probni period ili podešavanje aplikacije
                možete nas kontaktirati.
                Pošaljite poruku na neki od dole navedenih načina i ubrzo će vas neko kontaktirati iz tehnički službe.
              </p>

              <p>
                Pošaljite poruku na jedan od dole navedenih načina i ubrzo će vas neko kontaktirati iz tehnički službe.
              </p>

              <p>
                <strong className="text-white">Email:</strong>{" "}
                pvckalkulator1@gmail.com
              </p>

              <p>
                <strong className="text-white">Web:</strong>{" "}
                pvckalkulator.com
              </p>

              <p>
                <strong className="text-white">Viber / WhatsApp:</strong>{" "}
                +381 62 858 2 333
              </p>
            </div>
          </div>
        </section>
      )}


<section className="mx-auto max-w-6xl px-4 pb-16">
  <div className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-10 text-center">

    <h2 className="mb-4 text-4xl font-black">
      Isprobajte aplikaciju potpuno besplatno
    </h2>

    <p className="mx-auto mb-8 max-w-3xl text-slate-300">
      Dobijate kompletan pristup aplikaciji tokom probnog perioda od 10 dana.
    </p>

    <button
      onClick={() => setActiveTab("Zahtev za ponudu")}
      className="rounded-xl bg-blue-500 px-8 py-4 text-lg font-black shadow-lg shadow-blue-500/30 hover:bg-blue-400"
    >
      Započni besplatnu probu
    </button>

  </div>
</section>



      <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} PVC Kalkulator. Sva prava zadržana.
      </footer>
    </main>
  );
}