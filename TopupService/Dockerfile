FROM node:18

WORKDIR /app

COPY . .

RUN npm install

ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASSWORD=
ENV DB_NAME=projectb_topup_db
ENV USER_DB=projectb_user_db
ENV PORT=4002

EXPOSE 4002
CMD ["node", "app.js"]
