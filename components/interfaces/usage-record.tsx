export interface UsageRecord {
  _id: string;
  equipmentId: string;
  userId: string;
  description?: string;
  marca?: string;
  activity: string;
  startTime: string;
  assinatura: string;
  observacoes: string;
  retiradoPor: string;
  totalHours: number;
  endTime: string | null; 
}


export interface UsageRecordGet {
  equipmentId: string;
  userId: string;
  description?: string;
  marca?: string;
  activity: string;
  startTime: string;
  assinatura: string;
  observacoes: string;
  retiradoPor: string;
  totalHours: number;
  endTime?: string | null;
}