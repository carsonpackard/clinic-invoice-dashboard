import type { Invoice, ChartDataPoint, CategoryBreakdown } from '../types';

const categoryDisplayNames: Record<string, string> = {
  'x-rays': 'X-Rays',
  'labs': 'Lab Work',
  'supplies': 'Medical Supplies',
  'equipment': 'Equipment',
  'pharmacy': 'Pharmacy',
  'other': 'Other Services'
};

export const getCategoryDisplayName = (category: string): string => {
  return categoryDisplayNames[category] || category;
};

export const initialInvoices: Invoice[] = [
  { id: '1', vendor: 'RadiologyPartners Inc.', category: 'x-rays', date: '2024-01-15', vendorCost: 2400, billedAmount: 3120, markup: 30, confidence: 98, status: 'confirmed' },
  { id: '2', vendor: 'LabCorp Diagnostics', category: 'labs', date: '2024-01-18', vendorCost: 1850, billedAmount: 2405, markup: 30, confidence: 96, status: 'confirmed' },
  { id: '3', vendor: 'MedSupply Direct', category: 'supplies', date: '2024-01-22', vendorCost: 3200, billedAmount: 4160, markup: 30, confidence: 99, status: 'confirmed' },
  { id: '4', vendor: 'Quest Diagnostics', category: 'labs', date: '2024-01-25', vendorCost: 2100, billedAmount: 2730, markup: 30, confidence: 97, status: 'confirmed' },
  { id: '5', vendor: 'ImageFirst Radiology', category: 'x-rays', date: '2024-02-02', vendorCost: 1950, billedAmount: 2535, markup: 30, confidence: 95, status: 'confirmed' },
  { id: '6', vendor: 'Cardinal Health', category: 'pharmacy', date: '2024-02-08', vendorCost: 4500, billedAmount: 5625, markup: 25, confidence: 98, status: 'confirmed' },
  { id: '7', vendor: 'Siemens Healthineers', category: 'equipment', date: '2024-02-12', vendorCost: 8500, billedAmount: 10200, markup: 20, confidence: 94, status: 'confirmed' },
  { id: '8', vendor: 'LabCorp Diagnostics', category: 'labs', date: '2024-02-15', vendorCost: 2300, billedAmount: 2990, markup: 30, confidence: 97, status: 'confirmed' },
  { id: '9', vendor: 'RadiologyPartners Inc.', category: 'x-rays', date: '2024-02-20', vendorCost: 2800, billedAmount: 3640, markup: 30, confidence: 98, status: 'confirmed' },
  { id: '10', vendor: 'MedSupply Direct', category: 'supplies', date: '2024-02-25', vendorCost: 1600, billedAmount: 2080, markup: 30, confidence: 99, status: 'confirmed' },
  { id: '11', vendor: 'BioReference Labs', category: 'labs', date: '2024-03-01', vendorCost: 1750, billedAmount: 2275, markup: 30, confidence: 96, status: 'confirmed' },
  { id: '12', vendor: 'ImageFirst Radiology', category: 'x-rays', date: '2024-03-05', vendorCost: 2200, billedAmount: 2860, markup: 30, confidence: 95, status: 'confirmed' },
  { id: '13', vendor: 'McKesson Medical', category: 'supplies', date: '2024-03-10', vendorCost: 2900, billedAmount: 3770, markup: 30, confidence: 98, status: 'confirmed' },
  { id: '14', vendor: 'CVS Pharmacy', category: 'pharmacy', date: '2024-03-15', vendorCost: 3800, billedAmount: 4750, markup: 25, confidence: 97, status: 'confirmed' },
  { id: '15', vendor: 'Quest Diagnostics', category: 'labs', date: '2024-03-18', vendorCost: 2450, billedAmount: 3185, markup: 30, confidence: 96, status: 'confirmed' },
  { id: '16', vendor: 'GE Healthcare', category: 'equipment', date: '2024-03-22', vendorCost: 12000, billedAmount: 14400, markup: 20, confidence: 93, status: 'confirmed' },
  { id: '17', vendor: 'RadiologyPartners Inc.', category: 'x-rays', date: '2024-03-28', vendorCost: 3100, billedAmount: 4030, markup: 30, confidence: 98, status: 'confirmed' },
  { id: '18', vendor: 'LabCorp Diagnostics', category: 'labs', date: '2024-04-02', vendorCost: 1950, billedAmount: 2535, markup: 30, confidence: 97, status: 'confirmed' },
  { id: '19', vendor: 'MedSupply Direct', category: 'supplies', date: '2024-04-08', vendorCost: 2100, billedAmount: 2730, markup: 30, confidence: 99, status: 'confirmed' },
  { id: '20', vendor: 'Cleaning Services Pro', category: 'other', date: '2024-04-12', vendorCost: 800, billedAmount: 960, markup: 20, confidence: 92, status: 'confirmed' },
  { id: '21', vendor: 'ImageFirst Radiology', category: 'x-rays', date: '2024-04-15', vendorCost: 2650, billedAmount: 3445, markup: 30, confidence: 95, status: 'confirmed' },
  { id: '22', vendor: 'Cardinal Health', category: 'pharmacy', date: '2024-04-20', vendorCost: 5200, billedAmount: 6500, markup: 25, confidence: 98, status: 'confirmed' },
  { id: '23', vendor: 'BioReference Labs', category: 'labs', date: '2024-04-25', vendorCost: 2800, billedAmount: 3640, markup: 30, confidence: 96, status: 'confirmed' },
  { id: '24', vendor: 'IT Support Services', category: 'other', date: '2024-04-28', vendorCost: 1500, billedAmount: 1800, markup: 20, confidence: 91, status: 'confirmed' },
];

