import type { KeyOf } from './keyOf'

export type ValueOf<Target> = Target extends any ? Target[KeyOf<Target>] : never
