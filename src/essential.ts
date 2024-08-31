import type { PathOf } from './pathOf'
import type { Normalize } from './common'

type __Essential<Target, Key extends keyof Target, Path> = Key extends
  | number
  | string
  ? Target[Key] extends infer Value
    ? Value extends any
      ? Essential<
          Value,
          Path extends `${Key}.${infer Rest extends PathOf<Value>}`
            ? Rest
            : never
        >
      : never
    : never
  : Target[Key]

type _Essential<
  Target,
  Key extends keyof Target,
  Path,
  Value = __Essential<Target, Key, Path>,
> = Key extends Path ? Exclude<Value, undefined> : Value

type Essential<Target, Path extends PathOf<Target>> = [Path] extends [never]
  ? Target
  : Target extends readonly any[]
    ? { [K in keyof Target]: _Essential<Target, K, Path> }
    : Target extends object
      ? Normalize<
          {
            [K in Exclude<keyof Target, Path>]: _Essential<Target, K, Path>
          } & {
            [K in Extract<keyof Target, Path>]-?: _Essential<Target, K, Path>
          }
        >
      : Target
