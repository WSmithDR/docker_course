FROM node:lts-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git make python3 g++

COPY package*.json ./

RUN npm install

COPY . .


FROM node:lts-alpine AS production

WORKDIR /app

COPY --chown=node:node --from=builder /app .

USER node

EXPOSE 300

ENTRYPOINT ["npm", "start"]