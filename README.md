# Project Overview
## Monorepo Structure
The project is organized as a monorepo, which allows multiple projects to be housed in a single repository. The monorepo contains two main directories: frontend and backend.

- frontend/: Contains the React application integrated with Astro.js.
- backend/: Contains the backend application built with the Deno framework.

### Frontend: React and Astro.js Integration

#### React
The frontend of the application is built using React, a powerful library with Typescript upon it for building user interfaces. React's component-based architecture ensures that the UI is modular, reusable, and maintainable.

#### Astro.js
Astro.js is used to enhance the frontend development process by optimizing for performance and reducing complexity. Astro enables server-side rendering (SSR) and static site generation (SSG), which improves the initial load time and SEO performance of the application.

### Integration Highlights:

- Component Islands: Astro allows integrating React components seamlessly. It renders static content where possible, and only hydrates interactive components on the client-side, resulting in faster load times.
SSR and SSG: With Astro, pages can be pre-rendered at build time (SSG) or on-demand (SSR), combining the best of both worlds for performance and flexibility.

- Backend: Deno Framework
The backend is built using Deno, a modern runtime for JavaScript and TypeScript. Deno offers several advantages, such as a secure by default execution environment, first-class TypeScript support, and a single executable for simplicity.

### Backend Architecture:

- RESTful API: The backend exposes a RESTful API to handle client requests, perform CRUD operations, and manage data exchange between the frontend and the server.
- Middleware and Routing: Deno's standard library and third-party modules provide robust middleware and routing capabilities. Oak, a middleware framework for Deno, is used to handle HTTP requests, routing, and middleware functionalities.
Database Integration: The backend interacts with MongoDB database using direct database driver.
- Security and Performance: Deno's secure by default execution environment minimizes vulnerabilities. Additionally, efficient handling of asynchronous operations and scalable architecture ensures high performance.
Monorepo Benefits

**TODO:** Code Sharing: Common utilities, types, and configurations are shared between the frontend and backend, reducing duplication and ensuring consistency. <br/>
**TODO:** Unified Development Workflow: Single build, test, and deployment pipelines simplify the development workflow.

This monorepo project leverages the strengths of React and Astro.js for a performant and interactive frontend, while utilizing Deno's modern features for a secure and efficient backend. The monorepo structure ensures a cohesive development experience, promotes code reuse, and streamlines the workflow from development to deployment.

After performing an `npm i` command, run in the different terminals following commands:

```shell
deno task start
npm run front
```