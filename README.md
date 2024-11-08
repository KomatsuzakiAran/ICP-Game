# Dice Roll Game

Welcome to the **Dice Roll Game**! Built on the Internet Computer, this game challenges players to guess whether the next dice roll will be higher or lower than the previous roll. It’s a fun and simple way to test your luck and intuition! The backend service is written in Motoko, while the frontend application is developed with React.

## Project Structure

The project directory contains the following:

- **`src/`**: Contains both frontend and backend code.
  - **`frontend/`**: A React-based application where players make their guesses and view results.
  - **`backend/`**: A Motoko service that generates random dice rolls and evaluates whether the guess was correct.
- **`dfx.json`**: Configuration file defining canister settings.
- **`package.json`**: Dependencies and scripts for frontend development.

## Prerequisites

- **DFX (Dfinity SDK)**: Install following the [DFX installation guide](https://internetcomputer.org/docs/current/developer-docs/setup/install).
- **Node.js**: Ensure Node.js is installed for frontend development.

## Quick Start

### Starting the Local Development Environment

1. Enter the project directory:
   ```bash
   cd game/
Start the local replica in the background:

bash

dfx start --background
Deploy the project to the local replica:

bash

dfx deploy
Once deployment completes, access the application at:

plaintext

http://localhost:4943?canisterId={asset_canister_id}
Development Environment Setup
Updating Candid Interface
If you make changes to the backend code, regenerate the Candid interface:

bash

npm run generate
Frontend Development
To start the frontend development server:

bash

npm start
The frontend is available at http://localhost:8080 and will automatically proxy API requests to the replica on port 4943.

How to Play the Game
Login: Players log in using Internet Identity.
Gameplay: The system rolls a dice, and players guess if the next roll will be higher or lower.
Feedback: The backend reveals the next roll, validating if the player’s guess was correct. Responses include:
Correct Guess: If the guess matches the roll comparison.
Incorrect Guess: If the guess does not match the roll comparison.
Repeat: Play as many rounds as you like, testing your luck and intuition.
Key Features
Secure Random Dice Roll Generation: The backend leverages raw_rand for secure random number generation.
User Authentication: Players authenticate using Internet Identity for a secure experience.
Real-Time Feedback: Players receive instant feedback on each guess.
File Overview
main.mo: Contains the Motoko backend logic for generating random dice rolls and validating guesses.
App.jsx: The main React component providing the UI and game interactions.
index.html: HTML template for the frontend.
Documentation and Resources
Quick Start Guide
Motoko Programming Guide
DFX CLI Reference
Deploying to Production
For production deployments, ensure the following settings:

Set DFX_NETWORK to ic to prevent fetching an insecure root key.
Update dfx.json:
Use env_override in canisters -> {asset_canister_id} -> declarations to properly set process.env.DFX_NETWORK.
Customize createActor: Adjust createActor in production to align with specific deployment requirements.
