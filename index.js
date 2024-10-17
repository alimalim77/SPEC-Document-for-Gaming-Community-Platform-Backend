const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');
let db;

(async () => {
  db = await open({
    filename: './sequelizertask/database.sqlite',
    driver: sqlite3.Database,
  });
})();

app.use(cors());

// Exercise 1: Fetch all games
const fetchAllGames = async () => {
  let query = 'SELECT * FROM games';
  let response = await db.all(query, []);
  return { games: response };
};

app.get('/games', async (req, res) => {
  let results = await fetchAllGames();
  res.status(200).json(results);
});

// Exercise 2: Fetch game by ID
const fetchGameById = async (id) => {
  let query = 'SELECT * FROM games WHERE id = ?';
  let response = await db.get(query, [id]);
  return { game: response };
};

app.get('/games/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchGameById(id);
  res.status(200).json(results);
});

// Exercise 3: Fetch games by genre
const fetchGamesByGenre = async (genre) => {
  let query = 'SELECT * FROM games WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return { games: response };
};

app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchGamesByGenre(genre);
  res.status(200).json(results);
});

// Exercise 4: Fetch games by platform
const fetchGamesByPlatform = async (platform) => {
  let query = 'SELECT * FROM games WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return { games: response };
};

app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  let results = await fetchGamesByPlatform(platform);
  res.status(200).json(results);
});

// Exercise 5: Fetch games sorted by rating
const fetchGamesSortedByRating = async () => {
  let query = 'SELECT * FROM games ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { games: response };
};

app.get('/games/sort-by-rating', async (req, res) => {
  let results = await fetchGamesSortedByRating();
  res.status(200).json(results);
});

// Exercise 6: Fetch all players
const fetchAllPlayers = async () => {
  let query = 'SELECT * FROM players';
  let response = await db.all(query, []);
  return { players: response };
};

app.get('/players', async (req, res) => {
  let results = await fetchAllPlayers();
  res.status(200).json(results);
});

// Exercise 7: Fetch player by ID
const fetchPlayerById = async (id) => {
  let query = 'SELECT * FROM players WHERE id = ?';
  let response = await db.get(query, [id]);
  return { player: response };
};

app.get('/players/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchPlayerById(id);
  res.status(200).json(results);
});

// Exercise 8: Fetch players by platform
const fetchPlayersByPlatform = async (platform) => {
  let query = 'SELECT * FROM players WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return { players: response };
};

app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  let results = await fetchPlayersByPlatform(platform);
  res.status(200).json(results);
});

// Exercise 9: Fetch players sorted by rating
const fetchPlayersSortedByRating = async () => {
  let query = 'SELECT * FROM players ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { players: response };
};

app.get('/players/sort-by-rating', async (req, res) => {
  let results = await fetchPlayersSortedByRating();
  res.status(200).json(results);
});

// Exercise 10: Fetch all tournaments
const fetchAllTournaments = async () => {
  let query = 'SELECT * FROM tournaments';
  let response = await db.all(query, []);
  return { tournaments: response };
};

app.get('/tournaments', async (req, res) => {
  let results = await fetchAllTournaments();
  res.status(200).json(results);
});

// Exercise 11: Fetch tournament by ID
const fetchTournamentById = async (id) => {
  let query = 'SELECT * FROM tournaments WHERE id = ?';
  let response = await db.get(query, [id]);
  return { tournament: response };
};

app.get('/tournaments/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchTournamentById(id);
  res.status(200).json(results);
});

// Exercise 12: Fetch tournaments by game ID
const fetchTournamentsByGameId = async (gameId) => {
  let query = 'SELECT * FROM tournaments WHERE gameId = ?';
  let response = await db.all(query, [gameId]);
  return { tournaments: response };
};

app.get('/tournaments/game/:id', async (req, res) => {
  let gameId = req.params.id;
  let results = await fetchTournamentsByGameId(gameId);
  res.status(200).json(results);
});

// Exercise 13: Fetch tournaments sorted by prize pool
const fetchTournamentsSortedByPrizePool = async () => {
  let query = 'SELECT * FROM tournaments ORDER BY prizePool DESC';
  let response = await db.all(query, []);
  return { tournaments: response };
};

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  let results = await fetchTournamentsSortedByPrizePool();
  res.status(200).json(results);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
