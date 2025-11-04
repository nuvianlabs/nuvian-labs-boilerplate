# GitHub Repository Checklist

This checklist will help you publish the Nuvian Labs Boilerplate as a GitHub template repository.

## ✅ Pre-Publishing Checklist

All of these items are already complete:

- [x] MIT LICENSE file created
- [x] CODE_OF_CONDUCT.md added (Contributor Covenant v2.0)
- [x] CONTRIBUTING.md with development guidelines
- [x] GitHub issue templates configured:
  - Bug Report
  - Feature Request
  - Documentation Issue
  - Template config with discussion links
- [x] Pull Request template with comprehensive checklist
- [x] Comprehensive documentation:
  - README.md (main project overview)
  - QUICK-START.md (setup instructions)
  - DEPLOYMENT.md (deployment guides)
  - DATABASE.md (schema and usage)
  - AUTH.md (authentication setup)
  - API.md (API documentation)
  - TROUBLESHOOTING.md (common issues)
  - TEMPLATE_SETUP.md (guide for template users)
  - STATUS.md (build progress)
- [x] Package.json version updated to 1.0.0
- [x] All TypeScript type checks passing
- [x] Example unit tests with Vitest
- [x] Example E2E tests with Playwright

## 📋 Manual Steps to Publish

### Step 1: Create GitHub Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: initial Nuvian Labs Boilerplate v1.0.0

- Complete Next.js 15 + React 19 foundation
- Better Auth with Google OAuth
- Drizzle ORM with PostgreSQL
- shadcn/ui components
- Marketing site with landing, pricing, waitlist
- Protected dashboard with settings, billing, profile
- Comprehensive documentation
- Testing setup with Vitest and Playwright
- Error boundaries and loading states
- Ready to use as template

MVP Complete - 62% (8/13 phases)"

# Create GitHub repository (using GitHub CLI)
gh repo create nuvian-labs-boilerplate --public --source=. --remote=origin

# Or manually:
# 1. Go to https://github.com/new
# 2. Name: nuvian-labs-boilerplate
# 3. Description: Production-ready Next.js boilerplate with auth, database, AI, payments, and analytics
# 4. Public repository
# 5. DON'T initialize with README, .gitignore, or license (we have these)
# 6. Create repository
# 7. Follow the instructions to push existing repository

# Push to GitHub
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nuvian-labs-boilerplate.git
git push -u origin main
```

### Step 2: Configure Repository Settings

1. **Go to Repository Settings**
   - Navigate to your repository on GitHub
   - Click "Settings" tab

2. **General Settings**
   - Add description: "Production-ready Next.js boilerplate with auth, database, AI, payments, and analytics"
   - Add topics/tags:
     - `nextjs`
     - `react`
     - `typescript`
     - `boilerplate`
     - `template`
     - `better-auth`
     - `drizzle-orm`
     - `tailwindcss`
     - `shadcn-ui`
     - `vercel`

3. **Enable Template Repository**
   - Scroll down to "Template repository" section
   - Check ✅ "Template repository"
   - Save changes

4. **Enable Features**
   - ✅ Issues
   - ✅ Discussions (recommended for Q&A)
   - ❌ Projects (optional)
   - ❌ Wiki (we have docs in repo)
   - ✅ Preserve this repository (optional)

5. **Set Default Branch**
   - Ensure `main` is the default branch

### Step 3: Configure GitHub Pages (Optional)

If you want to host docs:
1. Go to Settings → Pages
2. Source: Deploy from branch
3. Branch: main / docs (or create gh-pages)
4. Save

### Step 4: Add Repository Secrets (Optional)

For CI/CD workflows:
1. Go to Settings → Secrets and variables → Actions
2. Add secrets as needed (DATABASE_URL, etc.)

### Step 5: Test Template Creation

1. Go to your repository
2. Click "Use this template" button
3. Create a new repository from template
4. Clone the new repo
5. Follow [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md)
6. Verify everything works

## 🎯 Post-Publishing Tasks

### Recommended GitHub Actions (Optional)

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4

    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 10

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'pnpm'

    - name: Install dependencies
      run: pnpm install

    - name: Type check
      run: pnpm type-check

    - name: Lint
      run: pnpm lint

    - name: Run tests
      run: pnpm test
```

### Update Contact Information

Update these files with your actual contact info:

1. **CODE_OF_CONDUCT.md**
   - Line: `[INSERT CONTACT EMAIL]`
   - Replace with your enforcement email

2. **CONTRIBUTING.md**
   - Verify all links work
   - Update any placeholder information

3. **.github/ISSUE_TEMPLATE/config.yml**
   - Update URLs from `nuvian-labs/nuvian-labs-boilerplate` to your username/repo

### Create Release

```bash
# Tag version 1.0.0
git tag -a v1.0.0 -m "Release v1.0.0 - MVP Complete"
git push origin v1.0.0
```

On GitHub:
1. Go to Releases
2. Click "Create a new release"
3. Choose tag: v1.0.0
4. Release title: "v1.0.0 - MVP Complete"
5. Description: Copy from [STATUS.md](STATUS.md#-overall-progress)
6. Publish release

## 📢 Promote Your Template

Once published, consider:

1. **Add to awesome lists**
   - awesome-nextjs
   - awesome-react
   - awesome-typescript

2. **Share on social media**
   - Twitter/X
   - LinkedIn
   - Reddit (r/nextjs, r/webdev)
   - Dev.to
   - Hashnode

3. **Create demo deployment**
   - Deploy to Vercel
   - Add "View Demo" link to README

4. **Write blog post**
   - How you built it
   - What problems it solves
   - How others can use it

## 🔒 Security

1. **Enable Dependabot**
   - Go to Settings → Security → Code security and analysis
   - Enable Dependabot alerts
   - Enable Dependabot security updates

2. **Add Security Policy**
   - Create SECURITY.md if needed
   - Define vulnerability reporting process

3. **Review Permissions**
   - Audit who has access
   - Use branch protection rules

## ✅ Final Verification

Before announcing publicly:

- [ ] Repository is public
- [ ] Template setting is enabled
- [ ] All documentation links work
- [ ] Issue templates appear correctly
- [ ] PR template appears correctly
- [ ] Test creating a repo from template
- [ ] Clone template repo and run setup
- [ ] Verify all features work
- [ ] README has accurate information
- [ ] License is correct
- [ ] Version is 1.0.0
- [ ] All secrets are removed from code
- [ ] No hardcoded credentials

## 📝 Notes

- The repository is ready to push to GitHub
- All code is production-ready
- Documentation is comprehensive
- Testing infrastructure is in place
- Template is ready for users

Ready to share with the world! 🚀
