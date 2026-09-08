#!/usr/bin/env bash
# One-time / repeatable local setup for the portfolio monorepo.
# Brings up Postgres, runs Prisma migrations, then starts web + api together.
set -euo pipefail

cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "No .env found — copying .env.example to .env."
  echo "Fill in SMTP_USER / SMTP_PASS / OPENAI_API_KEY (and DB creds if you changed them) before running this again."
  cp .env.example .env
  exit 1
fi

echo "Starting Postgres..."
docker compose up -d portfolio_db

echo "Waiting for Postgres to be healthy..."
until [ "$(docker inspect -f '{{.State.Health.Status}}' "$(docker compose ps -q portfolio_db)" 2>/dev/null)" = "healthy" ]; do
  sleep 1
done

echo "Running Prisma migrations..."
pnpm db:migrate

echo "Starting web (:3000) + api (:3001) via turbo..."
pnpm dev
