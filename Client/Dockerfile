FROM node:23-alpine3.20 as builder

WORKDIR /app

RUN npm install -g @angular/cli@19

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0"]