echo "Logging in"

curl -v -d "@login.json" POST -H "Content-Type:application/json" https://dev.stedi.me/login

curl https://dev.stedi.me/validate/f03e0f54-3e10-4863-b0d2-c672f359ef9a