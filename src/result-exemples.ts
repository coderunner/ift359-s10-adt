import { Result, error, value, map, flatMap, getOrElse } from "./result.js";

// Type pour formaliser les causes d'erreurs
type ErreurArithmetique = "DivisionParZero" | "RacineNombreNegatif";

function diviser(numerateur: number, denominateur: number): Result<ErreurArithmetique, number> {
  if (denominateur === 0) {
    return error("DivisionParZero");
  }
  return value(numerateur / denominateur);
}

function racineCarree(n: number): Result<ErreurArithmetique, number> {
  if (n < 0) {
    return error("RacineNombreNegatif");
  }
  return value(Math.sqrt(n));
}

function calculComplexe(a: number, b: number): Result<ErreurArithmetique, number> {
  return flatMap(diviser(a, b), (division) => racineCarree(division));
}

const res1 = calculComplexe(100, 4); // Right(5)
const res2 = calculComplexe(10, 0); // Left("DivisionParZero")
const res3 = calculComplexe(-16, 1); // Left("RacineNombreNegatif")

function afficher(res: Result<ErreurArithmetique, number>): void {
  const msg = getOrElse(
    map(res, (a) => `Résultat: ${a}`),
    (err) => `Erreur: ${err}`,
  );

  console.log(msg);
}

afficher(res1); // Résultat : 5
afficher(res2); // Erreur rencontrée : DivisionParZero
afficher(res3); // Erreur rencontrée : RacineNombreNegatif
