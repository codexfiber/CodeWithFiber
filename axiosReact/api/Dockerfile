FROM node 
WORKDIR /api
COPY package.json .
RUN npm install --omit=dev
COPY ./ .
CMD ["npm", "start"]
EXPOSE 8800