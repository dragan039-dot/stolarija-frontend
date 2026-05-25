"use client";

import ParamTabs from "./components/ParamTabs";
import Tabs from "./components/Tabs";
import { useEffect, useState } from "react";

import { okovData } from "./data/okov";
import { ispunaData } from "./data/ispuna";
import { ceneData } from "./data/cene";
import { tehnickiData } from "./data/tehnicki";
import { valutaData } from "./data/valuta";


import { profilData as defaultProfil } from "./data/profil";
import { ispunaData as defaultIspuna } from "./data/ispuna";
import { okovData as defaultOkov } from "./data/okov";
import { valutaData as defaultValuta } from "./data/valuta";



import { getCena, getTehnicki, getOkovCena, getIspunaCena } from "./utils/calc";
import RichTextEditor from "./components/RichTextEditor";

import React from "react";







type Offer = {
  id: number;
  brojPonude: string;
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
  id?: number;
  vrsta_stolarije: string;
  vrsta_prozora: string;
  slika: number | null;
  a: number;
  b: number;
  c: number;
  d: number;
  profil: string;
  profilId?: string | number;
  ispuna: string;
  ispunaId?: string | number;
  okov: string;
  okovId?: string | number;
  otvaranje: string;
  roletna: string;
  vrsta_roletne: string;
  komarnik: string;
  kolicina: number;
};


type ExtraItem = {
  naziv: string;
  kolicina: number;
  cena: number;
};





export default function Home() {

  // ---------------- STATE ----------------

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001";



  const [profilId, setProfilId] = useState<number | null>(null);
const [okovId, setOkovId] = useState<number | null>(null);
const [ispunaId, setIspunaId] = useState<number | null>(null);

  const [suggestions, setSuggestions] = useState<string[]>([]);
const [activeInput, setActiveInput] = useState<{i: number, field: string} | null>(null);
const [preview, setPreview] = useState<any[]>([]);
  const [formule, setFormule] = useState<any[]>([]);
  const [formulaVrstaStolarije, setFormulaVrstaStolarije] = useState("PVC");
const [formulaVrstaProzora, setFormulaVrstaProzora] = useState("");
  const [loading, setLoading] = useState(false);
  const [priceValues, setPriceValues] = useState({});
  const [tehnickiValues, setTehnickiValues] = useState({});
const [rezultati, setRezultati] = useState<any[]>([]);
  const [tehnickiData, setTehnickiData] = useState<any[]>([]);
  const [pricesData, setPricesData] = useState<any[]>([]);


  const [worklistOffer, setWorklistOffer] = useState<any>(null);
const [worklistPositions, setWorklistPositions] = useState<any[]>([]);
const [worklistExtraItems, setWorklistExtraItems] = useState<any[]>([]);
const [worklistResults, setWorklistResults] = useState<Record<number, any[]>>({});

const [offerSearch, setOfferSearch] = useState("");
const [worklistSearch, setWorklistSearch] = useState("");

const [proposalSearch, setProposalSearch] = useState("");
const [proposalOffer, setProposalOffer] = useState<any>(null);
const [proposalPositions, setProposalPositions] = useState<any[]>([]);
const [proposalExtraItems, setProposalExtraItems] = useState<any[]>([]);
const [proposalResults, setProposalResults] = useState<Record<number, any[]>>({});

  
const [customerSuggestions, setCustomerSuggestions] = useState<any[]>([]);
const [showCustomerSuggestions, setShowCustomerSuggestions] = useState(false);


const [backupFiles, setBackupFiles] = useState<any[]>([]);

const [logoPreview, setLogoPreview] = useState<string>("");



  const [params, setParams] = useState<any>({
  profil: [],
  okov: [],
  valuta: []
});



const [adminPasswords, setAdminPasswords] = useState<Record<number, string>>({});

const [selectedProfilId, setSelectedProfilId] = useState<string>("");

const [languages, setLanguages] = useState<any[]>([]);
const [translations, setTranslations] = useState<any[]>([]);






const safeProfili = Array.isArray(params.profil)
  ? params.profil
  : [];

const safeParams = {
  ...params,
  profil: Array.isArray(params.profil) ? params.profil : []
};

const [paramList, setParamList] = useState<any[]>([]);
const [grupa, setGrupa] = useState("");
const [nazivParam, setNazivParam] = useState("");
const [offers, setOffers] = useState<Offer[]>([]);
const [activeTab, setActiveTab] = useState("Forma");
const [paramTab, setParamTab] = useState("Firma");


const [profileParams, setProfileParams] = useState<any[]>([]);
const [profilePrices, setProfilePrices] = useState<any[]>([]);
const [firma, setFirma] = useState<any>({});
const [profilDraft, setProfilDraft] = useState<string[]>([]);



const [tehnicki, setTehnicki] = useState<any[]>([]);
const [parametri, setParametri] = useState<string[]>([]);


const [loggedUser, setLoggedUser] = useState<any>(null);
const [loginUsername, setLoginUsername] = useState("");
const [loginPassword, setLoginPassword] = useState("");
const [loginError, setLoginError] = useState("");

const [adminUsers, setAdminUsers] = useState<any[]>([]);
const [newUser, setNewUser] = useState({
  username: "",
  password: "",
  role: "USER",
  licenseEnd: "",
  maxDevices: 1,
});

const [passwordForm, setPasswordForm] = useState({
  oldPassword: "",
  newPassword: "",
});



const [selectedAdminUser, setSelectedAdminUser] = useState<any>(null);
const [adminDevices, setAdminDevices] = useState<any[]>([]);

const [userSearch, setUserSearch] = useState("");
const [auditSearch, setAuditSearch] = useState("");

const [adminOffers, setAdminOffers] = useState<any[]>([]);
const [adminOfferSearch, setAdminOfferSearch] = useState("");

const [showPassword, setShowPassword] = useState(false);

const [archivedUsers, setArchivedUsers] = useState<any[]>([]);
const [showArchivedUsers, setShowArchivedUsers] = useState(false);

const [showMobileAd, setShowMobileAd] = useState(true);

const [ads, setAds] = useState<any[]>([]);




const [originalVrstaPonude, setOriginalVrstaPonude] = useState("");



const [sessionExpiredShown, setSessionExpiredShown] = useState(false);


const [helpTexts, setHelpTexts] = useState<any[]>([]);

const [adStats, setAdStats] = useState<any[]>([]);

const [instructionContent, setInstructionContent] = useState("");

const [selectedLanguageId, setSelectedLanguageId] = useState("");

const [roletne, setRoletne] = useState<any[]>([]);
const [komarnici, setKomarnici] = useState<any[]>([]);








const addExtraItem = () => {
  if (extraItems.length >= 30) {
    alert(t("Maksimalan broj dodatnih usluga/proizvoda je 30"));
    return;
  }

  setExtraItems(prev => [...prev, emptyExtraItem()]);
};





const emptyExtraItem = (): ExtraItem => ({
  naziv: "",
  kolicina: 1,
  cena: 0,
});

const [extraItems, setExtraItems] = useState<ExtraItem[]>([
  emptyExtraItem()
]);



const apiFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const res = await window.fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");

    if (!sessionExpiredShown) {
      setSessionExpiredShown(true);
      alert(t("Sesija je istekla. Prijavite se ponovo."));
    }

    setLoggedUser(null);
    setLoginUsername("");
    setLoginPassword("");

    return res;
  }

  return res;
};



const formulaParametri = [
  "Skraćenje čelika za štok",
  "Skraćenje čelika za krilo"
];





const authHeaders = () => ({
  "Content-Type": "application/json",
});








let timeout: any;







const triggerPreview = (updatedFormule: any[]) => {
  clearTimeout(timeout);

  timeout = setTimeout(async () => {
    const res = await apiFetch(`${API_URL}/profile/formula/preview`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        formule: updatedFormule,
        input: {
          A: 1200,
          B: 1400,
          C: 0,
          D: 600,
          tehnicki: tehnickiValues,
          cene: priceValues
        }
      }),
    });

    const data = await res.json();
    setPreview(data);
  }, 400);
};







const loadIspune = () => {
  if (!loggedUser?.id) return;

  apiFetch(`${API_URL}/ispuna?userId=${loggedUser.id}`, {
    headers: authHeaders(),
  })
    .then(res => res.json())
    .then(data => {
      const list = Array.isArray(data) ? data : [];

      setIspune(
        list.map((x: any, index: number) => ({
          id: x.id ?? index + 1,
          naziv: x.naziv || `Ispuna ${index + 1}`,
          cena: Number(x.cena) || 0,
        }))
      );
    })
    .catch(() => {
      setIspune([]);
    });
};



const loadOkov = () => {
  if (!loggedUser?.id) return;

  apiFetch(`${API_URL}/okov?userId=${loggedUser.id}`, {
    headers: authHeaders(),
  })
    .then(res => res.json())
    .then(data => {
      const list = Array.isArray(data) ? data : [];

      setOkovi(
        list.map((x: any, index: number) => ({
          id: x.id ?? index + 1,
          naziv: x.naziv || `Okov ${index + 1}`,
          cena: Number(x.cena) || 0,
        }))
      );
    })
    .catch(() => {
      setOkovi([]);
    });
};





const loadValute = () => {
  if (!loggedUser?.id) return;

  apiFetch(`${API_URL}/profile/valuta?userId=${loggedUser.id}`, {
    headers: authHeaders(),
  })
    .then((res) => res.json())
    .then((data) => {
      const list = Array.isArray(data) ? data : [];

      setValute(
        list.map((v: any, index: number) => ({
          id: v.id ?? index + 1,
          naziv: v.naziv || `Valuta ${index + 1}`,
        }))
      );
    })
    .catch(() => {
      setValute([]);
    });
};









useEffect(() => {
  if (loggedUser?.id) {
    loadIspune();
    loadValute();
    loadProfili();
    loadTehnicki();
    loadParams();
    loadOkov();
    loadProfileParams();
    loadHelpTexts();
    loadAds();
    loadAdStats();
    loadInstruction();
    loadLanguages();
    loadTranslations();
    loadRoletne();
    loadKomarnici();
  }
}, [loggedUser?.id]);







useEffect(() => {
  setParametri(tehnickiParametri);
}, []);



useEffect(() => {
  loadFormulaByWindowType(formulaVrstaStolarije, formulaVrstaProzora);
}, [formulaVrstaStolarije, formulaVrstaProzora]);



useEffect(() => {
  document.querySelectorAll(".html2pdf__overlay, .html2canvas-container").forEach(e => e.remove());
  document.body.classList.remove("print-proposal", "print-worklist");
  document.body.style.pointerEvents = "";
  document.body.style.opacity = "";
  document.body.style.overflow = "";

  const savedUser = localStorage.getItem("loggedUser");

  if (savedUser) {
    setLoggedUser(JSON.parse(savedUser));
  }
}, []);


useEffect(() => {
  if (loggedUser?.role === "ADMIN") {
    loadAdminUsers();
  }
}, [loggedUser]);



const getFirmaValue = (key: string) => {
  const val = firma[key];

  // ako je prazno → 0
  if (val === undefined || val === null || val === "") return 0;

  // konverzija u broj
  return Number(val);
};


const getParamNamesByGroup = (grupa: string) => {
  return paramList
    .filter(p => p.grupa === grupa)
    .map(p => p.naziv);
};





const getVisibleDimensions = (type: string) => {
  return dimensionRules[type] || [];
};





const loadParams = async () => {
  const res = await apiFetch(`${API_URL}/params/profiles`, {
    headers: authHeaders(),
  });

  if (!res.ok) return;

  const data = await res.json();
  setParams(data);
};




const addParam = async () => {
  if (!grupa || !nazivParam) return alert(t("Popuni sve"));

  await apiFetch(`${API_URL}/params`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ grupa, naziv: nazivParam })
  });

  setNazivParam("");
  loadParams();
};



