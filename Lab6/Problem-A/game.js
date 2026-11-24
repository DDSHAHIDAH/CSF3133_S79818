// Store the game state, scores and round results.
let started = false;
let wins = 0, losses = 0, draws = 0;
let results = [];

// Validate the player name and record the starting time.
function startGame() {
  const name = document.getElementById("playerName").value.trim();
  if (name === "") {
    alert("Please enter your name.");
    return;
  }
  resetGame();
  started = true;
  // Escape user input before inserting it with innerHTML.
  const safeName = name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  document.getElementById("welcome").innerHTML = "Welcome, " + safeName + "!";
  document.getElementById("startTime").innerHTML = "Started on: " + new Date().toLocaleString();
}

// Select one of the three computer choices randomly.
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

// Determine the round result and update the images, scores and history.
function playRound(playerChoice) {
  if (!started) {
    alert("Click Start Game first.");
    return;
  }
  const computerChoice = getComputerChoice();
  let result, color;
  if (playerChoice === computerChoice) {
    result = "Draw"; color = "grey"; draws++;
  } else if ((playerChoice === "rock" && computerChoice === "scissors") ||
             (playerChoice === "scissors" && computerChoice === "paper") ||
             (playerChoice === "paper" && computerChoice === "rock")) {
    result = "Win"; color = "green"; wins++;
  } else {
    result = "Lose"; color = "red"; losses++;
  }
  document.getElementById("playerImg").src = playerChoice + ".png";
  document.getElementById("computerImg").src = computerChoice + ".png";
  document.getElementById("playerImg").alt = "Player chose " + playerChoice;
  document.getElementById("computerImg").alt = "Computer chose " + computerChoice;
  document.getElementById("playerChoice").innerHTML = playerChoice;
  document.getElementById("computerChoice").innerHTML = computerChoice;
  document.getElementById("result").innerHTML = result;
  document.getElementById("result").style.color = color;
  updateScore();
  results.push(result);
  document.getElementById("historyBody").innerHTML +=
    `<tr><td>${results.length}</td><td>${playerChoice}</td><td>${computerChoice}</td><td style="color:${color}">${result}</td></tr>`;
  document.getElementById("summary").innerHTML = "";
}

// Display the current scores.
function updateScore() {
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("losses").innerHTML = losses;
  document.getElementById("draws").innerHTML = draws;
}

// Count wins with a for loop and calculate the rounded percentage.
function showSummary() {
  let winCount = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i] === "Win") winCount++;
  }
  const percentage = results.length === 0 ? 0 : Math.round(winCount / results.length * 100);
  document.getElementById("summary").innerHTML = `You played ${results.length} rounds and won ${percentage}%`;
}

// Clear all scores and round information, returning to the initial state.
function resetGame() {
  started = false;
  wins = 0; losses = 0; draws = 0;
  results = [];
  updateScore();
  for (const id of ["historyBody", "result", "summary", "welcome", "startTime"]) {
    document.getElementById(id).innerHTML = "";
  }
  document.getElementById("result").style.color = "";
  document.getElementById("playerImg").src = "rock.png";
  document.getElementById("computerImg").src = "rock.png";
  document.getElementById("playerImg").alt = "Player choice";
  document.getElementById("computerImg").alt = "Computer choice";
  document.getElementById("playerChoice").innerHTML = "Ready";
  document.getElementById("computerChoice").innerHTML = "Ready";
}
