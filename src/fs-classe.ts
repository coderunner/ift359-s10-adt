export class ElementFS {
  nom: string;
  estRepertoire: boolean;
  estLien: boolean;

  contenu?: string; // Utilisé si texte
  tailleOctets?: number; // Utilisé si binaire
  enfants?: ElementFS[]; // Utilisé si répertoire
  cibleLien?: string; // Utilisé si lien symbolique

  constructor(
    nom: string,
    estRepertoire: boolean = false,
    estLien: boolean = false,
    contenu?: string,
    tailleOctets?: number,
    enfants?: ElementFS[],
    cibleLien?: string,
  ) {
    this.nom = nom;
    this.estRepertoire = estRepertoire;
    this.estLien = estLien;
    this.contenu = contenu;
    this.tailleOctets = tailleOctets;
    this.enfants = enfants;
    this.cibleLien = cibleLien;
  }

  taille(): number {
    if (this.estRepertoire) {
      return (this.enfants ?? []).reduce((acc, e) => acc + e.taille(), 0);
    } else if (this.estLien) {
      return 0;
    } else {
      return this.tailleOctets ?? (this.contenu ? this.contenu.length : 0);
    }
  }

  // autre code ...
}

const f1 = new ElementFS("fichier.txt", true, false, "contenu");
const f2 = new ElementFS("ift359", true, true, undefined, 1000);
