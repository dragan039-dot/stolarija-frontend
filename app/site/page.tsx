"use client";

import { useState } from "react";

export default function PublicSite() {
  const [activeTab, setActiveTab] = useState("Početna");
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

const sendRequest = async () => {
  setRequestMessage("");

  if (!requestForm.firma || !requestForm.telefon) {
    setRequestMessage("Firma i telefon su obavezni.");
    return;
  }

  setRequestLoading(true);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/site-requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestForm),
      }
    );

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
    "Video uputstva",
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

          <a
            href="/"
            className="rounded-xl bg-blue-500 px-7 py-3 text-center font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 active:scale-95"
          >
            Login
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
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {activeTab === "Početna" && (
        <>
          <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300">
                Web aplikacija za PVC i ALU stolariju
              </div>

              <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl">
                Brža izrada ponuda i radnih lista za stolariju
              </h1>

              <p className="mb-8 max-w-xl text-lg text-slate-300">
                PVC Kalkulator omogućava firmama da brzo kreiraju ponude,
                radne naloge, obračun elemenata, PDF dokumente i da upravljaju
                parametrima, cenama, korisnicima i jezicima.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/"
                  className="rounded-xl bg-blue-500 px-8 py-4 text-center text-lg font-black shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 active:scale-95"
                >
                  Prijavi se u aplikaciju
                </a>

                <button
                  onClick={() => setActiveTab("Zahtev za ponudu")}
                  className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/20 active:scale-95"
                >
                  Pošalji zahtev
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl">
              <div className="rounded-2xl bg-slate-900 p-4">
                <div className="mb-4 flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="rounded-xl bg-slate-800 p-4">
                  <div className="mb-4 h-8 w-48 rounded bg-blue-500/70" />

                  <div className="grid gap-3">
                    <div className="rounded-lg bg-white p-3 text-slate-900">
                      <div className="font-bold">Ponuda R-15/26</div>
                      <div className="text-sm text-slate-500">
                        Kupac, pozicije, dimenzije i cena
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-lg bg-slate-700 p-4" />
                      <div className="rounded-lg bg-slate-700 p-4" />
                      <div className="rounded-lg bg-slate-700 p-4" />
                    </div>

                    <div className="rounded-lg bg-white p-3 text-slate-900">
                      <div className="font-bold">Radna lista</div>
                      <div className="text-sm text-slate-500">
                        Elementi prozora spremni za proizvodnju
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-16">
            <div className="grid gap-4 md:grid-cols-4">
              {[
                ["Ponude", "Brzo kreiranje i čuvanje ponuda."],
                ["Radne liste", "Pregled elemenata za proizvodnju."],
                ["Formule", "Dinamički obračun svih sistema."],
                ["Više jezika", "Prevod aplikacije po korisniku."],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/10 p-5"
                >
                  <h3 className="mb-2 text-xl font-black">{title}</h3>
                  <p className="text-sm text-slate-300">{text}</p>
                </div>
              ))}
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
          </div>
        </section>
      )}

      {activeTab === "Video uputstva" && (
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="mb-3 text-4xl font-black">Video uputstva</h2>
          <p className="mb-8 text-slate-300">
            Ovde možete postaviti YouTube video snimke koji se gledaju direktno
            na sajtu.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {videos.map((video) => (
              <div
                key={video.videoId}
                className="rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <h3 className="mb-1 text-xl font-black">{video.title}</h3>
                <p className="mb-4 text-sm text-slate-300">{video.text}</p>

                <div className="aspect-video overflow-hidden rounded-xl bg-slate-900">
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
  <input
    className="rounded-xl border border-white/10 bg-slate-900 p-3"
    placeholder="Firma *"
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

  <input
    className="rounded-xl border border-white/10 bg-slate-900 p-3 md:col-span-2"
    placeholder="Broj korisnika"
    value={requestForm.brojKorisnika}
    onChange={(e) =>
      setRequestForm({
        ...requestForm,
        brojKorisnika: e.target.value,
      })
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
              </p>

              <p>
                <strong className="text-white">Email:</strong>{" "}
                office@pvckalkulator.com
              </p>

              <p>
                <strong className="text-white">Web:</strong>{" "}
                pvckalkulator.com
              </p>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} PVC Kalkulator. Sva prava zadržana.
      </footer>
    </main>
  );
}