#!/bin/bash

# clear interface
docker-compose -f docker/docker-compose-dev.yml down --volumes

# backend
docker-compose -f docker/docker-compose-dev.yml build "backend"
docker-compose -f docker/docker-compose-dev.yml up -d "backend"

# mongo
docker-compose -f docker/docker-compose-dev.yml build "mongo"
docker-compose -f docker/docker-compose-dev.yml up -d "mongo"
docker-compose -f docker/docker-compose-dev.yml run --rm "backend" "flask init_db"

# follow
docker-compose -f docker/docker-compose-dev.yml logs --follow --tail 50 "backend" &
docker-compose -f docker/docker-compose-dev.yml logs --follow --tail 50 "mongo" &
