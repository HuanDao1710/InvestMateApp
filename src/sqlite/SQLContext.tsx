import {createContext} from 'react';
import {
  StockFilterCriteriaEntity,
  StockFilterEntity,
  TrackingStockEntity,
  WatchlistEntity,
} from '../type';
import SQLite from 'react-native-sqlite-storage';

export interface SQLiteFunc {
  findAllWatchlist: () => Promise<WatchlistEntity[]>;
  createWatchlist: (value: WatchlistEntity) => void;
  updateWatchlist: (name: string, id: number) => void;
  deleteWatchlist: (value: WatchlistEntity) => void;
  findAllTrackingStocks: (watchlist: number) => Promise<TrackingStockEntity[]>;
  createTrackingStocks: (
    value: TrackingStockEntity,
  ) => Promise<TrackingStockEntity | null>;
  deleteTrackingStocks: (value: TrackingStockEntity) => Promise<boolean>;
  countTrackingStocks: (watchlist: number) => Promise<number>;
  getStockFilters: () => Promise<StockFilterEntity[]>;
  getStockFilterCriteriaByFilterId: (
    filterId: number,
  ) => Promise<StockFilterCriteriaEntity[]>;
  addStockFilter: (name: string) => Promise<SQLite.ResultSet | null>;
  updateStockFilter: (
    id: number,
    name: string,
  ) => Promise<SQLite.ResultSet | null>;
  deleteStockFilter: (id: number) => Promise<SQLite.ResultSet | null>;
  addStockFilterCriteria: (
    filterId: number,
    key: string,
    name: string,
  ) => Promise<SQLite.ResultSet | null>;
  removeAllStockFilterCriteriaByStockFilterId: (
    stockFilterId: number,
  ) => Promise<SQLite.ResultSet | null>;
}

const SQLiteContext = createContext<SQLiteFunc>({
  findAllWatchlist: () => Promise.resolve([]),
  createWatchlist: (value: WatchlistEntity) => undefined,
  updateWatchlist: (name: string, id: number) => undefined,
  deleteWatchlist: (value: WatchlistEntity) => undefined,
  findAllTrackingStocks: (watchlist: number) => Promise.resolve([]),
  createTrackingStocks: (value: TrackingStockEntity) => Promise.resolve(null),
  deleteTrackingStocks: (value: TrackingStockEntity) => Promise.resolve(false),
  countTrackingStocks: (watchlist: number) => Promise.resolve(0),
  getStockFilters: () => Promise.resolve([]),
  getStockFilterCriteriaByFilterId: (filterId: number) => Promise.resolve([]),
  addStockFilter: (name: string) => Promise.resolve(null),
  updateStockFilter: (id: number, name: string) => Promise.resolve(null),
  deleteStockFilter: (id: number) => Promise.resolve(null),
  addStockFilterCriteria: (filterId, key, name) => Promise.resolve(null),
  removeAllStockFilterCriteriaByStockFilterId: (stockFilterId: number) =>
    Promise.resolve(null),
});

export default SQLiteContext;
