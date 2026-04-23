# Optimiseur d'images (Nyumbani)

Outil Python pour convertir automatiquement toutes les images du dépôt au format **WebP** (hors dossiers exclus comme `node_modules`, `.next`, `image-optimizer` lui-même).

## Pré-requis

- Python 3.8+
- Pillow : `pip install -r image-optimizer/requirements.txt`

## Utilisation depuis la racine du projet (recommandé)

Les scripts npm appellent `optimize.py` et détectent `py -3`, `python` ou `python3` selon l’OS :

| Commande | Effet |
|----------|--------|
| `npm run img:scan` | Liste les images trouvées (`--scan-only`) |
| `npm run img:preview` | Aperçu sans écrire de fichiers |
| `npm run img:optimize` | Crée les `.webp`, garde les originaux (backup dans `image-optimizer/backup/`) |
| `npm run img:optimize:replace` | Remplace les originaux par les WebP (cohérent avec les imports `.webp` dans l’app) |

Installation des dépendances Python une fois :

```powershell
pip install -r image-optimizer/requirements.txt
```

## Utilisation directe (dans ce dossier)

### Mode Preview (recommandé pour commencer)

```powershell
python optimize.py
```

Ce mode **ne modifie aucun fichier**. Il analyse toutes les images et affiche un rapport 
montrant la compression potentielle.

### Appliquer les conversions

```powershell
python optimize.py --apply
```

Crée les fichiers `.webp` à côté des originaux et sauvegarde les originaux dans `backup/`.

### Options disponibles

| Option | Description |
|--------|-------------|
| `--apply` | Applique les conversions (sans ce flag = mode preview) |
| `--quality N` | Qualité WebP de 1 à 100 (défaut: 80) |
| `--no-backup` | Ne pas sauvegarder les fichiers originaux |
| `--replace` | Supprimer les originaux après conversion (nécessite `--apply`) |
| `--scan-only` | Affiche uniquement la liste des images trouvées |
| `--path CHEMIN` | Chemin personnalisé vers le projet |

### Exemples

```powershell
# Preview avec qualité haute
python optimize.py --quality 90

# Convertir et remplacer les originaux  
python optimize.py --apply --replace

# Lister toutes les images
python optimize.py --scan-only
```

## 📊 Rapport

Après chaque exécution, un fichier `report.json` est généré avec les détails de chaque image :
- Taille originale
- Taille WebP
- Pourcentage de réduction
- Statut de la conversion

## ⚙️ Configuration

Les paramètres suivants sont configurables dans le fichier `optimize.py` :

- **Qualité WebP** : 80 par défaut (bon compromis qualité/taille)
- **Extensions supportées** : PNG, JPG, JPEG, BMP, TIFF, GIF
- **Dossiers exclus** : `node_modules`, `.next`, `.git`, etc.
- **Fichiers exclus** : Favicons, icônes Android/Apple

## Intégration Next.js (ce repo)

L’application importe déjà les photos sous `photos/**` et `public/**` en **WebP** (`lib/apartments.ts`, `app/page.tsx`, route `/api/photo/...`). Après un clone ou l’ajout de nouvelles photos au format JPG/PNG, lancez :

```powershell
npm run img:optimize:replace
```

Un rapport est écrit dans `image-optimizer/report.json` à chaque exécution.
