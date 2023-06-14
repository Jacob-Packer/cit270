@echo off
echo "Logging in"

@REM curl -v -d "@login.json" POST -H "Content-Type:application/json" https://dev.stedi.me/login
curl -v -d "@login.json" POST -H "Content-Type:application/json" https://jacobpacker.cit270.com/

@REM curl -v https://dev.stedi.me/validate/6af0c312-148e-4ea0-b15b-fbe0f87d45aa
