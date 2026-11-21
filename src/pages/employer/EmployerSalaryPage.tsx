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
  Plus,
  ShieldCheck,
  Check,
  XCircle,
  Upload,
  Receipt,
  Eye,
  User,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { PaymentRecord, PaymentStatus, PaymentMethod } from '../../types/platform';

interface EmployerSalaryPageProps {
  onNavigateTab: (tab: string) => void;
  onShowToast?: (msg: string) => void;
}

export const EmployerSalaryPage: React.FC<EmployerSalaryPageProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const { payments, employer, agreements, recordPayment } = usePlatform();

  const [showRecordModal, setShowRecordModal] = useState(false);
  const [selectedAgreementId, setSelectedAgreementId] = useState<string>('');
  const [periodLabel, setPeriodLabel] = useState<string>('November 2026');
  const [amount, setAmount] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Telebirr');
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [receiptFileName, setReceiptFileName] = useState<string>('');
  const [employerNotes, setEmployerNotes] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  const activeAgreements = agreements.filter(
    (a) => a.employerId === employer.id && a.status === 'active'
  );
  const myPayments = payments.filter((p) => p.employerId === employer.id);

  // KPIs
  const totalAgreedObligation = activeAgreements.reduce((sum, a) => sum + a.salaryAmount, 0);
  const totalDisbursed = myPayments.reduce((sum, p) => sum + p.reportedPaidAmount, 0);
  const awaitingWorkerCount = myPayments.filter(
    (p) => p.status === 'employer_reported' || (p.status === 'partially_paid' && p.reportedPaidAmount > p.confirmedReceivedAmount)
  ).length;
  const disputedCount = myPayments.filter((p) => p.status === 'disputed').length;

  const handleOpenRecordModal = (prefillAgreementId?: string) => {
    const agr = prefillAgreementId
      ? activeAgreements.find((a) => a.id === prefillAgreementId)
      : activeAgreements[0];

    if (agr) {
      setSelectedAgreementId(agr.id);
      setAmount(agr.salaryAmount);
    }
    setFormError(null);
    setShowRecordModal(true);
  };

  const handleRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgreementId) {
      setFormError('Please select an active employment agreement.');
      return;
    }
    if (amount <= 0) {
      setFormError('Disbursed payment amount must be greater than zero ETB.');
      return;
    }

    const res = recordPayment({
      agreementId: selectedAgreementId,
      periodLabel,
      amount,
      paymentDate,
      paymentMethod,
      transactionReference: transactionRef.trim() || undefined,
      receiptAttachmentName: receiptFileName.trim() || undefined,
      employerNotes: employerNotes.trim() || undefined,
    });

    if (res.success) {
      onShowToast?.(res.message);
      setShowRecordModal(false);
      setTransactionRef('');
      setReceiptFileName('');
      setEmployerNotes('');
    } else {
      setFormError(res.message);
    }
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
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800">
            <Clock size={12} className="text-blue-600" />
            <span>Logged • Awaiting Worker Confirmation</span>
          </span>
        );
      case 'disputed':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800 animate-pulse">
            <AlertCircle size={12} className="text-rose-600" />
            <span>Disputed by Worker</span>
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
            <Calendar size={12} className="text-slate-400" />
            <span>Upcoming Due</span>
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
            <span>Transparent Salary Disbursement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Salary Management & Payment Records
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
            Record monthly wage disbursements via Ethiopian payment channels (Telebirr, CBE Birr, Bank Transfer, or Cash with receipt). Every record notifies the worker for bilateral confirmation.
          </p>
        </div>

        <button
          disabled={activeAgreements.length === 0}
          onClick={() => handleOpenRecordModal()}
          className="rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 px-5 py-3.5 text-xs font-black transition shadow-lg flex items-center justify-center gap-2 shrink-0"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Record a Payment</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Active Monthly Obligations
            </span>
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-800">
              <Coins size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900 font-mono">
            ETB {totalAgreedObligation.toLocaleString()}
          </div>
          <p className="mt-1 text-xs text-slate-500">{activeAgreements.length} active employment contract{activeAgreements.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Disbursed (Logged)
            </span>
            <div className="rounded-xl bg-blue-100 p-2 text-blue-800">
              <CreditCard size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-blue-800 font-mono">
            ETB {totalDisbursed.toLocaleString()}
          </div>
          <p className="mt-1 text-xs text-slate-500">Transferred via bank, Telebirr, or cash voucher</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Awaiting Worker Confirmation
            </span>
            <div className="rounded-xl bg-amber-100 p-2 text-amber-800">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-amber-700 font-mono">
            {awaitingWorkerCount}
          </div>
          <p className="mt-1 text-xs text-slate-500">Payments sent awaiting employee verification</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Disputed Records
            </span>
            <div className="rounded-xl bg-rose-100 p-2 text-rose-800">
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-rose-700 font-mono">
            {disputedCount}
          </div>
          <p className="mt-1 text-xs text-slate-500">Discrepancies reported by worker requiring review</p>
        </div>
      </div>

      {/* Payment Ledger Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">Salary Disbursements & Schedule Ledger</h2>
            <p className="text-xs text-slate-500">All payment records tied to active and historic contracts</p>
          </div>
          <div className="text-xs text-slate-400">
            Official currency: <strong className="text-slate-700">Ethiopian Birr (ETB)</strong>
          </div>
        </div>

        {myPayments.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <FileText size={36} className="mx-auto mb-2 text-slate-300" />
            <p className="text-xs">No salary payments recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Period & Ref</th>
                  <th className="py-3.5 px-4">Worker</th>
                  <th className="py-3.5 px-4">Contract Ref</th>
                  <th className="py-3.5 px-4">Expected (ETB)</th>
                  <th className="py-3.5 px-4">Disbursed (ETB)</th>
                  <th className="py-3.5 px-4">Balance Remaining</th>
                  <th className="py-3.5 px-4">Payment Method</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {myPayments.map((p) => {
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-4 px-4 sm:px-6">
                        <span className="font-bold text-slate-900 block">{p.periodLabel}</span>
                        <span className="font-mono text-[11px] text-slate-400">{p.paymentReference}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-slate-900 flex items-center gap-1">
                          <User size={13} className="text-slate-400" />
                          {p.workerName}
                        </span>
                        <span className="text-[11px] text-slate-400 block">{p.jobTitle}</span>
                      </td>

                      <td className="py-4 px-4 font-mono text-[11px] text-slate-600">
                        {p.agreementRef}
                      </td>

                      <td className="py-4 px-4 font-bold text-slate-900 font-mono">
                        ETB {p.expectedAmount.toLocaleString()}
                      </td>

                      <td className="py-4 px-4 font-bold font-mono text-emerald-700">
                        {p.reportedPaidAmount > 0 ? (
                          `ETB ${p.reportedPaidAmount.toLocaleString()}`
                        ) : (
                          <span className="text-slate-400 font-normal">Pending disbursement</span>
                        )}
                      </td>

                      <td className="py-4 px-4 font-bold font-mono">
                        {p.outstandingAmount > 0 ? (
                          <span className="text-amber-700">ETB {p.outstandingAmount.toLocaleString()}</span>
                        ) : (
                          <span className="text-emerald-700 font-bold">ETB 0 (Settled)</span>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        {p.paymentMethod ? (
                          <span className="font-medium text-slate-800">{p.paymentMethod}</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      <td className="py-4 px-4">{getStatusBadge(p.status)}</td>

                      <td className="py-4 px-4 sm:px-6 text-right">
                        {p.status === 'disputed' && (
                          <div className="text-[11px] text-rose-700 font-bold bg-rose-50 p-2 rounded-xl border border-rose-200 text-left max-w-xs">
                            <span className="block font-black text-rose-900">Worker Dispute:</span>
                            "{p.workerDisputeReason}"
                          </div>
                        )}

                        {p.status === 'upcoming' && (
                          <button
                            onClick={() => handleOpenRecordModal(p.agreementId)}
                            className="rounded-xl bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-emerald-700 shadow-2xs"
                          >
                            Disburse
                          </button>
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

      {/* Record Payment Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            <div className="px-6 py-4 bg-[#092e22] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-bold">
                  <CreditCard size={22} />
                </div>
                <div>
                  <h2 className="text-base font-bold font-display text-white">Record Salary Disbursement</h2>
                  <p className="text-xs text-emerald-300">Ethiopian Birr (ETB) • Bilateral Verification</p>
                </div>
              </div>
              <button
                onClick={() => setShowRecordModal(false)}
                className="rounded-xl p-2 text-emerald-300 hover:bg-emerald-900/60 hover:text-white transition"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleRecordSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-900 text-xs sm:text-sm">
              {formError && (
                <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="text-rose-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Agreement selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Employment Agreement
                </label>
                <select
                  value={selectedAgreementId}
                  onChange={(e) => {
                    setSelectedAgreementId(e.target.value);
                    const sel = activeAgreements.find((a) => a.id === e.target.value);
                    if (sel) setAmount(sel.salaryAmount);
                  }}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  required
                >
                  {activeAgreements.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.workerName} — {a.jobTitle} ({a.referenceNumber} • ETB {a.salaryAmount.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Period & Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Period</label>
                  <input
                    type="text"
                    value={periodLabel}
                    onChange={(e) => setPeriodLabel(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                    placeholder="e.g. November 2026"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Disbursed Amount (ETB)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min={1}
                    step={50}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold focus:border-emerald-600 focus:outline-hidden"
                    required
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Supports partial payment. Outstanding balances are automatically tracked.
                  </span>
                </div>
              </div>

              {/* Payment Method & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  >
                    <option value="Telebirr">Telebirr (Ethio Telecom)</option>
                    <option value="Bank Transfer (CBE)">Commercial Bank of Ethiopia (CBE)</option>
                    <option value="Bank Transfer (Other)">Other Ethiopian Bank Transfer</option>
                    <option value="Cash">Cash in Hand (with signed receipt)</option>
                    <option value="Other Mobile Money">CBE Birr / Other Mobile Money</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Disbursement Date</label>
                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              {/* Transaction Ref & Receipt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Transaction / Transfer Reference (Optional)
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-mono focus:border-emerald-600 focus:outline-hidden"
                    placeholder="e.g. TB-982140192"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Receipt Attachment (Simulated)
                  </label>
                  <input
                    type="text"
                    value={receiptFileName}
                    onChange={(e) => setReceiptFileName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                    placeholder="e.g. telebirr_nov_sms.png"
                  />
                </div>
              </div>

              {/* Employer Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Disbursement Notes / Context
                </label>
                <textarea
                  value={employerNotes}
                  onChange={(e) => setEmployerNotes(e.target.value)}
                  placeholder="e.g. November salary advance paid via Telebirr. Remaining balance due on the 30th."
                  rows={2}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-emerald-900 text-[11px] flex items-start gap-2">
                <ShieldCheck size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  <strong>AMANA Bi-lateral Notice:</strong> This disbursement record will be immediately visible on the worker's salary dashboard for their digital verification.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowRecordModal(false)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-sm flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Log Formal Payment Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};