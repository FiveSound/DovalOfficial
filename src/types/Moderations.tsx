export interface ModeratableItem {
  id: string | number;
  name?: string;
  descripcion?: string;
  [key: string]: any;
}

export interface ProcessedData {
  approvedData: ModeratableItem[];
  inappropriateData: (ModeratableItem & { reason: string })[];
}
