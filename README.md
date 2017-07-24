# Journey Apps Internship Test

This is a short script made for the @JourneyApps internship program. The design spec can be found in [this gist](https://gist.github.com/skaapgif/7644116d3e3aae6757da95a7a8b9794a) and can be summarised as:
1. Find the top 10 Cape Town developers on GitHub, by follower count.
2. Use node.js to do this.
3. Use the GitHub search API
4. Use git.
5. Be cool about it.

UPDATE: refactor.js is an updated and better version of this code. However, it relies on an API token in order to work properly, and you will need to supply yours to the program in order to use it.

# Requirements
As this is a node.js project, it has a bunch of prerequisites. You'll need to install:
1. node.js 8
2. request
3. request-promise
4. request-rate-limiter

You can install node.js using your favourite package manager, or from their [site.](https://nodejs.org/en/download/)

You'll also probably want npm to handle your libraries, which can be found [here.](https://www.npmjs.com/)

You can get this project onto your computer by running:
```
git clone https://github.com/KaliumPuceon/Journey_Apps_Test.git
```
in the directory of your choice to clone it there. Then, in the project directory, run the following commands to install the necessary libraries.

```
npm install request
npm install request-promise
npm install request-rate-limiter
```

# Running
To run this project, make sure you have an Internet connection and all the needed libraries, and run:
```
nodejs test.js
```

# Don't run this script too much
GitHub wisely doesn't allow you to make a billion requests to their API, especially if you don't even have the courtesy to identify yourself. If you run this script twice in an hour, you'll use up your IP's GitHub API queries for an hour. Just wait an hour for them to refresh. If you really wanted to, you could hack it and drop an OAuth token into request options, but this way my code *should* run right off the back without you having to go grab any authentication things.

