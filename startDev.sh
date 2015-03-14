#!/bin/bash
red='\033[0;31m'
nc='\033[0m'

echo -e "${red}Running mysql migrations${NC}"
knex migrate:latest

echo -e "\n${red}Running under dev mode${nc}"
NODE_ENV=development node server
