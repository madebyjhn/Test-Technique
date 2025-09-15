import axios from "axios";

export type Lieu = {
  type: string;
  nom: string;
  adresse: string;
  dispo: string;
  payant?: string;
};

export async function getFontaine(
  limit: number = 20,
  arrondissement?: string
): Promise<Lieu[]> {
  const communeFilter = arrondissement
    ? `commune:PARIS ${parseInt(arrondissement.slice(3))}EME ARRONDISSEMENT`
    : "";

  const response = await axios.get<{
    results: Lieu[];
  }>(
    "https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/fontaines-a-boire/records",
    {
      params: {
        limit: limit,
        ...(communeFilter ? { refine: communeFilter } : {}),
      },
    }
  );

  return response.data.results.map((item) => ({
    type: "Fontaine",
    nom: item.modele ?? "Nom inconnu",
    adresse:
      `${item.voie ?? ""} ${item.commune ?? ""}`.trim() || "Adresse inconnue",
    dispo: item.dispo ?? "Disponibilité inconnue",
  }));
}

export async function getEspacesVerts(
  limit: number = 20,
  arrondissement?: string
): Promise<Lieu[]> {
  const response = await axios.get<{ results: Lieu[] }>(
    "https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records",
    {
      params: {
        limit: limit,
        ...(arrondissement
          ? { refine: `arrondissement:${arrondissement}` }
          : {}),
      },
    }
  );

  return response.data.results.map((item) => ({
    type: item.categorie ?? "Espace Vert",
    nom: item.nom ?? "Nom inconnu",
    adresse:
      `${item.adresse ?? ""} ${item.arrondissement ?? ""}`.trim() ||
      "Adresse inconnue",
    dispo: item.ouvert_24h ?? "Disponibilité inconnue",
  }));
}

export async function getEquipements(
  limit: number = 20,
  arrondissement?: string
): Promise<Lieu[]> {
  const response = await axios.get<{ results: Lieu[] }>(
    "https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records",
    {
      params: {
        limit: limit,
        ...(arrondissement
          ? { refine: `arrondissement:${arrondissement}` }
          : {}),
      },
    }
  );

  return response.data.results.map((item) => ({
    type: item.type ?? "Equipement",
    nom: item.nom ?? "Inconnu",
    adresse:
      `${item.adresse ?? ""} ${item.arrondissement ?? ""}`.trim() ||
      "Adresse inconnue",
    dispo: item.horaires_periode ?? item.horaires_lundi ?? "Horaires inconnus",
  }));
}
