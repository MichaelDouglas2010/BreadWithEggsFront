
export default interface User{
    _id: string
    name: string
    email: string
    password: string
    team: string
}

export interface UserGet{
    name: string
    email: string
    password: string
    team: string
    createdAt: string
}

export interface UserPost{
    name: string
    email: string
    password: string
    team: string
}
