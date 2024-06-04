FROM node:22-alpine

WORKDIR C:/Users/frost/git_repositories/IIT/lab10

COPY --chown=node package*.json ./

RUN npm install

COPY --chown=node . .

CMD ["npm", "start"]