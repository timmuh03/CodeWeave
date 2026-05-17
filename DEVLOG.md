# Codeweave DEVLOG

## Explanation
Codeweave was originally going to be simple exercises to keep my FastAPI and AQLAlchemy skills sharp.
However, it has grown quite significantly as i have continued to work on it towards a full application.
Because its scope has increased, and other obligations sometimes distract, I need a place to keep my thoughts and plans so I don't have to rethink them.

---

## Plans
* Add dark mode
* ~~Make edit snippet button~~
* Add floating edit snippet window
* Add edit concept button when concept is expanded
* remove + from concept expansion, it's not doing anything
* Add sort options under the search box
* Rearrange edit/delete snippet buttons and make it clear which snippet they belong to
* Refactor Example to snippet in code to be consistent with idea and terminology.
* Refactor CSS so I dont have to target each item individually and use classes for consistent styling.
* Make snippet text read only in concept edit window

---

## Details

### Adding a floating edit snippet text window
- Hidden until user taps edit snippet text button
- Displays single snippet for text editing.
- Need an accept/deny changes button.

### Add a floating edit slot window
- User highlights part of the text from the edit concept page
- An add slot button appears at bottom of snippet to make this part an option slot
- Once the text becomes a slot, the text changes to signify its a slot
- The add slot button becomes an edit slot button when the user taps a slot.