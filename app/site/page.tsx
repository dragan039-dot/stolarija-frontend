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

const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

const [autoLanguageChecked, setAutoLanguageChecked] = useState(false);





const getLanguageByCode = (code: string) => {
  const languageNames: Record<string, string[]> = {
    SL: ["Slovenački", "Slovenacki"],
    HR: ["Hrvatski"],
    MK: ["Makedonski"],
    AL: ["Albanski"],
    BG: ["Bugarski"],
    RO: ["Rumunski"],
    TR: ["Turski"],
    DE: ["Nemački", "Nemacki"],
    IT: ["Italijanski"],
    EN: ["Engleski"],
  };

  const names = languageNames[code] || [];

  return languages.find(
    (language: any) =>
      language.enabled &&
      names.some(
        (name) =>
          name.toLowerCase() ===
          String(language.name || "").trim().toLowerCase()
      )
  );
};



useEffect(() => {
  if (!languages.length) return;
  if (autoLanguageChecked) return;

  const detectLanguage = async () => {
    try {
      // Ako je korisnik nekada ručno izabrao jezik,
      // njegov izbor ima prednost.
      const manuallySelected = localStorage.getItem(
        "siteLanguageManuallySelected"
      );

      if (manuallySelected === "1") {
        setAutoLanguageChecked(true);
        return;
      }

      const response = await fetch("/api/country", {
        cache: "no-store",
      });

      const data = await response.json();

      const languageCode = getLanguageCodeByCountry(
        data?.countryCode || ""
      );

      // Srpski je osnovni jezik i kod njega je ID prazan string.
      if (languageCode === "SR") {
        setSelectedLanguageId("");
        localStorage.setItem("selectedLanguageId", "");
        setAutoLanguageChecked(true);
        return;
      }

      let language = getLanguageByCode(languageCode);

      // Ako prevod za tu državu još nije unet,
      // pokušaj Engleski.
      if (!language) {
        language = getLanguageByCode("EN");
      }

      if (language) {
        const languageId = String(language.id);

        setSelectedLanguageId(languageId);
        localStorage.setItem(
          "selectedLanguageId",
          languageId
        );
      }

      setAutoLanguageChecked(true);
    } catch (error) {
      console.error(
        "Greška pri automatskom izboru jezika:",
        error
      );

      // Ako određivanje države ne uspe,
      // podrazumevano biramo Engleski.
      const english = getLanguageByCode("EN");

      if (english) {
        const languageId = String(english.id);

        setSelectedLanguageId(languageId);
        localStorage.setItem(
          "selectedLanguageId",
          languageId
        );
      }

      setAutoLanguageChecked(true);
    }
  };

  detectLanguage();
}, [languages, autoLanguageChecked]);




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
    setRequestMessage(tSite("Firma i telefon su obavezni."));
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
      setRequestMessage(data.message || tSite("Greška pri slanju zahteva."));
      return;
    }

    setRequestMessage(tSite("Zahtev je uspešno poslat."));

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
    setRequestMessage(tSite("Greška pri povezivanju sa serverom."));
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
    videoId: "PN1ydahHvLo",
  },
  {
    title: "Kreiranje ponude",
    text: "Kako se unosi kupac, pozicije i čuva ponuda.",
    videoId: "g-LHD8NcuzI",
  },
  {
    title: "Radna lista",
    text: "Pregled elemenata i priprema za proizvodnju.",
    videoId: "DZ5Zw-SkH6M",
  },
  {
    title: "Podešavanje parametara",
    text: "Profili, cene, tehnički parametri i formule.",
    videoId: "srFLz5oGbaM",
  },
  {
    title: "Izmena ponude",
    text: "Kako se menja postojeća ponuda.",
    videoId: "z3NttbWEZvw",
  },
  {
    title: "Rad na telefonu",
    text: "Kako izgleda aplikacija na telefonu.",
    videoId: "RAQOSeKR64Q",
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


const tSite = (key: string) => {
  if (!selectedLanguageId) return key;

  const found = siteTranslations.find(
    (x: any) =>
      x.key === key &&
      String(x.languageId) === String(selectedLanguageId)
  );

  return found?.value?.trim() || key;
};



const getLanguageCodeByCountry = (countryCode: string) => {
  const code = countryCode.toUpperCase();

  if (["RS", "ME", "BA"].includes(code)) return "SR";
  if (code === "SI") return "SL";
  if (code === "HR") return "HR";
  if (code === "MK") return "MK";
  if (["AL", "XK"].includes(code)) return "AL";
  if (code === "BG") return "BG";
  if (code === "RO") return "RO";
  if (code === "TR") return "TR";
  if (["DE", "AT", "CH"].includes(code)) return "DE";
  if (code === "IT") return "IT";

  return "EN";
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
              {tSite("Softver za ponude, radne liste i kalkulacije stolarije")}
            </div>
          </div>

<div className="flex items-center gap-3">
<div className="relative">
  <button
    type="button"
    onClick={() => setLanguageMenuOpen((prev) => !prev)}
    className="flex min-w-[140px] items-center justify-between gap-3 rounded-xl border border-white/20 bg-slate-900 px-4 py-3 font-semibold text-white"
  >
    <span>
      {selectedLanguageId
        ? languages.find(
            (l: any) => String(l.id) === String(selectedLanguageId)
          )?.name || "SR"
        : "SR"}
    </span>

    <span className="text-xs text-slate-400">▼</span>
  </button>

  {languageMenuOpen && (
    <div className="absolute right-0 top-full z-[100] mt-2 min-w-[180px] overflow-hidden rounded-xl border border-white/20 bg-slate-900 shadow-2xl">

      <button
        type="button"
onClick={() => {
  setSelectedLanguageId("");
  localStorage.setItem("selectedLanguageId", "");
  localStorage.setItem(
    "siteLanguageManuallySelected",
    "1"
  );
  setLanguageMenuOpen(false);
}}
        className="block w-full px-4 py-3 text-left text-white hover:bg-slate-800"
      >
        SR
      </button>

      {languages
        .filter((l: any) => l.enabled)
        .map((l: any) => (
          <button
            key={l.id}
            type="button"
onClick={() => {
  setSelectedLanguageId(String(l.id));

  localStorage.setItem(
    "selectedLanguageId",
    String(l.id)
  );

  localStorage.setItem(
    "siteLanguageManuallySelected",
    "1"
  );

  setLanguageMenuOpen(false);
}}
            className="block w-full px-4 py-3 text-left text-white hover:bg-slate-800"
          >
            {l.name}
          </button>
        ))}
    </div>
  )}
</div>

  <a
    href="https://app.pvckalkulator.com"
    className="rounded-xl bg-blue-500 px-7 py-3 text-center font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 active:scale-95"
  >
    {tSite("Login")}
  </a>
</div>

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
            {tSite("Aplikacija radi online i dostupna je sa laptopa, tableta i telefona.")}
            {tSite("Svi podaci su sačuvani i dostupni kad god vam zatrebaju.")}
          </p>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setActiveTab("Zahtev za ponudu")}
              className="rounded-xl bg-blue-500 px-8 py-4 text-center text-lg font-black shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 active:scale-95"
            >
              {tSite("Besplatna proba 30 dana")}
            </button>

            <a
              href="https://app.pvckalkulator.com"
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-center text-lg font-bold text-white transition hover:bg-white/20 active:scale-95"
            >
              {tSite("Prijava u aplikaciju")}
            </a>
          </div>

          <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            <div>✓ {tSite("Online pristup")}</div>
            <div>✓ {tSite("Sačuvani podaci")}</div>
            <div>✓ {tSite("Automatski obračuni")}</div>
            <div>✓ {tSite("PDF ponude i radne liste")}</div>
          </div>
        </div>

<div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl">
  <Image
    src="/site/hero.png"
    alt={tSite("PVC Kalkulator aplikacija")}
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
  [tSite("Ponude"), tSite("Izrada ponuda u nekoliko klikova")],
  [tSite("Radne liste"), tSite("Detaljni elementi za proizvodnju")],
  [tSite("Obračuni"), tSite("Automatski obračun cena")],
  [tSite("PDF dokumenti"), tSite("Profesionalna štampa")],
  [tSite("Više korisnika"), tSite("Rad više zaposlenih")],
  [tSite("Online"), tSite("Pristup sa bilo kog uređaja")],
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
            {tSite("Brzina i jednostavnost")}
          </div>

          <h2 className="mb-5 text-4xl font-black">
            {tSite("Ponuda i radna lista u par klikova")}
          </h2>

          <p className="mb-5 text-lg text-slate-300">
            {tSite("Nakon unosa dimenzija i izbora sistema, aplikacija automatski obračunava profile, ispune, okove, roletne i ostale elemente.")}
          </p>

          <p className="mb-8 text-lg text-slate-300">
            {tSite("Za svega nekoliko minuta možete izraditi profesionalnu ponudu i kompletnu radnu listu spremnu za proizvodnju.")}
          </p>
        </div>

<div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl">
  <Image
    src="/site/workflow.png"
    alt={tSite("Ponuda i radna lista u par klikova")}
    width={900}
    height={600}
    className="h-full w-full object-cover"
  />
</div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 pb-16">
      <h2 className="mb-8 text-center text-4xl font-black">
        {tSite("Zašto PVC Kalkulator?")}
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
          <h3 className="mb-3 text-xl font-black">{tSite("Ušteda vremena")}</h3>
          <p className="text-slate-300">
            {tSite("Ponude i radne liste izrađuju se brzo, pregledno i bez ručnog računanja.")}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
          <h3 className="mb-3 text-xl font-black">{tSite("Manje grešaka")}</h3>
          <p className="text-slate-300">
            {tSite("Automatski obračuni smanjuju mogućnost grešaka u dimenzijama i cenama.")}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
          <h3 className="mb-3 text-xl font-black">{tSite("Rad sa bilo kog mesta")}</h3>
          <p className="text-slate-300">
            {tSite("Pristup aplikaciji sa računara, tableta ili telefona, gde god se nalazite.")}
          </p>
        </div>
      </div>

<div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl">
  <Image
    src="/site/devices.png"
    alt={tSite("Rad sa bilo kog uređaja")}
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
            <h2 className="mb-6 text-4xl font-black">{tSite("O aplikaciji")}</h2>

            <div className="grid gap-6 text-slate-300 md:grid-cols-2">
              <p>
                {tSite("PVC Kalkulator je poslovna web aplikacija namenjena firmama koje se bave PVC i ALU stolarijom.")}{" "}
                {tSite("Sistem omogućava izradu ponuda, radnih lista, obračun elemenata i PDF dokumentaciju.")}
              </p>

              <p>
                {tSite("Administrator može da podešava profile, ispune, okove, roletne, komarnike, dodatne elemente, tehničke parametre, cene, formule, korisnike i jezike.")}
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
                  ✓ {tSite(item)}
                </div>
              ))}
            </div>


