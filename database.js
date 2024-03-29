import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('game.db');

const init = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS high_scores (id INTEGER PRIMARY KEY NOT NULL, score INTEGER, time INTEGER, attempts INTEGER);',
      [],
      () => { console.log('Table created successfully'); },
      (_, err) => { console.log(err); }
    );
  });
};

const insertScore = (score, time, attempts, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO high_scores (score, time, attempts) VALUES (?, ?, ?);',
        [score, time, attempts],
        (_, result) => { callback(true, result); },
        (_, err) => { console.log(err); callback(false, err); }
      );
    });
  };
  
  const fetchScores = (callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM high_scores ORDER BY score DESC, time ASC, attempts ASC;', // Adjust ordering as per your requirement
        [],
        (_, result) => { callback(result.rows._array); },
        (_, err) => { console.log(err); }
      );
    });
  };
  

export const database = {
  init,
  insertScore,
  fetchScores,
};
