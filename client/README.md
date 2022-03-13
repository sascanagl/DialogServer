# Dialog Engine

This React project is my experimentation in implementing a game engine logic tree as I remember seeing it in the Oblivion World Construction Kit.  I did not go back and look at the actual implementation.  Having seen it years ago, and grasping the concept, I have decided to implement something like that as my first exercise in developing something with React.

## App.js
The place where it all comes together.  This is the primary handler to "react" to everything happening in the UI and to help manage the gamestate caused by this interactive input.  It is also where the specific logic tree for a game is loaded.  The sample here loads up 'Business of Murder'.

More information will be coming as we finish separating out the DialogEngine data and logic from the React UI.

## Developing and Running
Preparing and launching the React development server is handled in the DialogServer README.  

A reminder: at this time you cannot run the DialogEngine React UI without the DialogServer running to provide content and dynamic dialog generation.