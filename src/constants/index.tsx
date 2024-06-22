import {StockFilterCriteria} from '../type';

export enum STORAGE {
  IS_FIRST_LAUNCH_APP = 'is_first_launch_app',
}

export const ROOT_PATH = 'https://ec96-103-238-68-64.ngrok-free.app';

export type RootRouter = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  WatchListSearch: {
    watchlistId: string;
  };
};

export const COLOR = {
  primaryColor: '#141ffc',
  secoundaryColor: '#b8c4ff',
  greenColor: '#1DC787',
  redColor: '#f65959',
};

export const basicFilterCriteriaList: StockFilterCriteria[] = [
  {key: 'tp.marketCap', name: 'Vốn hóa thị trường'},
  {key: 'tp.smg', name: 'SMG'},
  {key: 'sf.revenueTtm', name: 'Doanh thu (TTM)'},
  {key: 'sf.revenueLastYear', name: 'Doanh thu (năm gần nhất)'},
  {key: 'sf.postTaxProfitQuarter', name: 'Lợi nhuận sau thuế (quý gần nhất)'},
  {key: 'sf.postTaxProfitYear', name: 'Lợi nhuận sau thuế (năm gần nhất)'},
  {key: 'sf.grossMargin', name: 'Lợi nhuận gộp (quý gần nhất)'},
  {key: 'sf.epsTtm', name: 'EPS (TTM)'},
  {key: 'sf.eps', name: 'EPS(năm gần nhất)'},
  {key: 'sf.roe', name: 'ROE (quý gần nhất)'},
  {key: 'sf.doe', name: 'DOE (quý gần nhất)'},
  {key: 'sf.pe', name: 'PE (quý gần nhất)'},
  {key: 'sf.pb', name: 'PB (quý gần nhất)'},
  {key: 'sf.asset', name: 'Tổng tài sản'},
  {key: 'sf.evEbitda', name: 'EV/Ebitda (quý gần nhất)'},
  {
    key: 'sf.lastYearCashFlowFromFinancial',
    name: 'Dòng tiền từ hoạt động tài chính(năm gần nhất)',
  },
  {
    key: 'sf.lastYearCashFlowFromSale',
    name: 'Dòng tiền từ hoạt động kinh doanh(năm gần nhất)',
  },
  {key: 'sf.lastYearFreeCashFlow', name: 'Dòng tiền tự do(năm gần nhất)'},
];

export const priceVolumeCriteriaList: StockFilterCriteria[] = [
  {key: 'tp.price', name: 'Giá cổ phiếu'},
  {key: 'tp.percentChangeDay', name: '% thay đổi giá trong ngày'},
  // {key: '', name: 'Thay đổi giá trong ngày'},
  {key: 'tp.percentChangeWeek', name: '% Giá so với đầu tuần'},
  {key: 'tp.percentChangeMonth', name: '% Giá so với đầu tháng'},
  {
    key: 'tp.avgTradingValue20Day',
    name: 'Trung bình giá trị giao địch 20 ngày',
  },
  {key: 'tp.volume', name: 'Khối lượng giao dịch trong ngày'},
  {key: 'sf.lastQuarterTradingValue', name: 'Giá trị giao dịch (quý gần nhất)'},
];

export const growthCriteriaList: StockFilterCriteria[] = [
  {
    key: 'sf.revenueLastQuarterGrowth',
    name: 'Tăng trưởng doanh thu (quý gần nhất)',
  },
  {
    key: 'sf.revenueGrowthLastYear',
    name: 'Tăng trưởng doanh thu (năm gần nhất)',
  },
  {key: 'sf.epsGrowth1Year', name: 'Tăng trưởng eps (năm gần nhất)'},
  {
    key: 'sf.lastQuarterProfitGrowth',
    name: 'Tăng trưởng lợi nhuận (quý gần nhất)',
  },
];
