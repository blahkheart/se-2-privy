const { google } = require("googleapis");
const readline = require("readline");

// Set up the OAuth2 credentials
const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
const REDIRECT_URI = "YOUR_REDIRECT_URI";
const SCOPES = ["https://www.googleapis.com/auth/youtube.force-ssl"];
const youtube = google.youtube({ version: "v3" });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the channel ID: ", channelId => {
  const authUrl = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI).generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log(`Please authorize this app by visiting this URL: ${authUrl}`);

  rl.question("Enter the authorization code: ", code => {
    new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI).getToken(code, (err, token) => {
      if (err) {
        console.error("Error getting access token:", err);
        return;
      }
      youtube.subscriptions.list(
        {
          auth: new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI).setCredentials(token),
          part: "snippet",
          mine: true,
          forChannelId: channelId,
        },
        (err, res) => {
          if (err) {
            console.error("Error checking subscription:", err);
            return;
          }
          if (res.data.items.length > 0) {
            console.log("The user is subscribed to the channel");
          } else {
            console.log("The user is not subscribed to the channel");
          }
        },
      );
    });
  });
});
