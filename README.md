<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

![Visitors](https://img.shields.io/badge/visitors-2_total-brightgreen)
![Clones](https://img.shields.io/badge/clones-22_total_16_unique-blue) <!--CLONE-BADGE-->

# Project Overview

This project is a backend service built with [Nest](https://github.com/nestjs/nest) and **TypeScript**, designed with a clean **Hexagonal Architecture** (Ports and Adapters) pattern, combined with ideas from **Onion Architecture** to ensure strong separation of concerns.

It integrates **TypeORM** for ORM functionalities and supports dynamic switching between **MySQL**, **PostgreSQL**, and **SQLite** databases through a factory pattern for flexible database configuration.

The project emphasizes **modularity**, **scalability**, and **maintainability**, making it a solid foundation for building robust and future-proof backend services.

<a href='https://ko-fi.com/F1F82YR41' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Project Structure
```
hexagonal-architecture/
├── src/
│   ├── app.controller.ts         # Basic app controller
│   ├── app.module.ts             # Root application module
│   ├── config/                   # Configuration modules (App & Database)
│   ├── infra/                    # Infrastructure layer (Database setup)
│   ├── products/                 # Products domain (Entity, Repository, Service, Controller)
│   ├── shared/                   # Shared utilities (Logger, Filters, Interceptors, DTOs)
│   ├── users/                    # Users domain (Entity, Repository, Service, Controller)
│   └── main.ts                   # Application bootstrap file
├── logs/                         # Log files
├── Dockerfile                    # Docker container config
├── docker-compose.sqlite.yml     # Docker Compose for SQLite
├── docker-compose.postgresql.yml # Docker Compose for PostgreSQL
├── sample.env                    # Environment variable example
├── test/                         # E2E Testing setup
├── package.json                  # Node.js project file
└── README.md                     # Project documentation
```

## Architecture and Key Features

- **Hexagonal/Onion Architecture Hybrid**:  
  Each domain module (e.g., `users`, `products`) encapsulates its own `infra`, `domain`, and `application` layers, following strong separation of concerns for high modularity, scalability, and maintainability.

- **Dynamic Database Management**:  
  Implements a flexible **Database Factory** pattern to seamlessly switch between **MySQL**, **PostgreSQL**, and **SQLite** databases without coupling to business logic.

- **TypeORM Integration with Dynamic Entity Loading**:  
  Entities are auto-discovered dynamically without centralized imports, simplifying scaling across modules while maintaining strong typing.

- **Shared Layer for Core Utilities**:  
  Common utilities like logging, result handling (`Result`, `ResultAsync`), exception filters, and interceptors are centralized in the `shared/` folder to promote DRY (Don't Repeat Yourself) principles.

- **Controller Organization**:  
  With minimal external interfaces per module, controllers are organized directly alongside their respective `module.ts` files, eliminating the need for a separate `interfaces/http` folder.

- **Advanced Logger Service**:  
  A custom `LoggerService` provides unified and extendable log management, systematically recording logs into the `logs/` folder.

- **Global Response and Exception Handling**:  
  Unified API response structure and centralized exception management using interceptors and filters ensure consistency and stability.

- **Docker and Docker Compose Support**:  
  The project includes a `Dockerfile` for containerization and docker-compose files (`docker-compose.sqlite.yml`, `docker-compose.postgresql.yml`) to easily set up different database environments for local development or deployment.

- **Environment Management**:  
  A sample `.env` file (`sample.env`) is provided to easily manage environment variables across different stages.

- **Testing Setup**:  
  Basic End-to-End (E2E) testing is set up using **Jest**, ensuring API contract stability from the early development stages.

## Design Principles and Benefits

- **High Cohesion and Loose Coupling**:  
  Each domain maintains strong internal cohesion and minimal dependencies on external systems, ensuring modularity and ease of evolution.

- **Clear Separation of Concerns**:  
  Core business logic is isolated from infrastructure and frameworks, strictly following Hexagonal Architecture principles.

- **Database Abstraction**:  
  A dynamic database factory design abstracts database operations, allowing seamless switching between MySQL, PostgreSQL, and SQLite with minimal configuration changes.

- **Extensible and Scalable Structure**:  
  The modular design makes it straightforward to add new modules, integrate external services, or gradually evolve into a microservices architecture if needed.

- **Developer-Friendly Onboarding**:  
  Clear separation of responsibilities and consistent project patterns help new developers quickly understand and contribute to the system.

- **Production-Ready Logging**:  
  A centralized, customizable logging system facilitates effective monitoring and easier debugging in production environments.

- **Testing and Maintenance**:  
  High modularity and clear boundaries make writing tests straightforward and help maintain code quality over time.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Run Dockerfile

```bash
# Build the Docker image
$ docker build -t hexagonal-architecture .

# Run with SQLite (default)
$ docker-compose -f docker-compose.sqlite.yml up

# Run with PostgreSQL
$ docker-compose -f docker-compose.postgresql.yml up
```

## Logging
Application logs are automatically saved to the logs/ directory with daily log rotation (e.g., application-2025-04-27.log).

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Future Improvements (Optional Ideas)

- Add more example modules (e.g., Authentication, Authorization).
- Integrate Swagger for API documentation.
- Add CI/CD pipeline for automated deployment.
- Enable multi-tenancy support for the database layer.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Da-Wei Lin](https://www.linkedin.com/in/da-wei-lin-689a35107/)
- Website - [David Weblog](https://davidskyspace.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
