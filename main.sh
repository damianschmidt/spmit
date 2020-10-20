#!/bin/bash

# clear interface
docker-compose -f docker/docker-compose.yml down --volumes

# backend
docker-compose -f docker/docker-compose.yml build "backend"
docker-compose -f docker/docker-compose.yml up -d "backend"

# frontend
docker-compose -f docker/docker-compose.yml build "frontend"
docker-compose -f docker/docker-compose.yml up -d "frontend"

# mongo
docker-compose -f docker/docker-compose.yml build "mongo"
docker-compose -f docker/docker-compose.yml up -d "mongo"
docker-compose -f docker/docker-compose.yml run --rm "backend" "flask init_db"

# follow
docker-compose -f docker/docker-compose.yml logs --follow --tail 50 "backend" &
docker-compose -f docker/docker-compose.yml logs --follow --tail 50 "frontend" &
docker-compose -f docker/docker-compose.yml logs --follow --tail 50 "mongo" &
