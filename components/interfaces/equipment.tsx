export interface EquipmentGet{
    id: string
    description: string
    marca: string
    dataEntrada: string
    status: string
    qrCodeData: string
}

export interface EquipmentPost{
    description: string
    marca: string
    status: string
    qrCodeData: string
}