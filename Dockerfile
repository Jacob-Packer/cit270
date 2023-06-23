FROM node:alpine

COPY package.json ./

COPY server.json ./

#installs the current packages
RUN npm install

EXPOSE 3000

#This happens after the container starts
#says do this command: "node sever.js" but not in out terminal but in the cloud terminal
CMD ["node", "server.js"]