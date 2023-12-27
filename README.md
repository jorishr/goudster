## Goudster

![Website](https://img.shields.io/website?url=https%3A%2F%2Fgoudster.be)
![GitHub package.json version](https://img.shields.io/github/package-json/v/jorishr/goudster)
![node-current](https://img.shields.io/node/v/node-sass)

Commercial website for the beer brand Goudster from Halen, Belgium.

[Designed in AdobeXD](https://xd.adobe.com/view/db65a1aa-f720-458b-4fc2-a8a8282d2ee3-ad54/) and built with care in NodeJs by Joris Raymaekers.

See more @ [liondigits.com](https://www.liondigits.com)

- [Goudster](#goudster)
- [Tech stack](#tech-stack)
  - [Front end features](#front-end-features)
  - [Backend features](#backend-features)
  - [Task runner and build tools](#task-runner-and-build-tools)

## Tech stack

### Front end features

- Responsive design with mobile first approach
- Bottom menu on mobile, top menu on desktop
- Custom built company history timeline
- Fade-in animations for timeline items via Intersection Observer API
- GDPR compliant forms with active consent before button can be clicked
- Modal pop-up on page load for active age consent
- Cookie bar pop-up with link to privacy-policy
- User consent settings are stored in browser localStorage
- Custom Map via Google Maps API
- Flash card pop-ups for client side validation errors and server side messages
- Debounce functionality for form submit buttons to prevent multiple submissions
- Custom error page for 404 and server side errors

### Backend features

- ExpressJs web server
- Server side HTML rendering with EJS
- Newsletter sign up handling via Mailgun API.
- Contact form handling via Nodemailer and Mailgun API.
- Server side form content validation (Express-validatorJs)
- Age verification: input birthday validation check
- Routing with Express-Router
- Jest Integration Testing for route handlers and form validation
- Middleware for spam prevention

### Task runner and build tools

Gulp task runner with browser-sync and nodemon. CSS written in SASS. JavaScript compilation with Webpack.

_Dev notes_:

- both development and production versions require access to the correct environment variables.
- the bash deploy script is meant to be run on a VPS or dedicated build server
- As of december 2023 dev dependencies are updated to work with with Node v20.
- see [changelog](CHANGELOG.md) for version history
