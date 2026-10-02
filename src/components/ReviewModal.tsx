import { useState } from 'react';
import { X, CheckCircle, AlertCircle, Edit3, Sparkles } from 'lucide-react';
import type { Invoice } from '../types';
import { getCategoryDisplayName } from '../data/seedData';

interface ReviewModalProps {
  invoices: Invoice[];
  onConfirm: (invoices: Invoice[]) => void;
  onClose: () => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function ReviewModal({ invoices, onConfirm, onClose }: ReviewModalProps) {
  const [editableInvoices, setEditableInvoices] = useState<Invoice[]>(invoices);
  const [editingField, setEditingField] = useState<{ invoiceId: string; field: string } | null>(null);

  const updateInvoice = (id: string, field: keyof Invoice, value: string | number) => {
    setEditableInvoices(prev => prev.map(inv => {
      if (inv.id !== id) return inv;
      
      const updated = { ...inv, [field]: value };
      
      if (field === 'vendorCost' || field === 'markup') {
        const cost = field === 'vendorCost' ? Number(value) : inv.vendorCost;
        const markup = field === 'markup' ? Number(value) : inv.markup;
        updated.billedAmount = Math.round(cost * (1 + markup / 100));
      }
      
      return updated;
    }));
  };

  const handleConfirm = () => {
    const confirmedInvoices = editableInvoices.map(inv => ({
      ...inv,
      status: 'confirmed' as const,
    }));
    onConfirm(confirmedInvoices);
  };

  const totalRevenue = editableInvoices.reduce((sum, inv) => sum + inv.billedAmount, 0);
  const totalCosts = editableInvoices.reduce((sum, inv) => sum + inv.vendorCost, 0);
  const totalProfit = totalRevenue - totalCosts;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Review Extracted Data</h2>
              <p className="text-sm text-slate-500">AI has extracted {invoices.length} invoices — verify and confirm</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {editableInvoices.map((invoice) => (
              <div key={invoice.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-800">{invoice.vendor}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-700">
                        {getCategoryDisplayName(invoice.category)}
                      </span>
                      <span className="text-sm text-slate-500">{invoice.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {invoice.confidence >= 95 ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        High Confidence ({invoice.confidence}%)
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Review ({invoice.confidence}%)
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Vendor Cost */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Vendor Cost
                    </label>
                    {editingField?.invoiceId === invoice.id && editingField?.field === 'vendorCost' ? (
                      <input
                        type="number"
                        defaultValue={invoice.vendorCost}
                        autoFocus
                        onBlur={(e) => {
                          updateInvoice(invoice.id, 'vendorCost', Number(e.target.value));
                          setEditingField(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            updateInvoice(invoice.id, 'vendorCost', Number((e.target as HTMLInputElement).value));
                            setEditingField(null);
                          }
                        }}
                        className="w-full px-3 py-2 border border-teal-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    ) : (
                      <div 
                        onClick={() => setEditingField({ invoiceId: invoice.id, field: 'vendorCost' })}
                        className="flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-teal-400 transition-colors group"
                      >
                        <span className="text-sm font-medium text-slate-800">
                          {formatCurrency(invoice.vendorCost)}
                        </span>
                        <Edit3 className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>

                  {/* Markup */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Markup %
                    </label>
                    {editingField?.invoiceId === invoice.id && editingField?.field === 'markup' ? (
                      <input
                        type="number"
                        defaultValue={invoice.markup}
                        autoFocus
                        onBlur={(e) => {
                          updateInvoice(invoice.id, 'markup', Number(e.target.value));
                          setEditingField(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            updateInvoice(invoice.id, 'markup', Number((e.target as HTMLInputElement).value));
                            setEditingField(null);
                          }
                        }}
                        className="w-full px-3 py-2 border border-teal-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    ) : (
                      <div 
                        onClick={() => setEditingField({ invoiceId: invoice.id, field: 'markup' })}
                        className="flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-teal-400 transition-colors group"
                      >
                        <span className="text-sm font-medium text-slate-800">
                          {invoice.markup}%
                        </span>
                        <Edit3 className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>

                  {/* Billed Amount */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Billed Amount
                    </label>
                    <div className="px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <span className="text-sm font-semibold text-emerald-700">
                        {formatCurrency(invoice.billedAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Profit */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Profit
                    </label>
                    <div className="px-3 py-2 bg-teal-50 border border-teal-200 rounded-lg">
                      <span className="text-sm font-semibold text-teal-700">
                        +{formatCurrency(invoice.billedAmount - invoice.vendorCost)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <span className="text-xs text-slate-500">Total Revenue</span>
                <p className="text-lg font-bold text-slate-800">{formatCurrency(totalRevenue)}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Total Costs</span>
                <p className="text-lg font-bold text-slate-800">{formatCurrency(totalCosts)}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Net Profit</span>
                <p className="text-lg font-bold text-emerald-600">+{formatCurrency(totalProfit)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirm & Add to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
