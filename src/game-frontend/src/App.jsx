import { useState, useEffect } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { game_backend } from 'declarations/game-backend';

function App() {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize AuthClient
  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);
      const isAuthed = await client.isAuthenticated();
      setIsAuthenticated(isAuthed);
    };
    initAuth();
  }, []);

  const login = async () => {
    if (!authClient) return;
    setLoading(true);

    await new Promise((resolve, reject) => {
      authClient.login({
        identityProvider: "https://identity.ic0.app",
        onSuccess: () => {
          setIsAuthenticated(true);
          setLoading(false);
          resolve(null);
        },
        onError: () => {
          setLoading(false);
          reject();
        },
      });
    });
  };

  const logout = async () => {
    if (!authClient) return;
    setLoading(true);
    await authClient.logout();
    setIsAuthenticated(false);
    setLoading(false);
  };

  const playGame = async (guess) => {
    setLoading(true);

    try {
      const response = await game_backend.roll_dice(guess);
      setResult(response);
    } catch (error) {
      setResult("Failed to play the game. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>🎲 Dice Roll High or Low</h1>
        {isAuthenticated ? (
          <button onClick={logout} className="auth-button" disabled={loading}>
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        ) : (
          <button onClick={login} className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login with Internet Identity'}
          </button>
        )}
      </header>

      {isAuthenticated ? (
        <div className="game-container">
          <h2>Guess if the dice roll will be high (4-6) or low (1-3)!</h2>
          <div className="choices">
            <button onClick={() => playGame("high")} disabled={loading}>
              High (4-6)
            </button>
            <button onClick={() => playGame("low")} disabled={loading}>
              Low (1-3)
            </button>
          </div>
          <section className="result-section">
            {loading ? (
              <p>Loading...</p>
            ) : (
              result && <p>{result}</p>
            )}
          </section>
        </div>
      ) : (
        <div className="auth-prompt">
          <p>Please login with Internet Identity to access the game.</p>
        </div>
      )}
    </main>
  );
}

export default App;
