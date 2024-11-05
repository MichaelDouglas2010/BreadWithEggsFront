import { ObjectId } from 'mongodb'

export interface EquipmentGet{
    _id: ObjectId
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

export interface EquipmentPut {
    
    status: string; // Propriedade que você está atualizando
    // Você pode adicionar outras propriedades que são relevantes para a atualização, se necessário
}
