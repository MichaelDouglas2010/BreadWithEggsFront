import { ObjectId } from 'mongodb'

export interface MaintenanceGet{
    id: ObjectId
    equipmentId: string
    description: string
    cost: number
    date: string
    performedBy: string
    createdAt: string
}

export interface MaintenancePost{
    equipmentId: string
    description: string
    cost: number
    date: string
    performedBy: string
}