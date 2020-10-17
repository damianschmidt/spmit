ECHO ON

REM clear interface
docker-compose -f docker\docker-compose-dev.yml down --volumes

REM build and up backend
docker-compose -f docker\docker-compose-dev.yml build "backend"
docker-compose -f docker\docker-compose-dev.yml up -d "backend"

REM follow backend
docker-compose -f docker\docker-compose-dev.yml logs --follow --tail 50 "backend"
