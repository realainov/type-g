import type { KeyOf } from './keyOf'
import type { ValueOf } from './valueOf'

type __MAX_DEEP__ = 4

type __PathOf<Target, Depth extends any[]> = Target extends object
  ? Depth['length'] extends __MAX_DEEP__
    ? [keyof Target] extends [never]
      ? ''
      : '' | `.${string}`
    : '' | `.${_PathOf<Target, [...Depth, 0]>}`
  : ''

type _PathOf<Target, Depth extends any[] = []> = Target extends any
  ? ValueOf<{
      [K in KeyOf<Target>]: `${K}${__PathOf<Target[K], Depth>}`
    }>
  : never

export type PathOf<Target> = _PathOf<Target>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from './common'

// @ts-expect-error
type cases = [
  Expect<Equal<PathOf<never>, never>>,
  Expect<Equal<PathOf<any>, string>>,
  Expect<Equal<PathOf<unknown>, never>>,
  Expect<
    Equal<
      PathOf<string | number | boolean | symbol | bigint | null | undefined>,
      never
    >
  >,
  Expect<Equal<PathOf<readonly number[]>, `${number}`>>,
  Expect<Equal<PathOf<ReadonlyArray<number>>, `${number}`>>,
  Expect<Equal<PathOf<[]>, never>>,
  Expect<Equal<PathOf<readonly []>, never>>,
  Expect<Equal<PathOf<[number, string, symbol]>, `${0 | 1 | 2}`>>,
  Expect<Equal<PathOf<readonly [number, string, symbol]>, `${0 | 1 | 2}`>>,
  Expect<
    Equal<
      PathOf<number[][][][][]>,
      | `${number}`
      | `${number}.${number}`
      | `${number}.${number}.${number}`
      | `${number}.${number}.${number}.${number}`
      | `${number}.${number}.${number}.${number}.${number}`
    >
  >,
  Expect<
    Equal<
      PathOf<number[][][][][][]>,
      | `${number}`
      | `${number}.${number}`
      | `${number}.${number}.${number}`
      | `${number}.${number}.${number}.${number}`
      | `${number}.${number}.${number}.${number}.${number}`
      | `${number}.${number}.${number}.${number}.${number}.${string}`
    >
  >,
  Expect<
    Equal<
      PathOf<[[[[[]]]]]>,
      `${0}` | `${0}.${0}` | `${0}.${0}.${0}` | `${0}.${0}.${0}.${0}`
    >
  >,
  Expect<
    Equal<
      PathOf<readonly [readonly [readonly [readonly [readonly []]]]]>,
      `${0}` | `${0}.${0}` | `${0}.${0}.${0}` | `${0}.${0}.${0}.${0}`
    >
  >,
  Expect<Equal<PathOf<{}>, never>>,
  Expect<Equal<PathOf<Record<never, never>>, never>>,
  Expect<Equal<PathOf<Record<string, never>>, never>>,
  Expect<Equal<PathOf<Record<string, string>>, string>>,
  Expect<Equal<PathOf<Record<'foo' | 'bar', string>>, 'foo' | 'bar'>>,
  Expect<Equal<PathOf<Record<number, string>>, `${number}`>>,
  Expect<Equal<PathOf<Record<0 | 1, string>>, `${0 | 1}`>>,
  Expect<Equal<PathOf<Record<symbol, string>>, never>>,
  Expect<Equal<PathOf<Record<number | symbol, string>>, `${number}`>>,
  Expect<Equal<PathOf<Record<string | number | symbol, string>>, string>>,
  Expect<Equal<PathOf<{ [key: string]: never }>, never>>,
  Expect<Equal<PathOf<{ [key: string]: string }>, string>>,
  Expect<Equal<PathOf<{ [K in 'foo' | 'bar']: string }>, 'foo' | 'bar'>>,
  Expect<Equal<PathOf<{ [key: number]: string }>, `${number}`>>,
  Expect<Equal<PathOf<{ [K in 0 | 1]: string }>, `${0 | 1}`>>,
  Expect<Equal<PathOf<{ [key: symbol]: string }>, never>>,
  Expect<Equal<PathOf<{ [key: number | symbol]: string }>, `${number}`>>,
  Expect<Equal<PathOf<{ [key: string | number | symbol]: string }>, string>>,
  Expect<Equal<PathOf<{ a: number; b: string; c: symbol }>, 'a' | 'b' | 'c'>>,
  Expect<
    Equal<
      PathOf<{ readonly a: number; readonly b: string; readonly c: symbol }>,
      'a' | 'b' | 'c'
    >
  >,
  Expect<
    Equal<
      PathOf<{
        [key: string | number | symbol]: any
        a: number
        b: string
        c: symbol
      }>,
      string
    >
  >,
  Expect<
    Equal<
      PathOf<{ a: { b: { c: { d: { e: {} } } } } }>,
      'a' | 'a.b' | 'a.b.c' | 'a.b.c.d' | 'a.b.c.d.e'
    >
  >,
  Expect<
    Equal<
      PathOf<{ a: { b: { c: { d: { e: { f: {} } } } } } }>,
      'a' | 'a.b' | 'a.b.c' | 'a.b.c.d' | 'a.b.c.d.e' | `a.b.c.d.e.${string}`
    >
  >,
  Expect<Equal<PathOf<number | { a: string } | number[]>, 'a' | `${number}`>>,
  Expect<
    Equal<
      PathOf<
        number | [0, 1, { a: string | {} }] | { a?: { b?: { c?: [0, [0]] } } }
      >,
      | `${0 | 1 | 2}`
      | `${2}.a`
      | 'a'
      | 'a.b'
      | 'a.b.c'
      | `a.b.c.${0 | 1}`
      | 'a.b.c.1.0'
    >
  >,
]
