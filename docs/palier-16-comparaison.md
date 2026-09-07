# Palier 16 — CSS Modules vs Tailwind

`Card` et `Modale` sont passés en CSS Modules (`Card.module.css`,
`Modale.module.css`), `Badge` est en Tailwind.

|                          | CSS Modules                                              | Tailwind                                      |
| ------------------------ | ---------------------------------------------------------- | ------------------------------------------------ |
| Nombre de fichiers        | 2 (le `.jsx` + un `.module.css` par composant)             | 1 (tout dans le `.jsx`)                          |
| Lignes écrites            | ~15 lignes CSS + ~3 lignes de composition de classes en JS | 0 fichier séparé, ~3 lignes de classes en JS      |
| Lisibilité du JSX         | Très lisible (`styles.contenuFavori`), le style est ailleurs | Dense (une longue chaîne de classes dans le JSX) |
| Ajouter une variante      | Ouvrir le `.module.css`, ajouter une classe, la composer en JS | Ajouter directement une classe conditionnelle dans le JSX, aucun fichier à ouvrir |

## Ce qui a été observé en le faisant

- Avec **CSS Modules**, le nom de classe généré dans le navigateur est
  hashé (`_card_12zlr_1`) : ça garantit qu'aucune règle d'un autre composant
  ne peut entrer en collision, même avec un nom aussi générique que `card`.
  C'est la vraie utilité du procédé — pas la syntaxe, l'isolation.
- Avec **Tailwind**, il n'y a jamais eu besoin de nommer quoi que ce soit
  (pas de `.badge`, pas de `.badge--grand`) : la classe conditionnelle
  (`grand ? "bg-blue-600 ..." : "bg-gray-200 ..."`) vit directement à côté
  du JSX qu'elle stylise, sans aller-retour de fichier.

## Choix pour un prochain projet

Pour un composant très réutilisé et repris ailleurs dans le code (comme
`Card`, présent dans toutes les cartes de l'application), CSS Modules garde
le JSX propre et centralise les variantes dans un seul fichier facile à
scanner. Pour un petit composant isolé comme `Badge`, Tailwind évite un
fichier entier pour trois règles. En pratique je choisirais **une seule
approche par projet** (comme le recommande le cahier) plutôt que ce mélange
volontairement pédagogique — et je partirais sur Tailwind par défaut, parce
que la friction d'ajouter une variante y est la plus faible au quotidien.
