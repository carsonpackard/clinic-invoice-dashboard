import { useState, useCallback } from 'react';
import { Dashboard } from './components/Dashboard';
import { UploadModal } from './components/UploadModal';
import { ReviewModal } from './components/ReviewModal';
import type { Invoice, AppView } from './types';
import { 
  initialInvoices, 
  fakeUploadedInvoices,
  calculateKPIs, 
  calculateChartData, 
  calculateCategoryBreakdown 
} from './data/seedData';

function App() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [pendingInvoices, setPendingInvoices] = useState<Invoice[]>([]);

  const kpis = calculateKPIs(invoices);
  const chartData = calculateChartData(invoices);
  const categoryBreakdown = calculateCategoryBreakdown(invoices);

  const handleUploadClick = useCallback(() => {
    setCurrentView('upload');
  }, []);

  const handleUploadClose = useCallback(() => {
    setCurrentView('dashboard');
  }, []);

  const handleProcessingComplete = useCallback(() => {
    setPendingInvoices(fakeUploadedInvoices);
    setCurrentView('review');
  }, []);

  const handleReviewClose = useCallback(() => {
    setPendingInvoices([]);
    setCurrentView('dashboard');
  }, []);

  const handleConfirmInvoices = useCallback((confirmedInvoices: Invoice[]) => {
    setInvoices(prev => [...prev, ...confirmedInvoices]);
    setPendingInvoices([]);
    setCurrentView('dashboard');
  }, []);

  return (
    <>
      <Dashboard
        invoices={invoices}
        kpis={kpis}
        chartData={chartData}
        categoryBreakdown={categoryBreakdown}
        onUploadClick={handleUploadClick}
      />
      
      {currentView === 'upload' && (
        <UploadModal
          onClose={handleUploadClose}
          onProcessingComplete={handleProcessingComplete}
        />
      )}
      
      {currentView === 'review' && pendingInvoices.length > 0 && (
        <ReviewModal
          invoices={pendingInvoices}
          onConfirm={handleConfirmInvoices}
          onClose={handleReviewClose}
        />
      )}
    </>
  );
}

export default App;
