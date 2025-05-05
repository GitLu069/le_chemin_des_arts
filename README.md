
# Le Chemin des Arts - Application de feedback pour parcours artistique

Application web permettant de collecter les avis des visiteurs sur chaque œuvre d'un parcours artistique via des QR codes.

## Fonctionnalités

- Page d'accueil et présentation de l'événement
- Pages dédiées pour 12 œuvres fictives avec formulaires de feedback
- Notation par étoiles et commentaires
- Comptage des visiteurs par œuvre
- Tableau de bord administratif avec statistiques
- Génération de QR codes pour chaque œuvre
- Export CSV des données collectées

## Comment utiliser cette application

### 1. Accès à l'interface administrateur

Pour accéder au tableau de bord administratif:
- Naviguez vers la page `/admin`
- Utilisez le mot de passe: `artpath2025`

Vous pouvez également accéder directement via cette URL: `/admin?token=artpath2025`

### 2. Personnaliser les œuvres

Pour modifier les œuvres existantes ou en ajouter de nouvelles, éditez le fichier `src/data/artworks.ts`.

Structure d'une œuvre:
```typescript
{
  id: number,          // Identifiant unique
  title: string,       // Titre de l'œuvre
  artist: string,      // Nom de l'artiste
  description: string, // Description de l'œuvre
  slug: string,        // URL de la page (ex: "oeuvre-1")
  image: string        // URL de l'image
}
```

### 3. Générer des QR codes pour l'impression

Les QR codes sont générés automatiquement dans l'interface. Pour les imprimer:
1. Accédez à la page `/explore` qui liste toutes les œuvres avec leurs QR codes
2. Utilisez la fonction d'impression de votre navigateur
3. Sélectionnez uniquement les QR codes que vous souhaitez imprimer

Alternativement, vous pouvez accéder directement à la page d'une œuvre pour afficher son QR code individuel.

### 4. Exporter les données

Depuis l'interface administrateur (`/admin`), vous pouvez:
- Visualiser les statistiques de visite pour chaque œuvre
- Voir la répartition des tailles de groupe
- Exporter toutes les données au format CSV

### 5. Stockage des données

Cette application utilise le stockage local du navigateur (localStorage) pour stocker les données de feedback.
Pour une utilisation en production, il est recommandé d'implémenter une solution de stockage plus robuste:

- Intégration avec Google Sheets via Google Apps Script
- Utilisation de services comme Formspree, Getform, ou un webhook simple
- Base de données légère comme Supabase ou Firebase

## Déploiement

Cette application peut être déployée gratuitement sur:
- GitHub Pages
- Netlify
- Vercel

Instructions:
1. Clonez ce dépôt
2. Installez les dépendances: `npm install`
3. Construisez l'application: `npm run build`
4. Déployez le contenu du dossier `dist`

## Technologies utilisées

- React
- TypeScript
- Tailwind CSS
- React Router
- QRCode.react pour la génération des QR codes
- Recharts pour les graphiques dans le tableau de bord

## Personnalisation avancée

### Modifier l'apparence

Les couleurs et styles principaux sont définis dans:
- `tailwind.config.ts` - Configuration des thèmes et couleurs
- `src/index.css` - Styles globaux et variables

### Ajouter de nouvelles pages

1. Créez un nouveau fichier dans `src/pages/`
2. Ajoutez la route dans `src/App.tsx`

---

© 2025 Le Chemin des Arts
