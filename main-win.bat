ECHO ON

REM clear interface
docker-compose -f docker/docker-compose-dev.yml down --volumes

REM backend
docker-compose -f docker/docker-compose-dev.yml build "backend"
docker-compose -f docker/docker-compose-dev.yml up -d "backend"

REM mongo
docker-compose -f docker/docker-compose-dev.yml build "mongo"
docker-compose -f docker/docker-compose-dev.yml up -d "mongo"
docker-compose -f docker/docker-compose-dev.yml run --rm "backend" "flask init_db"

REM follow
docker-compose -f docker/docker-compose-dev.yml logs --follow --tail 50 "backend" &
docker-compose -f docker/docker-compose-dev.yml logs --follow --tail 50 "mongo" &
