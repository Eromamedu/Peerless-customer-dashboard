# Peerless Customer Management Dashboard

## Case Study
Case Study Option 1 — Customer Management Dashboard

## Tech Stack
- React
- TypeScript
- React Router
- Tailwind CSS
- Lucide React
- Vitest / React Testing Library

## Assumptions
- Customer data is provided through a local mock service.
- No real customer information or production credentials are used.
- Customer registration is simulated through the mock API.
- The dashboard is intended primarily for desktop Relationship Managers but
  remains responsive on smaller screens.

## Main Journey
1. View customer dashboard
2. Search/filter customers
3. Select Register Customer
4. Complete registration form
5. Validation prevents invalid submission
6. Customer is submitted through the mock service
7. Completion state is displayed
8. User can register another customer

## States
- Loading
- Empty
- Error
- Validation error
- Submitting
- Success

## Deferred
- Authentication and authorization
- Real backend/database integration
- Pagination
- Customer editing/deletion
- Production deployment infrastructure

## AI Disclosure
AI tools were used to support research and debugging. Final implementation decisions, testing,
and review were performed by me.






<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories. -->