const deleteParam = async (id: number) => {
  await apiFetch(`${API_URL}/params/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  loadParams();
};




  const [form, setForm] = useState<Offer>({
    id: 0,
    brojPonude: "",
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

  const emptyPosition = (): Position => ({
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
  vrsta_roletne: "",
  komarnik: "",
  kolicina: 1,
});

const [positions, setPositions] = useState<Position[]>([
  emptyPosition()
]);


const [auditLogs, setAuditLogs] = useState<any[]>([]);



const getDefaultProfili = () =>
  Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    naziv: `Profil ${i + 1}`,
  }));

const loadProfili = () => {
  if (!loggedUser?.id) return;

  apiFetch(`${API_URL}/profile/profiles?userId=${loggedUser.id}`, {
    headers: authHeaders(),
  })
    .then((res) => res.json())
    .then((data) => {
      const list = Array.isArray(data) ? data : [];

      const normalized = Array.from({ length: 15 }, (_, index) => {
        const item = list[index];

        return {
          id: item?.id ?? index + 1,
          naziv: item?.naziv || `Profil ${index + 1}`,
        };
      });

      setProfili(normalized);
    })
    .catch(() => {
      setProfili(
        Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          naziv: `Profil ${i + 1}`,
        }))
      );
    });
};









const updateValue = (profil: string, parametar: string, value: string) => {
  setTehnicki((prev: any[]) => {
    const copy = [...prev];

    const idx = copy.findIndex(
      (x) => x.profil === profil && x.parametar === parametar
    );

    if (idx !== -1) {
      copy[idx] = {
        ...copy[idx],
        vrednost: value,
      };
    } else {
      copy.push({
        profil,
        parametar,
        vrednost: value,
      });
    }

    return copy;
  });
};





const getTehnickiMapByProfilId = (profilId: number | string) => {
  const map: Record<string, number> = {};

  (tehnickiData || []).forEach((t: any) => {
    if (String(t.profil) === String(profilId)) {
      map[t.element] = Number(t.vrednost) || 0;
    }
  });

  // AUTOMATSKE FORMULE IZ TABA TEHNIČKI
  const sirinaStok = Number(map["Širina profila Štok"] || 0);
  const sirinaKrilo = Number(map["Širina profila krilo"] || 0);

  map["Skraćenje čelika za štok"] = (sirinaStok + 10) * 2;
  map["Skraćenje čelika za krilo"] = (sirinaKrilo + 10) * 2;

  return map;
};



const getCeneMapByProfilId = (profilId: number | string) => {
  const map: Record<string, number> = {};

  (profilePrices || []).forEach((c: any) => {
    if (String(c.profil) === String(profilId)) {
      map[`${c.element} Cena`] = Number(c.cena) || 0;
    }
  });

  return map;
};

const getIspunaCenaById = (id: any) => {
  const found = ispune.find(
    (x: any) => String(x.id) === String(id)
  );

  return Number(found?.cena) || 0;
};

const getOkovCenaById = (okovId: number | string) => {
  const found = okovi.find((x: any) => String(x.id) === String(okovId));
  return found ? Number(found.cena) || 0 : 0;
};






const calculate = async () => {
  const firstPosition = positions.find((p: any) => p?.profilId);

  const profilId = firstPosition?.profilId;
  const ispunaId = firstPosition?.ispunaId;
  const okovId = firstPosition?.okovId;

  const tehnickiMap = profilId ? getTehnickiMapByProfilId(profilId) : {};
  const ceneMap = profilId ? getCeneMapByProfilId(profilId) : {};

  const ispunaCena = ispunaId ? getIspunaCenaById(ispunaId) : 0;
  const okovCena = okovId ? getOkovCenaById(okovId) : 0;

  const plastikaCena = ceneMap["PLASTIKA Cena"] || 0;

  const roletnaTip =
  firstPosition?.roletna === "NADPROZORSKA" ? 1 : 0;

const imaRoletnu =
  firstPosition?.roletna === "NADPROZORSKA" ||
  firstPosition?.roletna === "SPOLJNA"
    ? 1
    : 0;

const imaKomarnik =
  firstPosition?.komarnik
    ? 1
    : 0;

    const roletnaCena = firstPosition?.vrsta_roletne
  ? getRoletnaCenaByNaziv(firstPosition.vrsta_roletne)
  : 0;

const komarnikCena = firstPosition?.komarnik
  ? getKomarnikCenaByNaziv(firstPosition.komarnik)
  : 0;


const imaOkov =
  firstPosition?.okovId ? 1 : 0;

const imaIspunu =
  firstPosition?.ispunaId ? 1 : 0;


const A = Number(firstPosition?.a) || 0;
const B = Number(firstPosition?.b) || 0;
const C = Number(firstPosition?.c) || 0;
const D = Number(firstPosition?.d) || 0;
  

  const res = await apiFetch(`${API_URL}/profile/calculate`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
  A,
  B,
  C,
  D,
  vrstaStolarije: firstPosition?.vrsta_stolarije || "",
  vrstaProzora: firstPosition?.vrsta_prozora || "",
  tehnicki: tehnickiMap,
  cene: ceneMap,
  firma,
  ispunaCena,
  okovCena,
  plastikaCena,
  roletnaTip,
  imaRoletnu,
  imaKomarnik,
  roletnaCena,
  komarnikCena,
  imaOkov,
  imaIspunu,
  userId: loggedUser.id
}),
  });

  const data = await res.json();
  setRezultati(data);
};




const izracunajPVC19 = async () => {
  setLoading(true);

  try {


    const firstPosition = positions[0];

const A = Number(firstPosition?.a) || 0;
const B = Number(firstPosition?.b) || 0;
const C = Number(firstPosition?.c) || 0;
const D = Number(firstPosition?.d) || 0;




    const res = await apiFetch(`${API_URL}/profile/calculate-pvc19`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        A,
        B,
        C,
        D,
        tehnicki: tehnickiValues,
        cene: priceValues,
        userId: loggedUser.id
      }),
    });

    const data = await res.json();
    setRezultati(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};





const updateFormula = (index: number, field: string, value: any) => {
  const copy = [...formule];
  (copy[index] as any)[field] = value;
  setFormule(copy);

  triggerPreview(copy); // 🔥 LIVE
};



const updateExtraItem = (i: number, field: string, value: any) => {
  const copy = [...extraItems];
  (copy[i] as any)[field] = value;
  setExtraItems(copy);
};







const saveFormule = async () => {
  if (!formulaVrstaStolarije || !formulaVrstaProzora) {
    alert(t("Izaberi vrstu stolarije i vrstu prozora"));
    return;
  }

  try {
    const payload = formule.map((f: any, index: number) => ({
      ...f,
      vrstaStolarije: formulaVrstaStolarije,
      vrstaProzora: formulaVrstaProzora,
      redosled: index + 1
    }));

    const res = await apiFetch(`${API_URL}/profile/formula`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Neuspešno čuvanje formula");
    }

    alert("Sačuvano!");
  } catch (err) {
    console.error("Greška pri čuvanju formula:", err);
    alert("Greška pri čuvanju formula");
  }
};








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



const tehnickiParametri = [
  "Var profila",
  "Širina profila Štok",
  "Širina profila krilo",
  "Širina profila T prečka",
  "Zazor za staklo",
  "Preklop kod krila",
  "Preklop kod šloge",
  "Čepovi šloge",
  "Skraćenje čelika za štok",
  "Skraćenje čelika za krilo",
  "Visina kutije nadprozorske roletne",
  "ALU Spojnica Štok 1",
"ALU Spojnica Štok 2",
"ALU Spojnica Štok 3",
"ALU Spojnica Štok 4",
"ALU Spojnica T 1",
"ALU Spojnica T 2",
"ALU Spojnica T 3",
"ALU Spojnica Krilo 1",
"ALU Spojnica Krilo 2",
"ALU Spojnica Krilo 3",
"ALU Spojnica Krilo 4",
];




const elementi = [
  "ŠTOK",
  "KRILO",
  "T prečka",
  "ŠLOGA",
  "ČELIK",
  "LAJSNA",
  "PLASTIKA",
  "ALU Spojnica Štok 1",
"ALU Spojnica Štok 2",
"ALU Spojnica Štok 3",
"ALU Spojnica Štok 4",
"ALU Spojnica T 1",
"ALU Spojnica T 2",
"ALU Spojnica T 3",
"ALU Spojnica Krilo 1",
"ALU Spojnica Krilo 2",
"ALU Spojnica Krilo 3",
"ALU Spojnica Krilo 4",
];



const sviFormulaElementi = [
  "Štok",
"Čelik za štok",
"Lajsna za štok",
"Ispuna za štok",
"Krilo 1",
"Čelik za krilo 1",
"Lajsna za krilo 1",
"Ispuna za krilo 1",
"Krilo 2",
"Čelik za krilo 2",
"Lajsna za krilo 2",
"Ispuna za krilo 2",
"T-prečka 1",
"Čelik za T-prečku 1",
"T-prečka 2",
"Čelik za T-prečku 2",
"Lajsna za nadsvetlo",
"Ispuna za nadsvetlo",
"Šloga",
"ALU Spojnica Štok 1",
"ALU Spojnica Štok 2",
"ALU Spojnica Štok 3",
"ALU Spojnica Štok 4",
"ALU Spojnica T 1",
"ALU Spojnica T 2",
"ALU Spojnica T 3",
"ALU Spojnica Krilo 1",
"ALU Spojnica Krilo 2",
"ALU Spojnica Krilo 3",
"ALU Spojnica Krilo 4",
  "Roletna",
  "Komarnik"
];




const createEmptyFormulaTemplate = (
  vrstaStolarije: string,
  vrstaProzora: string
) => {
  return sviFormulaElementi.map((element, index) => ({
    vrstaStolarije,
    vrstaProzora,
    element,
    s: "",
    v: "",
    kom: 1,
    cena: "",
    redosled: index + 1
  }));
};





const loadFormulaByWindowType = async (
  vrstaStolarije: string,
  vrstaProzora: string
) => {
  if (!vrstaStolarije || !vrstaProzora) {
    setFormule([]);
    return;
  }

  try {
    const res = await apiFetch(
      `${API_URL}/profile/formula?vrstaStolarije=${encodeURIComponent(vrstaStolarije)}&vrstaProzora=${encodeURIComponent(vrstaProzora)}`, {
    headers: authHeaders(),
  });

    if (!res.ok) {
      throw new Error("Neuspešno učitavanje formula");
    }

    const data = await res.json();

if (Array.isArray(data) && data.length > 0) {
  const bezStarihSpojnica = data.filter(
    (f: any) =>
      f.element !== "ALU Spojnice 1" &&
      f.element !== "ALU Spojnice 2" &&
      f.element !== "ALU Spojnica 1" &&
      f.element !== "ALU Spojnica 2" &&
      f.element !== "Spojnica 1" &&
      f.element !== "Spojnica 2"
  );

  const postojeElementi = bezStarihSpojnica.map((f: any) => f.element);

  const nedostajuci = sviFormulaElementi
  .filter((el) => !postojeElementi.includes(el))
  .map((el, index) => ({
    id: -(index + 1),
    vrstaStolarije,
    vrstaProzora,
    element: el,
    s: "",
    v: "",
    kom: 1,
    cena: "",
    redosled: bezStarihSpojnica.length + index + 1,
  }));

  setFormule([...bezStarihSpojnica, ...nedostajuci]);
} else {
  setFormule(createEmptyFormulaTemplate(vrstaStolarije, vrstaProzora));
}
  } catch (err) {
    console.error("Greška pri učitavanju formula:", err);
    setFormule(createEmptyFormulaTemplate(vrstaStolarije, vrstaProzora));
  }
};




useEffect(() => {
  loadFormulaByWindowType(formulaVrstaStolarije, formulaVrstaProzora);
}, [formulaVrstaStolarije, formulaVrstaProzora]);















const getPriceValue = (element: string, profilId: number | string) => {
  const found = profilePrices.find(
    (x: any) =>
      x.element === element && String(x.profil) === String(profilId)
  );
  return found ? found.cena : "";
};





  // ---------------- LOAD OFFERS ----------------
  
  
const loadProfileParams = async () => {
  const res = await apiFetch(`${API_URL}/profile/params`, {
    headers: authHeaders(),
  });

  if (!res.ok) return;

  const data = await res.json();
  setProfileParams(data);
};

const loadProfilePrices = () => {
  if (!loggedUser?.id) return;

  apiFetch(`${API_URL}/profile/prices?userId=${loggedUser.id}`, {
    headers: authHeaders(),
  })
    .then(res => res.json())
    .then(data => setProfilePrices(Array.isArray(data) ? data : []));
};





const loadFirma = () => {
  if (!loggedUser?.id) return;

  apiFetch(`${API_URL}/settings?userId=${loggedUser.id}`, {
    headers: authHeaders(),
  })
    .then(res => res.json())
    .then(data => {
      setFirma(data || {});
    });
};

useEffect(() => {
  if (loggedUser?.id) {
    loadFirma();
    loadProfilePrices();
  }
}, [loggedUser?.id]);


  


useEffect(() => {
  if (loggedUser?.id) {
    loadOffers();
  }
}, [loggedUser]);


const loadOffers = async () => {
  if (!loggedUser?.id) return;

  const res = await apiFetch(`${API_URL}/offers?userId=${loggedUser.id}`,
    {
      headers: authHeaders(),
    }
  );
  const data = await res.json();

  setOffers(Array.isArray(data) ? data : []);
};






const loadTehnicki = () => {
  if (!loggedUser?.id) return;

  apiFetch(`${API_URL}/profile/tehnicki?userId=${loggedUser.id}`, {
    headers: authHeaders(),
  })
    .then((res) => res.json())
    .then((data) => {
      setTehnickiData(Array.isArray(data) ? data : []);
    })
    .catch(() => {
      setTehnickiData([]);
    });
};






const getValue = (profil: string, parametar: string) => {
  const found = tehnicki.find(
    x => x.profil === profil && x.parametar === parametar
  );

  return found ? found.vrednost : "";
};





  // ---------------- OPEN FROM TABLE ----------------
  const openFromTable = async (id: number) => {
    const res = await apiFetch(`${API_URL}/offers/${id}`, {
    headers: authHeaders(),
  });
    const data = await res.json();

    if (!data.offer) return alert(t("Nema ponude za ovaj ID"));

    setOriginalVrstaPonude(data.offer.vrsta_ponude || "");

    setForm({
  id: data.offer.id || "",
  brojPonude: data.offer.brojPonude || "",
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
    const filled = Array.isArray(data.items) && data.items.length > 0
  ? data.items.map((item: any) => {
      const prozor = prozori.find((x) => x.naziv === item.vrsta_prozora);

      return {
        vrsta_stolarije: item.vrsta_stolarije || "",
        vrsta_prozora: item.vrsta_prozora || "",
        slika: prozor ? prozor.id : null,

        a: Number(item.a) || 0,
        b: Number(item.b) || 0,
        c: Number(item.c) || 0,
        d: Number(item.d) || 0,

        profilId: item.profil ? Number(item.profil) : "",
        ispunaId: item.ispuna ? Number(item.ispuna) : "",
        okovId: item.okov ? Number(item.okov) : "",

        profil: item.profil || "",
        ispuna: item.ispuna || "",
        okov: item.okov || "",

        otvaranje: item.otvaranje || "",
        roletna: item.roletna || "",
        vrsta_roletne: item.vrsta_roletne || "",
        komarnik: item.komarnik || "",
        kolicina: Number(item.kolicina) || 1,
      };
    })
  : [emptyPosition()];

setPositions(filled);

    setPositions(filled);

    const filledExtra =
  Array.isArray(data.extraItems) && data.extraItems.length > 0
    ? data.extraItems.map((x: any) => ({
        naziv: x.naziv || "",
        kolicina: Number(x.kolicina) || 1,
        cena: Number(x.cena) || 0,
      }))
    : [emptyExtraItem()];

setExtraItems(filledExtra);

setExtraItems(filledExtra);



  };






  // ---------------- SAVE ----------------
  

const saveValute = async () => {
  await apiFetch(`${API_URL}/profile/valuta`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(
      valute.map((v) => ({
        ...v,
        userId: loggedUser.id,
      }))
    ),
  });

  alert(t("Valute sačuvane"));
  loadValute();
};



const saveOkovi = async () => {
  await apiFetch(`${API_URL}/okov`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(
      okovi.map((x) => ({
        ...x,
        userId: loggedUser.id,
      }))
    ),
  });

  alert(t("Okovi sačuvani"));
  loadOkov();
};



const saveProfili = async () => {
  if (!loggedUser?.id) {
    alert(t("Korisnik nije prijavljen"));
    return;
  }

  const dataToSave = profili.map((p: any, index: number) => ({
    id: p.id,
    userId: loggedUser.id,
    naziv: p.naziv || `Profil ${index + 1}`,
  }));

  const res = await apiFetch(`${API_URL}/profile/profiles`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(dataToSave),
  });

  if (!res.ok) {
    alert(t("Greška pri čuvanju profila"));
    return;
  }

  alert(t("Profili su sačuvani"));
  loadProfili();
};



  
  const saveFirma = async () => {
  try {
    const res = await apiFetch(`${API_URL}/settings`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        ...firma,
        userId: loggedUser.id,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || t("Greška pri čuvanju firme"));
      return;
    }

    alert(t("Sačuvano"));
    loadFirma();
  } catch (err) {
    console.error(err);
    alert(t("Backend nije dostupan. Proveri da li je backend pokrenut."));
  }
};
  
  
  
  const saveOffer = async () => {


    if (!form.naziv || !form.naziv.trim()) {
  alert("Morate uneti naziv kupca.");
  return;
}


if (!form.vrsta_ponude || !String(form.vrsta_ponude).trim()) {
  alert(t("Morate izabrati vrstu ponude."));
  return;
}




const isChangingOfferType =
  form.id &&
  originalVrstaPonude &&
  form.vrsta_ponude !== originalVrstaPonude;

if (isChangingOfferType) {
  alert(t("Promenjena je vrsta ponude. Biće kreiran novi dokument sa novim brojem."));
}

  // 👉 AKO POSTOJI ID → UPDATE
  if (form.id && !isChangingOfferType) {

    await apiFetch(`${API_URL}/offers/${form.id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({
        ...form,
        userId: loggedUser.id,
        username: loggedUser.username,
        positions,
        extraItems
      })
    });

    alert(t("Izmenjeno!"));

  } else {
    // 👉 NOVA PONUDA → CREATE

const formForCreate = {
  ...form,
  id: 0,
  brojPonude: "",
};

    const res = await apiFetch(`${API_URL}/offers`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        ...formForCreate,
        userId: loggedUser.id,
        username: loggedUser.username,
        positions,
        extraItems
      })
    });

    const data = await res.json();
    alert(t("Sačuvano: ") + (data.brojPonude || data.id));
  }

  loadOffers();   // refresh tabele
  if (proposalOffer?.id) {
  await openProposalOffer(proposalOffer.id);
}

if (worklistOffer?.id) {
  await openWorklistOffer(worklistOffer.id);
}
  clearForm();    // očisti formu
};




const saveTehnicki = async () => {
  await apiFetch(`${API_URL}/profile/params`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(tehnicki)
  });

  alert(t("Sačuvano!"));
};





  // ---------------- CLEAR ----------------
  const clearForm = () => {
    setForm({
      id: 0,
      brojPonude: "",
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

    setPositions([emptyPosition()]);


      setExtraItems([emptyExtraItem()]);



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


const getParam = (naziv: string) => {
  return Number(
    params.find((p: any) => p.naziv === naziv)?.vrednost || 0
  );
};














// ✅ PRETVARANJE % u broj
const percent = (val: any) => Number(val || 0) / 100;

// ✅ GLOBALNI PARAMETRI FIRME
const OTpad = percent(firma.otpad);
const ROLETNA = percent(firma.roletna);
const KOMARNIK = percent(firma.komarnik);

// ako treba broj dana
const VALUTA_DANA = Number(firma.valuta_placanja || 0);

const vrstePonude = ["RAČUN", "PREDRAČUN"];
const vrsteStolarije = ["PVC", "ALU"];
const vrsteOtvaranja = ["LEVO", "DESNO"];
const vrsteRoletni = ["NADPROZORSKA", "SPOLJNA"];
const vrsteKomarnika = ["DA"];





function izracunajFormula(param: string, profil: string) {

  if (param === "Skraćenje čelika za štok") {
    const sirina = Number(getValue(profil, "Širina profila Štok")) || 0;
    return (sirina + 10) * 2;
  }

  if (param === "Skraćenje čelika za krilo") {
    const sirina = Number(getValue(profil, "Širina profila krilo")) || 0;
    return (sirina + 10) * 2;
  }

  return getValue(profil, param);
}



const getTehnickiValue = (element: string, profil: string) => {
  if (!Array.isArray(tehnickiData)) return "";

  return (
    tehnickiData.find(
      (t) => t.element === element && t.profil === profil
    )?.vrednost ?? ""
  );
};




const izracunajTehnicki = (param: string, profilId: number | string) => {
  const get = (name: string) =>
    Number(
      tehnickiData?.find(
        (t: any) =>
          t.element === name &&
          String(t.profil) === String(profilId)
      )?.vrednost || 0
    );

  if (param === "Skraćenje čelika za štok") {
    return (get("Širina profila Štok") + 10) * 2;
  }

  if (param === "Skraćenje čelika za krilo") {
    return (get("Širina profila krilo") + 10) * 2;
  }

  return null;
};













const formulaSuggestions = [
  "A", "B", "C", "D",

  // TEHNIČKI
  ...tehnickiParametri,

  // CENE
  ...elementi.map(e => `${e} Cena`),

  // chaining
  ...elementi.flatMap(e => [
    `${e} (Š)`,
    `${e} (V)`
  ])
];


const handleAutocomplete = (value: string, index: number, field: string) => {
  const lastWord = value.split(/[\s()+\-*/]+/).pop()?.toLowerCase() || "";

  const filtered = formulaSuggestions.filter(s =>
    s.toLowerCase().includes(lastWord)
  );

  setSuggestions(filtered.slice(0, 5)); // max 5
  setActiveInput({ i: index, field });
};


const calculatePreview = async () => {
  const firstPosition = positions.find((p: any) => p?.profilId);

  const profilId = firstPosition?.profilId;
  const ispunaId = firstPosition?.ispunaId;
  const okovId = firstPosition?.okovId;

  const tehnickiMap = profilId ? getTehnickiMapByProfilId(profilId) : {};
  const ceneMap = profilId ? getCeneMapByProfilId(profilId) : {};

  const ispunaCena = ispunaId ? getIspunaCenaById(ispunaId) : 0;
  const okovCena = okovId ? getOkovCenaById(okovId) : 0;

  const plastikaCena = ceneMap["PLASTIKA Cena"] || 0;

  const roletnaTip =
  firstPosition?.roletna === "NADPROZORSKA" ? 1 : 0;

const imaRoletnu =
  firstPosition?.roletna === "NADPROZORSKA" ||
  firstPosition?.roletna === "SPOLJNA"
    ? 1
    : 0;

const imaKomarnik =
  firstPosition?.komarnik
    ? 1
    : 0;

const roletnaCena = firstPosition?.vrsta_roletne
  ? getRoletnaCenaByNaziv(firstPosition.vrsta_roletne)
  : 0;

const komarnikCena = firstPosition?.komarnik
  ? getKomarnikCenaByNaziv(firstPosition.komarnik)
  : 0;


const imaOkov =
  firstPosition?.okovId ? 1 : 0;

const imaIspunu =
  firstPosition?.ispunaId ? 1 : 0;


  

const A = Number(firstPosition?.a) || 0;
const B = Number(firstPosition?.b) || 0;
const C = Number(firstPosition?.c) || 0;
const D = Number(firstPosition?.d) || 0;

  

  const res = await apiFetch(`${API_URL}/profile/preview-formula`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
  formule,
  input: {
    A,
    B,
    C,
    D,
    vrstaStolarije: firstPosition?.vrsta_stolarije || "",
vrstaProzora: firstPosition?.vrsta_prozora || "",
    tehnicki: tehnickiMap,
    cene: ceneMap,
    firma,
    ispunaCena,
    okovCena,
    plastikaCena,
    roletnaTip,
    imaRoletnu,
    imaKomarnik,
    roletnaCena,
    komarnikCena,
    imaOkov,
    imaIspunu,
    userId: loggedUser.id
  }
})
  });

  const data = await res.json();
setPreview(Array.isArray(data) ? data : []);
};







const [profili, setProfili] = useState(
  defaultProfil.map((p, i) => ({
    id: i + 1,
    naziv: p.naziv
  }))
);


useEffect(() => {
  if (profili.length > 0 && !selectedProfilId) {
    setSelectedProfilId(String(profili[0].id));
  }
}, [profili, selectedProfilId]);



const [ispune, setIspune] = useState<any[]>(
  defaultIspuna.map((i, idx) => ({
    id: idx + 1,
    naziv: i.naziv,
    cena: i.cena
  }))
);


const [okovi, setOkovi] = useState<any[]>(
  defaultOkov.map((i, idx) => ({
    id: idx + 1,
    naziv: i.naziv,
    cena: i.cena
  }))
);


const [valute, setValute] = useState(
  defaultValuta.map((p, i) => ({
    id: i + 1,
    naziv: p.naziv
  }))
);










const testCena = profilId
  ? getCena("ŠTOK", profilId, ceneData)
  : 0;

console.log("Cena štok:", testCena);







const getProfilName = (id: any) => {
  const found = profili.find((x: any) => String(x.id) === String(id));
  return found?.naziv || id || "";
};

const getIspunaName = (id: any) => {
  const found = ispune.find(
    (x: any) => String(x.id) === String(id)
  );

  return found?.naziv || "";
};

const getOkovName = (id: any) => {
  const found = okovi.find((x: any) => String(x.id) === String(id));
  return found?.naziv || id || "";
};








const calculateWorklistPosition = async (p: any) => {
  const profilId = p.profilId || p.profil;
const ispunaId = p.ispunaId || p.ispuna;
const okovId = p.okovId || p.okov;

  const tehnickiMap = profilId ? getTehnickiMapByProfilId(profilId) : {};
  const ceneMap = profilId ? getCeneMapByProfilId(profilId) : {};

const ispunaCena = getIspunaCenaById(ispunaId);

console.log("ISPUNA TEST:", {
  ispunaId,
  ispune,
  ispunaCena,
});

const okovCena = getOkovCenaById(okovId);


const roletnaCena = p.vrsta_roletne
  ? getRoletnaCenaByNaziv(p.vrsta_roletne)
  : 0;

const komarnikCena = p.komarnik
  ? getKomarnikCenaByNaziv(p.komarnik)
  : 0;

  const plastikaCena = ceneMap["PLASTIKA Cena"] || 0;

  const roletnaValue = String(p.roletna || "").trim().toUpperCase();

const roletnaTip =
  roletnaValue === "NADPROZORSKA" ? 1 : 0;

const imaRoletnu =
  roletnaValue === "NADPROZORSKA" || roletnaValue === "SPOLJNA"
    ? 1
    : 0;

  const imaKomarnik =
  p.komarnik
    ? 1
    : 0;


  
  const imaOkov = p.okov ? 1 : 0;
  const imaIspunu = p.ispuna ? 1 : 0;

  const res = await apiFetch(`${API_URL}/profile/calculate`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      A: Number(p.a) || 0,
      B: Number(p.b) || 0,
      C: Number(p.c) || 0,
      D: Number(p.d) || 0,

      vrstaStolarije: p.vrsta_stolarije || "",
      vrstaProzora: p.vrsta_prozora || "",

      tehnicki: tehnickiMap,
      cene: ceneMap,
      firma,
      ispunaCena,
      okovCena,
      plastikaCena,

      roletnaTip,
      imaRoletnu,
      imaKomarnik,
      roletnaCena,
      komarnikCena,
      imaOkov,
      imaIspunu,
      userId: loggedUser.id
    }),
  });

  const data = await res.json();
  return Array.isArray(data) ? data : [];
};














