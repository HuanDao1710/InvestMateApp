import {HttpStatusCode} from 'axios';

export interface Response<T> {
  data: T;
  status: HttpStatusCode;
  error: any;
  message?: string;
}

export type ParamList = {
  stockinfo: {
    item: StockTemporary;
  };
};

export interface StockInfoProps {
  name: string;
  code: string;
  chart: any;
  smg: number;
  price: number;
  changePrice: number;
  changePricePercent: number;
  exchange: string;
  time: number;
}

export interface WatchlistEntity {
  id: number;
  name: string;
}

export interface TrackingStockEntity {
  id: number;
  code: string;
  watchlist: number;
}

export interface StockFilterEntity {
  id: number;
  name: string;
}

export interface StockFilterCriteriaEntity {
  id: number;
  key: string;
  name: string;
}

export interface StockTemporary {
  id: number;
  price: number;
  rsRaw: number;
  smg: number;
  priceChange: number;
  pricePreference: number;
  percentChangeDay: number;
  percentChangeWeek: number;
  percentChangeMonth: number;
  updateTime: number;
  timeSeries: number[];
  code: string;
  shortName: string;
  exchange: string;
  marketCap?: number;
  avgTradingValue20Day?: number;
  volume?: number;
  dailyTradingValue?: number;
}

export enum Exchange {
  HNX = 'HNX',
  HOSE = 'HOSE',
  UPCOM = 'UPCOM',
}

export interface Industry {
  industry: string;
  industryId: string;
}

export interface CompanyOverviewDTO {
  code: string;
  exchange: string;
  shortName: string;
  companyName: string;
  industry: string;
  industryEn: string;
  establishedYear: string;
  noEmployees: number;
  noShareholders: number;
  foreignPercent: number;
  website: string;
  outstandingShare: number;
  issueShare: number;
  companyProfile: string;
  companyType: string;
  businessType: string;
  historyDev: string;
  companyPromise: string;
  businessRisk: string;
  keyDevelopments: string;
  businessStrategies: string;
}

export interface FinancialRatioDTO {
  yearly: number;
  ticker: string;
  quarter: number;
  year: number;
  priceToEarning: number | null;
  priceToBook: number | null;
  valueBeforeEbitda: number | null;
  dividend: number | null;
  roe: number | null;
  roa: number | null;
  daysReceivable: number | null;
  daysInventory: number | null;
  daysPayable: number | null;
  ebitOnInterest: number | null;
  earningPerShare: number | null;
  bookValuePerShare: number | null;
  interestMargin: number | null;
  nonInterestOnToi: number | null;
  badDebtPercentage: number | null;
  provisionOnBadDebt: number | null;
  costOfFinancing: number | null;
  equityOnTotalAsset: number | null;
  equityOnLoan: number | null;
  costToIncome: number | null;
  equityOnLiability: number | null;
  currentPayment: number | null;
  quickPayment: number | null;
  epsChange: number | null;
  ebitdaOnStock: number | null;
  grossProfitMargin: number | null;
  operatingProfitMargin: number | null;
  postTaxMargin: number | null;
  debtOnEquity: number | null;
  debtOnAsset: number | null;
  debtOnEbitda: number | null;
  shortOnLongDebt: number | null;
  assetOnEquity: number | null;
  capitalBalance: number | null;
  cashOnEquity: number | null;
  cashOnCapitalize: number | null;
  cashCirculation: number | null;
  revenueOnWorkCapital: number | null;
  capexOnFixedAsset: number | null;
  revenueOnAsset: number | null;
  postTaxOnPreTax: number | null;
  ebitOnRevenue: number | null;
  preTaxOnEbit: number | null;
  preProvisionOnToi: number | null;
  postTaxOnToi: number | null;
  loanOnEarnAsset: number | null;
  loanOnAsset: number | null;
  loanOnDeposit: number | null;
  depositOnEarnAsset: number | null;
  badDebtOnAsset: number | null;
  liquidityOnLiability: number | null;
  payableOnEquity: number | null;
  cancelDebt: number | null;
  ebitdaOnStockChange: number | null;
  bookValuePerShareChange: number | null;
  creditGrowth: number | null;
  code: string;
}

export interface CashFlowDataChartDTO {
  ticker: string | null;
  yearly: number | null;
  quarter: number | null;
  year: number | null;
  investCost: number | null;
  fromInvest: number | null;
  fromFinancial: number | null;
  fromSale: number | null;
  freeCashFlow: number | null;
  cash: number | null;
}

export interface BalanceSheetDataChartDTO {
  yearly: number;
  quarter: number;
  year: number;
  shortAsset: number | null;
  longAsset: number | null;
}

export interface FinancialRatioChartDataDTO {
  yearly: number;
  quarter: number;
  year: number;
  epsChange: number | null;
  earningPerShare: number | null;
}

export interface IncomeStatementDataChartDTO {
  revenue?: number;
  yearRevenueGrowth?: number;
  quarterRevenueGrowth?: number;
  yearShareHolderIncomeGrowth?: number;
  quarterShareHolderIncomeGrowth?: number;
  shareHolderIncome?: number;
  preTaxProfit?: number;
  postTaxProfit?: number;
  quarter?: number;
  year?: number;
  yearly?: number;
}

export interface SearchDTO {
  name: string;
  code: string;
  exchange: string;
}

export interface StockFilterDTO {
  industry: string;
  exchange: string;
  eps: number;
  epsGrowth1Year?: number | null;
  lastQuarterProfitGrowth?: number | null;
  roe?: number | null;
  grossMargin?: number | null;
  doe?: number | null; // lastquarter
  pe?: number | null; // lastquarter
  pb?: number | null; // lastquarter
  asset?: number | null; // lastquarter
  evEbitda?: number | null; // lastquarter
  postTaxProfitYear?: number | null;
  postTaxProfitQuarter?: number | null;
  epsTtm?: number | null; //
  lastQuarterTradingValue?: number | null;
  revenueLastQuarterGrowth?: number | null;
  revenueGrowthLastYear?: number | null; //
  revenueTtm?: number | null; //
  revenueLastYear?: number | null; //
  lastYearPostTaxProfit?: number | null; //
  lastYearCashFlowFromFinancial?: number | null;
  lastYearCashFlowFromSale?: number | null;
  lastYearFreeCashFlow?: number | null;
  code: string;
}

export interface ConditionType {
  value: string;
  from: number;
  to: number;
}

export interface CriteriaType {
  name: string;
  key: string;
  minValue: number;
  maxValue: number;
  currentMinValue: number;
  currentMaxValue: number;
}

export interface StockFilterCriteria {
  key: string;
  name: string;
}

export interface FilterDTO {
  temporaryDTO: StockTemporary;
  stockFilterDTO: StockFilterDTO;
}
