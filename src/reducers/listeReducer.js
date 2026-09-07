export const etatInitial = {
  recherche: "",
  region: "toutes",
  tri: "nom",
  ordre: "croissant",
  afficherFavorisSeulement: false,
};

export function listeReducer(etat, action) {
  switch (action.type) {
    case "RECHERCHER":
      return { ...etat, recherche: action.payload };

    case "FILTRER_REGION":
      return { ...etat, region: action.payload };

    case "TRIER":
      if (etat.tri === action.payload) {
        return { ...etat, ordre: etat.ordre === "croissant" ? "decroissant" : "croissant" };
      }
      return { ...etat, tri: action.payload, ordre: "croissant" };

    case "BASCULER_FAVORIS_SEULEMENT":
      return { ...etat, afficherFavorisSeulement: !etat.afficherFavorisSeulement };

    case "VIDER_FAVORIS":
      return { ...etat, afficherFavorisSeulement: false };

    case "REINITIALISER":
      return etatInitial;

    default:
      return etat;
  }
}
