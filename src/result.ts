import { assertNever } from "./assert-never.js";

export interface Error<E> {
  readonly tag: "error";
  readonly error: E;
}

export interface Value<A> {
  readonly tag: "value";
  readonly value: A;
}

export type Result<E, A> = Error<E> | Value<A>;

export function error<E, A = never>(error: E): Result<E, A> {
  return {
    tag: "error",
    error,
  };
}

export function value<A, E = never>(value: A): Result<E, A> {
  return {
    tag: "value",
    value,
  };
}

export function tryCatch<E, A>(action: () => A, onError: (erreur: unknown) => E): Result<E, A> {
  try {
    return value(action());
  } catch (err) {
    return error(onError(err));
  }
}

export function isError<E, A>(e: Result<E, A>): e is Error<E> {
  return e.tag === "error";
}

export function isValue<E, A>(e: Result<E, A>): e is Value<A> {
  return e.tag === "value";
}

export function getOrElse<E, A>(e: Result<E, A>, defaultValue: (err: E) => A): A {
  switch (e.tag) {
    case "value":
      return e.value;
    case "error":
      return defaultValue(e.error);
    default:
      assertNever(e);
  }
}

export function map<E, A, B>(e: Result<E, A>, f: (a: A) => B): Result<E, B> {
  return isValue(e) ? value(f(e.value)) : error(e.error);
}

export function flatMap<E, A, B>(e: Result<E, A>, f: (a: A) => Result<E, B>): Result<E, B> {
  return isValue(e) ? f(e.value) : error(e.error);
}
