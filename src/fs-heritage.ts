export abstract class ElementFS {
  constructor(public readonly nom: string) {}

  abstract taille(): number;
}

export class FichierTexte extends ElementFS {
  constructor(
    nom: string,
    public readonly contenu: string,
  ) {
    super(nom);
  }

  taille(): number {
    return this.contenu.length;
  }
}

export class FichierBinaire extends ElementFS {
  constructor(
    nom: string,
    public readonly tailleOctets: number,
  ) {
    super(nom);
  }

  taille(): number {
    return this.tailleOctets;
  }
}

export class Repertoire extends ElementFS {
  constructor(
    nom: string,
    public readonly enfants: readonly ElementFS[] = [],
  ) {
    super(nom);
  }

  taille(): number {
    return this.enfants.reduce((acc, enf) => acc + enf.taille(), 0);
  }
}

export class LienSymbolique extends ElementFS {
  constructor(
    nom: string,
    public readonly destination: string,
  ) {
    super(nom);
  }

  taille(): number {
    return 0;
  }
}
