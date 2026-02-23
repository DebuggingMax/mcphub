# Publishing MCP Hub to npm

## Prerequisites

1. **npm Account**: Create an account at https://www.npmjs.com/signup
   - Email: DebuggingMax@users.noreply.github.com (or your preferred email)
   - Username: debuggingmax (or preferred)

2. **npm Token**: Generate an access token at https://www.npmjs.com/settings/~/tokens
   - Token type: "Publish" (for automation) or use interactive login

## Manual Publishing

```bash
# 1. Login to npm
npm login

# 2. Build the project
npm run build

# 3. Run tests
npm test

# 4. Publish
npm publish --access public
```

## Automated Publishing (GitHub Actions)

The release workflow (`.github/workflows/release.yml`) handles automated publishing:

### Setup

1. Go to https://www.npmjs.com/settings/~/tokens
2. Generate a new "Automation" token
3. Add it to GitHub repo secrets:
   - Go to: https://github.com/DebuggingMax/mcphub/settings/secrets/actions
   - Add secret: `NPM_TOKEN` with the npm token value

### Creating a Release

```bash
# Tag a new version
git tag v1.0.0
git push origin v1.0.0
```

This will trigger the release workflow which:
1. Builds the project
2. Runs tests
3. Publishes to npm with provenance
4. Creates a GitHub release

## Version Bumping

```bash
# Patch release (1.0.0 -> 1.0.1)
npm version patch

# Minor release (1.0.0 -> 1.1.0)
npm version minor

# Major release (1.0.0 -> 2.0.0)
npm version major

# Push with tags
git push --follow-tags
```

## Quick Publish Script

Run the helper script:

```bash
./scripts/setup-npm.sh
```

## After Publishing

The package will be available at:
- **npm**: https://www.npmjs.com/package/mcphub
- **Install**: `npm install -g mcphub`

## Troubleshooting

### "You must be logged in"
```bash
npm login
```

### "Package name already exists"
The name `mcphub` was verified available as of the creation of this project.

### "Missing 2FA"
If you have 2FA enabled, you'll need to provide a one-time password:
```bash
npm publish --otp=123456
```
