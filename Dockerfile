FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM dependencies AS test

COPY . .

RUN npm run lint
RUN npm test

FROM dependencies AS build

COPY . .

RUN npm run build
RUN npm ci --omit=dev

FROM node:20-alpine AS production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeapp

WORKDIR /app

COPY --from=build --chown=nodeapp:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nodeapp:nodejs /app/dist ./dist
COPY --from=build --chown=nodeapp:nodejs /app/package.json ./

USER nodeapp

EXPOSE 3000

CMD ["node", "dist/index.js"]
