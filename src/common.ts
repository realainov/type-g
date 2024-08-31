export type IsTuple<Target> = [Target] extends [never]
  ? false
  : Target extends readonly [] | readonly [any, ...any[]]
    ? true
    : false

export type Normalize<Target> = { [K in keyof Target]: Target[K] } & {}

export type Expect<Expected extends true> = Expected

export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false
