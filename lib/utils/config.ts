require("dotenv").config();

function loadConfiguration() {
  return {
    app: {
      baseUrl: process.env["BASE_URL"]!,

      accountsUrl: process.env["ACCOUNTS_URL"]!,
      userEmail: process.env["USER_EMAIL"]!,
      userPassword: process.env["USER_PASSWORD"]!,
    },
  };
}

export const config = loadConfiguration();
