import type { Normalize } from './common'
import type { PathOf } from './pathOf'

type __Optional<Target, Key extends keyof Target, Path> = Key extends
  | number
  | string
  ? Target[Key] extends infer Value
    ? Value extends any
      ? Optional<
          Value,
          Path extends `${Key}.${infer Rest extends PathOf<Value>}`
            ? Rest
            : never
        >
      : never
    : never
  : Target[Key]

type _Optional<
  Target,
  Key extends keyof Target,
  Path,
  Value = __Optional<Target, Key, Path>,
> = Key extends Path ? Value | undefined : Value

export type Optional<Target, Path extends PathOf<Target>> = [Path] extends [
  never,
]
  ? Target
  : Target extends any[]
    ? { [K in keyof Target]: _Optional<Target, K, Path> }
    : Target extends object
      ? Normalize<
          { [K in Exclude<keyof Target, Path>]: _Optional<Target, K, Path> } & {
            [K in Extract<keyof Target, Path>]?: _Optional<Target, K, Path>
          }
        >
      : Target
