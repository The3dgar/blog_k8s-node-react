FROM node:lts

WORKDIR /app

COPY . .

EXPOSE 4000 4001 4002 4003 4005

RUN yarn

# CMD [ "yarn", "posts"]

# docker run -d -p4000:4000  --name blog_post blog_service yarn posts

# docker run -d -p4001:4001  --name blog_comments blog_service yarn comments

# docker run -d -p4002:4002  --name blog_query blog_service yarn query

# docker run -d -p4003:4003  --name blog_moderation blog_service yarn moderation

# docker run -d -p4005:4005  --name blog_eventbus blog_service yarn eventbus