export interface Blog {
    id?: number,
    title: string,
    content: string,
    authorid?: number,
    author?: string
    _created?: string,
    _updated?: string,
    tag?: string
}

export interface Payload {
    [key: string]: any,
    userid?: number,
    unique?: string
}

export interface User {
    name?: string,
    email?: string,
    password?: string,
    role?: string
    id?: number
}