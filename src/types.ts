export interface Invoice {
  id: string;
  vendor: string;
  category: 'x-rays' | 'labs' | 'supplies' | 'equipment' | 'pharmacy' | 'other';
  date: string;
  vendorCost: number;
  billedAmount: number;
  markup: number;
  confidence: number;
  status: 'pending' | 'confirmed';
}

export interface KPIs {
  totalRevenue: number;
  totalCosts: number;
  netProfit: number;
  avgMarkup: number;
  invoiceCount: number;
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  costs: number;
  profit: number;
}

export interface CategoryBreakdown {
  category: string;
  revenue: number;
  costs: number;
  profit: number;
  count: number;
}

export type AppView = 'dashboard' | 'upload' | 'review';

export interface UploadedFile {
  name: string;
  status: 'uploading' | 'processing' | 'complete';
  progress: number;
}
