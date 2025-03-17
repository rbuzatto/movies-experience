This is Movies Experience, where you can find all your favorites movies

## Getting Started

Installing the dependencies:

```bash
pnpm i
```

set `NEXT_PUBLIC_BASE_URL` variable at `.env`

Run the development server:

```bash
pnpm dev
```

This project is powered by the following stack:

- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Next.JS](https://nextjs.org/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [tailwind](https://tailwindcss.com/)
- [shadcn](https://ui.shadcn.com/)
- [vitest](https://vitest.dev/)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)

### About Queries

I chose react-query for client side queries, it handles great perfoming queries and caching. The searching functionality I let the frontend perform the query instead of reloading the page. For rendering data for a specific movie I let the backend do the work.

### Authorization

I created a middleware to retrieve the auth token, and set in the cookies. This way the frontend would receive the token from the server, instead of fetching itself. I feel this is the best approach, where the backend controls specific sensitive data.

### Linting

Although I picked eslint + prettier, which is standard, I considered using Biome.js, which is far more performant. Since I'm not familiar yet I went with eslint + prettier.

### Opted-out

I considered if some form library should be used along with some validator, like react-hook-form and zod. It felt really unnecessary here for an input search.

### Improvements

I would consider adding other filters, like movies per page, allow picking other views for rendering movies (e.g. grid), and I would add throttle behavior for the input.
