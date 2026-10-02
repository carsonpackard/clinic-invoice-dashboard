import { TrendingUp, TrendingDown, DollarSign, FileText, Percent } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  icon: 'revenue' | 'costs' | 'profit' | 'invoices' | 'markup';
  trend?: 'up' | 'down';
  subtitle?: string;
}

const iconMap = {
  revenue: DollarSign,
  costs: TrendingDown,
  profit: TrendingUp,
  invoices: FileText,
  markup: Percent,
};

const colorMap = {
  revenue: 'bg-blue-500',
  costs: 'bg-red-500',
  profit: 'bg-emerald-500',
  invoices: 'bg-purple-500',
  markup: 'bg-amber-500',
};

export function KPICard({ title, value, icon, trend, subtitle }: KPICardProps) {
  const Icon = iconMap[icon];
  const bgColor = colorMap[icon];
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {trend && (
        <div className={`mt-3 flex items-center text-sm ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          <span>{trend === 'up' ? '+12.5%' : '-3.2%'} vs last period</span>
        </div>
      )}
    </div>
  );
}
