import type { IsTuple } from './common'

export type KeyOf<Target> = Target extends object
  ? IsTuple<Target> extends true
    ? Exclude<keyof Target, symbol | keyof any[]>
    : Target extends readonly any[]
      ? Exclude<keyof Target, symbol | Exclude<keyof any[], number>>
      : Exclude<keyof Target, symbol>
  : never