export const fakeUploadedInvoices: Invoice[] = [
  { id: 'new-1', vendor: 'Advanced Imaging Center', category: 'x-rays', date: '2024-05-02', vendorCost: 3250, billedAmount: 4225, markup: 30, confidence: 94, status: 'pending' },
  { id: 'new-2', vendor: 'Precision Lab Services', category: 'labs', date: '2024-05-03', vendorCost: 1890, billedAmount: 2457, markup: 30, confidence: 92, status: 'pending' },
  { id: 'new-3', vendor: 'MediEquip Rentals', category: 'equipment', date: '2024-05-05', vendorCost: 4800, billedAmount: 5760, markup: 20, confidence: 89, status: 'pending' },
];

export const fakeFileNames = [
  'INV-2024-05-001_AdvancedImaging_XRay.pdf',
  'PO-87234_PrecisionLabs_Bloodwork.pdf',
  'LEASE-Q2-MediEquip_CTScanner.pdf',
];

export function calculateKPIs(invoices: Invoice[]): { totalRevenue: number; totalCosts: number; netProfit: number; avgMarkup: number; invoiceCount: number } {
  const confirmed = invoices.filter(inv => inv.status === 'confirmed');
  const totalRevenue = confirmed.reduce((sum, inv) => sum + inv.billedAmount, 0);
  const totalCosts = confirmed.reduce((sum, inv) => sum + inv.vendorCost, 0);
  const netProfit = totalRevenue - totalCosts;
  const avgMarkup = confirmed.length > 0 
    ? confirmed.reduce((sum, inv) => sum + inv.markup, 0) / confirmed.length 
    : 0;
  
  return {
    totalRevenue,
    totalCosts,
    netProfit,
    avgMarkup: Math.round(avgMarkup * 10) / 10,
    invoiceCount: confirmed.length,
  };
}

export function calculateChartData(invoices: Invoice[]): ChartDataPoint[] {
  const confirmed = invoices.filter(inv => inv.status === 'confirmed');
  const monthlyData: Record<string, { revenue: number; costs: number }> = {};
  
  confirmed.forEach(inv => {
    const month = inv.date.substring(0, 7);
    if (!monthlyData[month]) {
      monthlyData[month] = { revenue: 0, costs: 0 };
    }
    monthlyData[month].revenue += inv.billedAmount;
    monthlyData[month].costs += inv.vendorCost;
  });
  
  const months = Object.keys(monthlyData).sort();
  return months.map(month => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [year, monthNum] = month.split('-');
    const displayMonth = `${monthNames[parseInt(monthNum) - 1]} ${year.slice(2)}`;
    
    return {
      month: displayMonth,
      revenue: monthlyData[month].revenue,
      costs: monthlyData[month].costs,
      profit: monthlyData[month].revenue - monthlyData[month].costs,
    };
  });
}

export function calculateCategoryBreakdown(invoices: Invoice[]): CategoryBreakdown[] {
  const confirmed = invoices.filter(inv => inv.status === 'confirmed');
  const categoryData: Record<string, { revenue: number; costs: number; count: number }> = {};
  
  confirmed.forEach(inv => {
    if (!categoryData[inv.category]) {
      categoryData[inv.category] = { revenue: 0, costs: 0, count: 0 };
    }
    categoryData[inv.category].revenue += inv.billedAmount;
    categoryData[inv.category].costs += inv.vendorCost;
    categoryData[inv.category].count += 1;
  });
  
  return Object.entries(categoryData).map(([category, data]) => ({
    category: getCategoryDisplayName(category),
    revenue: data.revenue,
    costs: data.costs,
    profit: data.revenue - data.costs,
    count: data.count,
  })).sort((a, b) => b.profit - a.profit);
}
