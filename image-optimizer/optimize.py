"""
=============================================================================
  ITM Web - Optimiseur d'Images pour le Web
=============================================================================

  Ce script analyse et convertit toutes les images du projet au format WebP
  optimise pour le web, sans casser la qualite visuelle.

  Fonctionnalites :
    - Scan recursif de toutes les images (PNG, JPG, JPEG, BMP, TIFF, GIF)
    - Conversion en WebP avec qualite configurable
    - Sauvegarde automatique des originaux dans un dossier backup
    - Rapport detaille de compression (taille avant/apres, % de gain)
    - Mode preview (dry-run) pour voir les resultats avant d'appliquer
    - Exclusion automatique des favicons et icones systeme

  Usage :
    python optimize.py                    # Mode preview (ne modifie rien)
    python optimize.py --apply            # Applique les conversions
    python optimize.py --quality 85       # Qualite WebP (defaut: 80)
    python optimize.py --apply --replace  # Remplace les originaux par WebP
    python optimize.py --scan-only        # Affiche uniquement le rapport

  Depuis la racine du projet Next.js (Nyumbani) :
    npm run img:preview                   # Preview
    npm run img:optimize                  # WebP a cote des originaux + backup
    npm run img:optimize:replace          # WebP uniquement (aligne avec les imports .webp)

=============================================================================
"""

import os
import sys
import shutil
import argparse
import json
from datetime import datetime
from pathlib import Path
from typing import Optional

# Force UTF-8 output on Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")  # type: ignore[union-attr]
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")  # type: ignore[union-attr]

try:
    from PIL import Image
except ImportError:
    print("\n[X] Erreur : La bibliotheque Pillow n'est pas installee.")
    print("    Installez-la avec : pip install Pillow")
    print("    Ou : pip install -r requirements.txt\n")
    sys.exit(1)


# --- Configuration --------------------------------------------------------

# Extensions d'images a traiter
SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".bmp", ".tiff", ".tif", ".gif"}

# Dossiers a ignorer
EXCLUDED_DIRS = {
    "node_modules",
    ".next",
    ".git",
    "__pycache__",
    "image-optimizer",
    ".vscode",
}

# Fichiers a ne PAS convertir (favicons, icones systeme, etc.)
EXCLUDED_PATTERNS = {
    "favicon",
    "android-chrome",
    "apple-touch-icon",
    "favicon-16x16",
    "favicon-32x32",
}

# Taille minimale de fichier pour etre traite (en octets)
MIN_FILE_SIZE = 1024  # 1 KB


# --- Couleurs pour le terminal ---------------------------------------------

class Colors:
    """Couleurs ANSI pour l'affichage terminal."""
    HEADER = "\033[95m"
    BLUE = "\033[94m"
    CYAN = "\033[96m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    RED = "\033[91m"
    BOLD = "\033[1m"
    DIM = "\033[2m"
    RESET = "\033[0m"


def colorize(text: str, color: str) -> str:
    """Applique une couleur ANSI au texte."""
    return f"{color}{text}{Colors.RESET}"


# --- Fonctions utilitaires -------------------------------------------------

def format_size(size_bytes: int) -> str:
    """Formate une taille en octets en format lisible (KB, MB)."""
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} KB"
    else:
        return f"{size_bytes / (1024 * 1024):.2f} MB"


def get_compression_ratio(original: int, compressed: int) -> float:
    """Calcule le pourcentage de reduction."""
    if original == 0:
        return 0.0
    return ((original - compressed) / original) * 100


def is_excluded(filepath: Path) -> bool:
    """Verifie si un fichier doit etre exclu de la conversion."""
    filename = filepath.stem.lower()
    for pattern in EXCLUDED_PATTERNS:
        if pattern in filename:
            return True
    return False


def should_skip_dir(dirname: str) -> bool:
    """Verifie si un dossier doit etre ignore."""
    return dirname in EXCLUDED_DIRS


# --- Classe principale ------------------------------------------------------

