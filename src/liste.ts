import { assertNever } from "./assert-never.js";
import { None, none, Option, Some, some } from "./option.js";

export interface Cons<A> {
  readonly tag: "cons";
  readonly tete: A;
  readonly reste: List<A>;
}

export interface Nil {
  readonly tag: "nil";
}

export type List<A> = Cons<A> | Nil;

export const nil: Nil = Object.freeze({ tag: "nil" });

export function cons<A>(tete: A, reste: List<A> = nil): Cons<A> {
  return { tag: "cons", tete, reste };
}

export function estVide<A>(l: List<A>): l is Nil {
  return l.tag === "nil";
}

export function estCons<A>(l: List<A>): l is Cons<A> {
  return l.tag === "cons";
}

export function tete<A>(l: List<A>): Option<A> {
  switch (l.tag) {
    case "nil":
      return none;
    case "cons":
      return some(l.tete);
    default:
      assertNever(l);
  }
}

export function reste<A>(l: List<A>): List<A> {
  switch (l.tag) {
    case "nil":
      return nil;
    case "cons":
      return l.reste;
    default:
      assertNever(l);
  }
}

export function longueur<A>(l: List<A>): number {
  function iter(courante: List<A>, acc: number): number {
    switch (courante.tag) {
      case "nil":
        return acc;
      case "cons":
        return iter(courante.reste, acc + 1);
      default: {
        assertNever(courante);
      }
    }
  }
  return iter(l, 0);
}

export function trouver<A>(l: List<A>, p: (a: A) => boolean): Option<A> {
  switch (l.tag) {
    case "nil":
      return none;
    case "cons": {
      if (p(l.tete)) return some(l.tete);
      return trouver(l.reste, p);
    }
    default: {
      assertNever(l);
    }
  }
}
