import SQLiteContext from './SQLContext';
import React from 'react';
import SQLite from 'react-native-sqlite-storage';
import {
  WatchlistEntity,
  TrackingStockEntity,
  StockFilterEntity,
  StockFilterCriteriaEntity,
} from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE} from '../constants';

const SQLiteContextProvider = ({children}: {children: React.ReactNode}) => {
  const dbRef = React.useRef<SQLite.SQLiteDatabase>();

  //Watchlist
  const findAllWatchlist = React.useCallback((): Promise<WatchlistEntity[]> => {
    return new Promise<WatchlistEntity[]>((resolve, reject) => {
      if (!dbRef.current) return reject('DB not found');
      dbRef.current.transaction(tz => {
        tz.executeSql(`SELECT * FROM watchlist`, [], (tran, result) => {
          resolve(result.rows.raw());
        });
      });
    });
  }, []);

  const createWatchlist = (value: WatchlistEntity) => {
    if (!dbRef.current) return;
    dbRef.current.transaction(tx =>
      tx.executeSql('INSERT INTO watchlist (name) VALUES (?)', [value.name]),
    );
  };

  const deleteWatchlist = (value: WatchlistEntity) => {
    if (!dbRef.current) return;
    dbRef.current.transaction(tx =>
      tx.executeSql(`DELETE FROM watchlist WHERE id = ?;`, [value.id]),
    );
  };

  const updateWatchlist = (name: string, id: number) => {
    if (!dbRef.current) return;
    dbRef.current.transaction(tx =>
      tx.executeSql('UPDATE watchlist SET name = ? WHERE id = ?;', [name, id]),
    );
  };

  //stracking_strock
  const findAllTrackingStocks = React.useCallback(
    (watchlist: number): Promise<TrackingStockEntity[]> => {
      return new Promise<TrackingStockEntity[]>((resolve, reject) => {
        if (!dbRef.current) return reject('DB not found');
        dbRef.current.transaction(tz => {
          tz.executeSql(
            `SELECT * FROM tracking_stocks WHERE watchlist = ${watchlist}`,
            [],
            (tran, result) => {
              resolve(result.rows.raw());
            },
          );
        });
      });
    },
    [],
  );

  const countTrackingStocks = React.useCallback(
    (watchlist: number): Promise<number> => {
      return new Promise<number>((resolve, reject) => {
        if (!dbRef.current) return reject('DB not found');
        dbRef.current.transaction(tz => {
          tz.executeSql(
            `SELECT COUNT(*) AS count FROM tracking_stocks WHERE watchlist = ?`,
            [watchlist],
            (tran, result) => {
              const count = result.rows.item(0)?.count || 0;
              resolve(count);
            },
            error => {
              reject(error);
            },
          );
        });
      });
    },
    [],
  );

  const createTrackingStocks = (
    value: TrackingStockEntity,
  ): Promise<TrackingStockEntity | null> => {
    return new Promise((resolve, reject) => {
      if (!dbRef.current) return resolve(null);

      dbRef.current.transaction(tx => {
        tx.executeSql(
          `INSERT into tracking_stocks (code, watchlist) VALUES (?, ?)`,
          [value.code, value.watchlist],
          (_, result) => {
            const insertId = result.insertId;
            tx.executeSql(
              `SELECT * FROM tracking_stocks WHERE id = ?`,
              [insertId],
              (_, {rows}) => {
                if (rows.length > 0) {
                  resolve(rows.item(0) as TrackingStockEntity);
                } else {
                  resolve(null);
                }
              },
              (tx, error) => {
                reject(error);
                return false;
              },
            );
          },
          (tx, error) => {
            reject(error);
            return false;
          },
        );
      });
    });
  };

  const deleteTrackingStocks = (
    value: TrackingStockEntity,
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!dbRef.current) {
        reject(false);
        return;
      }

      dbRef.current.transaction(
        tx => {
          tx.executeSql(
            'DELETE FROM tracking_stocks WHERE id = ?',
            [value.id],
            (_, result) => {
              if (result.rowsAffected > 0) {
                resolve(true);
              } else {
                resolve(false);
              }
            },
            error => {
              reject(false);
            },
          );
        },
        error => {
          reject(false);
        },
      );
    });
  };

  //Stock FIlter
  const getStockFilters = (): Promise<StockFilterEntity[]> => {
    return new Promise((resolve, reject) => {
      dbRef.current?.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM stock_filter',
          [],
          (_, {rows}) => {
            const result: StockFilterEntity[] = [];
            for (let i = 0; i < rows.length; i++) {
              result.push(rows.item(i));
            }
            resolve(result);
          },
          (tx, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  };

  const getStockFilterCriteriaByFilterId = (
    filterId: number,
  ): Promise<StockFilterCriteriaEntity[]> => {
    return new Promise((resolve, reject) => {
      dbRef.current?.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM stock_filter_criteria WHERE stock_filter_id = ?',
          [filterId],
          (_, {rows}) => {
            const result: StockFilterCriteriaEntity[] = [];
            for (let i = 0; i < rows.length; i++) {
              result.push(rows.item(i));
            }
            resolve(result);
          },
          (tx, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  };

  const addStockFilter = (name: string): Promise<SQLite.ResultSet> => {
    return new Promise((resolve, reject) => {
      dbRef.current?.transaction(tx => {
        tx.executeSql(
          'INSERT INTO stock_filter (name) VALUES (?)',
          [name],
          (_, result) => {
            resolve(result);
          },
          (tx, error) => {
            reject(false);
            return true;
          },
        );
      });
    });
  };

  const updateStockFilter = (
    id: number,
    name: string,
  ): Promise<SQLite.ResultSet> => {
    return new Promise((resolve, reject) => {
      dbRef.current?.transaction(tx => {
        tx.executeSql(
          'UPDATE stock_filter SET name = ? WHERE id = ?',
          [name, id],
          (_, result) => {
            resolve(result);
          },
          (tx, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  };

  const deleteStockFilter = (id: number): Promise<SQLite.ResultSet> => {
    return new Promise((resolve, reject) => {
      dbRef.current?.transaction(tx => {
        tx.executeSql(
          'DELETE FROM stock_filter WHERE id = ?',
          [id],
          (_, result) => {
            resolve(result);
          },
          (tx, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  };

  const addStockFilterCriteria = (
    filterId: number,
    key: string,
    name: string,
  ): Promise<SQLite.ResultSet> => {
    return new Promise((resolve, reject) => {
      dbRef.current?.transaction(tx => {
        tx.executeSql(
          'INSERT INTO stock_filter_criteria (stock_filter_id, key, name) VALUES (?, ?, ?)',
          [filterId, key, name],
          (_, result) => {
            resolve(result);
          },
          (tx, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  };

  const removeAllStockFilterCriteriaByStockFilterId = (
    stockFilterId: number,
  ): Promise<SQLite.ResultSet> => {
    return new Promise((resolve, reject) => {
      dbRef.current?.transaction(tx => {
        tx.executeSql(
          'DELETE FROM stock_filter_criteria WHERE stock_filter_id = ?',
          [stockFilterId],
          (_, result) => {
            resolve(result);
          },
          (tx, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  };

  React.useEffect(() => {
    const db = SQLite.openDatabase(
      {
        name: 'investmate.db',
      },
      () => null,
    );

    db.executeSql(`CREATE TABLE if NOT EXISTS watchlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT
      )`);

    db.executeSql(
      `CREATE TABLE IF NOT EXISTS tracking_stocks 
      (id INTEGER PRIMARY KEY AUTOINCREMENT, code TEXT, watchlist INTEGER)`,
    );

    db.executeSql(
      `CREATE TABLE IF NOT EXISTS stock_filter 
      (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`,
    );

    db.executeSql(
      `CREATE TABLE IF NOT EXISTS stock_filter_criteria
      (id INTEGER PRIMARY KEY AUTOINCREMENT,stock_filter_id number ,key TEXT, name TEXT)`,
    );

    const check = async () => {
      const isFirstLaunchApp = await AsyncStorage.getItem(
        STORAGE.IS_FIRST_LAUNCH_APP,
      );
      if (isFirstLaunchApp === null) {
        db.executeSql(`INSERT INTO watchlist (name) VALUES ("Default")`);
        AsyncStorage.setItem(STORAGE.IS_FIRST_LAUNCH_APP, 'false');
      }
    };
    check();

    dbRef.current = db;
  }, []);

  const value = React.useMemo(
    () => ({
      findAllWatchlist,
      createWatchlist,
      updateWatchlist,
      deleteWatchlist,
      findAllTrackingStocks,
      createTrackingStocks,
      deleteTrackingStocks,
      countTrackingStocks,
      getStockFilters,
      getStockFilterCriteriaByFilterId,
      addStockFilter,
      updateStockFilter,
      deleteStockFilter,
      addStockFilterCriteria,
      removeAllStockFilterCriteriaByStockFilterId,
    }),
    [],
  );

  return (
    <SQLiteContext.Provider value={value}>{children}</SQLiteContext.Provider>
  );
};

export default SQLiteContextProvider;
