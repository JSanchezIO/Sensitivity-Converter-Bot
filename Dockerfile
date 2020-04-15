FROM node:12 AS build-env
WORKDIR /app
COPY . .
RUN npm i && npm run build

FROM node:12-alpine
WORKDIR /app
COPY --from=build-env /app/dist ./dist
COPY --from=build-env /app/package.json /app/package-lock.json ./
ENV NPM_CONFIG_LOGLEVEL=error
ENV NODE_ENV=production
RUN npm ci
CMD ["node", "."]