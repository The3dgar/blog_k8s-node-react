FROM node:16-alpine

ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
CMD [ "yarn", "preview"]