FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN npm install -g yarn

RUN yarn

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "yarn", "start" ]