<div className="mt-10">
  <h3 className="mb-3 text-2xl font-black">
    {tSite("Video uputstva")}
  </h3>

  <p className="mb-6 text-slate-300">
    {tSite("Pogledajte kratka uputstva kako se koristi aplikacija.")}
  </p>

  <div className="grid gap-6 md:grid-cols-2">
    {videos.map((video) => (
      <div
        key={video.videoId}
        className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
      >
        <h4 className="mb-1 text-lg font-black">
          {tSite(video.title)}
        </h4>

        <p className="mb-4 text-sm text-slate-300">
          {tSite(video.text)}
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
            {tSite("Besplatna proba")}
          </div>

          <h2 className="mb-3 text-4xl font-black">
            {tSite("Isprobajte aplikaciju potpuno besplatno")} 30 dana
          </h2>

          <p className="max-w-3xl text-slate-300">
            {tSite("Tokom probnog perioda možete koristiti kompletnu aplikaciju: ponude, radne liste, parametre, formule, PDF dokumente i rad sa više uređaja.")}
          </p>
        </div>

        <button
          onClick={() => setActiveTab("Zahtev za ponudu")}
          className="rounded-xl bg-blue-500 px-8 py-4 text-lg font-black shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 active:scale-95"
        >
          {tSite("Zatraži probni period")}
        </button>
      </div>
    </div>

    <div className="mb-10 text-center">
      <h2 className="mb-3 text-4xl font-black">
        {tSite("Cene paketa")}
      </h2>

      <p className="mx-auto max-w-3xl text-slate-300">
        {tSite("Aplikacija radi online i dostupna je sa laptopa, tableta i telefona.")}{" "}
        {tSite("Ponuda i radna lista izrađuju se u par klikova, uz automatski obračun i čuvanje podataka.")}
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
              {tSite("Najpopularniji")}
            </div>
          )}

          <div className="mb-4 text-center">
            <div className="text-sm font-black text-blue-300">
              {tSite(pack.name)}
            </div>

            <div className="mt-1 text-2xl font-black">
              {tSite(pack.devices)}
            </div>

            <div className="mt-5">
              <span className="text-5xl font-black">
                {pack.price}
              </span>
              <span className="text-slate-300">
                {" "} / {tSite(pack.period)}
              </span>
            </div>
          </div>

          <ul className="mb-6 space-y-3 text-sm text-slate-300">
            {pack.features.map((f) => (
              <li key={f}>✓ {tSite(f)}</li>
            ))}
          </ul>

          <div className="mb-5 rounded-2xl bg-slate-900/70 p-4 text-center text-sm font-bold text-slate-200">
            {tSite(pack.renew)}
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
            {tSite("Izaberi paket")}
          </button>
        </div>
      ))}
    </div>
  </section>
)}



      {activeTab === "Zahtev za ponudu" && (
        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8">
            <h2 className="mb-4 text-4xl font-black">{tSite("Zahtev za ponudu")}</h2>

            <p className="mb-6 text-slate-300">
              {tSite("Pošaljite osnovne podatke i kontaktiraćemo vas u vezi probnog perioda i podešavanja aplikacije.")}
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
  <option value="">{tSite("Izaberite paket")}</option>

  {packages.map((p) => (
    <option key={p} value={p}>
      {tSite(p)}
    </option>
  ))}
</select>
<br/>
</div>

<div className="grid gap-4 md:grid-cols-2">
  <input
    className="rounded-xl border border-white/10 bg-slate-900 p-3"
    placeholder={tSite("Firma / Ime i prezime *")}
    value={requestForm.firma}
    onChange={(e) =>
      setRequestForm({ ...requestForm, firma: e.target.value })
    }
  />

  <input
    className="rounded-xl border border-white/10 bg-slate-900 p-3"
    placeholder={tSite("PIB")}
    value={requestForm.pib}
    onChange={(e) =>
      setRequestForm({ ...requestForm, pib: e.target.value })
    }
  />

  <input
    className="rounded-xl border border-white/10 bg-slate-900 p-3"
    placeholder={tSite("Kontakt osoba")}
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
    placeholder={tSite("Telefon *")}
    value={requestForm.telefon}
    onChange={(e) =>
      setRequestForm({ ...requestForm, telefon: e.target.value })
    }
  />

  <input
    className="rounded-xl border border-white/10 bg-slate-900 p-3 md:col-span-2"
    placeholder={tSite("Email")}
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
    placeholder={tSite("Poruka")}
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
    {requestLoading ? tSite("Slanje...") : tSite("Pošalji zahtev")}
  </button>
</div>
          </div>
        </section>
      )}

      {activeTab === "Kontakt" && (
        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8">
            <h2 className="mb-6 text-4xl font-black">{tSite("Kontakt")}</h2>

            <div className="space-y-3 text-slate-300">
              <p>
                {tSite("Za dodatne informacije, probni period ili podešavanje aplikacije možete nas kontaktirati.")}{" "}
                {tSite("Pošaljite poruku na neki od dole navedenih načina i ubrzo će vas neko kontaktirati iz tehničke službe.")}
              </p>

              <p>
                {tSite("Pošaljite poruku na jedan od dole navedenih načina i ubrzo će vas neko kontaktirati iz tehničke službe.")}
              </p>

              <p>
                <strong className="text-white">{tSite("Email:")}</strong>{" "}
                pvckalkulator1@gmail.com
              </p>

              <p>
                <strong className="text-white">{tSite("Web:")}</strong>{" "}
                pvckalkulator.com
              </p>

              <p>
                <strong className="text-white">{tSite("Viber / WhatsApp:")}</strong>{" "}
                +381 62 858 2 333
              </p>
            </div>
          </div>
        </section>
      )}


<section className="mx-auto max-w-6xl px-4 pb-16">
  <div className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-10 text-center">

    <h2 className="mb-4 text-4xl font-black">
      {tSite("Isprobajte aplikaciju potpuno besplatno")}
    </h2>

    <p className="mx-auto mb-8 max-w-3xl text-slate-300">
      {tSite("Dobijate kompletan pristup aplikaciji tokom probnog perioda od 30 dana.")}
    </p>

    <button
      onClick={() => setActiveTab("Zahtev za ponudu")}
      className="rounded-xl bg-blue-500 px-8 py-4 text-lg font-black shadow-lg shadow-blue-500/30 hover:bg-blue-400"
    >
      {tSite("Započni besplatnu probu")}
    </button>

  </div>
</section>



      <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} PVC Kalkulator. {tSite("Sva prava zadržana.")}
      </footer>
    </main>
  );
}