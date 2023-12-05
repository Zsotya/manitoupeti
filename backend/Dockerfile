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

# 3000-es port kiterjesztése
EXPOSE 3000

# Alkalmazás futtatása
CMD ["node", "server.js"]
