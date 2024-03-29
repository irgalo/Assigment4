import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('game.db');

const init = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS high_scores (
        id INTEGER PRIMARY KEY NOT NULL,
        score INTEGER,
        time INTEGER,
        attempts INTEGER,
        username TEXT
      );`,
      [],
      () => console.log('High scores table created successfully'),
      (_, err) => console.log('Error creating high scores table:', err)
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user_profile (
        id INTEGER PRIMARY KEY NOT NULL,
        username TEXT,
        pictureUri TEXT
      );`,
      [],
      () => console.log('User profile table created successfully'),
      (_, err) => console.log('Error creating user profile table:', err)
    );
  });
};

const insertScore = (score, time, attempts, username, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO high_scores (score, time, attempts, username) VALUES (?, ?, ?, ?);`,
      [score, time, attempts, username],
      (_, result) => callback(true, result),
      (_, err) => {
        console.log('Error inserting score:', err);
        callback(false, err);
      }
    );
  });
};

const fetchScores = callback => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM high_scores ORDER BY score DESC, time ASC, attempts ASC;`,
      [],
      (_, result) => callback(result.rows._array),
      (_, err) => console.log('Error fetching scores:', err)
    );
  });
};

const saveUserProfile = (username, pictureUri, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT OR REPLACE INTO user_profile (id, username, pictureUri) VALUES (1, ?, ?);`,
      [username, pictureUri],
      (_, result) => callback(true),
      (_, err) => {
        console.log('Error saving user profile:', err);
        callback(false);
      }
    );
  });
};

const fetchUserProfile = callback => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM user_profile WHERE id = 1;`,
      [],
      (_, result) => {
        if (result.rows.length > 0) {
          callback(true, result.rows._array[0]);
        } else {
          callback(true, null);
        }
      },
      (_, err) => {
        console.log('Error fetching user profile:', err);
        callback(false, null);
      }
    );
  });
};

export const database = { init, insertScore, fetchScores, saveUserProfile, fetchUserProfile };
