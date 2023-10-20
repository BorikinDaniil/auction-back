FROM node:16.17.0 AS development

WORKDIR /var/www/mtaverse-server

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=${NODE_ENV}

COPY --from=development /var/www/mtaverse-server/dist ./dist

CMD ["node", "dist/main"]