FROM node:18

WORKDIR /app

COPY . .

RUN npm install

ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASSWORD=
ENV DB_NAME=projectb_payment_db
ENV PORT=4006

EXPOSE 4006
CMD ["node", "app.js"]
