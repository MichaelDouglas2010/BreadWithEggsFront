export interface MaintenanceGet{
    _id: string;
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