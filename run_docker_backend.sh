#!/bin/bash

ABSOLUTE_DB_PATH="/home/ubuntu/swppfall2022-team16/backend/db.sqlite3"
BACKEND_CONTAINER_DB_PATH="/app/db.sqlite3"

sudo docker run -d --rm \
    --name "backend" \
    -p 8000:8000 \
    -v $ABSOLUTE_DB_PATH:$BACKEND_CONTAINER_DB_PATH \
    backend:latest