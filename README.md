## Basic smoke tests for MeisterTask

#### Prerequisites

- Node, minimum v18 - Version managing tool like [NVM](https://github.com/creationix/nvm) cab used to install a specific Node version.
- Clone this repository `git@github.com:leondominovic/meistertask-challenge.git`
- Install node packages with `npm install`
- Install playwright dependencies `npx playwright install --with-deps`
- Set environment values in the `.env` file

  | ENV name      | Value                        |
  | ------------- | ---------------------------- |
  | BASE_URL      | https://www.meistertask.com/ |
  | USER_EMAIL    | ?                            |
  | USER_PASSWORD | ?                            |

### Runing tests

Tests can be run via the command: `npx playwright test`

Tests can be run in the headed mode via the command: `npx playwright test --headed`

The HTML report is generated at the end of the tests execution. When tests fail it will be automatically opened.
If all tests pass then it can be opened via `npx playwright show-report`.

### Explanation

_Reasons why you've selected these 5 tests?_

They are part of the necessary basic smoke tests.

_What are best practices you have used in your framework?_

- Page Object Model (POM)
- Demonstrating using API call for the result validation and test date clean up (Do not focus only on UI test automation)
- DRY- Do not repeat yourself
- Reusing authentication session instead of login every time for every test
- Test methods and test cases should have meaningful and descriptive names
- Save screenshots for failing test cases
- Setup detailed automation tests reporter
- Sensitive data should be held in .env file or any other file which will be listed in .gitignore file
- Eslint and Prettier are set up
- Pre-commit husky hook for code clean up is added

_Do we have reporting, if yes, what type?_

Yes, HTML reporting with screenshots and logs for failed tests.

_Should we integrate tests in CI and why?_

No. These tests should be improved with API data setup and clean up.
