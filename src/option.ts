import { assertNever } from "./assert-never.js";

export interface Some<A> {
  readonly tag: "Some";
  readonly valeur: A;
}

export interface None {
  readonly tag: "None";
}

export type Option<A> = Some<A> | None;

export function some<A>(valeur: A): Option<A> {
  return {
    tag: "Some",
    valeur,
  };
}

export const none: None = Object.freeze({ tag: "None" });

export function fromNullable<A>(val: A | null | undefined): Option<A> {
  return val === null || val === undefined ? none : some(val);
}

export function isSome<A>(opt: Option<A>): opt is Some<A> {
  return opt.tag === "Some";
}

export function isNone<A>(opt: Option<A>): opt is None {
  return opt.tag === "None";
}

export function get<A>(some: Some<A>): A {
  return some.valeur;
}

export function getOrElse<A>(opt: Option<A>, valeurParDefaut: () => A): A {
  switch (opt.tag) {
    case "Some":
      return opt.valeur;
    case "None":
      return valeurParDefaut();
    default:
      assertNever(opt);
  }
}

export function map<A, B>(opt: Option<A>, f: (a: A) => B): Option<B> {
  return isSome(opt) ? some(f(opt.valeur)) : none;
}

export function filter<A>(opt: Option<A>, predicat: (a: A) => boolean): Option<A> {
  return isSome(opt) && predicat(opt.valeur) ? opt : none;
}

export function flatMap<A, B>(opt: Option<A>, f: (a: A) => Option<B>): Option<B> {
  return isSome(opt) ? f(opt.valeur) : none;
}
