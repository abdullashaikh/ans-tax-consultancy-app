import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  ArrowRight,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  CheckCircle2,
  Info,
  DollarSign,
  FileText,
} from 'lucide-react';
import { ConsultationModal } from '../components/shared/ConsultationModal';

export const TaxCalculator: React.FC = () => {
  // Income Inputs
  const [grossSalary, setGrossSalary] = useState<number>(1200000);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [rentalIncome, setRentalIncome] = useState<number>(0);

  // Deduction Inputs (Old Regime)
  const [section80C, setSection80C] = useState<number>(150000);
  const [section80D, setSection80D] = useState<number>(25000);
  const [homeLoanInterest, setHomeLoanInterest] = useState<number>(0);
  const [npsContribution, setNpsContribution] = useState<number>(50000);
  const [hraExemption, setHraExemption] = useState<number>(0);

  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Computation Logic
  const calculation = useMemo(() => {
    const totalGrossIncome = Number(grossSalary || 0) + Number(otherIncome || 0) + Number(rentalIncome || 0);

    // --- NEW REGIME CALCULATION ---
    const newRegimeStdDeduction = 75000; // FY 2024-25 / 2025-26 Budget update
    const newTaxableIncome = Math.max(0, totalGrossIncome - newRegimeStdDeduction);

    let newTax = 0;
    if (newTaxableIncome > 1500000) {
      newTax += (newTaxableIncome - 1500000) * 0.30;
      newTax += 300000 * 0.20; // 12L to 15L
      newTax += 200000 * 0.15; // 10L to 12L
      newTax += 300000 * 0.10; // 7L to 10L
      newTax += 400000 * 0.05; // 3L to 7L
    } else if (newTaxableIncome > 1200000) {
      newTax += (newTaxableIncome - 1200000) * 0.20;
      newTax += 200000 * 0.15; // 10L to 12L
      newTax += 300000 * 0.10; // 7L to 10L
      newTax += 400000 * 0.05; // 3L to 7L
    } else if (newTaxableIncome > 1000000) {
      newTax += (newTaxableIncome - 1000000) * 0.15;
      newTax += 300000 * 0.10; // 7L to 10L
      newTax += 400000 * 0.05; // 3L to 7L
    } else if (newTaxableIncome > 700000) {
      newTax += (newTaxableIncome - 700000) * 0.10;
      newTax += 400000 * 0.05; // 3L to 7L
    } else if (newTaxableIncome > 300000) {
      newTax += (newTaxableIncome - 300000) * 0.05;
    }

    // Section 87A rebate for New Regime up to 7,00,000 taxable income
    if (newTaxableIncome <= 700000) {
      newTax = 0;
    }

    const newCess = Math.round(newTax * 0.04);
    const newTotalTax = Math.round(newTax + newCess);

    // --- OLD REGIME CALCULATION ---
    const oldRegimeStdDeduction = 50000;
    const capped80C = Math.min(150000, Number(section80C || 0));
    const capped80D = Math.min(100000, Number(section80D || 0));
    const cappedHomeLoan = Math.min(200000, Number(homeLoanInterest || 0));
    const cappedNPS = Math.min(50000, Number(npsContribution || 0));
    const totalOldDeductions =
      oldRegimeStdDeduction +
      capped80C +
      capped80D +
      cappedHomeLoan +
      cappedNPS +
      Number(hraExemption || 0);

    const oldTaxableIncome = Math.max(0, totalGrossIncome - totalOldDeductions);

    let oldTax = 0;
    if (oldTaxableIncome > 1000000) {
      oldTax += (oldTaxableIncome - 1000000) * 0.30;
      oldTax += 500000 * 0.20; // 5L to 10L
      oldTax += 250000 * 0.05; // 2.5L to 5L
    } else if (oldTaxableIncome > 500000) {
      oldTax += (oldTaxableIncome - 500000) * 0.20;
      oldTax += 250000 * 0.05; // 2.5L to 5L
    } else if (oldTaxableIncome > 250000) {
      oldTax += (oldTaxableIncome - 250000) * 0.05;
    }

    // Section 87A rebate for Old Regime up to 5,00,000 taxable income
    if (oldTaxableIncome <= 500000) {
      oldTax = 0;
    }

    const oldCess = Math.round(oldTax * 0.04);
    const oldTotalTax = Math.round(oldTax + oldCess);

    const taxDiff = Math.abs(newTotalTax - oldTotalTax);
    const recommendedRegime = newTotalTax <= oldTotalTax ? 'NEW' : 'OLD';

    return {
      totalGrossIncome,
      newTaxableIncome,
      newTotalTax,
      oldTaxableIncome,
      totalOldDeductions,
      oldTotalTax,
      taxDiff,
      recommendedRegime,
    };
  }, [
    grossSalary,
    otherIncome,
    rentalIncome,
    section80C,
    section80D,
    homeLoanInterest,
    npsContribution,
    hraExemption,
  ]);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/20">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>FY 2024-25 & FY 2025-26 Tax Comparison</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Income Tax Calculator (Old vs New Regime)
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Compare your exact tax liability under the latest revised budget tax slabs. Discover which regime saves you more money before filing your return.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Section (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Income Sources */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                  1
                </span>
                <span>Annual Gross Income Sources</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
                    <label>Gross Salary / CTC (per annum)</label>
                    <span className="font-mono text-amber-700 font-bold">
                      ₹ {Number(grossSalary || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="number"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(Number(e.target.value))}
                    step={10000}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Interest / Dividend / Other Income
                    </label>
                    <input
                      type="number"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Rental Income from Property
                    </label>
                    <input
                      type="number"
                      value={rentalIncome}
                      onChange={(e) => setRentalIncome(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Deductions Section (Old Regime) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  <span>Eligible Tax Deductions & Exemptions</span>
                </h2>
                <span className="text-[11px] font-semibold text-slate-400">Applicable for Old Regime</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
                    <label>Section 80C (EPF, PPF, ELSS, Life Insurance, Tuition)</label>
                    <span className="font-mono text-blue-700 font-bold">
                      Max ₹ 1,50,000 (Current: ₹ {Number(section80C || 0).toLocaleString('en-IN')})
                    </span>
                  </div>
                  <input
                    type="number"
                    max={150000}
                    value={section80C}
                    onChange={(e) => setSection80C(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Section 80D (Health Insurance)
                    </label>
                    <input
                      type="number"
                      max={100000}
                      value={section80D}
                      onChange={(e) => setSection80D(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Section 24(b) (Home Loan Interest)
                    </label>
                    <input
                      type="number"
                      max={200000}
                      value={homeLoanInterest}
                      onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Section 80CCD(1B) (NPS Extra)
                    </label>
                    <input
                      type="number"
                      max={50000}
                      value={npsContribution}
                      onChange={(e) => setNpsContribution(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      HRA Exemption / Rent Paid
                    </label>
                    <input
                      type="number"
                      value={hraExemption}
                      onChange={(e) => setHraExemption(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Comparison (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Recommendation Card */}
            <div
              className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden ${
                calculation.recommendedRegime === 'NEW'
                  ? 'bg-gradient-to-br from-[#0c1833] to-[#1e3a6d]'
                  : 'bg-gradient-to-br from-[#0f281e] to-[#16503b]'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider">
                  Recommendation
                </span>
                <span className="text-xs text-slate-300">Based on your figures</span>
              </div>

              <h2 className="text-2xl font-black tracking-tight">
                {calculation.recommendedRegime === 'NEW'
                  ? 'New Tax Regime is Better'
                  : 'Old Tax Regime is Better'}
              </h2>

              <p className="mt-2 text-xs text-slate-200 leading-relaxed">
                {calculation.taxDiff === 0 ? (
                  'Both regimes result in the exact same tax liability for your income level.'
                ) : (
                  <>
                    You save <strong className="text-amber-400 font-bold text-sm">₹ {calculation.taxDiff.toLocaleString('en-IN')}</strong> by choosing the {calculation.recommendedRegime === 'NEW' ? 'New' : 'Old'} Tax Regime.
                  </>
                )}
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-300">New Regime Tax</span>
                  <p className="text-xl font-black text-white mt-1">
                    ₹ {calculation.newTotalTax.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-300">Old Regime Tax</span>
                  <p className="text-xl font-black text-white mt-1">
                    ₹ {calculation.oldTotalTax.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>File ITR with ANS Tax Experts</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Detailed Comparison Table */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-slate-900">Side-by-Side Breakdown</h3>
              <div className="space-y-2.5">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Gross Total Income</span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹ {calculation.totalGrossIncome.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Standard Deduction</span>
                  <span className="font-mono text-slate-700">
                    New: ₹75,000 | Old: ₹50,000
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Total Deductions Claimed</span>
                  <span className="font-mono text-slate-700">
                    New: ₹75,000 | Old: ₹{calculation.totalOldDeductions.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Net Taxable Income</span>
                  <span className="font-mono font-semibold text-slate-900">
                    New: ₹{calculation.newTaxableIncome.toLocaleString('en-IN')} | Old: ₹{calculation.oldTaxableIncome.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between py-2 font-bold text-slate-900">
                  <span>Net Tax Payable (incl. 4% Cess)</span>
                  <span className="font-mono text-amber-700">
                    New: ₹{calculation.newTotalTax.toLocaleString('en-IN')} | Old: ₹{calculation.oldTotalTax.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultService="Income Tax Return (ITR) Filing"
      />
    </div>
  );
};
