# pull official base image
FROM node:16.13.1-alpine

# set working directory
WORKDIR /code
ENV PATH /code/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent
RUN yarn global add react-scripts@3.4.1 --silent

# add app
COPY . ./

# start app
CMD ["yarn", "start"]