const openWorklistOffer = async (id: number) => {
  const res = await apiFetch(`${API_URL}/offers/${id}`, {
    headers: authHeaders(),
  });
  const data = await res.json();

  if (!data.offer) {
    alert(t("Nema ponude za ovaj ID"));
    return;
  }

  const items = Array.isArray(data.items) ? data.items : [];

  setWorklistOffer(data.offer);
  setWorklistPositions(items);
  setWorklistExtraItems(Array.isArray(data.extraItems) ? data.extraItems : []);

  const calculated: Record<number, any[]> = {};

  for (let i = 0; i < items.length; i++) {
    const p = items[i];

    if (!p.vrsta_prozora) continue;

    const missing: string[] = [];
    if (!p.vrsta_stolarije) missing.push("vrsta stolarije");
    if (!p.vrsta_prozora) missing.push("vrsta prozora");
    if (!p.profil) missing.push("profil");
    const requiredDims = dimensionRules[p.vrsta_prozora] || [];

if (requiredDims.includes("a") && !p.a) missing.push("A");
if (requiredDims.includes("b") && !p.b) missing.push("B");
if (requiredDims.includes("c") && !p.c) missing.push("C");
if (requiredDims.includes("d") && !p.d) missing.push("D");

    if (missing.length > 0) continue;

    calculated[i] = await calculateWorklistPosition(p);
  }

  setWorklistResults(calculated);
};




const getProzorImageId = (vrstaProzora: string) => {
  const found = prozori.find((x) => x.naziv === vrstaProzora);
  return found?.id || null;
};




const addPosition = () => {
  if (positions.length >= 50) {
    alert("Maksimalan broj pozicija je 50");
    return;
  }

  setPositions(prev => [...prev, emptyPosition()]);
};




const removePosition = (index: number) => {
  if (positions.length === 1) {
    alert("Mora postojati bar jedna pozicija");
    return;
  }

  setPositions(prev => prev.filter((_, i) => i !== index));
};

const removeExtraItem = (index: number) => {
  if (extraItems.length === 1) {
    alert("Mora postojati bar jedan red dodatnih usluga/proizvoda");
    return;
  }

  setExtraItems(prev => prev.filter((_, i) => i !== index));
};




const filteredOffers = offers.filter((o: any) => {
  const q = offerSearch.toLowerCase();

  return (
    String(o.id || "").includes(q) ||
    String(o.naziv || "").toLowerCase().includes(q) ||
    String(o.adresa || "").toLowerCase().includes(q) ||
    String(o.telefon || "").toLowerCase().includes(q) ||
    String(o.pib || "").toLowerCase().includes(q)
  );
});

const filteredWorklistOffers = offers.filter((o: any) => {
  const q = worklistSearch.toLowerCase();

  return (
    String(o.id || "").includes(q) ||
    String(o.naziv || "").toLowerCase().includes(q) ||
    String(o.adresa || "").toLowerCase().includes(q) ||
    String(o.telefon || "").toLowerCase().includes(q) ||
    String(o.pib || "").toLowerCase().includes(q)
  );
});



const filteredProposalOffers = offers.filter((o: any) => {
  const q = proposalSearch.toLowerCase();

  return (
    String(o.id || "").includes(q) ||
    String(o.naziv || "").toLowerCase().includes(q) ||
    String(o.adresa || "").toLowerCase().includes(q) ||
    String(o.telefon || "").toLowerCase().includes(q) ||
    String(o.pib || "").toLowerCase().includes(q)
  );
});



const getPositionPrice = (results: any[]) => {
  const total = results.find((x: any) => x.element === "Ukupna cena");
  return Number(total?.cena) || 0;
};

const getExtraTotal = (x: any) => {
  return (Number(x.kolicina) || 0) * (Number(x.cena) || 0);
};




const openProposalOffer = async (id: number) => {
  const res = await apiFetch(`${API_URL}/offers/${id}`, {
    headers: authHeaders(),
  });
  const data = await res.json();

  if (!data.offer) {
    alert(t("Nema ponude za ovaj ID"));
    return;
  }

  const items = Array.isArray(data.items) ? data.items : [];

  setProposalOffer(data.offer);
  setProposalPositions(items);
  setProposalExtraItems(Array.isArray(data.extraItems) ? data.extraItems : []);

  const calculated: Record<number, any[]> = {};

  for (let i = 0; i < items.length; i++) {
    const p = items[i];

    if (!p.vrsta_prozora) continue;
    if (!p.vrsta_stolarije) continue;
    if (!p.profil) continue;
    if (!p.a || !p.b) continue;

    calculated[i] = await calculateWorklistPosition(p);
  }

  setProposalResults(calculated);
};




const formatCena = (value: number) => {
  return new Intl.NumberFormat("sr-RS", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
};


const printPdf = (type: "proposal" | "worklist") => {
  document.body.classList.remove(
    "print-proposal",
    "print-worklist"
  );

  // DODATO
  document.body.classList.add("printing-pdf");

  let fileName = "Dokument";

  if (type === "proposal") {
    document.body.classList.add("print-proposal");

    fileName =
      `Ponuda ${
        proposalOffer?.brojPonude ||
        proposalOffer?.id ||
        ""
      } ${
        proposalOffer?.naziv || ""
      }`;
  }

  if (type === "worklist") {
    document.body.classList.add("print-worklist");

    fileName =
      `Radni nalog ${
        worklistOffer?.brojPonude ||
        worklistOffer?.id ||
        ""
      } ${
        worklistOffer?.naziv || ""
      }`;
  }

  // zapamti stari naslov
  const oldTitle = document.title;

  // postavi novi naslov
  document.title = fileName;

  setTimeout(() => {
    window.print();

    // vrati stari naslov
    document.title = oldTitle;

    document.body.classList.remove(
      "print-proposal",
      "print-worklist"
    );

    // DODATO
    document.body.classList.remove(
      "printing-pdf"
    );

  }, 100);
};





const saveIspune = async () => {
  await apiFetch(`${API_URL}/ispuna`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(
      ispune.map((x) => ({
        ...x,
        userId: loggedUser.id,
      }))
    ),
  });

  alert(t("Ispune sačuvane"));
  loadIspune();
};


const selectCustomerSuggestion = (customer: any) => {
  setForm({
    ...form,
    naziv: customer.naziv || "",
    adresa: customer.adresa || "",
    telefon: customer.telefon || "",
    pib: customer.pib || "",
    maticni: customer.maticni || "",
  });

  setShowCustomerSuggestions(false);
  setCustomerSuggestions([]);
};



const handleCustomerNameChange = (value: string) => {
  setForm({ ...form, naziv: value });

  if (value.length < 3) {
    setCustomerSuggestions([]);
    setShowCustomerSuggestions(false);
    return;
  }

  const q = value.toLowerCase();

  const suggestions = offers
    .filter((o: any) =>
      String(o.naziv || "").toLowerCase().startsWith(q)
    )
    .slice(0, 8);

  setCustomerSuggestions(suggestions);
  setShowCustomerSuggestions(suggestions.length > 0);
};



const handlePibChange = (value: string) => {
  setForm({ ...form, pib: value });

  const found = offers.find(
    (o: any) =>
      String(o.pib || "").trim() &&
      String(o.pib || "").trim() === value.trim()
  );

  if (found) {
    setForm({
      ...form,
      naziv: found.naziv || "",
      adresa: found.adresa || "",
      telefon: found.telefon || "",
      pib: found.pib || value,
      maticni: found.maticni || "",
    });
  }
};


const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    alert(t("Logo ne sme biti veći od 2MB."));
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const logoBase64 = String(reader.result || "");

    setLogoPreview(logoBase64);
    setFirma({
      ...firma,
      logo: logoBase64,
    });
  };

  reader.readAsDataURL(file);
};


const valutaNaziv =
  (valute || []).find((v: any) => v && String(v.id) === String(proposalOffer?.valuta))?.naziv ||
  proposalOffer?.valuta ||
  "";

  

