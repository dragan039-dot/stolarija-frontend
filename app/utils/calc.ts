export function getCena(element: string, profilId: number, ceneData: any[]) {
  const row = ceneData.find(
    r => r.element === element && r.profil_id === profilId
  );
  return row ? row.cena : 0;
}

export function getTehnicki(parametar: string, profilId: number, tehnickiData: any[]) {
  const row = tehnickiData.find(
    r => r.parametar === parametar && r.profil_id === profilId
  );
  return row ? row.vrednost : 0;
}

export function getOkovCena(okovId: number, okovData: any[]) {
  const row = okovData.find(r => r.id === okovId);
  return row ? row.cena : 0;
}

export function getIspunaCena(ispunaId: number, ispunaData: any[]) {
  const row = ispunaData.find(r => r.id === ispunaId);
  return row ? row.cena : 0;
}