# Contributing Guide

Thank you for considering contributing to the Nuvian Labs Boilerplate! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by opening an issue or contacting the project maintainers. All complaints will be reviewed and investigated.

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager
- PostgreSQL database
- Git

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nuvian-labs-boilerplate.git
   cd nuvian-labs-boilerplate
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/nuvian-labs/nuvian-labs-boilerplate.git
   ```

### Install Dependencies

```bash
pnpm install
```

### Set Up Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your local database credentials and auth keys.

### Set Up Database

```bash
pnpm db:push
```

### Start Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Development Workflow

### Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

### Make Your Changes

1. **Write code** following our [code standards](#code-standards)
2. **Test your changes** thoroughly
3. **Update documentation** if needed
4. **Add tests** for new features

### Commit Your Changes

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear commit messages.

**Format**: `type(scope): description`

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**
```bash
git commit -m "feat(dashboard): add user profile page"
git commit -m "fix(auth): resolve session persistence issue"
git commit -m "docs(readme): update installation instructions"
```

### Keep Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream main into your branch
git merge upstream/main
```

---

## Code Standards

### TypeScript

- **Use TypeScript** for all new files
- **Define types** for function parameters and return values
- **Use interfaces** for object shapes
- **Avoid `any`** - use `unknown` if type is truly unknown

**Good:**
```typescript
interface UserData {
  email: string
  name: string
}

async function createUser(data: UserData): Promise<User> {
  // Implementation
}
```

**Bad:**
```typescript
function createUser(data: any): any {
  // Implementation
}
```

### React Components

- **Use functional components** with hooks
- **Use client components** sparingly (add `"use client"` only when needed)
- **Extract reusable logic** into custom hooks
- **Keep components small** and focused

**Good:**
```typescript
"use client"

import { useState } from "react"

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button onClick={onClick} className="...">
      {children}
    </button>
  )
}
```

### File Organization

```
├── app/                      # Next.js app directory
│   ├── (auth)/              # Auth route group
│   ├── (dashboard)/         # Dashboard route group
│   ├── (marketing)/         # Marketing route group
│   └── api/                 # API routes
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   └── [feature]/           # Feature-specific components
├── lib/                     # Utilities and configs
│   ├── auth.ts             # Auth configuration
│   ├── db.ts               # Database client
│   └── schema.ts           # Database schema
└── public/                 # Static assets
```

### Naming Conventions

- **Files**: `kebab-case.tsx` (e.g., `user-profile.tsx`)
- **Components**: `PascalCase` (e.g., `UserProfile`)
- **Functions**: `camelCase` (e.g., `getUserData`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`)
- **Types/Interfaces**: `PascalCase` (e.g., `UserData`)

### Code Style

We use ESLint and Prettier for code formatting.

**Run before committing:**
```bash
# Check for issues
pnpm lint

# Auto-fix issues
pnpm lint --fix

# Type check
pnpm type-check
```

### Database

- **Use Drizzle ORM** for database operations
- **Never use raw SQL** unless absolutely necessary
- **Add indexes** for frequently queried columns
- **Use transactions** for multi-step operations
- **Handle errors** gracefully

**Good:**
```typescript
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"

const user = await db.query.users.findFirst({
  where: eq(users.id, userId)
})
```

### API Routes

- **Validate input** using Zod
- **Return proper status codes**
- **Use consistent error format**
- **Add authentication** where needed
- **Log errors** for debugging

**Good:**
```typescript
import { z } from "zod"

const schema = z.object({
  email: z.string().email()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = schema.parse(body)

    // Your logic
    return Response.json({ success: true })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("API Error:", error)
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

---

## Testing

### Run Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e
```

### Writing Tests

```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from "@testing-library/react"
import { Button } from "@/components/ui/button"

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    screen.getByText("Click").click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

---

## Submitting Changes

### Before Submitting

1. **Update your branch** with latest upstream changes
2. **Run tests**: `pnpm test`
3. **Check types**: `pnpm type-check`
4. **Lint code**: `pnpm lint`
5. **Build**: `pnpm build`

### Create Pull Request

1. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub

3. **Fill out the PR template**:
   - Clear title following conventional commits
   - Description of changes
   - Screenshots (if UI changes)
   - Related issues
   - Checklist completed

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested? What test cases were added?

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] My code follows the project's code style
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published
```

### Review Process

1. **Maintainers review** your PR
2. **Address feedback** if requested
3. **Make changes** if needed
4. **PR gets merged** once approved

---

## Reporting Issues

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check documentation** for solutions
3. **Try troubleshooting** with [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

### Creating an Issue

**Use the appropriate template:**

- **Bug Report** - For reporting bugs
- **Feature Request** - For suggesting new features
- **Documentation** - For documentation improvements
- **Question** - For questions about usage

### Bug Report Template

```markdown
## Describe the Bug
A clear description of what the bug is.

## To Reproduce
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Screenshots
If applicable, add screenshots.

## Environment
- OS: [e.g., macOS 14.1]
- Node version: [e.g., 18.17.0]
- pnpm version: [e.g., 8.10.0]
- Browser: [e.g., Chrome 120]

## Additional Context
Any other context about the problem.

## Logs
```
Paste relevant error logs here
```
```

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature you'd like to see.

## Use Case
Why is this feature needed? What problem does it solve?

## Proposed Solution
How do you envision this feature working?

## Alternatives Considered
What other approaches have you considered?

## Additional Context
Any other context, screenshots, or examples.
```

---

## Development Tips

### Useful Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm type-check       # Check TypeScript
pnpm lint             # Lint code
pnpm lint --fix       # Auto-fix lint issues

# Database
pnpm db:push          # Push schema changes
pnpm db:studio        # Open database GUI
pnpm db:generate      # Generate migrations

# Testing
pnpm test             # Run tests
pnpm test:watch       # Watch mode
pnpm test:e2e         # E2E tests

# Build
pnpm build            # Production build
pnpm start            # Start production server
```

### Hot Reload Issues

If hot reload stops working:

```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
pnpm dev
```

### Database Changes

When modifying schema:

```bash
# 1. Update lib/schema.ts
# 2. Push changes to database
pnpm db:push

# For production, generate migration
pnpm db:generate
```

### Environment Variables

Never commit `.env.local` to git. Always update `.env.example` when adding new variables.

---

## Questions?

- **Documentation**: Check our [docs](./README.md)
- **Issues**: [GitHub Issues](https://github.com/nuvian-labs/nuvian-labs-boilerplate/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nuvian-labs/nuvian-labs-boilerplate/discussions)

---

## Recognition

Contributors who submit quality PRs will be:
- Added to the contributors list
- Mentioned in release notes
- Credited in the README

Thank you for contributing to Nuvian Labs Boilerplate! 🚀
