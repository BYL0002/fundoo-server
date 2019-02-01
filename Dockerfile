FROM node:8.12.0
WORKDIR /
COPY package.json /
RUN npm i nodemon
RUN npm i
COPY . /
EXPOSE 8000
EXPOSE 6379
CMD [ "npm", "start" ]
