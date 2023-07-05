# Product Resource Manager

The Product Resource Manager is a project that utilizes several technologies to build a resource management system. This README file provides an overview of the technologies used in the project and provides links to their respective documentation for further reference.

## Technologies Used

### Languages

- [TypeScript](https://www.typescriptlang.org/docs/): TypeScript is a statically typed superset of JavaScript that enhances developer productivity and code maintainability.

### Routing

- [Next.js](https://nextjs.org): Next.js is a React framework for building server-side rendered and statically generated web applications.

### Auth

- [Clerk](https://clerk.com/docs/): Clerk is an authentication and user management platform that simplifies the implementation of secure user authentication and authorization.

### Styling

- [Tailwind CSS](https://tailwindcss.com): Tailwind CSS is a highly customizable CSS framework that enables rapid UI development by providing utility classes.

### Validation

- [zod](https://zod.dev): zod is a TypeScript-first schema validation library that helps ensure the correctness of data in runtime.
- [ReactHookForm](https://react-hook-form.com/): React Hook Form is a flexible and efficient form validation library for React applications.

### DevOps/Deployment

- [Vercel](https://vercel.com/): Vercel is a cloud platform for deploying and serving Next.js applications with a focus on performance and scalability.
- [Axiom](https://app.axiom.co/): Axiom is a data analysis, logging, and visualization platform that helps you gain insights from your data.

### Database

- [Prisma](https://prisma.io): Prisma is an open-source database toolkit that provides an Object-Relational Mapping (ORM) layer for database interactions.
- [PlanetScale](https://app.planetscale.com/): PlanetScale is a database platform that offers a fully managed MySQL-compatible database service with built-in scalability and high availability.
- [Upstash](https://upstash.com/): is a serverless Redis database service that provides scalable and high-performance in-memory data storage and caching.

### Caching

- [Redis](https://redis.io/) is an open-source in-memory data structure store that is used as a cache in this project.

### Utilities

- [tRPC](https://trpc.io): tRPC is a TypeScript-based RPC (Remote Procedure Call) framework that simplifies communication between the client and server.
- [s3](https://docs.aws.amazon.com/): Amazon S3 (Simple Storage Service) is an object storage service that provides industry-leading scalability, data availability, security, and performance.
- [eslint](https://eslint.org/): ESLint is a widely used linter tool for identifying and reporting code quality issues in JavaScript and TypeScript codebases.
- [Prettier](https://prettier.io/docs/en/configuration.html): Prettier is an opinionated code formatter that enforces consistent code style and formatting rules across the project.

## Getting Started

To get started with the Product Resource Manager project, follow these steps:

1. Fork/Clone the repository
2. Install the dependencies: `npm install` or `yarn install`
3. Configure the necessary environment variables. Refer to the projects env.example for details on the required environment variables.
4. Start the development server: `npm run dev` or `yarn dev`
5. Access the application in your browser at `http://localhost:3000`.
6. There is currently no seed file. Run `npx prisma studio` to access Prisma studio to modify rows manually.
7. `npx prisma db push` if you make any changes to prisma.schema file

## Project Structure

The project structure follows a typical Next.js application structure. Here are the main directories and their purposes:

- `pages/`: Contains the Next.js pages that define the application's routes.
- `components/`: Holds reusable React components used throughout the application.
- `styles/`: Contains global styles and Tailwind CSS configuration files.
- `public/`: Stores static assets such as images or fonts.
- `server/`: Contains the server-side code, including API routes and routers.
  - `api/`: Contains API routes for server-side functionality and data retrieval.
- `prisma/`: Holds Prisma-related files and migrations for database interactions.
- `utils/`: Contains utility functions and helper modules.
- `schemas/`: Contains schema files or data models used for validation or database interactions.
- `templates/`: Holds page layout templates used for consistent design and structure across multiple pages.
