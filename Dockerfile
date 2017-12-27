FROM node:8
COPY ./ /ubermind
WORKDIR /ubermind
RUN npm install
EXPOSE 3000
CMD ["node", "example.js"]
