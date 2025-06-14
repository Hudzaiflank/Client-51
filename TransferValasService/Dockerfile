FROM node:18

WORKDIR /app

COPY . .

RUN npm install

ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASSWORD=
ENV DB_NAME=projectb_valas_db
ENV PORT=4004

EXPOSE 4004
CMD ["node", "app.js"]
