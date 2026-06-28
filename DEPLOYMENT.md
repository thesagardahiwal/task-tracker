# Deployment Guide

This document outlines how to deploy the TaskTracker application for a production environment using Docker.

## Architecture

The production setup uses a containerized multi-tier architecture orchestrated via `docker-compose`.

1. **Frontend (Nginx)**: The Vite React app is built and served via Nginx. The Nginx server also acts as a reverse proxy, forwarding API requests (`/api/*`) to the Node.js backend.
2. **Backend (Node/Express)**: Runs the compiled TypeScript server on Node 20.
3. **Database (MongoDB)**: Runs a MongoDB instance configured with authentication.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.

## Environment Setup

1. Review `docker-compose.yml` to ensure the MongoDB credentials (`MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD`) are strong.
2. Update the API's `.env` variables if necessary:
   - `JWT_SECRET` (crucial for production)
   - `JWT_EXPIRES_IN`

## Deployment Steps

1. Start Docker Daemon on your host machine.
2. From the root of the project, run:

```bash
docker compose build
docker compose up -d
```

3. The application will be built and started in detached mode.

### Accessing the App

- Frontend: `http://localhost:80` (or your server's IP address)
- The API is available via Nginx reverse proxy at `http://localhost/api`

## Troubleshooting

- **Checking Logs**: `docker compose logs -f`
- **Restarting Services**: `docker compose restart`
- **Rebuilding after changes**: `docker compose up -d --build`
