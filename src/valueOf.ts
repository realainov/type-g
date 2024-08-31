export type ValueOf<Target> = Target extends any ? Target[keyof Target] : never
