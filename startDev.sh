#!/bin/bash
red='\033[0;31m'
nc='\033[0m'

echo -e "${red}Building client code${NC}"
gulp clean && gulp build 
gulp watch &

echo -e "${red}Running mysql${NC}"
mysql.server start

echo -e "${red}Running mysql migrations${NC}"
knex migrate:latest


echo -e "${red}Starting up RabbitMQ${NC}"
/usr/local/sbin/rabbitmq-server &

echo -e "\n${red}Running under dev mode${nc}"
NODE_ENV=development node server