class ImageOptimizer:
    """Optimiseur d'images pour la conversion au format WebP."""

    def __init__(
        self,
        project_root: Path,
        quality: int = 80,
        backup: bool = True,
        replace_originals: bool = False,
    ):
        self.project_root = project_root
        self.quality = quality
        self.backup = backup
        self.replace_originals = replace_originals
        self.backup_dir = project_root / "image-optimizer" / "backup"
        self.report: list[dict[str, object]] = []
        self.total_original_size = 0
        self.total_optimized_size = 0
        self.files_processed = 0
        self.files_skipped = 0
        self.errors: list[str] = []

    def scan_images(self) -> list[Path]:
        """Scanne recursivement le projet pour trouver toutes les images."""
        images: list[Path] = []

        for root, dirs, files in os.walk(self.project_root):
            # Filtrer les dossiers exclus
            dirs[:] = [d for d in dirs if not should_skip_dir(d)]

            for filename in files:
                filepath = Path(root) / filename
                extension = filepath.suffix.lower()

                if extension in SUPPORTED_EXTENSIONS:
                    # Verifier la taille minimale
                    if filepath.stat().st_size < MIN_FILE_SIZE:
                        continue
                    # Verifier les exclusions
                    if is_excluded(filepath):
                        self.files_skipped += 1
                        continue
                    images.append(filepath)

        return sorted(images)

    def convert_to_webp(self, source: Path, dest: Path) -> Optional[int]:
        """
        Convertit une image au format WebP.
        Retourne la taille du fichier WebP ou None en cas d'erreur.
        """
        try:
            with Image.open(source) as img:
                # Conserver le mode RGBA pour les PNG avec transparence
                if img.mode in ("RGBA", "LA") or (
                    img.mode == "P" and "transparency" in img.info
                ):
                    # Garder la transparence pour WebP
                    if img.mode == "P":
                        img = img.convert("RGBA")
                    img.save(
                        dest,
                        "WEBP",
                        quality=self.quality,
                        method=6,  # Meilleure compression (plus lent)
                        lossless=False,
                    )
                else:
                    # Convertir en RGB pour les images sans transparence
                    if img.mode != "RGB":
                        img = img.convert("RGB")
                    img.save(
                        dest,
                        "WEBP",
                        quality=self.quality,
                        method=6,
                    )

            return dest.stat().st_size

        except Exception as e:
            self.errors.append(f"Erreur avec {source}: {str(e)}")
            return None

    def backup_original(self, filepath: Path) -> None:
        """Sauvegarde le fichier original dans le dossier backup."""
        relative = filepath.relative_to(self.project_root)
        backup_path = self.backup_dir / relative
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(filepath, backup_path)

    def process_image(self, filepath: Path, dry_run: bool = True) -> dict[str, object]:
        """
        Traite une image individuelle.
        En mode dry_run, simule la conversion sans modifier les fichiers.
        """
        original_size = filepath.stat().st_size
        relative_path = filepath.relative_to(self.project_root)

        # Creer le chemin de destination WebP
        webp_path = filepath.with_suffix(".webp")

        result: dict[str, object] = {
            "file": str(relative_path),
            "original_format": filepath.suffix.upper().lstrip("."),
            "original_size": original_size,
            "webp_size": 0,
            "reduction_percent": 0.0,
            "status": "pending",
        }

        if dry_run:
            # En mode preview, on fait une conversion temporaire pour estimer
            temp_path = filepath.parent / f".temp_preview_{filepath.stem}.webp"
            try:
                webp_size = self.convert_to_webp(filepath, temp_path)
                if webp_size is not None:
                    result["webp_size"] = webp_size
                    result["reduction_percent"] = get_compression_ratio(
                        original_size, webp_size
                    )
                    result["status"] = "preview"
                else:
                    result["status"] = "error"
            finally:
                # Supprimer le fichier temporaire
                if temp_path.exists():
                    temp_path.unlink()
        else:
            # Mode application reel
            # Sauvegarder l'original si necessaire
            if self.backup:
                self.backup_original(filepath)

            # Convertir en WebP
            webp_size = self.convert_to_webp(filepath, webp_path)

            if webp_size is not None:
                result["webp_size"] = webp_size
                result["reduction_percent"] = get_compression_ratio(
                    original_size, webp_size
                )
                result["status"] = "converted"

                # Supprimer l'original si demande
                if self.replace_originals and webp_path.exists():
                    filepath.unlink()
                    result["status"] = "replaced"
            else:
                result["status"] = "error"

        return result

    def print_header(self) -> None:
        """Affiche l'en-tete du programme."""
        print()
        print(colorize("=" * 70, Colors.CYAN))
        print(colorize("  [IMG] ITM Web - Optimiseur d'Images pour le Web", Colors.BOLD + Colors.CYAN))
        print(colorize("=" * 70, Colors.CYAN))
        print()

    def print_scan_results(self, images: list[Path]) -> None:
        """Affiche les resultats du scan."""
        print(colorize(f"  [DIR] Projet : {self.project_root}", Colors.DIM))
        print(colorize(f"  [>>]  Images trouvees : {len(images)}", Colors.BLUE))
        print(colorize(f"  [--]  Images exclues  : {self.files_skipped}", Colors.DIM))
        print(colorize(f"  [Q]   Qualite WebP    : {self.quality}%", Colors.BLUE))
        print()

    def print_report(self, results: list[dict[str, object]], dry_run: bool = True) -> None:
        """Affiche le rapport detaille de compression."""
        print(colorize("-" * 70, Colors.DIM))
        mode_label = "PREVIEW" if dry_run else "RESULTATS"
        print(colorize(f"  [REPORT] Rapport de {mode_label}", Colors.BOLD + Colors.YELLOW))
        print(colorize("-" * 70, Colors.DIM))
        print()

        # En-tete du tableau
        header = f"  {'Fichier':<40} {'Original':>10} {'WebP':>10} {'Gain':>8}"
        print(colorize(header, Colors.BOLD))
        print(colorize("  " + "-" * 68, Colors.DIM))

        total_original = 0
        total_webp = 0

        for r in results:
            if r["status"] in ("error",):
                line = f"  [X] {str(r['file']):<38} {'ERREUR':>10}"
                print(colorize(line, Colors.RED))
                continue

            original_size = int(r["original_size"])  # type: ignore[arg-type]
            webp_size = int(r["webp_size"])  # type: ignore[arg-type]
            reduction = float(r["reduction_percent"])  # type: ignore[arg-type]

            total_original += original_size
            total_webp += webp_size

            # Choix du symbole selon le gain
            if reduction > 50:
                status_icon = "[++]"
                color = Colors.GREEN
            elif reduction > 20:
                status_icon = "[+ ]"
                color = Colors.YELLOW
            elif reduction > 0:
                status_icon = "[~ ]"
                color = Colors.YELLOW
            else:
                status_icon = "[- ]"
                color = Colors.RED

            # Tronquer le nom de fichier si trop long
            filename = str(r["file"])
            if len(filename) > 36:
                filename = "..." + filename[-33:]

            line = (
                f"  {status_icon} {filename:<36} "
                f"{format_size(original_size):>10} "
                f"{format_size(webp_size):>10} "
                f"{reduction:>6.1f}%"
            )
            print(colorize(line, color) if reduction > 20 else line)

        # Totaux
        print(colorize("  " + "-" * 68, Colors.DIM))
        total_reduction = get_compression_ratio(total_original, total_webp)

        print()
        print(colorize("  [RESUME]", Colors.BOLD + Colors.CYAN))
        print(f"     Taille originale totale : {colorize(format_size(total_original), Colors.RED)}")
        print(f"     Taille WebP totale      : {colorize(format_size(total_webp), Colors.GREEN)}")
        print(
            f"     Economie totale         : {colorize(format_size(total_original - total_webp), Colors.GREEN + Colors.BOLD)}"
            f" ({colorize(f'{total_reduction:.1f}%', Colors.GREEN + Colors.BOLD)})"
        )
        print()

        if self.errors:
            print(colorize(f"  [!] {len(self.errors)} erreur(s) rencontree(s) :", Colors.RED))
            for err in self.errors:
                print(colorize(f"      - {err}", Colors.RED))
            print()

        self.total_original_size = total_original
        self.total_optimized_size = total_webp

    def save_report_json(self, results: list[dict[str, object]]) -> None:
        """Sauvegarde le rapport au format JSON."""
        report_path = self.project_root / "image-optimizer" / "report.json"
        report_data = {
            "date": datetime.now().isoformat(),
            "quality": self.quality,
            "total_original_size": self.total_original_size,
            "total_optimized_size": self.total_optimized_size,
            "reduction_percent": get_compression_ratio(
                self.total_original_size, self.total_optimized_size
            ),
            "files": results,
        }
        with open(report_path, "w", encoding="utf-8") as f:
            json.dump(report_data, f, indent=2, ensure_ascii=False)
        print(colorize(f"  [SAVE] Rapport sauvegarde : {report_path}", Colors.DIM))

    def run(self, dry_run: bool = True, scan_only: bool = False) -> None:
        """Execute l'optimisation des images."""
        self.print_header()

        # Scan des images
        print(colorize("  [SCAN] Scan des images en cours...", Colors.BLUE))
        images = self.scan_images()

        if not images:
            print(colorize("\n  [i] Aucune image a traiter trouvee.\n", Colors.YELLOW))
            return

        self.print_scan_results(images)

        if scan_only:
            # Afficher uniquement la liste des images trouvees
            print(colorize("  [LIST] Liste des images trouvees :", Colors.BOLD))
            print()
            for img in images:
                relative = img.relative_to(self.project_root)
                size = img.stat().st_size
                print(f"     > {relative} ({format_size(size)})")
            print()
            return

        # Traitement des images
        results: list[dict[str, object]] = []
        total = len(images)

        for idx, img_path in enumerate(images, 1):
            relative = img_path.relative_to(self.project_root)
            progress = f"[{idx}/{total}]"
            print(
                f"  {colorize(progress, Colors.DIM)} "
                f"{'Analyse' if dry_run else 'Conversion'} de {colorize(str(relative), Colors.CYAN)}...",
                end="\r",
            )

            result = self.process_image(img_path, dry_run=dry_run)
            results.append(result)

        # Effacer la derniere ligne de progression
        print(" " * 120, end="\r")

        # Afficher le rapport
        self.print_report(results, dry_run=dry_run)

        # Sauvegarder le rapport JSON
        self.save_report_json(results)

        # Message final
        if dry_run:
            print(colorize("  [i] Mode PREVIEW : aucun fichier n'a ete modifie.", Colors.YELLOW))
            print(
                colorize(
                    "      Pour appliquer les conversions, relancez avec --apply",
                    Colors.YELLOW,
                )
            )
            print()
        else:
            if self.backup:
                print(
                    colorize(
                        f"  [SAVE] Les originaux ont ete sauvegardes dans : {self.backup_dir}",
                        Colors.GREEN,
                    )
                )
            if self.replace_originals:
                print(
                    colorize(
                        "  [!] Les fichiers originaux ont ete remplaces par les versions WebP.",
                        Colors.YELLOW,
                    )
                )
            else:
                print(
                    colorize(
                        "  [OK] Les fichiers WebP ont ete crees a cote des originaux.",
                        Colors.GREEN,
                    )
                )
            print()


