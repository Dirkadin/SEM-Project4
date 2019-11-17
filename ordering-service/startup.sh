#!/bin/bash
echo Building image
docker image build -t ordering-service .
docker run -d -p 80:3000 --mount type=volume,source=hotburger-logs,target=/app/logs -it ordering-service
