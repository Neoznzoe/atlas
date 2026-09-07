# Palier 15 — mesures de performance

Mesures réalisées avec l'API `Profiler` de React (équivalent programmatique du
Profiler des React DevTools), pilotée par Playwright en conditions réelles
(254 pays chargés depuis l'API, 24 cartes affichées par page). Chaque valeur
est une moyenne sur 10 à 12 rendus.

## Scénario 1 : taper dans la recherche (« canada » puis effacement)

| Étape | Modification                                   | Temps de rendu moyen |
| ----- | ----------------------------------------------- | --------------------- |
| 1     | État actuel, sans rien                          | 20,4 ms                |
| 2     | Filtrage et tri enveloppés dans un `useMemo`    | 18,9 ms                |
| 3     | `CountryCard` enveloppé dans `React.memo`        | 24,2 ms                |
| 4     | Handlers stabilisés avec `useCallback`           | 19,3 ms                |
| 5     | Sans la pagination du palier 12 (254 cartes)     | 72,2 ms (pics à 521 ms) |

## Scénario 2 : basculer 10 fois la même étoile favorite

La liste de cartes affichées ne change jamais dans ce scénario — seule la
prop `estFavori` d'une carte change à chaque clic.

| Configuration                              | Temps de rendu moyen |
| -------------------------------------------- | --------------------- |
| Sans `React.memo` / sans `useCallback`       | 38,5 ms                |
| Avec `React.memo` + `useCallback`            | 5,05 ms (**≈ 7,6× plus rapide**) |

## Conclusion

- **Étape qui n'a rien apporté : le `useMemo` (étape 2).** Sa dépendance
  (`etatListe`, qui contient la recherche) change à *chaque frappe* — il
  recalcule donc à chaque rendu, exactement comme avant, pour le prix d'une
  comparaison de dépendances en plus. **Retiré.**

- **`React.memo` seul (étape 3) n'apporte rien non plus** : `onToggleFavorite`
  était une fonction recréée à chaque rendu de `App`, donc une prop "différente"
  à chaque fois → la mémoïsation échouait systématiquement (légèrement plus
  lent que la base, à cause du coût de comparaison des props).

- **Le vrai gain mesuré : `React.memo` + `useCallback` ensemble**, mais
  seulement visible dans un scénario où la liste affichée ne change pas
  (scénario 2 : 38,5 ms → 5,05 ms, ×7,6). Sur la frappe dans la recherche
  (scénario 1), le gain est marginal (20,4 → 19,3 ms) car la liste de cartes
  change à presque chaque lettre — la plupart des `CountryCard` doivent de
  toute façon se re-rendre. **Conservé** : ce couple protège les rendus
  déclenchés par un état sans rapport avec la liste (ex. un favori qui
  bascule), un cas réel dans cette appli.

- **La modification qui a eu le plus d'effet sur la fluidité : la pagination
  du palier 12, pas un hook de performance.** Sans elle, le temps de rendu
  moyen passe de 20,4 ms à 72,2 ms (×3,5), avec des pics à plus de 500 ms —
  largement au-dessus du budget de 16 ms par frame pour rester fluide à 60
  images/seconde. Aucun des trois hooks de performance n'approche ce facteur.

- **Optimisation citée qui n'utilise aucun de ces trois hooks : afficher
  moins de choses** — la pagination/le scroll infini du palier 12.
