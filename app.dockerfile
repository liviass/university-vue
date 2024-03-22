FROM node:latest
WORKDIR /home/src/project
COPY /project/package.json .
COPY /project/nuxt.config.ts .
COPY /project/components ./components
COPY /project/plugins ./plugins
COPY /project/pages ./pages
COPY /project/server ./server
COPY /project/public ./public
COPY /project/tsconfig.json .
COPY /project/types.ts .

RUN npm install
RUN npm run build

EXPOSE 3000
CMD npm run preview