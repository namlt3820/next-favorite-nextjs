# NextFavorite Next.js

This is the frontend for an entertainment tracking and recommendation website [NextFavorite](https://nextfavorite.gladiolus.info/). It's powered by Next.js and created from its [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Its features include:

1. Register users by email.
1. Users can browse trending content and search for titles using popular public APIs, such as [TRAKT](https://trakt.docs.apiary.io/) for movies and TV shows, and [JIKAN](https://docs.api.jikan.moe/) for anime.
1. Users can add titles to their favorite list for personalized suggestions or to their ignore list to exclude them from being suggested.
1. Our service has the potential for significant expansion in the future, as long as there are APIs offering search and recommendation features. Whether it's movies, anime, games, books, or other media, our goal is to provide users with a single place to expand their list of favorite entertainment items.
1. Feel free to send an email to suggest new APIs or improvements to the site experience.

## Components

This project has two components:

1. A Next.js server for the frontend.
1. A serverless backend that utilizes various AWS services:
   - Cloud Development Kit (CDK)
   - Lambda
   - API Gateway
   - DynamoDB
   - Cognito
   - Simple Email Service (SES)
   - Secret manager
   - Identity and Access Management (IAM)

## Development

To spin up the project locally, follow these steps:

1. Clone the repo
1. Then `cd YOUR_PROJECT_REPO && cp .env.example .env.development`
1. Ensure the backend component is ready and add its URL to the environment file.
1. Next `yarn && yarn dev` or `npm install && npm run dev`
1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

That's it! Changes made in `./src` will be reflected in your app.

## Production

To start up a docker container in your production environment, follow these steps:

1. First clone the repo
1. Then `cd YOUR_PROJECT_REPO && cp .env.example .env.production`
1. Next `docker compose up --build -d`

## Questions

If you have any issues or questions, reach out to me on [Email](mailto:namlt3820@gmail.com) or start a [GitHub issue](https://github.com/namlt3820/next-favorite-nextjs/issues).
