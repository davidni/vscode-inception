# Inception for Visual Studio Code

Inception is an extension for Visual Studio Code that helps you dive into information contained in text.
  * Select a base64-encoded string, press Ctrl+F1 (Cmd+F1 on Mac) and see the decoded data
  * Select a URL-encoded string, press Ctrl+F1 (Cmd+F1 on Mac) and see the decoded data
  * Select a URL, press Ctrl+F1 (Cmd+F1 on Mac) and see its query and hash parameters nicely decoded
  * Select a JSON string, press Ctrl+F1 (Cmd+F1 on Mac) and see the prettified data
  * Select a UNIX timestamp, press Ctrl+F1 (Cmd+F1 on Mac) and see the decoded date/time in your time-zone as well as in UTC.
  * Select a JWT token, press Ctrl+F1 (Cmd+F1 on Mac) and see its base64 parts nicely separated and identified.
  * etc.

Are you getting it? A single keystroke does all of those and without asking you to specify what type of conversion to apply. Inception has simple but effective rules to auto-detect some of the most common encodings used in modern web stacks and does its best to provide a meaningful and useful output for each.

No more copying / pasting text around into separate converters and tools. No more learning how to use different tools for simple conversion operations. No more risking using online tools that could be stealing your data.

Inception enables you to get to the information you need in a streamlined and efficient way, and everything happens inside Visual Studio Code.

## Example scenario
You want to see the value of the "exp" claim in a JWT token from a raw HTTP trace. Here's how to do it with Inception.
  1. Paste the raw text into VS Code
  2. Select the JWT token in the editor and press Ctrl+F1 (Cmd+F1 on Mac). The 3 base64 parts of the JWT token are shown
  3. Select the base64 payload, press Ctrl+F1 (Cmd+F1 on Mac). The JSON payload is shown
  4. Select the JSON payload, press Ctrl+F1 (Cmd+F1 on Mac). The prettified JSON payload is shown
  5. Find the "exp" claim, select its value and press Ctrl+F1 (Cmd+F1 on Mac). The date/time value is shown in a human-readable form. Done!

Of course, there are tools out there dedicated for parsing JWT tokens that do a better job than this and with fewer clicks. But they *only* work with JWT tokens. Inception supports any textual data, and JWT tokens are just one of the things that it can help you with.

## Supported data formats
The list entries below are in the format "Supported input (generated output)"

  * Base64-encoded strings (decoded string)
  * URL-encoded strings (decoded string)
  * JSON (prettified JSON)
  * JSON-encoded strings (decoded string)
  * Javascript timestamps (human-readable date-time in local time and UTC)
  * UNIX timestamps (human-readable date-time in local time and UTC)
  * JWT tokens (3 base64 parts of the JWT token)
  * URL's (splits the stem, query and hash parameters)
