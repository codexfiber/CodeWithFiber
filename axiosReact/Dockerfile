FROM node
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .
ENV VITE_API_URL=http://localhost:8800
CMD ["npm", "start"]
EXPOSE 5173