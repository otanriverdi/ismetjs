**This directory is configured to work with Google Firebase and is ignored by `npm`.**

**It holds a single function that takes a code parameter, makes the final request of the OAuth flow to the Github API and sends back the response to Ismet.**

**This is necessary because there is no way to store the Github App Secret on users computer. So it's stored on Firebase as a config secret instead.**

**Don't make any changes this directory**