const formatDate = (date: any) => {
  if (!date) return "";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "";

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}.${month}.${year}.`;
};








const getDeviceFingerprint = () => {
  const data = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ].join("|");

  return btoa(data);
};






const login = async () => {
  setLoginError("");

  try {
    const res = await window.fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
        fingerprint: getDeviceFingerprint(),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setLoginError(data.message || "Greška pri prijavi");
      return;
    }

    if (!data.token || !data.user) {
      setLoginError("Login odgovor nije ispravan");
      console.log("LOGIN DATA:", data);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("loggedUser", JSON.stringify(data.user));

    setSessionExpiredShown(false);
    setLoggedUser(data.user);
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    setLoginError("Backend nije dostupan");
  }
};



const logout = () => {
  localStorage.removeItem("loggedUser");
    localStorage.removeItem("token");
  setLoggedUser(null);
  setLoginUsername("");
  setLoginPassword("");
};




if (!loggedUser) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white border rounded p-6 w-full max-w-sm shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Prijava
        </h1>

        <input
          placeholder="Korisničko ime"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
  placeholder="Šifra"
  type={showPassword ? "text" : "password"}
  value={loginPassword}
  onChange={(e) => setLoginPassword(e.target.value)}
  className="border p-2 w-full mb-2"
/>

<label className="flex items-center gap-2 text-sm mb-3">
  <input
    type="checkbox"
    checked={showPassword}
    onChange={(e) => setShowPassword(e.target.checked)}
  />
  Prikaži šifru
</label>

        {loginError && (
          <div className="bg-red-100 text-red-700 p-2 mb-3 text-sm">
            {loginError}
          </div>
        )}

        <button
          onClick={login}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Prijavi se
        </button>
      </div>
    </main>
  );
}


const isAdmin = loggedUser?.role === "ADMIN";


const loadAdminUsers = async () => {
  const res = await apiFetch(`${API_URL}/auth/users`, {
  headers: authHeaders(),
});
  const data = await res.json();
  setAdminUsers(Array.isArray(data) ? data : []);
};

const createAdminUser = async () => {
  if (!newUser.username.trim()) {
    alert(t("Unesite korisničko ime"));
    return;
  }

  const res = await apiFetch(`${API_URL}/auth/users`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(newUser),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Greška pri kreiranju korisnika");
    return;
  }

  alert("Korisnik je kreiran");

  setNewUser({
    username: "",
    password: "",
    role: "USER",
    licenseEnd: "",
    maxDevices: 1,
  });

  loadAdminUsers();
};



const changeMyPassword = async () => {
  if (!passwordForm.oldPassword || !passwordForm.newPassword) {
    alert(t("Unesite staru i novu šifru"));
    return;
  }

  const res = await apiFetch(`${API_URL}/auth/change-password`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      userId: loggedUser.id,
      oldPassword: passwordForm.oldPassword,
      newPassword: passwordForm.newPassword,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    alert(err.message || t("Greška pri promeni šifre"));
    return;
  }

  alert(t("Šifra je promenjena"));
  setPasswordForm({ oldPassword: "", newPassword: "" });
};




const adminChangeUserPassword = async (userId: number) => {
  const password = adminPasswords[userId];

  if (!password) {
    alert("Unesite novu šifru");
    return;
  }

  await apiFetch(`${API_URL}/auth/admin-change-password`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ userId, password }),
  });

  alert("Šifra je promenjena");
  setAdminPasswords({ ...adminPasswords, [userId]: "" });
};

const deleteAdminUser = async (id: number) => {
  if (!confirm("Da li sigurno želite da obrišete korisnika?")) return;

  await apiFetch(`${API_URL}/auth/delete-user`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ id }),
  });

  alert("Korisnik je obrisan");
  loadAdminUsers();
};


const getLicenseDaysLeft = () => {
  if (!loggedUser?.licenseEnd) return null;

  const today = new Date();
  const end = new Date(loggedUser.licenseEnd);

  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diff = end.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const licenseDaysLeft = getLicenseDaysLeft();


const loadUserDevices = async (user: any) => {
  setSelectedAdminUser(user);

  const res = await apiFetch(`${API_URL}/auth/devices?userId=${user.id}`, {
    headers: authHeaders(),
  });
  const data = await res.json();

  setAdminDevices(Array.isArray(data) ? data : []);
};

const deleteDevice = async (id: number) => {
  await apiFetch(`${API_URL}/auth/devices/delete`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ id }),
  });

  if (selectedAdminUser) {
    loadUserDevices(selectedAdminUser);
  }
};

const deleteAllDevices = async () => {
  if (!selectedAdminUser) return;

  if (!confirm("Da li sigurno želite da obrišete sve uređaje za ovog korisnika?")) {
    return;
  }

  await apiFetch(`${API_URL}/auth/devices/delete-all`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ userId: selectedAdminUser.id }),
  });

  loadUserDevices(selectedAdminUser);
};


const updateAdminUser = async (u: any) => {
  await apiFetch(`${API_URL}/auth/users/update`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(u),
  });

  alert("Korisnik je izmenjen");
  loadAdminUsers();
};


const createManualBackup = async () => {
  try {
    const res = await apiFetch(`${API_URL}/backup/create`, {
      method: "POST",
      headers: authHeaders(),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Backup nije napravljen");
      return;
    }

    alert("Backup napravljen:\n" + data.fileName);
    loadBackups();
  } catch (err) {
    alert("Greška pri pravljenju backup-a");
  }
};



const loadBackups = async () => {
  const res = await apiFetch(`${API_URL}/backup/list`, {
  headers: authHeaders(),
});
  const data = await res.json();

  setBackupFiles(Array.isArray(data) ? data : []);
};


const deleteBackupFile = async (fileName: string) => {
  if (!confirm("Da li sigurno želite da obrišete backup?")) return;

  await apiFetch(`${API_URL}/backup/delete`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ fileName }),
  });

  alert("Backup je obrisan");
  loadBackups();
};


const restoreBackupFile = async (fileName: string) => {
  const ok = confirm(
    "PAŽNJA!\n\nOvo će vratiti bazu na izabrani backup.\nTrenutno stanje baze će biti sačuvano kao sigurnosni backup.\n\nDa li želite da nastavite?"
  );

  if (!ok) return;

  const res = await apiFetch(`${API_URL}/backup/restore`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ fileName }),
  });

  const data = await res.json();

  if (!data.success) {
    alert(data.message || "Restore nije uspeo");
    return;
  }

  alert(
    "Restore je urađen.\n\n" +
    "Vraćeno iz: " + data.restoredFrom + "\n" +
    "Sigurnosni backup pre restore-a: " + data.safetyBackup + "\n\n" +
    "Osvežite stranicu i restartujte backend ako podaci nisu odmah vidljivi."
  );

  location.reload();
};


const loadAuditLogs = async () => {
  const res = await apiFetch(`${API_URL}/audit`, {
  headers: authHeaders(),
});
  const data = await res.json();

  setAuditLogs(Array.isArray(data) ? data : []);
};


const filteredAdminUsers = adminUsers.filter((u: any) =>
  (u.username || "")
    .toLowerCase()
    .includes(userSearch.toLowerCase())
);


const filteredAuditLogs = auditLogs.filter((a: any) =>
  (
    (a.username || "") +
    " " +
    (a.action || "") +
    " " +
    (a.details || "")
  )
    .toLowerCase()
    .includes(auditSearch.toLowerCase())
);

const loadAdminOffers = async () => {
  const res = await apiFetch(`${API_URL}/offers/admin/all`, {
  headers: authHeaders(),
});
  const data = await res.json();

  setAdminOffers(Array.isArray(data) ? data : []);
};



const filteredAdminOffers = adminOffers.filter((o: any) =>
  (
    (o.brojPonude || "") +
    " " +
    (o.naziv || "") +
    " " +
    (o.adresa || "") +
    " " +
    (o.telefon || "") +
    " " +
    (o.pib || "") +
    " " +
    (o.user?.username || "")
  )
    .toLowerCase()
    .includes(adminOfferSearch.toLowerCase())
);


const downloadBackupFile = async (fileName: string) => {
  const res = await apiFetch(
    `${API_URL}/backup/download?file=${encodeURIComponent(fileName)}`,
    {
      headers: authHeaders(),
    }
  );

  if (!res.ok) {
    alert(t("Niste prijavljeni ili download nije uspeo"));
    return;
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(url);
};



const saveAllTehnicki = async () => {
  if (!loggedUser?.id || !selectedProfilId) return;

  const rows = tehnickiData.filter(
    (x: any) => String(x.profil) === String(selectedProfilId)
  );

  for (const item of rows) {
    await apiFetch(`${API_URL}/profile/tehnicki`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        userId: loggedUser.id,
        profil: String(selectedProfilId),
        element: item.element,
        vrednost: item.vrednost,
      }),
    });
  }

  await loadTehnicki();
  alert(t("Tehnički parametri su sačuvani"));
};

const saveAllPrices = async () => {
  if (!loggedUser?.id || !selectedProfilId) return;

  const rows = profilePrices.filter(
    (x: any) => String(x.profil) === String(selectedProfilId)
  );

  for (const item of rows) {
    await apiFetch(`${API_URL}/profile/prices`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        userId: loggedUser.id,
        profil: String(selectedProfilId),
        element: item.element,
        cena: item.cena,
      }),
    });
  }

  await loadProfilePrices();
  alert(t("Cene su sačuvane"));
};


const loadArchivedUsers = async () => {
  const res = await apiFetch(`${API_URL}/auth/users/archived`, {
    headers: authHeaders(),
  });

  if (!res.ok) return;

  const data = await res.json();
  setArchivedUsers(Array.isArray(data) ? data : []);
};

const restoreUser = async (id: number) => {
  await apiFetch(`${API_URL}/auth/restore-user`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ id }),
  });

  alert("Korisnik je vraćen");

  loadAdminUsers();
  loadArchivedUsers();
};






const loadHelpTexts = async () => {
  try {
    const res = await apiFetch(`${API_URL}/help-texts`, {
      headers: authHeaders(),
    });

    if (!res.ok) return;

    const data = await res.json();

    setHelpTexts(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error(err);
  }
};


const saveHelpTexts = async () => {
  try {
    await apiFetch(`${API_URL}/help-texts`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(helpTexts),
    });

    alert("Uputstva sačuvana");
  } catch (err) {
    alert("Greška");
  }
};


const getHelpText = (fieldName: string) => {
  const found = helpTexts.find(
    (h: any) => h.fieldName === fieldName
  );

  return found?.text || t("Uputstvo nije definisano");
};



const tabHelpItems = [
  "Forma",
  "Ponude",
  "Radna lista",
  "Firma",
  "Ispuna",
  "Profil",
  "Okov",
  "Valuta",
  "Tehnicki",
  "Cene",
  "Formule",
];





const loadAds = () => {
  apiFetch(`${API_URL}/ads`, {
    headers: authHeaders(),
  })
    .then((res) => res.json())
    .then((data) => {
      setAds(Array.isArray(data) ? data : []);
    })
    .catch(() => setAds([]));
};


const saveAds = async () => {
  await apiFetch(`${API_URL}/ads`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(ads),
  });

  alert("Reklame sačuvane");
};


const getAdValue = (key: string) => {
  const found = ads.find((x: any) => x.key === key);
  return found?.value || "";
};


const setAdValue = (key: string, value: string) => {
  setAds((prev: any[]) => {
    const copy = [...prev];
    const index = copy.findIndex((x: any) => x.key === key);

    if (index >= 0) {
      copy[index] = { ...copy[index], value };
    } else {
      copy.push({ key, value });
    }

    return copy;
  });
};

const openAdLink = async (key: string) => {
  await apiFetch(`${API_URL}/ads/click`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ adKey: key }),
  });

  const link = getAdValue(`${key}Link`);

  if (link) {
    window.open(link, "_blank");
  }
};



const loadAdStats = async () => {
  const res = await apiFetch(`${API_URL}/ads/stats`, {
    headers: authHeaders(),
  });

  if (!res.ok) return;

  const data = await res.json();
  setAdStats(Array.isArray(data) ? data : []);
};


const getAdClicks = (key: string) => {
  const found = adStats.find((x: any) => x.adKey === key);
  return found?.clicks || 0;
};


const resetAdClicks = async (key: string) => {
  const confirmReset = confirm(
    `Da li želiš da obrišeš klikove za ${key}?`
  );

  if (!confirmReset) return;

  await apiFetch(
    `${API_URL}/ads/reset-clicks`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        adKey: key,
      }),
    }
  );

  loadAdStats();
};


const isVideoFile = (path: string) => {
  return path.endsWith(".mp4") || path.endsWith(".webm");
};



const loadInstruction = async () => {
  try {
    const res = await apiFetch(`${API_URL}/instruction`, {
      headers: authHeaders(),
    });

    if (!res.ok) return;

    const data = await res.json();
    setInstructionContent(data.content || "");
  } catch (err) {
    console.error("Greška pri učitavanju uputstva:", err);
  }
};

const saveInstruction = async () => {
  try {
    const res = await apiFetch(`${API_URL}/instruction`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        content: instructionContent,
      }),
    });

    if (!res.ok) {
      alert("Greška pri čuvanju uputstva");
      return;
    }

    alert("Uputstvo je sačuvano");
    loadInstruction();
  } catch (err) {
    alert("Greška pri čuvanju uputstva");
  }
};

const loadLanguages = async () => {
  const res = await apiFetch(`${API_URL}/translation/languages`, {
    headers: authHeaders(),
  });

  if (!res.ok) return;

  const data = await res.json();
  setLanguages(Array.isArray(data) ? data : []);
};

const loadTranslations = async () => {
  const res = await apiFetch(`${API_URL}/translation`, {
    headers: authHeaders(),
  });

  if (!res.ok) return;

  const data = await res.json();
  setTranslations(Array.isArray(data) ? data : []);
};


const saveLanguages = async () => {
  const res = await apiFetch(`${API_URL}/translation/languages`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(languages),
  });

  if (!res.ok) {
    alert("Greška pri čuvanju jezika");
    return;
  }

  alert("Jezici su sačuvani");
  await loadLanguages();
};

const saveTranslations = async () => {
  await apiFetch(`${API_URL}/translation`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(translations),
  });

  alert("Prevodi su sačuvani");
  loadTranslations();
};


const getTranslationValue = (key: string, lang: any) => {
  const item = translations.find(
    (t: any) =>
      t.key === key &&
      Number(t.languageId) === Number(lang.id)
  );

  return item?.value || "";
};

const setTranslationValue = (
  key: string,
  lang: any,
  value: string
) => {
  if (!lang.id) {
    alert("Prvo sačuvaj jezike, pa onda unosi prevode.");
    return;
  }

  setTranslations((prev: any[]) => {
    const copy = [...prev];

    const index = copy.findIndex(
      (t: any) =>
        t.key === key &&
        Number(t.languageId) === Number(lang.id)
    );

    if (index >= 0) {
      copy[index] = {
        ...copy[index],
        value,
      };
    } else {
      copy.push({
        key,
        languageId: lang.id,
        value,
      });
    }

    return copy;
  });
};


const t = (key: string) => {
  if (!selectedLanguageId) return key;

  const item = translations.find(
    (x: any) =>
      x.key === key &&
      Number(x.languageId) === Number(selectedLanguageId)
  );

  return item?.value || key;
};

const loadRoletne = () => {
  if (!loggedUser?.id) return;

  apiFetch(`${API_URL}/roletna?userId=${loggedUser.id}`, {
    headers: authHeaders(),
  })
    .then((res) => res.json())
    .then((data) => {
      const list = Array.isArray(data) ? data : [];

      setRoletne(
        Array.from({ length: 15 }, (_, index) => {
          const item = list[index];

          return {
            id: item?.id ?? undefined,
            naziv: item?.naziv || `Roletna ${index + 1}`,
            cena: Number(item?.cena) || 0,
          };
        })
      );
    })
    .catch(() => {
      setRoletne(
        Array.from({ length: 15 }, (_, index) => ({
          naziv: `Roletna ${index + 1}`,
          cena: 0,
        }))
      );
    });
};

const loadKomarnici = () => {
  if (!loggedUser?.id) return;

  apiFetch(`${API_URL}/komarnik?userId=${loggedUser.id}`, {
    headers: authHeaders(),
  })
    .then((res) => res.json())
    .then((data) => {
      const list = Array.isArray(data) ? data : [];

      setKomarnici(
        Array.from({ length: 15 }, (_, index) => {
          const item = list[index];

          return {
            id: item?.id ?? undefined,
            naziv: item?.naziv || `Komarnik ${index + 1}`,
            cena: Number(item?.cena) || 0,
          };
        })
      );
    })
    .catch(() => {
      setKomarnici(
        Array.from({ length: 15 }, (_, index) => ({
          naziv: `Komarnik ${index + 1}`,
          cena: 0,
        }))
      );
    });
};


const saveRoletne = async () => {
  await apiFetch(`${API_URL}/roletna`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(
      roletne.map((x) => ({
        ...x,
        userId: loggedUser.id,
      }))
    ),
  });

  alert(t("Roletne sačuvane"));
  loadRoletne();
};

const saveKomarnici = async () => {
  await apiFetch(`${API_URL}/komarnik`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(
      komarnici.map((x) => ({
        ...x,
        userId: loggedUser.id,
      }))
    ),
  });

  alert(t("Komarnici sačuvani"));
  loadKomarnici();
};

const getRoletnaCenaByNaziv = (naziv: string) => {
  const found = roletne.find(
    (x: any) => x.naziv === naziv
  );

  return Number(found?.cena) || 0;
};

const getKomarnikCenaByNaziv = (naziv: string) => {
  const found = komarnici.find(
    (x: any) => x.naziv === naziv
  );

  return Number(found?.cena) || 0;
};












console.log("PROFILI FULL:", JSON.stringify(profili, null, 2));


console.log("PAGE PROFILI:", profili);
console.log("FORMA PROFILI:", profili);

console.log("PROFILI STATE:", profili);













































return (
  <div className="w-full">

    <div className="xl:grid xl:grid-cols-[180px_minmax(0,1fr)_180px] xl:gap-4 xl:px-4">

      {/* LEVA REKLAMA - SAMO DESKTOP */}
      <aside
  onClick={() => openAdLink("leftBanner")}
  className="hidden xl:block sticky top-4 h-[600px] overflow-hidden cursor-pointer"
>

  {getAdValue("leftBannerImage") ? (

    isVideoFile(getAdValue("leftBannerImage")) ? (

      <video
        src={`${API_URL}${getAdValue("leftBannerImage")}`}
        className="w-full h-full object-cover"
        muted
        loop
        autoPlay
        playsInline
      />

    ) : (

      <img
        src={`${API_URL}${getAdValue("leftBannerImage")}`}
        className="w-full h-full object-cover"
        alt=""
      />

    )

  ) : (

    <div className="h-full flex items-center justify-center bg-gray-100">
      {getAdValue("leftBanner") || "Levi baner"}
    </div>

  )}

</aside>


      <main className="p-2 sm:p-4 lg:p-6 pb-20 w-full max-w-7xl mx-auto">
      

      









    
        <div className="flex justify-end items-center gap-3 mb-2 text-sm">
          <span>
            {t("Korisnik")}: <strong>{loggedUser.username}</strong> ({loggedUser.role})
          </span>



          <select
  value={selectedLanguageId}
  onChange={(e) => setSelectedLanguageId(e.target.value)}
  className="border p-1 rounded"
>
  <option value="">SR</option>

  {languages
    .filter((l: any) => l.enabled)
    .map((l: any) => (
      <option key={l.id} value={l.id}>
        {l.name}
      </option>
    ))}
</select>




          <button
            onClick={logout}
            className="bg-gray-700 text-white px-3 py-1 rounded"
          >
            {t("Odjavi se")}
          </button>


          



        </div>


        {licenseDaysLeft !== null && licenseDaysLeft <= 15 && licenseDaysLeft >= 0 && (
  <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded mb-3 text-sm">
    {t("Licenca ističe za")} <strong>{licenseDaysLeft}</strong>{t(" dana. Kontaktirajte administratora za obnovu.")}
  </div>
)}




<div className="sticky top-0 z-950 bg-white border-b shadow-sm mb-0">
  <div className="py-0 flex justify-center">
      <Tabs
  active={activeTab}
  setActive={setActiveTab}
  isAdmin={isAdmin}
  translate={t}
/>
</div>

  <div className="py-0 flex justify-between items-center mb-0">
    <div className="flex gap-3 flex-wrap">
    {activeTab === "Forma" && (
      <>
        <button
          onClick={saveOffer}
          className="bg-blue-900 text-white px-2 py-1 rounded"
        >
          {t("Sačuvaj")}
        </button>

        <button
          onClick={clearForm}
          className="bg-red-600 text-white px-2 py-1 rounded"
        >
          {t("Obriši formu")}
        </button>
      </>
    )}

    {activeTab === "Radna lista" && (
      <button
        onClick={() => printPdf("worklist")}
        className="bg-blue-900 text-white px-2 py-1 rounded"
      >
        {t("Sačuvaj u PDF-u")}
      </button>
    )}

    {activeTab === "Ponude" && (
      <button
        onClick={() => printPdf("proposal")}
        className="bg-blue-900 text-white px-2 py-1 rounded"
      >
        {t("Sačuvaj u PDF-u")}
      </button>
    )}

    {activeTab === "Parametri" && paramTab === "Firma" && (
      <button onClick={saveFirma} className="bg-blue-900 text-white px-2 py-1 rounded">
        {t("Sačuvaj firmu")}
      </button>
    )}

    {activeTab === "Parametri" && paramTab === "Ispuna" && (
      <button onClick={saveIspune} className="bg-blue-900 text-white px-2 py-1 rounded">
        {t("Sačuvaj ispune")}
      </button>
    )}

    {activeTab === "Parametri" && paramTab === "Profil" && (
      <button onClick={saveProfili} className="bg-blue-900 text-white px-2 py-1 rounded">
        {t("Sačuvaj profile")}
      </button>
    )}

    {activeTab === "Parametri" && paramTab === "Okov" && (
      <button onClick={saveOkovi} className="bg-blue-900 text-white px-2 py-1 rounded">
        {t("Sačuvaj okov")}
      </button>
    )}


    {activeTab === "Parametri" && paramTab === "Roletna" && (
  <button
    onClick={saveRoletne}
    className="bg-blue-900 text-white px-2 py-1 rounded"
  >
    {t("Sačuvaj roletne")}
  </button>
)}

{activeTab === "Parametri" && paramTab === "Komarnik" && (
  <button
    onClick={saveKomarnici}
    className="bg-blue-900 text-white px-2 py-1 rounded"
  >
    {t("Sačuvaj komarnike")}
  </button>
)}




    {activeTab === "Parametri" && paramTab === "Valuta" && (
      <button onClick={saveValute} className="bg-blue-900 text-white px-2 py-1 rounded">
        {t("Sačuvaj valute")}
      </button>
    )}

    {activeTab === "Parametri" && paramTab === "Tehnicki" && (
      <button onClick={saveAllTehnicki} className="bg-blue-900 text-white px-2 py-1 rounded">
        {t("Sačuvaj tehničke")}
      </button>
    )}

    {activeTab === "Parametri" && paramTab === "Cene" && (
      <button onClick={saveAllPrices} className="bg-blue-900 text-white px-2 py-1 rounded">
        {t("Sačuvaj cene")}
      </button>
    )}

    {activeTab === "Parametri" && isAdmin && paramTab === "Formule" && (
      <button onClick={saveFormule} className="bg-blue-900 text-white px-2 py-1 rounded">
        {t("Sačuvaj formule")}
      </button>
    )}
    {activeTab === "Parametri" && isAdmin && paramTab === "Reklame" && (


  <button
    onClick={saveAds}
    className="bg-blue-900 text-white px-2 py-1 rounded"
  >
    {t("Sačuvaj reklame")}
  </button>
)}
  </div>


    {["Forma", "Ponude", "Radna lista", "Parametri"].includes(activeTab) && (
      <button
        type="button"
        onClick={() =>
          alert(
            getHelpText(
              activeTab === "Parametri"
                ? `Tab - ${paramTab}`
                : `Tab - ${activeTab}`
            )
          )
        }
        className="text-[11px] bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center ml-3"
      >
        ?
      </button>
    )}
  </div>
</div>


      {activeTab === "Forma" && (
  <>
    <h1 className="text-3xl font-bold mb-4">{t("FORMA")}</h1>




    {/* OVDE OSTAVI SVE ŠTO VEĆ IMAŠ ZA FORMU */}


<input
  placeholder={t("Pretraga ponuda...")}
  value={offerSearch}
  onChange={(e) => setOfferSearch(e.target.value)}
  className="border p-2 w-full mb-3"
/>



      {/* TABELA */}
      <div className="border mb-6">
        <div style={{ maxHeight: "220px", overflowY: "auto" }}>
          <table className="w-full min-w-[860px] border-collapse text-sm table-fixed">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
<th className="border p-2 w-[90px]">{t("ID")}</th>
<th className="border p-2 min-w-[220px]">{t("Naziv")}</th>
<th className="border p-2 min-w-[160px]">{t("Adresa")}</th>
<th className="border p-2 w-[160px]">{t("Telefon")}</th>
<th className="border p-2 w-[120px]">{t("PIB")}</th>
<th className="border p-2 w-[110px]">{t("Datum")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map(c => (
                <tr key={c.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => openFromTable(c.id)}>
                  <td className="border p-2">{c.brojPonude || c.id}</td>
                  <td className="border p-2">{c.naziv}</td>
                  <td className="border p-2">{c.adresa}</td>
                  <td className="border p-2">{c.telefon}</td>
                  <td className="border p-2">{c.pib}</td>
                  <td className="border p-2">{formatDate(c.datum)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORMA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

  {/* LEVA KOLONA */}







  <div className="grid grid-cols-1 gap-4">









<div className="grid grid-cols-2 gap-4">

 <input
      value={form.brojPonude || ""}
      readOnly
      placeholder={t("Broj ponude")}
      className="border p-2 bg-gray-100"
    />


<select
  value={form.vrsta_ponude}
  onChange={(e) =>
    setForm({
      ...form,
      vrsta_ponude: e.target.value,
    })
  }
  className="border p-2 bg-yellow-50 border-yellow-400"
>
  <option value="">
    {t("Vrsta ponude")}
  </option>

  {vrstePonude.map((v) => (
    <option key={v} value={v}>
      {t(v)}
    </option>
  ))}
</select>


      
 </div>









   

    <div className="relative">
      <input
        placeholder={t("Kupac")}
        value={form.naziv || ""}
        onChange={(e) => handleCustomerNameChange(e.target.value)}
        onFocus={() => {
          if (customerSuggestions.length > 0) {
            setShowCustomerSuggestions(true);
          }
        }}
        className="border p-2 w-full"
      />

      {showCustomerSuggestions && (
        <div className="absolute z-50 bg-white border w-full shadow-lg max-h-60 overflow-y-auto">
          {customerSuggestions.map((c: any) => (
            <div
              key={c.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => selectCustomerSuggestion(c)}
            >
              <div className="font-semibold">{c.naziv}</div>
              <div className="text-xs text-gray-500">
                {c.adresa} | PIB: {c.pib || "-"} | Tel: {c.telefon || "-"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    <input
      placeholder={t("Adresa")}
      value={form.adresa || ""}
      onChange={(e) => setForm({ ...form, adresa: e.target.value })}
      className="border p-2"
    />


  </div>

  {/* DESNA KOLONA */}
  <div className="grid grid-cols-1 gap-4">

    <div className="grid grid-cols-2 gap-4">

      <input
        type="date"
        value={form.datum || ""}
        onChange={(e) => setForm({ ...form, datum: e.target.value })}
        className="border p-2"
      />

      <select
        value={form.valuta || ""}
        onChange={(e) => setForm({ ...form, valuta: e.target.value })}
        className="border p-2"
      >
        <option value="">{t("Izaberi valutu")}</option>
        {valute.map((v, index) => (
          <option key={v.id ?? index} value={v.id ?? index + 1}>
            {v.naziv}
          </option>
        ))}
      </select>

 </div>

    <div className="grid grid-cols-2 gap-4">
      <input
        placeholder={t("PIB")}
        value={form.pib || ""}
        onChange={(e) => handlePibChange(e.target.value)}
        className="border p-2 bg-yellow-50 border-yellow-400"
      />

      <input
        placeholder={t("Matični")}
        value={form.maticni || ""}
        onChange={(e) => setForm({ ...form, maticni: e.target.value })}
        className="border p-2"
      />
    </div>

    <div className="grid grid-cols-2 gap-4">




    <input
      placeholder={t("Popust %")}
      value={form.popust || ""}
      onChange={(e) => setForm({ ...form, popust: e.target.value })}
      className="border p-2"
    />

        <input placeholder={t("Telefon")} value={form.telefon || ""}
          onChange={e => setForm({ ...form, telefon: e.target.value })}
          className="border p-2"/>


    </div>


  </div>

  {/* NAPOMENA PREKO CELE ŠIRINE */}
      <input
    placeholder={t("Napomena")}
    value={form.napomena || ""}
    onChange={(e) => setForm({ ...form, napomena: e.target.value })}
    className="border p-2"
  />

</div>

<br />

      {/* DUGMAD */}
      

      {/* POZICIJE (NE DIRAMO) */}
{positions.map((p, i) => (
  <div key={p.id || i} className="border rounded p-3 sm:p-4 mb-6 relative w-full overflow-hidden">
    <button
    type="button"
    onClick={() => removePosition(i)}
    className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 rounded-full font-bold"
    title={t("Obriši poziciju")}
  >
    ×
  </button>

          <h2 className="font-bold mb-3">{t("Pozicija")} {i + 1}</h2>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
<select
  value={p.vrsta_stolarije}
  onChange={(e) =>
    update(
      i,
      "vrsta_stolarije",
      e.target.value
    )
  }
  className="border p-2"
>
  <option value="">
    {t("Vrsta stolarije")}
  </option>

  {vrsteStolarije.map((v) => (
    <option key={v} value={v}>
      {t(v)}
    </option>
  ))}
</select>

<select
  value={p.vrsta_prozora || ""}
  onChange={(e) => selectProzor(i, e.target.value)}
  className="border p-2"
>
  <option value="">
    {t("Vrsta prozora")}
  </option>

  <optgroup label={t("Standardni")}>

    {[1,2,3,4,5,6,7,8,9,10,11,12,13]
      .map(id => prozori.find(p => p.id === id))
      .filter(Boolean)
      .map((x:any) => (
        <option
          key={x.id}
          value={x.naziv}
        >
          {t(x.naziv)}
        </option>
      ))}

  </optgroup>

  <optgroup label={t("Nadsvetlo")}>

    {[14,15,16,17]
      .map(id => prozori.find(p => p.id === id))
      .filter(Boolean)
      .map((x:any) => (
        <option
          key={x.id}
          value={x.naziv}
        >
          {t(x.naziv)}
        </option>
      ))}

  </optgroup>

  <optgroup label={t("Nadsvetlo kip")}>

    {[18,19,20,21]
      .map(id => prozori.find(p => p.id === id))
      .filter(Boolean)
      .map((x:any) => (
        <option
          key={x.id}
          value={x.naziv}
        >
          {t(x.naziv)}
        </option>
      ))}

  </optgroup>
</select>
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">



  {/* SREDINA - DIMENZIJE */}
  <div className="border rounded p-3">
    <div className="font-bold mb-2">{t("Dimenzije")}</div>

    <div className="flex flex-col gap-2 mb-4">
      {showField(p.vrsta_prozora, "a") && (
        <div>
          <label className="text-xs font-semibold">{t("A - širina")}</label>
          <input
            type="number"
            value={p.a || ""}
            onChange={(e) => update(i, "a", Number(e.target.value))}
            className="border p-1 w-full text-sm"
          />
        </div>
      )}

      {showField(p.vrsta_prozora, "b") && (
        <div>
          <label className="text-xs font-semibold">{t("B - visina")}</label>
          <input
            type="number"
            value={p.b || ""}
            onChange={(e) => update(i, "b", Number(e.target.value))}
            className="border p-1 w-full text-sm"
          />
        </div>
      )}

      {showField(p.vrsta_prozora, "c") && (
        <div>
          <label className="text-xs font-semibold">C</label>
          <input
            type="number"
            value={p.c || ""}
            onChange={(e) => update(i, "c", Number(e.target.value))}
            className="border p-1 w-full text-sm"
          />
        </div>
      )}

      {showField(p.vrsta_prozora, "d") && (
        <div>
          <label className="text-xs font-semibold">D</label>
          <input
            type="number"
            value={p.d || ""}
            onChange={(e) => update(i, "d", Number(e.target.value))}
            className="border p-1 w-full text-sm"
          />
        </div>
      )}
    </div>




  
  {/* LEVO - SLIKA */}
  <div className="w-full overflow-hidden">
    {p.slika ? (
      <img
  src={`/prozori/${p.slika}.jpg`}
  alt=""
  className="max-w-full h-auto object-contain mx-auto"
/>
    ) : (
      <span className="text-gray-400">{t("Slika prozora")}</span>
    )}
  </div>
  </div>



  {/* DESNO - OSTALA POLJA */}
  <div className="border rounded p-3">
    <div className="font-bold mb-2">{t("Podaci")}</div>

    <div className="grid grid-cols-1 gap-2">
      <select
        value={p.profilId || ""}
        onChange={(e) => update(i, "profilId", Number(e.target.value))}
        className="border p-2"
      >
        <option value="">{t("Izaberi profil")}</option>
        {profili.map((x) => (
          <option key={x.id ?? x.naziv} value={x.id}>
            {x.naziv}
          </option>
        ))}
      </select>

      <select
        value={p.ispunaId || ""}
        onChange={(e) => update(i, "ispunaId", Number(e.target.value))}
        className="border p-2"
      >
        <option value="">{t("Izaberi ispunu")}</option>
        {ispune.map((x) => (
          <option key={x.id ?? x.naziv} value={x.id}>
            {x.naziv}
          </option>
        ))}
      </select>

      <select
        value={p.okovId || ""}
        onChange={(e) => update(i, "okovId", Number(e.target.value))}
        className="border p-2"
      >
        <option value="">{t("Izaberi okov")}</option>
        {okovi.map((x) => (
          <option key={x.id ?? x.naziv} value={x.id}>
            {x.naziv}
          </option>
        ))}
      </select>

<select
  value={p.otvaranje}
  onChange={(e) =>
    update(
      i,
      "otvaranje",
      e.target.value
    )
  }
  className="border p-2"
>
  <option value="">
    {t("Otvaranje")}
  </option>

  {vrsteOtvaranja.map((v) => (
    <option key={v} value={v}>
      {t(v)}
    </option>
  ))}
</select>

<select
  value={p.roletna}
  onChange={(e) =>
    update(
      i,
      "roletna",
      e.target.value
    )
  }
  className="border p-2"
>
  <option value="">
    {t("Roletna")}
  </option>

  {vrsteRoletni.map((v) => (
    <option key={v} value={v}>
      {t(v)}
    </option>
  ))}
</select>

{p.roletna && (
  <select
    value={p.vrsta_roletne || ""}
    onChange={(e)=>
      update(
        i,
        "vrsta_roletne",
        e.target.value
      )
    }
    className="border p-2"
  >
    <option value="">
      {t("Vrsta roletne")}
    </option>

    {roletne
      .filter((x)=>x.naziv)
      .map((x)=>(
        <option
          key={x.id || x.naziv}
          value={x.naziv}
        >
          {x.naziv}
        </option>
      ))}
  </select>
)}

<select
  value={p.komarnik}
  onChange={(e) =>
    update(
      i,
      "komarnik",
      e.target.value
    )
  }
  className="border p-2"
>
  <option value="">
    {t("Komarnik")}
  </option>

  {komarnici
    .filter((x)=>x.naziv)
    .map((x)=>(
      <option
        key={x.id || x.naziv}
        value={x.naziv}
      >
        {x.naziv}
      </option>
    ))}
</select>

      <input
        placeholder={t("Količina")}
        type="number"
        value={p.kolicina || ""}
        onChange={(e) => update(i, "kolicina", Number(e.target.value))}
        className="border p-2"
      />
    </div>
  </div>
</div>

    

  </div>
))}





<button
  onClick={addPosition}
  className="bg-green-600 text-white px-4 py-2 rounded mb-8"
>
  {t("Dodaj poziciju")}
</button>




<div className="border rounded p-4 mb-6">
  <h2 className="font-bold mb-3">{t("Dodatne usluge / proizvodi")}</h2>

  <table className="border w-full text-sm">
    <thead className="bg-gray-200">
      <tr>
        <th className="border p-2">{t("Usluge / proizvodi")}</th>
        <th className="border p-2">{t("Kol.")}</th>
        <th className="border p-2">{t("Cena")}</th>
        <th className="border p-2">{t("Ukupno")}</th>
        <th className="border p-2">{t("Bris.")}</th>
      </tr>
    </thead>

    <tbody>
      {extraItems.map((item, i) => (
        <tr key={i}>
          <td className="border p-1">
            <input
              className="w-full border p-2"
              value={item.naziv || ""}
              onChange={(e) =>
                updateExtraItem(i, "naziv", e.target.value)
              }
            />
          </td>

          <td className="border p-1">
            <input
              type="number"
              className="w-full border p-2"
              value={item.kolicina || ""}
              onChange={(e) =>
                updateExtraItem(i, "kolicina", Number(e.target.value))
              }
            />
          </td>

          <td className="border p-1">
            <input
              type="number"
              className="w-full border p-2"
              value={item.cena || ""}
              onChange={(e) =>
                updateExtraItem(i, "cena", Number(e.target.value))
              }
            />
          </td>

          <td className="border p-2 text-right font-semibold bg-gray-50">
            {((Number(item.kolicina) || 0) * (Number(item.cena) || 0)).toFixed(2)}
          </td>
          <td className="border p-1 text-center">
  <button
    type="button"
    onClick={() => removeExtraItem(i)}
    className="bg-red-600 text-white w-7 h-7 rounded-full font-bold"
    title={t("Obriši uslugu/proizvod")}
  >
    ×
  </button>
</td>
        </tr>
      ))}
    </tbody>
  </table>

  <button
    onClick={addExtraItem}
    className="bg-green-600 text-white px-4 py-2 rounded mt-3"
  >
    {t("Dodaj uslugu/proizvod")}
  </button>
</div>




  </>
)}







{activeTab === "Ponude" && (
  <div className="p-4">
    <h1 className="text-3xl font-bold mb-4">PONUDE</h1>

    

    <input
      placeholder={t("Pretraga ponuda...")}
      value={proposalSearch}
      onChange={(e) => setProposalSearch(e.target.value)}
      className="border p-2 w-full mb-3"
    />

    {/* TABELA */}
<div className="offer-search-table w-full overflow-x-auto border mb-6">
      <div style={{ maxHeight: "220px", overflowY: "auto" }}>
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="border p-2">{t("Br")}.</th>
              <th className="border p-2">{t("Naziv")}</th>
              <th className="border p-2">{t("Adresa")}</th>
              <th className="border p-2">{t("Telefon")}</th>
              <th className="border p-2">{t("PIB")}</th>
              <th className="border p-2">{t("Datum")}</th>
            </tr>
          </thead>

          <tbody>
            {filteredProposalOffers.map((c: any) => (
              <tr
                key={c.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => openProposalOffer(c.id)}
              >
                <td className="border p-2">{c.brojPonude || c.id}</td>
                <td className="border p-2">{c.naziv}</td>
                <td className="border p-2">{c.adresa}</td>
                <td className="border p-2">{c.telefon}</td>
                <td className="border p-2">{c.pib}</td>
                <td className="border p-2">{formatDate(c.datum)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {!proposalOffer && (
      <div className="text-gray-500">
        {t("Izaberi ponudu iz tabele da se prikaže ponuda.")}
      </div>
    )}

    {proposalOffer && (() => {

console.log("VALUTA IZ PONUDE:", proposalOffer.valuta);
console.log("SVE VALUTE:", valute);

      const rowsPositions = proposalPositions.filter((p) => p.vrsta_prozora);
      const rowsExtra = proposalExtraItems.filter((x) => x.naziv);

      const valutaNaziv =
  valute.find((v: any) => String(v.id) === String(proposalOffer.valuta))?.naziv ||
  valute.find((v: any) => String(v.naziv) === String(proposalOffer.valuta))?.naziv ||
  String(proposalOffer.valuta || "");

      const positionSubtotal = rowsPositions.reduce((sum, p, index) => {
        const cena = getPositionPrice(proposalResults[index] || []);
        return sum + cena * (Number(p.kolicina) || 1);
      }, 0);

      const extraSubtotal = rowsExtra.reduce((sum, x) => {
        return sum + getExtraTotal(x);
      }, 0);

      const ukupno = positionSubtotal + extraSubtotal;
      const popustProc = Number(proposalOffer.popust) || 0;
      const popustIznos = ukupno * popustProc / 100;

      const pdvProc = Number(firma.pdv) || 0;
      const pdvIznos = (ukupno - popustIznos) * pdvProc / 100;

      const zaUplatu = ukupno - popustIznos + pdvIznos;

      return (
        <div id="proposal-pdf" className="bg-white text-black p-6">
          {/* ZAGLAVLJE */}
          <table className="w-full mb-6 text-sm">
            <tbody>
              <tr>
                <td rowSpan={6} className="w-1/4 align-middle text-center">
                  <div className="h-28 w-48 flex items-center justify-center bg-white">
  {firma.logo ? (
    <img
      src={firma.logo}
      alt="Logo"
      className="max-w-full max-h-full object-contain"
    />
  ) : (
    <span className="text-gray-400">{t("LOGO")}</span>
  )}
</div>
                </td>

                <td className="w-1/2 font-semibold">
                  {firma.naziv || ""}, {firma.adresa || ""}
                </td>

                <td className="w-1/4"></td>
              </tr>

              <tr>
                <td>{t("PIB")}: {firma.pib || ""}</td>
                <td></td>
              </tr>

              <tr>
                <td>{t("Matični broj")}: {firma.maticni || ""}</td>
                <td rowSpan={2} className="text-center text-2xl font-bold">
                  {proposalOffer.vrsta_ponude || "PONUDA"}
                </td>
              </tr>

              <tr>
                <td>{t("Telefon")}: {firma.telefon || ""}</td>
              </tr>

              <tr>
                <td>{t("Email")}: {firma.email || ""}</td>
                <td rowSpan={2} className="text-center text-xl font-bold">
                  {t("Br")}. {proposalOffer.brojPonude || proposalOffer.id}
                </td>
              </tr>

              <tr>
                <td>{t("TR")}: {firma.tr || ""}</td>
              </tr>
            </tbody>
          </table>

          {/* KUPAC */}
          <div className="mb-6 text-sm">
            <div>
              <strong>{t("Kupac")}:</strong> {proposalOffer.naziv || ""}, {proposalOffer.adresa || ""}
            </div>
            <div><strong>{t("PIB")}:</strong> {proposalOffer.pib || ""}</div>
            <div><strong>{t("Matični broj")}:</strong> {proposalOffer.maticni || ""}</div>
            <div><strong>{t("Telefon")}:</strong> {proposalOffer.telefon || ""}</div>
            <div><strong>{t("Datum ponude")}:</strong> {formatDate(proposalOffer.datum)}</div>
            <div>
  <strong>{t("Valuta plaćanja")}:</strong>{" "}
  {firma.valuta_placanja || ""} {t("dana")}
</div>
          </div>

          {/* TABELA PONUDE */}
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr className="border-b border-gray-400">
                <th className="p-2 w-12">{t("Red. br.")}</th>
                <th className="p-2">{t("Naziv")}</th>
                <th className="p-2 w-20">{t("Kol.")}</th>
                <th className="p-2 w-28">{t("Cena")}</th>
                <th className="p-2 w-32">
                  {t("UKUPNO")}<br />
                  <span className="text-xs">{valutaNaziv}</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {rowsPositions.map((p, index) => {
                const cena = getPositionPrice(proposalResults[index] || []);
                const kol = Number(p.kolicina) || 1;
                const ukupnoRed = cena * kol;

                return (
                  <tr key={p.id || index} className="border-b border-gray-400">
                    <td className="p-2 text-center">{index + 1}</td>

                    <td className="p-2">
                      <div className="flex gap-4">
                        <div className="w-32">
                          {getProzorImageId(p.vrsta_prozora) ? (
                            <img
                              src={`/prozori/${getProzorImageId(p.vrsta_prozora)}.jpg`}
                              className="h-24 object-contain mb-2"
                            />
                          ) : (
                            <div className="h-24 flex items-center justify-center text-gray-400">
                              {t("Slika")}
                            </div>
                          )}

                          <div className="text-xs">
                            {getVisibleDimensions(p.vrsta_prozora).includes("a") && <div>A={p.a} mm</div>}
                            {getVisibleDimensions(p.vrsta_prozora).includes("b") && <div>B={p.b} mm</div>}
                            {getVisibleDimensions(p.vrsta_prozora).includes("c") && <div>C={p.c} mm</div>}
                            {getVisibleDimensions(p.vrsta_prozora).includes("d") && <div>D={p.d} mm</div>}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="font-bold">{p.vrsta_prozora}</div>
                          <div>{t("Vrsta stolarije")}: {p.vrsta_stolarije}</div>
                          <div>{t("Profil")}: {getProfilName(p.profil)}</div>
                          <div>{t("Ispuna")}: {getIspunaName(p.ispuna)}</div>
                          <div>{t("Okov")}: {getOkovName(p.okov)}</div>
                          {p.otvaranje && <div>{t("Otvaranje")}: {p.otvaranje}</div>}
                          {p.roletna && <div>{t("Roletna")}: {p.roletna}</div>}
                          {p.vrsta_roletne && ( <div>{t("Vrsta roletne")}: {p.vrsta_roletne}</div>)}
                          {p.komarnik && <div>{t("Komarnik")}: {p.komarnik}</div>}
                        </div>
                      </div>
                    </td>

                    <td className="p-2 text-center">{kol}</td>
                    <td className="p-2 text-right">{formatCena(cena)} </td>
                    <td className="p-2 text-right font-semibold">{formatCena(ukupnoRed)} </td>
                  </tr>
                );
              })}

              {rowsExtra.map((x, i) => {
                const rowIndex = rowsPositions.length + i + 1;
                const kol = Number(x.kolicina) || 1;
                const cena = Number(x.cena) || 0;
                const ukupnoRed = kol * cena;

                return (
                  <tr key={`extra-${i}`} className="border-b border-gray-400">
                    <td className="p-2 text-center">{rowIndex}</td>
                    <td className="p-2 font-semibold">{x.naziv}</td>
                    <td className="p-2 text-center">{kol}</td>
                    <td className="p-2 text-right">{formatCena(cena)} </td>
                    <td className="p-2 text-right font-semibold">{formatCena(ukupnoRed)} </td>
                  </tr>
                );
              })}

              <tr className="border-b border-gray-400">
  {/* NAPOMENA (spojene 3 kolone + 4 reda) */}
  <td className="p-3 align-top" colSpan={3} rowSpan={4}>
    <div className="font-semibold mb-2">{t("Napomena")}:</div>
    <div className="min-h-[100px]">
      {proposalOffer.napomena || ""}
    </div>
  </td>

  {/* UKUPNO */}
  <td className="p-2 font-semibold text-right">
    {t("Ukupno")}
  </td>
  <td className="p-2 text-right font-semibold">
    {formatCena(ukupno)} 
  </td>
</tr>

<tr className="border-b border-gray-400">
  {/* POPUST */}
  <td className="p-2 text-right">
    {t("Popust")} {popustProc}%
  </td>
  <td className="p-2 text-right">
    -{formatCena(popustIznos)} 
  </td>
</tr>

<tr className="border-b border-gray-400">
  {/* PDV */}
  <td className="p-2 text-right">
    {t("PDV")} {pdvProc}%
  </td>
  <td className="p-2 text-right">
    {formatCena(pdvIznos)} 
  </td>
</tr>

<tr>
  {/* ZA UPLATU */}
  <td className="p-2 font-bold text-right">
    {t("Za uplatu")}
  </td>
  <td className="p-2 text-right font-bold text-lg">
    {formatCena(zaUplatu)} 
  </td>
</tr>
            </tbody>
          </table>

          
        </div>
      );
    })()}
  </div>
)}









{activeTab === "Radna lista" && (
  <div className="p-4">

    <h1 className="text-3xl font-bold mb-4">{t("RADNA LISTA")}</h1>

    

<input
  placeholder={t("Pretraga ponuda...")}
  value={worklistSearch}
  onChange={(e) => setWorklistSearch(e.target.value)}
  className="border p-2 w-full mb-3"
/>


    {/* TABELA PONUDA */}
    <div className="border mb-6">
      <div style={{ maxHeight: "220px", overflowY: "auto" }}>
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="border p-2">{t("Br")}.</th>
              <th className="border p-2">{t("Naziv")}</th>
              <th className="border p-2">{t("Adresa")}</th>
              <th className="border p-2">{t("Telefon")}</th>
              <th className="border p-2">{t("PIB")}</th>
              <th className="border p-2">{t("Datum")}</th>
            </tr>
          </thead>

          <tbody>
            {filteredWorklistOffers.map((c) => (
              <tr
                key={c.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => openWorklistOffer(c.id)}
              >
                <td className="border p-2">{c.brojPonude || c.id}</td>
                <td className="border p-2">{c.naziv}</td>
                <td className="border p-2">{c.adresa}</td>
                <td className="border p-2">{c.telefon}</td>
                <td className="border p-2">{c.pib}</td>
                <td className="border p-2">{formatDate(c.datum)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {!worklistOffer && (
      <div className="text-gray-500">
        {t("Izaberi ponudu iz tabele da se prikaže radna lista.")}
      </div>
    )}

    {worklistOffer && (
      <div id="worklist-pdf" className="bg-white text-black p-6">

        {/* ZAGLAVLJE FIRME */}
        <table className="w-full mb-6 text-sm">
          <tbody>
            <tr>
              <td rowSpan={6} className="w-1/4 align-middle text-center">
                <div className="h-28 w-48 flex items-center justify-center bg-white">
  {firma.logo ? (
    <img
      src={firma.logo}
      alt="Logo"
      className="max-w-full max-h-full object-contain"
    />
  ) : (
    <span className="text-gray-400">{t("LOGO")}</span>
  )}
</div>
              </td>

              <td className="w-1/2 font-semibold">
                {firma.naziv || ""}, {firma.adresa || ""}
              </td>

              <td className="w-1/4"></td>
            </tr>

            <tr>
              <td>{t("PIB")}: {firma.pib || ""}</td>
              <td></td>
            </tr>

            <tr>
              <td>{t("Matični broj")}: {firma.maticni || ""}</td>
              <td rowSpan={2} className="text-center text-2xl font-bold">
                {t("RADNI NALOG")}
              </td>
            </tr>

            <tr>
              <td>{t("Telefon")}: {firma.telefon || ""}</td>
            </tr>

            <tr>
              <td>{t("Email")}: {firma.email || ""}</td>
              <td rowSpan={2} className="text-center text-xl font-bold">
                Br. {worklistOffer.brojPonude || worklistOffer.id}
              </td>
            </tr>

            <tr>
              <td>{t("TR")}: {firma.tr || ""}</td>
            </tr>
          </tbody>
        </table>

        {/* PODACI KUPCA */}
<div className="mb-6 text-sm">
  <div>
    <strong>{t("Kupac")}:</strong>{" "}
    {worklistOffer.naziv || ""}, {worklistOffer.adresa || ""}
  </div>

  <div>
    <strong>{t("PIB")}:</strong> {worklistOffer.pib || ""}
  </div>

  <div>
    <strong>{t("Datum ponude")}:</strong> {formatDate(worklistOffer.datum)}
  </div>

  <div>
    <strong>{t("Napomena")}:</strong> {worklistOffer.napomena || ""}
  </div>
</div>


        {/* POZICIJE */}
        {worklistPositions
          .filter((p) => p.vrsta_prozora)
          .map((p, index) => {
            const missing: string[] = [];

            if (!p.vrsta_stolarije) missing.push("vrsta stolarije");
            if (!p.vrsta_prozora) missing.push("vrsta prozora");
            if (!p.profil) missing.push("profil");
            if (!p.ispuna) missing.push("ispuna");
            if (!p.okov) missing.push("okov");
            const requiredDims = dimensionRules[p.vrsta_prozora] || [];

if (requiredDims.includes("a") && !p.a) missing.push("A");
if (requiredDims.includes("b") && !p.b) missing.push("B");
if (requiredDims.includes("c") && !p.c) missing.push("C");
if (requiredDims.includes("d") && !p.d) missing.push("D");

            return (
              <div key={p.id || index} className="mb-8 border-t pt-4">

                <h2 className="text-xl font-bold mb-2">
                  {t("Pozicija")} {index + 1}
                </h2>

                {missing.length > 0 ? (
                  <div className="bg-yellow-100 border border-yellow-400 p-3 mb-4">
                    {t("Pozicija nije kompletna. Nedostaje")}: {missing.join(", ")}.
                  </div>
                ) : (
                  <>
                    <div className="mb-3 flex justify-between items-center">
  <div className="text-lg font-bold">
    {p.vrsta_prozora}
  </div>

  <div className="text-lg">
    {t("Količina")}: <strong>{p.kolicina || 1}</strong>
  </div>
</div>

<div className="mb-4 text-sm">
  {t("Vrsta stolarije")}: <strong>{p.vrsta_stolarije}</strong>
</div>

<div className="grid grid-cols-2 gap-4 text-sm">


  {/* 1. POLJE - SLIKA I DIMENZIJE */}
  <div className="rounded p-1">
    {getProzorImageId(p.vrsta_prozora) ? (
      <img
        src={`/prozori/${getProzorImageId(p.vrsta_prozora)}.jpg`}
        className="h-40 object-contain mb-3 mx-auto"
      />
    ) : (
      <div className="border h-40 flex items-center justify-center mb-3">
        {t("Slika prozora")}
      </div>
    )}





<div className="grid grid-cols-2 gap-4 text-sm">
  <div className="rounded p-1">


    <div className="space-y-1 font-semibold">
      {getVisibleDimensions(p.vrsta_prozora).includes("a") && (
        <div>A = {p.a} mm</div>
      )}

      {getVisibleDimensions(p.vrsta_prozora).includes("b") && (
        <div>B = {p.b} mm</div>
      )}

      {getVisibleDimensions(p.vrsta_prozora).includes("c") && (
        <div>C = {p.c} mm</div>
      )}

      {getVisibleDimensions(p.vrsta_prozora).includes("d") && (
        <div>D = {p.d} mm</div>
      )}
    </div>
  </div>




  {/* 2. POLJE - OSTALI PODACI */}
  <div className="rounded p-1">
    <div className="font-bold mb-2">{t("Podaci")}</div>

    <div className="space-y-2">
      <div>{t("Profil")}: <strong>{getProfilName(p.profil)}</strong></div>
      <div>{t("Otvaranje")}: <strong>{p.otvaranje || ""}</strong></div>
      <div>{t("Ispuna")}: {getIspunaName(p.ispuna)}</div>
      <div>{t("Okov")}: {getOkovName(p.okov)}</div>
      <div>{t("Roletna")}: <strong>{p.roletna || ""}</strong></div>

      <div>{t("Vrsta roletne")}: <strong>{p.vrsta_roletne}</strong></div>


      <div>{t("Komarnik")}: <strong>{p.komarnik || ""}</strong></div>
    </div>

  </div>




  </div>
  </div>










  {/* 3. POLJE - ELEMENTI */}
  <div className="rounded p-1">
    <div className="font-bold mb-2">{t("Elementi prozora")}</div>

    <table className="w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-1">{t("Element")}</th>
          <th className="border p-1">{t("Š")}<br />
                  <span className="text-xs">(mm)</span></th>
          <th className="border p-1">{t("V")}<br />
                  <span className="text-xs">(mm)</span></th>
          <th className="border p-1">{t("Kom")}</th>
        </tr>
      </thead>

      <tbody>
        {(worklistResults[index] || [])
          .filter((r: any) => {
            if (r.element === "Ukupna cena" || r.element === "Cena") return false;

            const isAluSpojnica =
              r.element.includes("Spojnica") ||
              r.element.includes("(kom)");

            if (
              isAluSpojnica &&
              String(p.vrsta_stolarije).toUpperCase() !== "ALU"
            ) {
              return false;
            }

            if (r.element === "Roletna" && !p.roletna) return false;
            if (r.element === "Komarnik" && !p.komarnik) return false;
            if (r.element === "Okov" && !p.okov) return false;

            return Number(r.S) > 0 || Number(r.V) > 0 || isAluSpojnica;
          })
          .map((r: any, ri: number) => (
            <tr key={ri}>
              <td className="border p-1 font-semibold">{r.element}</td>

              <td className="border p-1 text-center">
                {Number(r.S) > 0 ? `${Math.round(r.S)} ` : ""}
              </td>

              <td className="border p-1 text-center">
                {Number(r.V) > 0 ? `${Math.round(r.V)} ` : ""}
              </td>

              <td className="border p-1 text-center">
                {(Number(r.kom) || 0) * (Number(p.kolicina) || 1)}
              </td>
            </tr>
          ))}

        <tr>
          <td className="border p-1 font-semibold">{t("Plastika")}</td>
          <td className="border p-1 text-center"></td>
          <td className="border p-1 text-center"></td>
          <td className="border p-1 text-center">{Number(p.kolicina) || 1}</td>
        </tr>

        {(worklistResults[index] || []).length === 0 && (
          <tr>
            <td className="border p-1 text-gray-500" colSpan={4}>
              {t("Nema izračunatih elemenata. Proveri da li su formule sačuvane za ovu vrstu stolarije i prozora.")}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
                  </>
                )}
              </div>
            );
          })}

        {/* DODATNE USLUGE */}
        {worklistExtraItems.filter((x) => x.naziv).length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">
              {t("Dodatne usluge / proizvodi")}
            </h2>

            <table className="w-full border text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">{t("Naziv")}</th>
                  <th className="border p-2">{t("Količina")}</th>
                </tr>
              </thead>

              <tbody>
                {worklistExtraItems
                  .filter((x) => x.naziv)
                  .map((x, i) => (
                    <tr key={i}>
                      <td className="border p-2">{x.naziv}</td>
                      <td className="border p-2">{x.kolicina}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    )}
  </div>
)}









{activeTab === "Slike" && (
  <div className="w-full overflow-x-auto flex justify-center">
    <h1 className="text-3xl font-bold mb-6 flex justify-center"> </h1>
    

    <div className="space-y-4">

      {prozori.map((p: any) => (
        <div
          key={p.id}
          className="flex items-center gap-6 border rounded p-4 bg-white"
        >
          {/* SLIKA */}
          <div className="w-40 h-28 flex items-center justify-center border">
            <img
              src={`/prozori/${p.id}.jpg`}
              alt={p.naziv}
              className="max-h-24 object-contain"
            />
          </div>

          {/* NAZIV */}
          <div className="text-lg font-semibold">
            {p.naziv}
          </div>
        </div>
      ))}

    </div>
  </div>
)}





{activeTab === "Uputstvo" && (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">
      Uputstvo
    </h1>

    <div
      className="bg-white border rounded p-4 prose max-w-none"
      dangerouslySetInnerHTML={{
        __html:
          instructionContent ||
          "<p>Uputstvo još nije uneto.</p>",
      }}
    />
  </div>
)}








{activeTab === "Uputstva" && loggedUser?.role === "ADMIN" && (
  <div className="p-4">

    <div className="flex justify-between mb-4">
      <h2 className="text-2xl font-bold">
        Uputstva
      </h2>

      <button
        onClick={saveHelpTexts}
        className="bg-green-900 text-white px-2 py-1 rounded"
      >
        Sačuvaj
      </button>
    </div>

    <table className="border w-full text-sm">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2 w-[300px]">
            Naziv polja
          </th>

          <th className="border p-2">
            Tekst uputstva
          </th>
        </tr>
      </thead>

      <tbody>
        {[
  ...tabHelpItems.map((x) => ({
    fieldName: `Tab - ${x}`,
    label: `Tab ${x}`,
  })),

  ...tehnickiParametri.map((x) => ({
    fieldName: `Tehnički - ${x}`,
    label: x,
  })),

  ...elementi.map((x) => ({
    fieldName: `Cene - ${x}`,
    label: x,
  })),
].map((item, index) => {
            const found = helpTexts.find(
              (h: any) => h.fieldName === item.fieldName
            );

            return (
              <tr key={index}>
                <td className="border p-2 font-semibold">
                  {item.label}
                </td>

                <td className="border p-2">
                  <textarea
                    className="w-full border p-2 min-h-[70px]"
                    value={found?.text || ""}
                    onChange={(e) => {
                      const value = e.target.value;

                      setHelpTexts((prev: any[]) => {
                        const filtered = prev.filter(
                          (x) =>
                            x.fieldName !== item.fieldName
                        );

                        return [
                          ...filtered,
                          {
                            fieldName: item.fieldName,
                            text: value,
                          },
                        ];
                      });
                    }}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>
)}

















{isAdmin && activeTab === "Administracija" && (
  <div className="p-4">
    <h1 className="text-3xl font-bold mb-4">ADMINISTRACIJA</h1>


<br/>



    <div className="border rounded p-4 bg-white mb-6">
      <h2 className="text-xl font-bold mb-3">Dodaj korisnika</h2>

      <div className="grid grid-cols-5 gap-2">
        <input
          placeholder="Korisničko ime"
          value={newUser.username}
          onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })
          }
          className="border p-2"
        />

        <input
          placeholder="Šifra"
          value={newUser.password}
          onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })
          }
          className="border p-2"
        />

        <select
          value={newUser.role}
          onChange={(e) =>
            setNewUser({ ...newUser, role: e.target.value })
          }
          className="border p-2"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <input
          type="date"
          value={newUser.licenseEnd}
          onChange={(e) =>
            setNewUser({ ...newUser, licenseEnd: e.target.value })
          }
          className="border p-2"
        />

        <input
          type="number"
          placeholder="Broj uređaja"
          value={newUser.maxDevices}
          onChange={(e) =>
            setNewUser({ ...newUser, maxDevices: Number(e.target.value) })
          }
          className="border p-2"
        />
      </div>

      <button
        onClick={createAdminUser}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
      >
        Kreiraj korisnika
      </button>
    </div>

    <div className="max-h-[420px] overflow-y-auto border rounded">
      <h2 className="text-xl font-bold mb-3">Korisnici</h2>

<input
  type="text"
  placeholder="Pretraga korisnika..."
  value={userSearch}
  onChange={(e) => setUserSearch(e.target.value)}
  className="border p-2 rounded mb-3 w-80"
/>

      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-200 sticky top-0 z-10">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Korisničko ime</th>
            <th className="border p-2">Uloga</th>
            <th className="border p-2">Aktivan</th>
            <th className="border p-2">Licenca do</th>
            <th className="border p-2">Uređaja</th>
            <th className="border p-2">Nova šifra</th>
            <th className="border p-2">Uređaji</th>
            <th className="border p-2">Izmena</th>
            <th className="border p-2">Brisanje</th>
          </tr>
        </thead>

        <tbody>
          {filteredAdminUsers.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.username}</td>
              <td className="border p-2">
  <select
    value={u.role}
    onChange={(e) =>
      setAdminUsers(adminUsers.map((x) =>
        x.id === u.id ? { ...x, role: e.target.value } : x
      ))
    }
    className="border p-1"
  >
    <option value="USER">USER</option>
    <option value="ADMIN">ADMIN</option>
  </select>
</td>
              <td className="border p-2 text-center">
  <input
    type="checkbox"
    checked={u.isActive}
    onChange={(e) =>
      setAdminUsers(adminUsers.map((x) =>
        x.id === u.id ? { ...x, isActive: e.target.checked } : x
      ))
    }
  />
</td>
              <td className="border p-2">
  <input
    type="date"
    value={u.licenseEnd ? String(u.licenseEnd).slice(0, 10) : ""}
    onChange={(e) =>
      setAdminUsers(adminUsers.map((x) =>
        x.id === u.id ? { ...x, licenseEnd: e.target.value } : x
      ))
    }
    className="border p-1"
  />
</td>
              <td className="border p-2">
  <input
    type="number"
    value={u.maxDevices}
    onChange={(e) =>
      setAdminUsers(adminUsers.map((x) =>
        x.id === u.id ? { ...x, maxDevices: Number(e.target.value) } : x
      ))
    }
    className="border p-1 w-20"
  />
</td>
              <td className="border p-2">
  <input
    type="password"
    placeholder="Nova šifra"
    value={adminPasswords[u.id] || ""}
    onChange={(e) =>
      setAdminPasswords({
        ...adminPasswords,
        [u.id]: e.target.value,
      })
    }
    className="border p-1"
  />

  <button
    onClick={() => adminChangeUserPassword(u.id)}
    className="bg-blue-900 text-white px-2 py-1 rounded ml-2"
  >
    Sačuvaj
  </button>
</td>


<td className="border p-2 text-center">
  <button
    onClick={() => loadUserDevices(u)}
    className="bg-gray-700 text-white px-2 py-1 rounded"
  >
    Uređaji
  </button>
</td>


<td className="border p-2 text-center">
  <button
    onClick={() => updateAdminUser(u)}
    className="bg-blue-900 text-white px-2 py-1 rounded"
  >
    Sačuvaj
  </button>
</td>


<td className="border p-2 text-center">
  <button
    onClick={() => deleteAdminUser(u.id)}
    className="bg-red-600 text-white px-2 py-1 rounded"
  >
    Obriši
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
  onClick={() => {
    setShowArchivedUsers(!showArchivedUsers);
    loadArchivedUsers();
  }}
  className="bg-gray-700 text-white px-4 py-2 rounded mt-4"
>
  {showArchivedUsers ? "Sakrij arhivirane korisnike" : "Prikaži arhivirane korisnike"}
</button>

{showArchivedUsers && (
  <div className="border rounded p-4 bg-white mt-4">
    <h2 className="text-xl font-bold mb-3">Arhivirani korisnici</h2>

    <div className="max-h-[420px] overflow-y-auto border rounded">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-200 sticky top-0 z-10">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Korisnik</th>
            <th className="border p-2">Uloga</th>
            <th className="border p-2">Licenca do</th>
            <th className="border p-2">Vrati</th>
          </tr>
        </thead>

        <tbody>
          {archivedUsers.map((u: any) => (
            <tr key={u.id}>
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.username}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">
                {u.licenseEnd ? formatDate(u.licenseEnd) : ""}
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => restoreUser(u.id)}
                  className="bg-green-700 text-white px-3 py-1 rounded"
                >
                  Vrati
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}



    </div>

    {selectedAdminUser && (
  <div className="border rounded p-4 bg-white mt-6">
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-xl font-bold">
        Uređaji korisnika: {selectedAdminUser.username}
      </h2>

      <button
        onClick={deleteAllDevices}
        className="bg-red-600 text-white px-3 py-1 rounded"
      >
        Obriši sve uređaje
      </button>
    </div>

    {adminDevices.length === 0 ? (
      <div className="text-gray-500">
        Korisnik još nema registrovanih uređaja.
      </div>
    ) : (
      <table className="w-full text-sm border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Fingerprint</th>
            <th className="border p-2">Datum</th>
            <th className="border p-2">Brisanje</th>
          </tr>
        </thead>

        <tbody>
          {adminDevices.map((d) => (
            <tr key={d.id}>
              <td className="border p-2">{d.id}</td>
              <td className="border p-2 text-xs break-all">{d.fingerprint}</td>
              <td className="border p-2">{formatDate(d.createdAt)}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => deleteDevice(d.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Obriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)}

<br />

<div className="max-h-[420px] overflow-y-auto border rounded">
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-xl font-bold">Audit log</h2>

    <button
      onClick={loadAuditLogs}
      className="bg-gray-700 text-white px-4 py-2 rounded"
    >
      Osveži logove
    </button>
  </div>

<input
  type="text"
  placeholder="Pretraga logova..."
  value={auditSearch}
  onChange={(e) => setAuditSearch(e.target.value)}
  className="border p-2 rounded mb-3 w-80"
/>

  <table className="w-full text-sm border-collapse">
    <thead className="bg-gray-200 sticky top-0 z-10">
      <tr>
        <th className="border p-2">Datum</th>
        <th className="border p-2">Korisnik</th>
        <th className="border p-2">Akcija</th>
        <th className="border p-2">Detalji</th>
      </tr>
    </thead>

    <tbody>
      {filteredAuditLogs.map((a) => (
        <tr key={a.id}>
          <td className="border p-2">
            {formatDate(a.createdAt)}
          </td>

          <td className="border p-2">
            {a.username}
          </td>

          <td className="border p-2">
            {a.action}
          </td>

          <td className="border p-2">
            {a.details}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


<br /><br /><br />

<div className="border rounded p-4 bg-white mb-6">
    <button
  onClick={createManualBackup}
  className="bg-green-700 text-white px-4 py-2 rounded"
>
  Napravi backup
</button>




<button
  onClick={loadBackups}
  className="bg-gray-700 text-white px-4 py-2 rounded ml-2"
>
  Osveži backup listu
</button>
</div>


<div className="max-h-[420px] overflow-y-auto border rounded">
  <h2 className="text-xl font-bold mb-3">Backup fajlovi</h2>

  <table className="w-full text-sm border-collapse">
    <thead className="bg-gray-200 sticky top-0 z-10">
      <tr>
        <th className="border p-2">Naziv fajla</th>
        <th className="border p-2">Datum</th>
        <th className="border p-2">Veličina</th>
        <th className="border p-2">Preuzmi</th>
        <th className="border p-2">Restore</th>
        <th className="border p-2">Brisanje</th>
      </tr>
    </thead>

    <tbody>
      {backupFiles.map((b) => (
        <tr key={b.fileName}>
          <td className="border p-2">{b.fileName}</td>
          <td className="border p-2">{formatDate(b.createdAt)}</td>
          <td className="border p-2">
            {(Number(b.size) / 1024 / 1024).toFixed(2)} MB
          </td>
          <td className="border p-2 text-center">
  <button
  onClick={() => downloadBackupFile(b.fileName)}
  className="bg-blue-600 text-white px-3 py-1 rounded"
>
  Preuzmi
</button>
</td>
<td className="border p-2 text-center">
  <button
    onClick={() => restoreBackupFile(b.fileName)}
    className="bg-orange-600 text-white px-3 py-1 rounded"
  >
    Restore
  </button>
</td>
<td className="border p-2 text-center">
  <button
    onClick={() => deleteBackupFile(b.fileName)}
    className="bg-red-600 text-white px-3 py-1 rounded"
  >
    Obriši
  </button>
</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>





<div className="border rounded p-4 bg-white mt-6">
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-xl font-bold">Sve ponude korisnika</h2>

    <button
      onClick={loadAdminOffers}
      className="bg-gray-700 text-white px-4 py-2 rounded"
    >
      Osveži ponude
    </button>
  </div>

  <input
    type="text"
    placeholder={t("Pretraga ponuda...")}
    value={adminOfferSearch}
    onChange={(e) => setAdminOfferSearch(e.target.value)}
    className="border p-2 rounded mb-3 w-80"
  />

  <div className="max-h-[420px] overflow-y-auto border rounded">
    <table className="w-full text-sm border-collapse">
      <thead className="bg-gray-200 sticky top-0 z-10">
        <tr>
          <th className="border p-2">Red. br.</th>
          <th className="border p-2">Korisnik</th>
          <th className="border p-2">Naziv</th>
          <th className="border p-2">Adresa</th>
          <th className="border p-2">Telefon</th>
          <th className="border p-2">PIB</th>
          <th className="border p-2">Datum</th>
        </tr>
      </thead>

      <tbody>
        {filteredAdminOffers.map((o: any) => (
          <tr key={o.id}>
            <td className="border p-2">{o.brojPonude || o.id}</td>
            <td className="border p-2">{o.user?.username || ""}</td>
            <td className="border p-2">{o.naziv}</td>
            <td className="border p-2">{o.adresa}</td>
            <td className="border p-2">{o.telefon}</td>
            <td className="border p-2">{o.pib}</td>
            <td className="border p-2">{formatDate(o.datum)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>




  </div>
)}








{activeTab === "Parametri" && (
  <div className="p-4">

    <div className="sticky top-[130px] z-[998] bg-white border-b py-1 mb-2">
      <ParamTabs
        active={paramTab}
        setActive={setParamTab}
        isAdmin={isAdmin}
      />
    </div>

 



    {paramTab === "Firma" && (
      

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

  {/* LEVA KOLONA */}
  <div className="grid grid-cols-1 gap-4">


    

    <input placeholder={t("Naziv")}
      value={firma.naziv || ""}
      onChange={e => setFirma({ ...firma, naziv: e.target.value })}
      className="border p-2"
    />

    <input placeholder={t("Adresa")}
      value={firma.adresa || ""}
      onChange={e => setFirma({ ...firma, adresa: e.target.value })}
      className="border p-2"
    />

    <input placeholder={t("Email")}
      value={firma.email || ""}
      onChange={e => setFirma({ ...firma, email: e.target.value })}
      className="border p-2"
    />

    <input placeholder={t("TR")}
      value={firma.tr || ""}
      onChange={e => setFirma({ ...firma, tr: e.target.value })}
      className="border p-2"
    />

  </div>





  {/* DESNA KOLONA */}
  <div className="grid grid-cols-1 gap-4">

    <div className="grid grid-cols-3 gap-4">


    <input placeholder={t("PIB")}
      value={firma.pib || ""}
      onChange={e => setFirma({ ...firma, pib: e.target.value })}
      className="border p-2"
    />

    <input placeholder={t("Matični broj")}
      value={firma.maticni || ""}
      onChange={e => setFirma({ ...firma, maticni: e.target.value })}
      className="border p-2"
    />

    <input placeholder={t("Telefon")}
      value={firma.telefon || ""}
      onChange={e => setFirma({ ...firma, telefon: e.target.value })}
      className="border p-2"
    />
 </div>

    <div className="grid grid-cols-3 gap-4">



    <input placeholder={t("Zarada %")}
      value={firma.zarada || ""}
      onChange={e => setFirma({ ...firma, zarada: e.target.value })}
      className="border p-2"
    />

    <input placeholder={t("PDV %")}
      value={firma.pdv || ""}
      onChange={e => setFirma({ ...firma, pdv: e.target.value })}
      className="border p-2"
    />

<input placeholder={t("Valuta plaćanja (dana)")}
  value={firma.valuta_placanja || ""}
  onChange={e => setFirma({ ...firma, valuta_placanja: e.target.value })}
  className="border p-2"
/>

 </div>

    <div className="grid grid-cols-3 gap-4">


    <input placeholder={t("Otpad %")}
  value={firma.otpad || ""}
  onChange={e => setFirma({ ...firma, otpad: e.target.value })}
  className="border p-2"
/>

<input placeholder={t("Roletna %")}
  value={firma.roletna || ""}
  onChange={e => setFirma({ ...firma, roletna: e.target.value })}
  className="border p-2"
/>

<input placeholder={t("Komarnik %")}
  value={firma.komarnik || ""}
  onChange={e => setFirma({ ...firma, komarnik: e.target.value })}
  className="border p-2"
/>

 </div>


<br />



  </div>







      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

<div className="col-span-3 border rounded p-3">
  <label className="font-semibold block mb-2">
    {t("Logo firme / slika do 2MB")}
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleLogoUpload}
    className="border p-2 w-full"
  />

  {(logoPreview || firma.logo) && (
    <div className="mt-3 border w-48 h-28 flex items-center justify-center bg-white">
      <img
        src={logoPreview || firma.logo}
        alt="Logo"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  )}
</div>
</div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

<div className="col-span-3 border rounded p-4 mt-4">
  <h2 className="font-bold mb-3">{t("Promena šifre")}</h2>

  <input
    type="password"
    placeholder={t("Stara šifra")}
    value={passwordForm.oldPassword}
    onChange={(e) =>
      setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
    }
    className="border p-2 mr-2"
  />

  <input
    type="password"
    placeholder={t("Nova šifra")}
    value={passwordForm.newPassword}
    onChange={(e) =>
      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
    }
    className="border p-2 mr-2"
  />

  <button
    onClick={changeMyPassword}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    {t("Promeni šifru")}
  </button>
</div>


  </div>





  </div>







)}





{paramTab === "Profil" && (
  <div className="p-4 flex justify-center">
    <table className="border text-sm table-fixed w-auto max-w-full">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">{t("Naziv profila")}</th>
        </tr>
      </thead>

      <tbody>
        {profili.map((p: any, i: number) => (
          <tr key={p.id}>
            <td className="border p-2">
              <input
                className="w-full p-1 border"
                value={p.naziv}
                onChange={(e) => {
                  const copy = [...profili];
                  copy[i].naziv = e.target.value;
                  setProfili(copy);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    
  </div>
)}








{paramTab === "Ispuna" && (
  <div className="flex justify-center">

    <table className="border text-sm table-fixed w-auto max-w-full">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2 min-w-[260px]">{t("Naziv")}</th>
          <th className="border p-2 w-[140px]">{t("Cena")}</th>
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: 15 }).map((_, i) => {
          const item = ispune[i] || { naziv: `Ispuna ${i + 1}`, cena: "" };

          return (
            <tr key={i}>
              <td className="border p-2">
                <input
                  className="border p-2 w-full"
                  value={item.naziv || ""}
                  onChange={e => {
                    const copy = [...ispune];
                    copy[i] = { ...item, naziv: e.target.value };
                    setIspune(copy);
                  }}
                />
              </td>

              <td className="border p-2">
                <input
                  type="number"
                  value={item.cena || ""}
                  onChange={e => {
                    const copy = [...ispune];
                    copy[i] = {
                      ...item,
                      cena: e.target.value === "" ? "" : Number(e.target.value)
                    };
                    setIspune(copy);
                  }}
                  className="w-full border p-1"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    {/* 🔥 DUGME MORA OVDE */}
    

  </div>
)}









{paramTab === "Okov" && (
  <div className="p-4 flex justify-center">

    <table className="border text-sm table-fixed w-auto max-w-full">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2 min-w-[260px]">{t("Naziv")}</th>
          <th className="border p-2 w-[140px]">{t("Cena")}</th>
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: 15 }).map((_, i) => {
          const item = okovi[i] || {
            naziv: `Okov ${i + 1}`,
            cena: ""
          };

          return (
            <tr key={i}>
              <td className="border p-2">
                <input
                  className="border w-full p-1"
                  value={item.naziv || ""}
                  onChange={(e) => {
                    const copy = [...okovi];
                    copy[i] = { ...item, naziv: e.target.value };
                    setOkovi(copy);
                  }}
                />
              </td>

              <td className="border p-2">
                <input
                  type="number"
                  className="border w-full p-1"
                  value={item.cena || ""}
                  onChange={(e) => {
                    const copy = [...okovi];
                    copy[i] = {
                      ...item,
                      cena: e.target.value === "" ? "" : Number(e.target.value)
                    };
                    setOkovi(copy);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    

  </div>
)}








{paramTab === "Roletna" && (
  <div className="p-4 flex justify-center">
    <table className="border text-sm w-full max-w-[520px]">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">{t("Naziv")}</th>
          <th className="border p-2 w-[140px]">{t("Cena")}</th>
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: 15 }).map((_, i) => {
          const item = roletne[i] || {
            naziv: `Roletna ${i + 1}`,
            cena: 0,
          };

          return (
            <tr key={i}>
              <td className="border p-2">
                <input
                  className="border w-full p-1"
                  value={item.naziv || ""}
                  onChange={(e) => {
                    const copy = [...roletne];
                    copy[i] = {
                      ...item,
                      naziv: e.target.value,
                    };
                    setRoletne(copy);
                  }}
                />
              </td>

              <td className="border p-2">
                <input
                  type="number"
                  className="border w-full p-1 text-right"
                  value={item.cena || ""}
                  onChange={(e) => {
                    const copy = [...roletne];
                    copy[i] = {
                      ...item,
                      cena:
                        e.target.value === ""
                          ? ""
                          : Number(e.target.value),
                    };
                    setRoletne(copy);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
)}

{paramTab === "Komarnik" && (
  <div className="p-4 flex justify-center">
    <table className="border text-sm w-full max-w-[520px]">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">{t("Naziv")}</th>
          <th className="border p-2 w-[140px]">{t("Cena")}</th>
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: 15 }).map((_, i) => {
          const item = komarnici[i] || {
            naziv: `Komarnik ${i + 1}`,
            cena: 0,
          };

          return (
            <tr key={i}>
              <td className="border p-2">
                <input
                  className="border w-full p-1"
                  value={item.naziv || ""}
                  onChange={(e) => {
                    const copy = [...komarnici];
                    copy[i] = {
                      ...item,
                      naziv: e.target.value,
                    };
                    setKomarnici(copy);
                  }}
                />
              </td>

              <td className="border p-2">
                <input
                  type="number"
                  className="border w-full p-1 text-right"
                  value={item.cena || ""}
                  onChange={(e) => {
                    const copy = [...komarnici];
                    copy[i] = {
                      ...item,
                      cena:
                        e.target.value === ""
                          ? ""
                          : Number(e.target.value),
                    };
                    setKomarnici(copy);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
)}











{paramTab === "Valuta" && (
  <div className="w-full overflow-x-auto flex justify-center">

    <table className="border text-sm table-fixed w-auto max-w-full">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">{t("Naziv valute")}</th>
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: 5 }).map((_, i) => {
          const item = valute[i] || {
            naziv:
              i === 0 ? "RSD" :
              i === 1 ? "EUR" :
              `Valuta ${i + 1}`
          };

          return (
            <tr key={i}>
              <td className="border p-2">
                <input
                  className="w-full p-1 border"
                  value={item.naziv || ""}
                  onChange={(e) => {
  setValute((prev: any[]) => {
    const copy = [...(prev || [])];

    copy[i] = {
      ...(copy[i] || { id: i + 1 }),
      id: copy[i]?.id ?? i + 1,
      naziv: e.target.value
    };

    return copy;
  });
}}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    




  </div>
)}


















{paramTab === "Tehnicki" && (
  <div className="w-full overflow-x-auto">
    <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3 flex justify-center">
      

      <select
        value={selectedProfilId}
onChange={(e) => setSelectedProfilId(e.target.value)}
        className="border p-2 rounded w-full max-w-sm"
      >
        <option value="">{t("Izaberi profil")}</option>
        {profili.map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.naziv}
          </option>
        ))}
      </select>
    </div>
<div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3 flex justify-center">
    <table className="border text-sm w-auto max-w-full">
      <thead className="bg-gray-200">
        <tr>
<th className="border p-2 w-[75%]">{t("Parametar")}</th>
<th className="border p-2 w-[25%]">{t("Vrednost")}</th>
        </tr>
      </thead>

      <tbody>
        {tehnickiParametri.map((el) => {
          const found = Array.isArray(tehnickiData)
            ? tehnickiData.find(
                (t: any) =>
                  t.element === el &&
                  String(t.profil) === String(selectedProfilId)
              )
            : null;

          return (
            <tr key={el}>
              <td className="border p-2 font-semibold relative break-words pr-7">
                {el}

                <button
                  type="button"
                  onClick={() => alert(getHelpText(`Tehnički - ${el}`))}
                  className="absolute top-1 right-1 text-[10px] bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ?
                </button>
              </td>

              <td className="border p-2">
                {formulaParametri.includes(el) ? (
                  <div className="w-full p-2 text-center font-semibold bg-gray-100">
                    {izracunajTehnicki(el, selectedProfilId)}
                  </div>
                ) : (
                  <input
                    type="number"
                    className="w-[120px] p-1 border text-sm text-right"
                    value={found?.vrednost ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;

                      setTehnickiData((prev: any[]) => {
                        const filtered = Array.isArray(prev)
                          ? prev.filter(
                              (t) =>
                                !(
                                  t.element === el &&
                                  String(t.profil) === String(selectedProfilId)
                                )
                            )
                          : [];

                        return [
                          ...filtered,
                          {
                            element: el,
                            profil: String(selectedProfilId),
                            vrednost: value,
                          },
                        ];
                      });
                    }}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
   </div>
)}






{paramTab === "Cene" && (
  <div className="w-full overflow-x-auto">
    <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3  flex justify-center">
      

      <select
        value={selectedProfilId}
onChange={(e) => setSelectedProfilId(e.target.value)}
        className="border p-2 rounded w-full max-w-sm"
      >
<option value="">{t("Izaberi profil")}</option>
        {profili.map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.naziv}
          </option>
        ))}
      </select>
    </div>
<div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3 flex justify-center">
 
    <table className="border text-sm w-auto max-w-full">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2 w-[75%]">{t("Element")}</th>
          <th className="border p-2 w-[25%]">{t("Cena")}</th>
        </tr>
      </thead>

      <tbody>
        {elementi.map((el) => {
          const found = Array.isArray(profilePrices)
            ? profilePrices.find(
                (p: any) =>
                  p.element === el &&
                  String(p.profil) === String(selectedProfilId)
              )
            : null;

          return (
            <tr key={el}>
              <td className="border p-2 font-semibold relative pr-7">
                {el}

                <button
                  type="button"
                  onClick={() => alert(getHelpText(`Cene - ${el}`))}
                  className="absolute top-1 right-1 text-[10px] bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ?
                </button>
              </td>

              <td className="border p-2">
                <input
                  type="number"
                  className="w-[120px] p-1 border text-sm text-right"
                  value={found?.cena ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;

                    setProfilePrices((prev: any[]) => {
                      const filtered = Array.isArray(prev)
                        ? prev.filter(
                            (p) =>
                              !(
                                p.element === el &&
                                String(p.profil) === String(selectedProfilId)
                              )
                          )
                        : [];

                      return [
                        ...filtered,
                        {
                          element: el,
                          profil: String(selectedProfilId),
                          cena: value,
                        },
                      ];
                    });
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
   </div>
)}











{paramTab === "Reklame" && (
  <div className="p-4 flex justify-center">
    <table className="border text-sm">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">Naziv</th>
          <th className="border p-2">Tekst</th>
<th className="border p-2">Link</th>
<th className="border p-2">Slika / GIF</th>
<th className="border p-2">Preporučeno</th>
<th className="border p-2">Klikovi</th>
        </tr>
      </thead>

      <tbody>
        {[
          {
            key: "leftBanner",
            label: "Levi baner",
            size: "400 × 1200 px",
          },
          {
            key: "rightBanner",
            label: "Desni baner",
            size: "400 × 1200 px",
          },
          {
            key: "mobileBanner",
            label: "Mobilni baner",
            size: "1200 × 150 px",
          },
        ].map((cfg) => (
          <tr key={cfg.key}>
            <td className="border p-2 font-semibold">
              {cfg.label}
            </td>

            <td className="border p-2">
              <input
                className="border p-1 w-[150px] text-sm"
                value={getAdValue(cfg.key)}
                onChange={(e) => {
                  setAdValue(cfg.key, e.target.value);
                }}
              />
            </td>

            <td className="border p-2">
  <input
    className="border p-2 w-[250px]"
    placeholder="https://..."
    value={getAdValue(`${cfg.key}Link`)}
    onChange={(e)=>{
      setAdValue(
        `${cfg.key}Link`,
        e.target.value
      );
    }}
  />
</td>

            <td className="border p-2">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.gif,.mp4,.webm"
                onChange={async (e) => {
                  if (!e.target.files?.length) return;

                  const formData = new FormData();
                  formData.append("file", e.target.files[0]);

                  const res = await apiFetch(
                    `${API_URL}/ads/upload`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                      body: formData,
                    }
                  );

                  const data = await res.json();

                  if (!res.ok) {
                    alert("Upload slike nije uspeo");
                    return;
                  }

                  setAdValue(`${cfg.key}Image`, data.path);
                }}
              />

              {getAdValue(`${cfg.key}Image`) && (
                <div className="mt-2">
                  <img
                    src={`${API_URL}${getAdValue(
                      `${cfg.key}Image`
                    )}`}
                    className="w-[50px] border"
                    alt=""
                  />
                </div>
              )}
            </td>

            <td className="border p-2 text-xs">
              {cfg.size}
            </td>

<td className="border p-2 text-center">

  <button
    onClick={() => resetAdClicks(cfg.key)}
    className="bg-red-500 text-white text-[10px] px-2 py-[2px] rounded mb-1"
  >
    Reset
  </button>

  <div className="font-bold">
    {getAdClicks(cfg.key)}
  </div>

</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}







{paramTab === "Uređivanje uputstva" && isAdmin && (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">
      Uređivanje uputstva
    </h2>

    <RichTextEditor
  content={instructionContent}
  onChange={setInstructionContent}
  apiUrl={API_URL}
  token={typeof window !== "undefined" ? localStorage.getItem("token") : null}
/>

    <button
      onClick={saveInstruction}
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
    >
      Sačuvaj uputstvo
    </button>

    <h3 className="text-xl font-bold mt-6 mb-2">
      Pregled
    </h3>

    <div
      className="bg-white border rounded p-4"
      dangerouslySetInnerHTML={{
        __html:
          instructionContent ||
          "<p>Uputstvo još nije uneto.</p>",
      }}
    />
  </div>
)}






{paramTab === "Prevodi" && isAdmin && (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Prevodi</h2>

    <div className="mb-4 flex gap-2 flex-wrap">
      <button
        onClick={() =>
          setLanguages([
            ...languages,
            {
              code: `LANG${languages.length + 1}`,
              name: `Jezik ${languages.length + 1}`,
              enabled: false,
              sortOrder: languages.length + 1,
            },
          ])
        }
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Dodaj jezik
      </button>

      <button
        onClick={saveLanguages}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Sačuvaj jezike
      </button>

      <button
        onClick={saveTranslations}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Sačuvaj prevode
      </button>
    </div>

    <div className="overflow-x-auto border">
      <table className="border-collapse text-sm min-w-[900px]">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2 min-w-[220px]">Tekst na sajtu</th>

            {languages.map((lang, index) => (
              <th key={index} className="border p-2 min-w-[180px]">
                <input
                  className="border p-1 w-full mb-1"
                  value={lang.name || ""}
                  onChange={(e) => {
                    const copy = [...languages];
                    copy[index] = {
                      ...copy[index],
                      name: e.target.value,
                      code: e.target.value,
                    };
                    setLanguages(copy);
                  }}
                />

                <label className="flex items-center gap-1 justify-center text-xs">
                  <input
                    type="checkbox"
                    checked={!!lang.enabled}
                    onChange={(e) => {
                      const copy = [...languages];
                      copy[index] = {
                        ...copy[index],
                        enabled: e.target.checked,
                      };
                      setLanguages(copy);
                    }}
                  />
                  prikaži
                </label>
              </th>
            ))}
          </tr>
        </thead>
<tbody>
{[
  {
    title: "Glavni tabovi",
    items: [
      "Forma",
      "Ponude",
      "Radna lista",
      "Slike",
      "Uputstvo",
      "Parametri",
      "Uputstva",
      "Administracija",
    ],
  },
  {
    title: "Login",
    items: [
      "Korisničko ime",
      "Šifra",
      "Prijavi se",
      "Odjavi se",
      "Prikaži šifru",
      "Instaliraj App",
      "Pogrešno korisničko ime ili šifra",
      "Backend nije dostupan",
      "Sesija je istekla. Prijavite se ponovo.",
      "Licenca ističe za",
      " dana. Kontaktirajte administratora za obnovu.",
      "Promena šifre",
    ],
  },
  {
    title: "Forma - podaci o kupcu",
    items: [
      "Broj ponude",
      "Br",
      "ID",
      "Kupac",
      "Adresa",
      "Telefon",
      "PIB",
      "Matični",
      "Matični broj",
      "Datum",
      "Vrsta ponude",
      "Izaberi valutu",
      "Popust",
      "Popust %",
      "Napomena",
      "Sačuvaj",
      "Obriši formu",
      "Pretraga ponuda...",
      "Red. br.",
      "Kol.",
      "UKUPNO",
      "Za uplatu",
    ],
  },
  {
    title: "Forma - pozicije",
    items: [
      "Pozicije",
      "Pozicija",
      "Dodaj poziciju",
      "Obriši poziciju",
      "Vrsta stolarije",
      "Vrsta prozora",
      "Slika prozora",
      "Dimenzije",
      "Podaci",
      "A - širina",
      "B - visina",
      "C",
      "D",
      "Izaberi ispunu",
      "Izaberi okov",
      "Otvaranje",
      "Roletna",
      "Komarnik",
      "Količina",
      "Ukupna cena",
      "Maksimalan broj pozicija je 50",
      "Mora postojati bar jedna pozicija",
      "Nema izračunatih elemenata. Proveri da li su formule sačuvane za ovu vrstu stolarije i prozora.",
    ],
  },
  {
    title: "Vrste ponude i opcije",
    items: [
      "RAČUN",
      "PREDRAČUN",
      "PVC",
      "ALU",
      "LEVO",
      "DESNO",
      "NADPROZORSKA",
      "SPOLJNA",
      "DA",
      "Izaberi ponudu iz tabele da se prikaže ponuda.",
      "Datum ponude",
      "Naziv valute",
    ],
  },
  {
    title: "Vrste prozora",
    items: [
      "Fiksni prozor",
      "Jednokrilni prozor",
      "Dvokrilni prozor (šloga)",
      "Dvokrilni prozor (T-prečka)",
      "Prozor + fiks",
      "Trokrilni prozor (šloga)",
      "Trokrilni prozor (T-prečka)",
      "Trokrilni prozor (2 fiksa) A",
      "Trokrilni prozor (fiks + T-prečka) A",
      "Trokrilni prozor (fiks + šloga) A",
      "Trokrilni prozor (2 fiksa)",
      "Trokrilni prozor (fiks + T-prečka)",
      "Trokrilni prozor (fiks + šloga)",
      "Jednokrilni prozor (nadsvetlo)",
      "Prozor + fiks (nadsvetlo)",
      "Dvokrilni prozor (šloga, nadsvetlo)",
      "Dvokrilni prozor (T-prečka, nadsvetlo)",
      "Jednokrilni prozor (nadsvetlo-kip)",
      "Prozor + fiks (nadsvetlo-kip)",
      "Dvokrilni prozor (šloga, nadsvetlo-kip)",
      "Dvokrilni prozor (T-prečka, nadsvetlo-kip)",
      "Standardni",
      "Nadsvetlo",
      "Nadsvetlo kip",
    ],
  },
  {
    title: "Parametri - tabovi",
    items: [
      "Firma",
      "Profil",
      "Ispuna",
      "Okov",
      "Valuta",
      "Tehnicki",
      "Tehnički",
      "Cene",
      "Formule",
      "Reklame",
      "Uređivanje uputstva",
      "Prevodi",
      "Slika",
    ],
  },
  {
    title: "Firma",
    items: [
      "Logo",
      "TR",
      "Email",
      "PDV %",
      "Otpad %",
      "Zarada %",
      "Roletna %",
      "Komarnik %",
      "Valuta plaćanja (dana)",
      "Sačuvaj firmu",
      "Sačuvano",
      "Greška pri čuvanju firme",
      "Valuta plaćanja",
      "dana",
      "Bris.",
    ],
  },
  {
    title: "Profili / Ispune / Okovi / Valute",
    items: [
      "Naziv",
      "Naziv profila",
      "Cena",
      "Profil 1",
      "Ispuna 1",
      "Okov 1",
      "Valuta 1",
      "Sačuvaj profile",
      "Sačuvaj ispune",
      "Sačuvaj okov",
      "Sačuvaj valute",
      "Profili su sačuvani",
      "Ispune sačuvane",
      "Okovi sačuvani",
      "Valute sačuvane",
      "Roletna",
      "Vrsta roletne",
      "Komarnik",
      "Sačuvaj roletne",
      "Sačuvaj komarnike",
      "Roletne sačuvane",
      "Komarnici sačuvani",
    ],
  },
  {
    title: "Tehnički parametri",
    items: [
      "Izaberi profil",
      "Parametar",
      "Vrednost",
      "Sačuvaj tehničke",
      "Tehnički parametri su sačuvani",
      "Var profila",
      "Širina profila Štok",
      "Širina profila krilo",
      "Širina profila T prečka",
      "Zazor za staklo",
      "Preklop kod krila",
      "Preklop kod šloge",
      "Čepovi šloge",
      "Skraćenje čelika za štok",
      "Skraćenje čelika za krilo",
      "Visina kutije nadprozorske roletne",
    ],
  },
  {
    title: "Cene - elementi",
    items: [
      "Element",
      "ŠTOK",
      "KRILO",
      "T prečka",
      "ŠLOGA",
      "ČELIK",
      "LAJSNA",
      "PLASTIKA",
      "ROLETNA",
      "KOMARNIK",
      "ALU Spojnica Štok 1",
      "ALU Spojnica Štok 2",
      "ALU Spojnica Štok 3",
      "ALU Spojnica Štok 4",
      "ALU Spojnica T 1",
      "ALU Spojnica T 2",
      "ALU Spojnica T 3",
      "ALU Spojnica Krilo 1",
      "ALU Spojnica Krilo 2",
      "ALU Spojnica Krilo 3",
      "ALU Spojnica Krilo 4",
      "Sačuvaj cene",
      "Cene su sačuvane",
    ],
  },
  {
    title: "Formule",
    items: [
      "Š",
      "V",
      "Kom",
      "Preview",
      "Sačuvaj formule",
      "Izaberi vrstu stolarije i vrstu prozora",
      "Greška pri čuvanju formula",
      "Neuspešno čuvanje formula",
      "Neuspešno učitavanje formula",
      "Štok",
      "Čelik za štok",
      "Lajsna za štok",
      "Ispuna za štok",
      "Krilo 1",
      "Čelik za krilo 1",
      "Lajsna za krilo 1",
      "Ispuna za krilo 1",
      "Krilo 2",
      "Čelik za krilo 2",
      "Lajsna za krilo 2",
      "Ispuna za krilo 2",
      "T-prečka 1",
      "Čelik za T-prečku 1",
      "T-prečka 2",
      "Čelik za T-prečku 2",
      "Lajsna za nadsvetlo",
      "Ispuna za nadsvetlo",
      "Šloga",
    ],
  },
  {
    title: "Ponude / Radna lista",
    items: [
      "PONUDA",
      "Radni nalog",
      "Ponuda",
      "Dokument",
      "Sačuvaj u PDF-u",
      "Nema ponude za ovaj ID",
      "Izmenjeno!",
      "Sačuvano:",
      "Morate uneti naziv kupca.",
      "Morate izabrati vrstu ponude.",
      "Promenjena je vrsta ponude. Biće kreiran novi dokument sa novim brojem.",
      "Izaberi ponudu iz tabele da se prikaže radna lista.",
      "Pozicija nije kompletna. Nedostaje",
      "Logo firme / slika do 2MB",
      "Sva prava zadržana",
    ],
  },
  {
    title: "Dodatne stavke",
    items: [
      "Dodatne usluge / proizvodi",
      "Dodaj stavku",
      "Maksimalan broj dodatnih usluga/proizvoda je 30",
    ],
  },
  {
    title: "Reklame",
    items: [
      "Levi baner",
      "Desni baner",
      "Mobilni baner",
      "Vaš baner ovde",
      "Tekst",
      "Link",
      "Slika / GIF",
      "Preporučeno",
      "Klikovi",
      "Reset",
      "Sačuvaj reklame",
      "Reklame sačuvane",
    ],
  },
  {
    title: "Uputstvo",
    items: [
      "Uputstvo",
      "Uputstvo još nije uneto.",
      "Uređivanje uputstva",
      "Sačuvaj uputstvo",
      "Uputstvo je sačuvano",
      "Greška pri čuvanju uputstva",
      "Greška pri učitavanju uputstva",
      "Upload slike",
      "Upload video",
      "Upload slike nije uspeo",
      "Upload video zapisa nije uspeo",
      "YouTube",
      "Unesi YouTube link",
      "Neispravan YouTube link",
    ],
  },
  {
    title: "Administracija - korisnici",
    items: [
      "Korisnik",
      "Korisnici",
      "Novi korisnik",
      "Uloga",
      "Licenca",
      "Broj uređaja",
      "Kreiraj korisnika",
      "Obriši korisnika",
      "Vrati korisnika",
      "Korisnik je kreiran",
      "Korisnik je izmenjen",
      "Korisnik je obrisan",
      "Korisnik je vraćen",
      "Korisnik nije prijavljen",
      "Da li sigurno želite da obrišete korisnika?",
      "Prikaži arhivirane korisnike",
      "Sakrij arhivirane korisnike",
      "Unesite korisničko ime",
      "Unesite novu šifru",
      "USER",
      "ADMIN",
    ],
  },
  {
    title: "Administracija - šifre i uređaji",
    items: [
      "Stara šifra",
      "Nova šifra",
      "Promeni šifru",
      "Šifra je promenjena",
      "Greška pri promeni šifre",
      "Unesite staru i novu šifru",
      "Uređaji",
      "Obriši uređaj",
      "Obriši sve uređaje",
      "Da li sigurno želite da obrišete sve uređaje za ovog korisnika?",
      "Uputstvo nije definisano",
    ],
  },
  {
    title: "Backup",
    items: [
      "Backup",
      "Napravi backup",
      "Backup napravljen:",
      "Backup nije napravljen",
      "Backup je obrisan",
      "Restore",
      "Restore nije uspeo",
      "Sigurnosni backup pre restore-a:",
      "Niste prijavljeni ili download nije uspeo",
      "Da li sigurno želite da obrišete backup?",
    ],
  },
  {
    title: "Prevodi",
    items: [
      "Prevodi",
      "Dodaj jezik",
      "Sačuvaj jezike",
      "Sačuvaj prevode",
      "Jezici su sačuvani",
      "Prevodi su sačuvani",
      "Tekst na sajtu",
      "prikaži",
      "Glavni tabovi",
      "Login",
      "Forma - podaci o kupcu",
      "Forma - pozicije",
      "Parametri - tabovi",
    ],
  },
].map((group) => (
    <React.Fragment key={group.title}>
      <tr>
        <td
          colSpan={languages.length + 1}
          className="border p-2 bg-blue-100 font-bold text-blue-800"
        >
          {group.title}
        </td>
      </tr>

      {group.items.map((key) => (
        <tr key={key}>
          <td className="border p-2 font-semibold bg-gray-50">
            {key}
          </td>

          {languages.map((lang) => (
            <td
              key={`${key}-${lang.id || lang.code}`}
              className="border p-2"
            >
              <input
                className="border p-1 w-full"
                value={getTranslationValue(key, lang)}
                onChange={(e) =>
                  setTranslationValue(key, lang, e.target.value)
                }
              />
            </td>
          ))}
        </tr>
      ))}
    </React.Fragment>
  ))}
</tbody>
      </table>
    </div>
  </div>
)}






{isAdmin && paramTab === "Formule" && (
  <div className="overflow-auto">

    <div className="flex gap-2 mb-4">
  <select
    value={formulaVrstaStolarije}
    onChange={(e) => setFormulaVrstaStolarije(e.target.value)}
    className="border p-2"
  >
    <option value="">Vrsta stolarije</option>
    {vrsteStolarije.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ))}
  </select>

  <select
    value={formulaVrstaProzora}
    onChange={(e) => setFormulaVrstaProzora(e.target.value)}
    className="border p-2"
  >
    <option value="">Vrsta prozora</option>
    {prozori.map((p) => (
      <option key={p.id} value={p.naziv}>
        {p.naziv}
      </option>
    ))}
  </select>
</div>




    









    <table className="border w-full text-sm">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">Element</th>
          <th className="border p-2">S formula</th>
          <th className="border p-2">V formula</th>
          <th className="border p-2">Kom</th>
          <th className="border p-2">Cena formula</th>
        </tr>
      </thead>

      <tbody>
        {formule.map((f, index) => (
          <tr key={f.id ?? index}>
            
            <td className="border p-2 font-semibold">
              {f.element}
            </td>

            <td className="border p-1 relative">
  <input
    className="w-full border p-1"
    value={f.s || ""}
    onChange={(e) => {
      updateFormula(index, "s", e.target.value);
      handleAutocomplete(e.target.value, index, "s");
    }}
  />

  {activeInput?.i === index && activeInput?.field === "s" && suggestions.length > 0 && (
    <div className="absolute bg-white border w-full z-10">
      {suggestions.map((sug, i) => (
        <div
          key={i}
          className="p-1 hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            const newValue = (f.s || "") + sug;
            updateFormula(index, "s", newValue);
            setSuggestions([]);
          }}
        >
          {sug}
        </div>
      ))}
    </div>
  )}
</td>

            <td className="border p-1 relative">
  <input
    className="w-full border p-1"
    value={f.v || ""}
    onChange={(e) => {
      updateFormula(index, "v", e.target.value);
      handleAutocomplete(e.target.value, index, "v");
    }}
  />

  {activeInput?.i === index && activeInput?.field === "v" && suggestions.length > 0 && (
    <div className="absolute bg-white border w-full z-10">
      {suggestions.map((sug, i) => (
        <div
          key={i}
          className="p-1 hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            const newValue = (f.v || "") + sug;
            updateFormula(index, "v", newValue);
            setSuggestions([]);
          }}
        >
          {sug}
        </div>
      ))}
    </div>
  )}
</td>

            <td className="border p-1 relative">
  <input
    className="w-full border p-1"
    value={f.kom || ""}
    onChange={(e) => {
      updateFormula(index, "kom", e.target.value);
      handleAutocomplete(e.target.value, index, "kom");
    }}
  />

  {activeInput?.i === index && activeInput?.field === "kom" && suggestions.length > 0 && (
    <div className="absolute bg-white border w-full z-10">
      {suggestions.map((sug, i) => (
        <div
          key={i}
          className="p-1 hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            const newValue = (f.kom || "") + sug;
            updateFormula(index, "kom", newValue);
            setSuggestions([]);
          }}
        >
          {sug}
        </div>
      ))}
    </div>
  )}
</td>

            <td className="border p-1 relative">
  <input
    className="w-full border p-1"
    value={f.cena || ""}
    onChange={(e) => {
      updateFormula(index, "cena", e.target.value);
      handleAutocomplete(e.target.value, index, "cena");
    }}
  />

  {activeInput?.i === index && activeInput?.field === "cena" && suggestions.length > 0 && (
    <div className="absolute bg-white border w-full z-10">
      {suggestions.map((sug, i) => (
        <div
          key={i}
          className="p-1 hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            const newValue = (f.cena || "") + sug;
            updateFormula(index, "cena", newValue);
            setSuggestions([]);
          }}
        >
          {sug}
        </div>
      ))}
    </div>
  )}
</td>

          </tr>
        ))}
      </tbody>
    </table>

    <div className="mt-6">
  <h3 className="font-bold mb-2">Preview</h3>

  <table className="border w-full text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="border p-2">Element</th>
        <th className="border p-2">Š</th>
        <th className="border p-2">V</th>
        <th className="border p-2">Kom</th>
        <th className="border p-2">Cena</th>
      </tr>
    </thead>

    <tbody>
  {(Array.isArray(preview) ? preview : []).map((p, i) => (
    <tr key={i}>
      <td className="border p-2">{p.element}</td>
      <td className="border p-2">{Math.round(p.S || 0)}</td>
      <td className="border p-2">{Math.round(p.V || 0)}</td>
      <td className="border p-2">{p.kom || 0}</td>
      <td className="border p-2">
        {p.cena ? p.cena.toFixed(2) : "0.00"}
      </td>
    </tr>
  ))}
</tbody>
  </table>



</div>




  </div>
)}









  </div>





)}


<div className="fixed bottom-0 left-0 right-0 bg-white border-t text-center text-xs text-gray-600 py-1 z-50">
  © {new Date().getFullYear()} www.sajt.com - {t("Sva prava zadržana")}
</div>

      </main>

      {/* DESNA REKLAMA - SAMO DESKTOP */}
      <aside
  onClick={() => openAdLink("leftBanner")}
  className="hidden xl:block sticky top-4 h-[600px] overflow-hidden cursor-pointer"
>

  {getAdValue("leftBannerImage") ? (

    isVideoFile(getAdValue("leftBannerImage")) ? (

      <video
        src={`${API_URL}${getAdValue("leftBannerImage")}`}
        className="w-full h-full object-cover"
        muted
        loop
        autoPlay
        playsInline
      />

    ) : (

      <img
        src={`${API_URL}${getAdValue("leftBannerImage")}`}
        className="w-full h-full object-cover"
        alt=""
      />

    )

  ) : (

    <div className="h-full flex items-center justify-center bg-gray-100">
      {getAdValue("leftBanner") || "Levi baner"}
    </div>

  )}

</aside>

    </div>
{/* MOBILNA REKLAMA */}
{showMobileAd && (
  <div className="no-print xl:hidden fixed bottom-0 left-0 right-0 z-[1000] bg-yellow-100 border-t p-2 flex justify-between items-center text-sm">

    <div
      className="flex-1 cursor-pointer"
      onClick={() => openAdLink("mobileBanner")}
    >
      {getAdValue("mobileBannerImage") ? (
        isVideoFile(getAdValue("mobileBannerImage")) ? (
          <video
            src={`${API_URL}${getAdValue("mobileBannerImage")}`}
            className="w-full h-[50px] object-cover"
            muted
            loop
            autoPlay
            playsInline
          />
        ) : (
          <img
            src={`${API_URL}${getAdValue("mobileBannerImage")}`}
            className="w-full h-[50px] object-cover"
            alt=""
          />
        )
      ) : (
        <div>
          {getAdValue("mobileBanner") || "Vaš baner ovde"}
        </div>
      )}
    </div>

    <button
      onClick={() => setShowMobileAd(false)}
      className="bg-red-600 text-white rounded px-2 ml-2"
    >
      X
    </button>

  </div>
)}

  </div>
);
}
