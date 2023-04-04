import * as SQLite from "expo-sqlite"
// Open the database
export const dbInit = () => {
  const db = SQLite.openDatabase("category.db")
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS games (id VARCHAR PRIMARY KEY NOT NULL, game TEXT NOT NULL, color TEXT NOT NULL);`,
        [],
        () => {
          resolve()
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
} // Insert a game into the database
export const dbGetTag = () => {
  const db = SQLite.openDatabase("category.db")
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM games`,
        [],
        (_, result) => {
          const tasks = result.rows._array.map(item => {
            return { id: item.id, tag: item.game, color: item.color }
          })
          resolve(tasks)
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
} // Insert a game into the database
export const dbInsert = (id, game, color) => {
  const db = SQLite.openDatabase("category.db")
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO games (id, game, color) VALUES (?, ?, ?);`,
        [id, game, color],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
} // Delete a game from the database
export const dbDelete = id => {
  const db = SQLite.openDatabase("category.db")
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM games WHERE id = ?;`,
        [id],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
} // Dlete all games from the database
export const dbDeleteAll = () => {
  const db = SQLite.openDatabase("category.db")
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM games;`,
        [],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
} // Drop the games table
export const dropTable = () => {
  const db = SQLite.openDatabase("category.db")
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DROP TABLE games;`,
        [],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
}
