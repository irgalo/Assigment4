/**
 * Author: Irah Loreto
 * Purpose - Manages data interactions for the app, such as storing high scores. creates the tables for the scores.
 * Error - There are alot of console logs i had to alot of debugging. The databse is not properly collecting the username and displaying it. I had to omit due to time constraints.
 * database.js
 */

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('game.db');

const init = () => {
  return new Promise((resolve, reject) => {
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
        () => {
          console.log('High scores table created successfully');
          resolve();
        },
        (_, error) => {
          console.log('Error creating high scores table:', error);
          reject(error);
        }
      );
    });
  });
};

const insertScore = (score, time, attempts, username) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO high_scores (score, time, attempts, username) VALUES (?, ?, ?, ?);`,
        [score, time, attempts, username],
        (_, result) => {
          console.log(`Score inserted successfully: ${score}, Time: ${time}, Attempts: ${attempts}, Username: ${username}`);
          resolve(result);
        },
        (_, error) => {
          console.log(`Error inserting score: ${error}. Data - Score: ${score}, Time: ${time}, Attempts: ${attempts}, Username: ${username}`);
          reject(error);
        }
      );
    });
  });
};

const fetchScores = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM high_scores ORDER BY score DESC, time ASC, attempts ASC;`,
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, error) => {
          console.log('Error fetching scores:', error);
          reject(error);
        }
      );
    });
  });
};

export const database = {
  init,
  insertScore,
  fetchScores,
};
