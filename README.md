# goudster

Commercial website for the beer Goudster from Halen, Belgium.

Website was fully hand-coded.

# stack

HTML(ejs), CSS(sass), NodeJs (ExpressJs).

# taskrunner build tool

Gulp with browser-sync and nodemon. See package.json for list of all dev dependencies.
- `npm run dev`
- `npm run build`

Production version can be run using `npx nodemon` in dist folder.

NOTE: both dev and production version require access to correct .env variables

# website functionality

- Newsletter signup via Mailgun API.
- Contactform via Nodemailer and Mailgun.
- Custom Map via Google Maps API

# compliance

- GDPR compliant forms (active consent before button can be clicked)
- Modal pop-up on page load for active age consent (alcoholic beverage)
- Cookie-bar pop-up with link to privacy-policy
- User settings are stored in browser localStorage

# notable css features

- Responsive design with mobile first approach
- Bottom menu on mobile
- Company history timeline

# credits

Designed in AdobeXD and build with VS Code by Joris Raymaekers 
See more @ liondigits.com

https://xd.adobe.com/view/db65a1aa-f720-458b-4fc2-a8a8282d2ee3-ad54/