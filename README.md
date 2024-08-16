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

```
|- app: This is where to create and configure for pages in Nextjs.
|   |- (dashboard) 
|   |   |- mission-categories: mission category page
|   |   |- missions: mission pages
|   |   |   |- [id]: mission details page
|   |   |   |- add: mission creation page
|   |   |   `- page.tsx: mission list page 
|   |   |- rewards: reward pages
|   |   |   |- [id]: reward details page
|   |   |   |- add: reward creation page
|   |   |   `- page.tsx: reward list page 
|   |   `- users: user page
|   |- api: api routes to call Discord API
|   |   |- channels: call Discord APIs related to `channel`
|   |   |- guilds: call Discord APIs related to `guild`
|   |   |- callers.ts: fetch API routes from client side
|   |   `- services.ts: use React-Query to wrap fetching functions from `callers.ts`
|   `- login: login page
|- assets: Collections of assets like images.
|- components: Common, re-usable components.
|- config: store the configuration
|- constants: All constants in the app.
|- redux: use Redux Toolkit, handle global state
|- styling: store global css files
|- supabase: Configurations, endpoints and functions to interact with Supabase.
|   |- api
|   `- (object): APIs related to queried object
|       |- callers.ts: fetch data from Supabase
|       `- services.ts: use React-Query to wrap fetching functions from `callers.ts`
`- utils: Utility functions.
```

## Env variables

`NEXT_PUBLIC_SUPABASE_URL`: Supabase URL, take it in API Settings tab, Project Dashboard

`NEXT_PUBLIC_SUPABASE_KEY`: Supabase `service_role` key, take it in API Settings tab, Project Dashboard

`NEXT_PUBLIC_BOT_TOKEN`: Discord Bot token

`NEXT_PUBLIC_GUILD_ID`: Discord Guild ID

`NEXT_PUBLIC_OG_CLIENT_BASE_URL`: base URL of OpenGuild client website

`NEXT_PUBLIC_DISCORD_API_BASE_URL`: base URL of Discord API

## Deployment with Vercel

- Deploy following this guideline for NextJS application: https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app/deploy
- Add the _Environment Variable_ above to avoid publishing the .env file