# --- Point d'entree --------------------------------------------------------

def main() -> None:
    """Point d'entree principal du script."""
    parser = argparse.ArgumentParser(
        description="ITM Web - Optimiseur d'Images pour le Web",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemples d'utilisation :
  python optimize.py                    # Mode preview (ne modifie rien)
  python optimize.py --apply            # Applique les conversions
  python optimize.py --quality 85       # Qualite WebP personnalisee
  python optimize.py --apply --replace  # Remplace les originaux
  python optimize.py --scan-only        # Liste les images uniquement
        """,
    )

    parser.add_argument(
        "--apply",
        action="store_true",
        help="Applique les conversions (sans ce flag, mode preview uniquement)",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=80,
        choices=range(1, 101),
        metavar="1-100",
        help="Qualite WebP (1-100, defaut: 80). Plus eleve = meilleure qualite, moins de compression",
    )
    parser.add_argument(
        "--no-backup",
        action="store_true",
        help="Ne pas sauvegarder les fichiers originaux",
    )
    parser.add_argument(
        "--replace",
        action="store_true",
        help="Supprimer les fichiers originaux apres conversion (necessite --apply)",
    )
    parser.add_argument(
        "--scan-only",
        action="store_true",
        help="Affiche uniquement la liste des images trouvees",
    )
    parser.add_argument(
        "--path",
        type=str,
        default=None,
        help="Chemin personnalise vers le projet (defaut: dossier parent du script)",
    )

    args = parser.parse_args()

    # Determiner le chemin du projet
    if args.path:
        project_root = Path(args.path).resolve()
    else:
        # Le script est dans image-optimizer/, donc le projet est un niveau au-dessus
        project_root = Path(__file__).resolve().parent.parent

    if not project_root.exists():
        print(colorize(f"\n  [X] Le chemin n'existe pas : {project_root}\n", Colors.RED))
        sys.exit(1)

    # Verification de securite pour --replace
    if args.replace and not args.apply:
        print(
            colorize(
                "\n  [!] L'option --replace necessite --apply pour etre active.\n",
                Colors.YELLOW,
            )
        )
        sys.exit(1)

    # Creer et lancer l'optimiseur
    optimizer = ImageOptimizer(
        project_root=project_root,
        quality=args.quality,
        backup=not args.no_backup,
        replace_originals=args.replace,
    )

    dry_run = not args.apply
    optimizer.run(dry_run=dry_run, scan_only=args.scan_only)


if __name__ == "__main__":
    main()
