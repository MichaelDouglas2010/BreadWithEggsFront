import { ObjectId } from 'mongodb'

export interface UsageRecordGet{
    id: ObjectId
    equipmentId: string
    userId: string
    activity: string
    startTime: string
    endTime: string
    totalHours: number
    createdAt: string
}

export interface UsageRecordPost{
    equipmentId: string
    userId: string
    activity: string
    startTime: string
    endTime: string
    totalHours: number
}