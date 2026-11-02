import { get, isSome, none, Option, some } from "./option.js";

// Types Produits
export interface FichierTexte {
  readonly type: "texte";
  readonly nom: string;
  readonly contenu: string;
}

export interface FichierBinaire {
  readonly type: "binaire";
  readonly nom: string;
  readonly tailleOctets: number;
}

export interface Repertoire {
  readonly type: "repertoire";
  readonly nom: string;
  readonly enfants: readonly ElementFS[];
}

export interface LienSymbolique {
  readonly type: "lien";
  readonly nom: string;
  readonly cible: string;
}

// Type Somme
export type ElementFS = FichierTexte | FichierBinaire | Repertoire | LienSymbolique;

export function fichierTexte(nom: string, contenu: string): FichierTexte {
  return { type: "texte", nom, contenu };
}

export function fichierBinaire(nom: string, tailleOctets: number): FichierBinaire {
  return { type: "binaire", nom, tailleOctets };
}

export function repertoire(nom: string, enfants: ElementFS[]): Repertoire {
  return { type: "repertoire", nom, enfants };
}

export function lienSymbolique(nom: string, cible: string): LienSymbolique {
  return { type: "lien", nom, cible };
}

export function enfants(e: Repertoire): readonly ElementFS[] {
  return e.enfants;
}

export function tailleOctets(e: FichierBinaire): number {
  return e.tailleOctets;
}

export function contenu(e: FichierTexte): string {
  return e.contenu;
}

export function estFichierTexte(e: ElementFS): e is FichierTexte {
  return e.type === "texte";
}

export function estFichierBinaire(e: ElementFS): e is FichierBinaire {
  return e.type === "binaire";
}

export function estRepertoire(e: ElementFS): e is Repertoire {
  return e.type === "repertoire";
}

export function estLienSymbolique(e: ElementFS): e is LienSymbolique {
  return e.type === "lien";
}

export function tailleI(e: ElementFS): number {
  if (estFichierTexte(e)) {
    return contenu(e).length;
  } else if (estFichierBinaire(e)) {
    return tailleOctets(e);
  } else if (estRepertoire(e)) {
    return enfants(e).reduce((acc, e) => acc + tailleI(e), 0);
  } else if (estLienSymbolique(e)) {
    return 0;
  } else {
    const _exhaustif: never = e;
    return _exhaustif;
  }
}

export function taille(e: ElementFS): number {
  switch (e.type) {
    case "texte":
      return contenu(e).length;
    case "binaire":
      return tailleOctets(e);
    case "repertoire":
      return enfants(e).reduce((acc, e) => acc + taille(e), 0);
    case "lien":
      return 0;
    default:
      const _exhaustif: never = e;
      return _exhaustif;
  }
}
