# HomeTree website

Read `README.md` before changing anything. It has the file map, IDs, brand rules and the full update loop.

## Publishing rules (these keep Netlify costs down)

- `main` is the live site. Every push to `main` is a paid production deploy on Netlify.
- Do all work on the `dev` branch. Never commit directly to `main`. After a shallow clone, run `git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*' && git fetch origin && git checkout dev`. Pushes to `dev` build a free branch preview at https://dev--hometree-hosts.netlify.app.
- Batch changes on `dev`. Only merge `dev` into `main` when Mitchell says to publish, and publish several changes together rather than one at a time.
- Preview locally first (`node scripts/build.mjs`, serve `dist/`, screenshot phone and desktop) so fixes don't need extra deploys.
- Do not deploy with the Netlify CLI or the connector's deploy tool. GitHub is the only way code reaches Netlify.
- Never commit secrets. Keys live in Netlify environment variables.
- Writing: follow the HomeTree Brand Guide (project doc) and never use em dashes.
