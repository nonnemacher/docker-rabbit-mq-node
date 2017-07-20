#!/bin/bash

docker_container_name="rabbitmq"

echo "Install docker ${docker_container_name} container"

docker run -p 5672:5672 -d --name ${docker_container_name} rabbitmq:alpine