FROM node:alpine

WORKDIR /usr/app

COPY package.json /usr/app

COPY server.json /usr/app

#installs the current packages
RUN npm install

EXPOSE 3000

#This happens after the container starts
#says do this command: "node sever.js" but not in out terminal but in the cloud terminal
CMD ["node", "server.js"]