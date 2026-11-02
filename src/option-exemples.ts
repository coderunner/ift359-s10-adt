import { none, Option, some, getOrElse, map } from "./option.js";

const REGISTRE = { "123": "alex", "452": "gab" };

export function chercher(cle: string, env: Record<string, string>): Option<string> {
  if (cle in env) {
    return some(env[cle]);
  }
  return none;
}

const r1 = chercher("123", REGISTRE);
const r2 = chercher("111", REGISTRE);

function afficherRecord(rec: Option<string>) {
  console.log(
    getOrElse(
      map(rec, (r) => `Enregistrement trouvé: ${r}`),
      () => "Aucun enregistrement trouvé",
    ),
  );
}

afficherRecord(r1);
afficherRecord(r2);
