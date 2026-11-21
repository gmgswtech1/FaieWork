import React, { useState } from 'react';
import {
  Coins,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  CreditCard,
  FileText,
  Building2,
  ArrowUpRight,
  ShieldCheck,
  Check,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { PaymentRecord, PaymentStatus } from '../../types/platform';

interface WorkerSalaryPageProps {
  onNavigateTab: (tab: string) => void;
  onShowToast?: (msg: string) => void;
}

export const WorkerSalaryPage: React.FC<WorkerSalaryPageProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const { payments, worker, confirmPaymentReceived, disputePayment, agreements } = usePlatform();

  const [selectedDisputePayment, setSelectedDisputePayment] = useState<PaymentRecord | null>(null);
  const [disputeReason, setDisputeReason] = useState('');
  const [selectedConfirmPayment, setSelectedConfirmPayment] = useState<PaymentRecord | null>(null);

  const myPayments = payments.filter((p) => p.workerId === worker.id);
  const activeAgreement = agreements.find((a) => a.workerId === worker.id && a.status === 'active');

  // KPI calculations
  const totalConfirmed = myPayments.reduce((acc, p) => acc + p.confirmedReceivedAmount, 0);
  const totalOutstanding = myPayments.reduce((acc, p) => acc + p.outstandingAmount, 0);
  const pendingConfirmationCount = myPayments.filter(
    (p) => p.status === 'employer_reported' || (p.status === 'partially_paid' && p.reportedPaidAmount > p.confirmedReceivedAmount)
  ).length;

  const handleConfirmSubmit = () => {
    if (!selectedConfirmPayment) return;
    const res = confirmPaymentReceived(selectedConfirmPayment.id);
    onShowToast?.(res.message);
    setSelectedConfirmPayment(null);
  };

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDisputePayment || !disputeReason.trim()) return;
    const res = disputePayment(selectedDisputePayment.id, disputeReason.trim());
    onShowToast?.(res.message);
    setSelectedDisputePayment(null);
    setDisputeReason('');
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'worker_confirmed':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
            <CheckCircle2 size={12} className="text-emerald-600" />
            <span>Worker Confirmed</span>
          </span>
        );
      case 'partially_paid':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
            <Clock size={12} className="text-amber-600" />
            <span>Partially Paid</span>
          </span>
        );
      case 'employer_reported':
      case 'awaiting_worker_confirmation':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 animate-pulse">
            <Clock size={12} className="text-blue-600" />
            <span>Employer Reported • Needs Your Confirmation</span>
          </span>
        );
      case 'disputed':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">
            <AlertCircle size={12} className="text-rose-600" />
            <span>Payment Disputed</span>
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
            <Calendar size={12} className="text-slate-400" />
            <span>Upcoming Scheduled</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600 capitalize">
            {status.replace(/_/g, ' ')}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#092e22] to-[#124d3a] p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 mb-3 border border-emerald-400/30">
            <ShieldCheck size={14} />
            <span>Protected Salary Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Salary Schedules & Payment Tracking
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
            Track contractual wages in Ethiopian Birr (ETB). Employers record payments with receipts; you confirm receipt or dispute discrepancies directly.
          </p>
        </div>

        {activeAgreement && (
          <div className="bg-emerald-950/60 rounded-2xl p-4 border border-emerald-800/60 shrink-0 text-center sm:text-right">
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              ETB {activeAgreement.salaryAmount.toLocaleString()}
            </div>
            <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
              Agreed Monthly Salary
            </div>
            <div className="mt-1 text-[11px] text-emerald-200">
              Contract {activeAgreement.referenceNumber}
            </div>
          </div>
        )}
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Confirmed Received
            </span>
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-800">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900 font-mono">
            ETB {totalConfirmed.toLocaleString()}
          </div>
          <p className="mt-1 text-xs text-slate-500">Verified by your personal receipt confirmation</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Outstanding Scheduled Balance
            </span>
            <div className="rounded-xl bg-amber-100 p-2 text-amber-800">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-amber-700 font-mono">
            ETB {totalOutstanding.toLocaleString()}
          </div>
          <p className="mt-1 text-xs text-slate-500">Scheduled under active agreement milestones</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Awaiting Your Confirmation
            </span>
            <div className="rounded-xl bg-blue-100 p-2 text-blue-800">
              <CreditCard size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-blue-700 font-mono">
            {pendingConfirmationCount}
          </div>
          <p className="mt-1 text-xs text-slate-500">Disbursements reported by employer to confirm</p>
        </div>
      </div>

      {/* Payment Ledger Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">Payment Ledger & Receipts</h2>
            <p className="text-xs text-slate-500">All payment records tied to your employment contracts</p>
          </div>
          <div className="text-xs text-slate-400">
            Currency: <strong className="text-slate-700">ETB (Ethiopian Birr)</strong>
          </div>
        </div>

        {myPayments.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <FileText size={36} className="mx-auto mb-2 text-slate-300" />
            <p className="text-xs">No payment records currently scheduled.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Period & Ref</th>
                  <th className="py-3.5 px-4">Contract / Employer</th>
                  <th className="py-3.5 px-4">Expected (ETB)</th>
                  <th className="py-3.5 px-4">Reported Paid</th>
                  <th className="py-3.5 px-4">Confirmed</th>
                  <th className="py-3.5 px-4">Balance Due</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {myPayments.map((p) => {
                  const needsConfirmation =
                    p.status === 'employer_reported' ||
                    (p.status === 'partially_paid' && p.reportedPaidAmount > p.confirmedReceivedAmount);

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-4 px-4 sm:px-6">
                        <span className="font-bold text-slate-900 block">{p.periodLabel}</span>
                        <span className="font-mono text-[11px] text-slate-400">{p.paymentReference}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-medium text-slate-800 block">{p.employerName}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{p.agreementRef}</span>
                      </td>

                      <td className="py-4 px-4 font-bold text-slate-900 font-mono">
                        ETB {p.expectedAmount.toLocaleString()}
                      </td>

                      <td className="py-4 px-4 font-bold font-mono">
                        {p.reportedPaidAmount > 0 ? (
                          <div>
                            <span className="text-emerald-700">ETB {p.reportedPaidAmount.toLocaleString()}</span>
                            {p.paymentMethod && (
                              <span className="block text-[10px] text-slate-400 font-normal">
                                via {p.paymentMethod}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 font-normal">—</span>
                        )}
                      </td>

                      <td className="py-4 px-4 font-bold font-mono text-emerald-700">
                        {p.confirmedReceivedAmount > 0 ? `ETB ${p.confirmedReceivedAmount.toLocaleString()}` : '—'}
                      </td>

                      <td className="py-4 px-4 font-bold font-mono">
                        {p.outstandingAmount > 0 ? (
                          <span className="text-amber-700">ETB {p.outstandingAmount.toLocaleString()}</span>
                        ) : (
                          <span className="text-emerald-700">Settled</span>
                        )}
                      </td>

                      <td className="py-4 px-4">{getStatusBadge(p.status)}</td>

                      <td className="py-4 px-4 sm:px-6 text-right space-x-2">
                        {needsConfirmation && (
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => setSelectedConfirmPayment(p)}
                              className="rounded-xl bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-emerald-700 shadow-2xs flex items-center gap-1"
                            >
                              <Check size={13} />
                              <span>Confirm Received</span>
                            </button>

                            <button
                              onClick={() => setSelectedDisputePayment(p)}
                              className="rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-[11px] font-bold text-rose-800 hover:bg-rose-100 flex items-center gap-1"
                            >
                              <XCircle size={13} />
                              <span>Dispute</span>
                            </button>
                          </div>
                        )}

                        {p.status === 'worker_confirmed' && (
                          <span className="text-[11px] text-emerald-700 font-bold flex items-center justify-end gap-1">
                            <CheckCircle2 size={13} />
                            Verified
                          </span>
                        )}

                        {p.status === 'disputed' && (
                          <span className="text-[11px] text-rose-700 font-semibold" title={p.workerDisputeReason}>
                            Escalated
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Dialog Modal */}
      {selectedConfirmPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 text-emerald-700 p-2.5">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Confirm Salary Receipt
                </h3>
                <p className="text-slate-500 text-xs">{selectedConfirmPayment.periodLabel} • {selectedConfirmPayment.paymentReference}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-emerald-50/70 p-4 border border-emerald-100 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Reported Amount Paid:</span>
                <span className="font-bold text-emerald-800 font-mono">
                  ETB {selectedConfirmPayment.reportedPaidAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Method:</span>
                <span className="font-medium text-slate-700">{selectedConfirmPayment.paymentMethod || 'Direct'}</span>
              </div>
              {selectedConfirmPayment.transactionReference && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Txn Reference:</span>
                  <span className="font-mono text-slate-700">{selectedConfirmPayment.transactionReference}</span>
                </div>
              )}
            </div>

            <p className="mt-3 text-slate-600 leading-relaxed text-xs">
              Did you receive this exact amount in your account or in cash? Your confirmation updates the formal audit record.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedConfirmPayment(null)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-sm flex items-center gap-1.5"
              >
                <Check size={14} />
                <span>Yes, Confirm Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Modal */}
      {selectedDisputePayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-rose-100 text-rose-700 p-2.5">
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Dispute Payment Record
                </h3>
                <p className="text-slate-500 text-xs">{selectedDisputePayment.paymentReference}</p>
              </div>
            </div>

            <p className="mt-3 text-slate-600 leading-relaxed text-xs">
              Explain why you are disputing this record (e.g. money not received, incorrect amount, or unapproved deduction). This will notify the employer and flag the payment for resolution.
            </p>

            <form onSubmit={handleDisputeSubmit} className="mt-4 space-y-4">
              <textarea
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                placeholder="e.g. Telebirr SMS was not received, or amount was ETB 1,000 less than reported..."
                rows={4}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-rose-600 focus:outline-hidden"
                required
              />

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDisputePayment(null)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-sm flex items-center gap-1.5"
                >
                  <AlertCircle size={14} />
                  <span>Submit Payment Dispute</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};