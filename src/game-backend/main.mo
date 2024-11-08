import Nat8 "mo:base/Nat8";
import Nat "mo:base/Nat";
import Blob "mo:base/Blob";
import Array "mo:base/Array";

actor {
  let SubnetManager : actor {
    raw_rand() : async Blob;
  } = actor "aaaaa-aa"; // The management canister for randomness

  public func roll_dice(guess: Text) : async Text {
    let randomBlob = await SubnetManager.raw_rand();
    let randomBytes : [Nat8] = Blob.toArray(randomBlob);

    if (Array.size(randomBytes) == 0) {
      return "Failed to roll the dice. Please try again.";
    };

    // Generate a random dice roll between 1 and 6
    let diceRoll = Nat8.toNat(randomBytes[0]) % 6 + 1;
    
    let result = if ((guess == "high" and diceRoll >= 4) or (guess == "low" and diceRoll <= 3)) {
      "🎉 Correct! The dice roll was " # Nat.toText(diceRoll) # ". You guessed it right!"
    } else {
      "❌ Wrong guess! The dice roll was " # Nat.toText(diceRoll) # ". Try again!"
    };

    return result;
  };
};
