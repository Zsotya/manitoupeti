# Node.js v16 futtatókörnyezet használata
FROM node:16

# Munkakönyvtár beállítása a konténerben
WORKDIR /app

# package.json fájlok átmásolása a munkakönyvtárba
COPY package*.json ./

# Függőségek telepítése
RUN npm install

# Alkalmazás többi részének másolása
COPY . .

# 8080-as port kiterjesztése
EXPOSE 8080

# Alkalmazás futtatása
CMD ["npm", "run", "serve"]