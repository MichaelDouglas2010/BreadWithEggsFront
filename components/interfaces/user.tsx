import { ObjectId } from 'mongodb'

export default interface User{
    name: string
    email: string
    password: string
    team: string
}

export interface UserGet{
    id: ObjectId
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
