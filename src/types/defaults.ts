export type Defaults = {
    json: boolean,
    headers: { [key: string]: string }
}

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};