# Atlas

Explorateur de pays du monde — projet fil rouge de la formation React
(voir [`atlas-cahier.pdf`](./atlas-cahier.pdf)), construit palier par palier
du premier composant aux hooks avancés.

## Démarrer

```bash
npm install
cp .env.example .env   # puis renseigne ta clé restcountries.com
npm run dev
```

L'API [REST Countries v5](https://restcountries.com) nécessite une clé
gratuite (créer un compte sur `restcountries.com/sign-up`, page « API Keys »).
Renseigne-la dans `.env` sous `VITE_RESTCOUNTRIES_API_KEY` — ce fichier n'est
jamais commité. Si ta clé a des origines CORS restreintes, autorise l'origine
de ton serveur de dev (`http://localhost:5173`) dans le dashboard de ta clé.

## Fonctionnalités

- grille de pays avec drapeau, recherche et filtre par région
- tri par nom / population / superficie
- favoris persistés (`localStorage`), mode « favoris uniquement »
- détail d'un pays dans une fenêtre modale
- scroll infini
- thème clair / sombre
- mini-quiz chronométré « quel pays a ce drapeau ? »

## Historique

Un commit Git par palier (`palier 0 : mise en place` → `palier 16 : le style`),
conformément à la démarche décrite dans le cahier.
