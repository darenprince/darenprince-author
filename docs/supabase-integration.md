---
title: "Supabase integration"
description: "Learn how to install, configure, and use the Supabase integration with Netlify."
---

[Supabase](https://supabase.com/) is an open-source platform that provides a suite of tools including a PostgreSQL database, authentication, storage, real-time capabilities, and a GraphQL API.

The Supabase integration for Netlify streamlines your workflow by connecting your Supabase and Netlify projects. It offers the following benefits:

- **Seamless authentication**. Easily connect your Supabase account using OAuth.

- **Project selection**. Choose your desired Supabase project from your account.

- **Automated environment configuration**. We'll set up these crucial environment variables for you:

  - `SUPABASE_DATABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_ANON_KEY`

- **Framework compatibility:** Select your frontend framework (for example, Next.js, Nuxt, or Vue), and we'll configure the appropriate environment variables.

- **Custom prefix option:** Using a different framework? No problem. You can specify a custom prefix for your environment variables.

## Before you begin

To integrate Supabase with your Netlify site, make sure you have the following:

- a [Supabase](https://supabase.com/) account
- a [deployed site](/deploy/deploy-overview) on Netlify

## Get started with Supabase

As a Team Owner, you can install the Supabase integration for your team to use:

1. In the Netlify UI, navigate to the 
### NavigationPath Component:

Extensions
 page for your team.
2. Search for `Supabase` and select it in the search results.
3. On the details page, select **Install**.
4. From your team's **Sites** list, select the site you plan to use with Supabase, and navigate to 
### NavigationPath Component:

Project configuration > General > Supabase
.
5. Select **Connect** and follow the prompts to authorize and connect to Supabase.
6. Select your Supabase project and framework. If you select `Other` during configuration, you will be able to specify a custom prefix for your environment variables.
7. Select **Save**.

The integration automatically creates [site environment variables](/build/environment-variables/overview) for the configuration values you provide. You can review these variables at any time by navigating to 
### NavigationPath Component:

Project configuration > Environment variables
.

### User-level authentication

The Supabase integration authenticates at the user-level in the Netlify UI. When you collaborate on a team, each user needs to follow the authentication steps above to connect to Supabase (steps 4-7).

## Use the Supabase client in your site

You can use the [Supabase client](https://supabase.com/docs/reference/javascript/introduction) in your site to interact with your Supabase project. Pass in the following environment variables when you create the client:

### Tabs Component:

<TabItem label="TypeScript">

```ts
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabase = createClient<Database>(
  process.env.SUPABASE_DATABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
```

</TabItem>

<TabItem label="JavaScript">

```js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_DATABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
```

</TabItem>

If your site uses a framework, you'll want to use the prefixed, public environment variables. For example, with Next.js:

### Tabs Component:

<TabItem label="TypeScript">

```ts
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

</TabItem>

<TabItem label="JavaScript">

```js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

</TabItem>

To test your site locally, install the [Netlify CLI](/api-and-cli-guides/cli-guides/get-started-with-cli) and then run `netlify dev`. [Netlify Dev](/api-and-cli-guides/cli-guides/local-development) will automatically inject the configuration environment variables for you.

## Modify your configuration

To update the Supabase configuration settings for your site:

1. In the Netlify UI, navigate to 
### NavigationPath Component:

Project configuration > General > Supabase
 for the site you want to edit.
2. Update your configuration and then select **Save**.

Alternatively, you can [update the environment variables](/build/environment-variables/get-started/#modify-and-delete-environment-variables) directly.

## Uninstall the integration

As a Team Owner, to uninstall the Supabase integration:

1. In the Netlify UI, navigate to the 
### NavigationPath Component:

Extensions
 page for your team.
2. Search for `Supabase` and select it in the search results.
3. On the details page, navigate to the **Danger zone** section, and then select **Uninstall this extension**.
