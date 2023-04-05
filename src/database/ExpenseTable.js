import * as SQLite from "expo-sqlite";
import { it } from "react-native-paper-dates";

// Open a database for expense which holds the id, expense title , expense amount, expense date and the tag
export const dbInitExpense = () => {
  const db = SQLite.openDatabase("expenses.db");

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS expense (id VARCHAR PRIMARY KEY NOT NULL, expenseTitle TEXT NOT NULL, 
            expenseAmount TEXT NOT NULL, expenseDate TEXT NOT NULL, expenseTag TEXT NOT NULL, expenseSource TEXT NOT NULL, expenseNote TEXT);`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

// Insert a expense into the database
export const dbInsertExpense = (
  id,
  expenseTitle,
  expenseAmount,
  expenseDate,
  expenseTag,
  expenseSource,
  expenseNote
) => {
  const db = SQLite.openDatabase("expenses.db");

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO expense (id, expenseTitle, expenseAmount, expenseDate, expenseTag, expenseSource, expenseNote, expenseNote) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          id,
          expenseTitle,
          expenseAmount,
          expenseDate,
          expenseTag,
          expenseSource,
          expenseNote,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

// Get all expenses from the database
export const dbGetExpenses = () => {
  const db = SQLite.openDatabase("expenses.db");

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM expense`,
        [],
        (_, result) => {
          const tasks = result.rows._array.map((item) => {
            return {
              id: item.id,
              expenseTitle: item.expenseTitle,
              expenseAmount: item.expenseAmount,
              expenseDate: item.expenseDate,
              expenseTag: item.expenseTag,
              expenseSource: item.expenseSource,
              expenseNote: item.expenseNote,
            };
          });
          resolve(tasks);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};
// edit a expense from the database
export const dbEditExpense = (
  id,
  expenseTitle,
  expenseAmount,
  expenseDate,
  expenseTag,
  expenseSource,
  expenseNote
) => {
  const db = SQLite.openDatabase("expenses.db");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE expense SET expenseTitle = ?, expenseAmount = ?, expenseDate = ?, expenseTag = ?, expenseSource = ?, expenseNote = ? WHERE id = ?;`,
        [
          expenseTitle,
          expenseAmount,
          expenseDate,
          expenseTag,
          expenseSource,
          expenseNote,
          id,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

// get the total sum of the income source from the database
export const dbGetTotalIncome = () => {
  const db = SQLite.openDatabase("expenses.db");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT SUM(expenseAmount) AS totalIncome FROM expense WHERE expenseSource = 'Income'`,
        [],
        (_, result) => {
          const tasks = result.rows._array.map((item) => {
            return item.totalIncome;
          });
          resolve(tasks);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

// get the total sum of the expense source from the database
export const dbGetTotalExpense = () => {
  const db = SQLite.openDatabase("expenses.db");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT SUM(expenseAmount) AS totalExpense FROM expense WHERE expenseSource = 'Expense'`,
        [],
        (_, result) => {
          const tasks = result.rows._array.map((item) => {
            return item.totalExpense;
          });
          resolve(tasks);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

// totalIncome - totalExpense
export const dbGetTotalBalance = () => {
  const db = SQLite.openDatabase("expenses.db");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        // totalIncome - totalExpense
        `SELECT (SELECT SUM(expenseAmount) FROM expense WHERE expenseSource = 'Income') - (SELECT SUM(expenseAmount) FROM expense WHERE expenseSource = 'Expense') AS totalBalance`,
        [],
        (_, result) => {
          const tasks = result.rows._array.map((item) => {
            return item.totalBalance;
          });
          resolve(tasks);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

// Get the average expense amount from the database
export const dbGetAverageExpense = () => {
  const db = SQLite.openDatabase("expenses.db");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT AVG(expenseAmount) AS averageExpense FROM expense WHERE expenseSource = 'Expense'`,
        [],
        (_, result) => {
          const tasks = result.rows._array.map((item) => {
            return item.averageExpense;
          });
          resolve(tasks);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

// Delete a expense from the database
export const dbDeleteExpense = (id) => {
  const db = SQLite.openDatabase("expenses.db");

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM expense WHERE id = ?;`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

// drop
export const dropTableexpense = () => {
  const db = SQLite.openDatabase("expenses.db");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE expense;`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

// by month and year

// get expense by month and year

export const dbGetExpensesByMonthYear = (year, month) => {
  console.log("year and month: " + year + "  " + month);
  const db = SQLite.openDatabase("expenses.db");

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM expense WHERE strftime('%Y', expenseDate) = ? AND strftime('%m', expenseDate) = ?;`,
        [year.toString(), month.toString().padStart(2, "0")],
        (_, result) => {
          const expenses = result.rows._array.map((item) => ({
            id: item.id,
            expenseTitle: item.expenseTitle,
            expenseAmount: item.expenseAmount,
            expenseDate: item.expenseDate,
            expenseTag: item.expenseTag,
            expenseSource: item.expenseSource,
            expenseNote: item.expenseNote,
          }));
          resolve(expenses);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

// total income
export const dbGetTotalIncomeByMonthYear = (year, month) => {
  const db = SQLite.openDatabase("expenses.db");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT SUM(expenseAmount) AS totalIncome FROM expense WHERE expenseSource = 'Income' AND strftime('%Y', expenseDate) = ? AND strftime('%m', expenseDate) = ?`,
        [year.toString(), month.toString().padStart(2, "0")],
        (_, result) => {
          const totalIncome = result.rows._array[0].totalIncome;
          resolve(totalIncome);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

//  total expenses
export const dbGetTotalExpenseByMonthYear = (year, month) => {
  const db = SQLite.openDatabase("expenses.db");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT SUM(expenseAmount) AS totalExpense FROM expense WHERE expenseSource = 'Expense' AND strftime('%Y', expenseDate) = ? AND strftime('%m', expenseDate) = ?`,
        [year.toString(), month.toString().padStart(2, "0")],
        (_, result) => {
          const totalExpense = result.rows._array[0].totalExpense;
          resolve(totalExpense);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

export const dbGetTotalBalanceByMonthYear = (year, month) => {
  const db = SQLite.openDatabase("expenses.db");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT (SELECT SUM(expenseAmount) FROM expense WHERE expenseSource = 'Income' AND strftime('%Y', expenseDate) = ? AND strftime('%m', expenseDate) = ?) - (SELECT SUM(expenseAmount) FROM expense WHERE expenseSource = 'Expense' AND strftime('%Y', expenseDate) = ? AND strftime('%m', expenseDate) = ?) AS totalBalance`,
        [
          year.toString(),
          month.toString().padStart(2, "0"),
          year.toString(),
          month.toString().padStart(2, "0"),
        ],
        (_, result) => {
          const totalBalance = result.rows._array[0].totalBalance;
          resolve(totalBalance);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};
