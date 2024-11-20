# Word Connect Game

An engaging, interactive word-matching game built with React. This project allows users to match pairs of related words from the same group, enhancing vocabulary and word association skills in a fun and customizable way.

## Features

1. **Match Pairs of Words**: Users can match pairs of words that belong to the same group, promoting learning through interaction.

2. **Visual Feedback**: The game provides immediate visual feedback—correct matches turn green while incorrect matches turn red, helping users quickly identify their progress.

3. **Dynamic Gameplay**: Correctly matched pairs disappear from the grid, adding excitement and a sense of achievement to the game.

4. **Attempt Tracking**: The game tracks and displays the number of attempts made by the user in real-time using React state management.

5. **Config Settings Panel**: Players can customize their experience by adjusting settings such as group size, number of pairs, and grid layout.

### Live Demo

[View the live demo here](#)

## Getting Started

To run this project, you will need Node.js and npm installed on your machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Files

- **index.html**: The main HTML structure for the game.
- **styles.css**: The CSS file for styling the game components.
- **App.js**: The main React component containing all the game logic.

### How to Use

1. **Starting the Game**:
   - Clone this repository:
     ```bash
     git clone https://github.com/Ganesh-Patel/Word-match-game.git
     ```
   - Navigate into the project directory:
     ```bash
     cd Word-match-game
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

2. **Playing the Game**:
   - Select your desired settings in the Config Settings Panel (group size, item count, number of columns).
   - Click on pairs of words to attempt to match them.
   - Observe visual feedback for correct (green) and incorrect (red) matches.
   - Track your total attempts displayed on the screen.

3. **Resetting the Game**:
   - Click the "Reset" button to clear the board and restart your game with fresh settings.

### Code Overview

The main functions in `App.js` include:

- **handleMatch**: Logic to determine if two selected words match and update their state accordingly.
- **trackAttempts**: Updates and displays the total number of attempts made by the user.
- **resetGame**: Clears all matches and resets attempt counts for a new game.
- **renderGrid**: Dynamically generates the game grid based on user-selected settings.

### Styling

This project uses CSS for styling components, ensuring a clean and user-friendly interface. 

- **Game Grid**: The grid layout is responsive, allowing for different column counts based on user preferences.
- **Feedback Colors**: Correct matches are styled with a green background while incorrect matches utilize a red background for clear visual feedback.
- **Buttons and Inputs**: Styled for consistency, ensuring an intuitive user experience throughout gameplay.

---

## Technologies Used

- **React**
- **CSS**

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author

- **[Ganesh Patel]** - Project Developer

---

## Future Enhancements

Some potential features for future releases:

- **Sound Effects**: Add audio feedback for correct and incorrect matches.
- **Leaderboard**: Implement a scoring system with a leaderboard to encourage competition among players.
- **Additional Word Groups**: Expand the database with more word groups to increase variety in gameplay.

---

Thank you for playing Word Connect! Enjoy matching words and enhancing your vocabulary!