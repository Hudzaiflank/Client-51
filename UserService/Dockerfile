FROM node:18

WORKDIR /app

COPY . .

RUN npm install

ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASSWORD=
ENV TOPUP_DB=projectb_topup_db
ENV USER_DB=projectb_user_db
ENV PORT=4001

EXPOSE 4001
CMD ["node", "app.js"]
