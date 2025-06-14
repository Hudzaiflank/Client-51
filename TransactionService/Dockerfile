FROM node:18

WORKDIR /app

COPY . .

RUN npm install

ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASSWORD=
ENV DB_NAME=projectb_transaction_db
ENV PORT=4003

EXPOSE 4003
CMD ["node", "app.js"]
