FROM node:18

WORKDIR /app

COPY . .

RUN npm install

ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASSWORD=
ENV DB_NAME=projectb_donation_db
ENV PORT=4007

EXPOSE 4007
CMD ["node", "app.js"]
