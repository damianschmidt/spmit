#!/bin/bash

# clear interface
docker-compose -f docker/docker-compose-dev.yml down --volumes

# build and up backend
docker-compose -f docker/docker-compose-dev.yml build "backend"
docker-compose -f docker/docker-compose-dev.yml up -d "backend"

# follow backend
docker-compose -f docker/docker-compose-dev.yml logs --follow --tail 50 "backend"
