FROM node:18

WORKDIR /app

COPY . .

RUN npm install

ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASSWORD=
ENV DB_NAME=projectb_bill_db
ENV PORT=4005

EXPOSE 4005
CMD ["node", "app.js"]
