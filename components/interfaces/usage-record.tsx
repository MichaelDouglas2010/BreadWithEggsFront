export interface UsageRecordGet{
    id: string
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