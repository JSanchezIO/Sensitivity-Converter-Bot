FROM node:10.9-alpine AS build-env
WORKDIR /app
COPY . .
RUN npm i && npm run build

FROM node:10.9-alpine
WORKDIR /app
COPY --from=build-env /app/dist /app/package.json /app/package-lock.json ./
ENV NPM_CONFIG_LOGLEVEL=error
ENV NODE_ENV=production
RUN npm ci
CMD ["node", "."]