FROM node:10.9-alpine
WORKDIR /app
COPY . .
ENV NPM_CONFIG_LOGLEVEL=error
ENV NODE_ENV=production
RUN npm ci
ENTRYPOINT ["node", "."]