# Admin OpenGuild App

Using NextJS v14.2.5

## How to run.

1. Install packages

```bash
npm i
```

2. Create .env file

3. Run project

```bash
npm run dev
```

## Project Structure

|- app: This is where to create and configure for pages in Nextjs.
|- assets: Collections of assets like images.
|- components: Common, re-usable components.
|- config: store the configuration
|- constants: All constants in the app.
|- supabase: Configurations, endpoints and functions to interact with Supabase.
|- utils: Utility functions.

## Env variables

`NEXT_PUBLIC_SUPABASE_URL`: Supabase URL
`NEXT_PUBLIC_SUPABASE_KEY`: Supabase key
`NEXT_PUBLIC_BOT_TOKEN`: Discord Bot token
`NEXT_PUBLIC_GUILD_ID`: Discord Guild ID
`NEXT_PUBLIC_OG_CLIENT_BASE_URL`: base URL of OpenGuild client website
`NEXT_PUBLIC_DISCORD_API_BASE_URL`: base URL of Discord API

## Deployment with Vercel

- Deploy following this guideline for NextJS application: https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app/deploy
- Add the _Environment Variable_ above to avoid publishing the .env file