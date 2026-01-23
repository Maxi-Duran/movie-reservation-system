
FROM node:20-alpine AS builder

#  donde trabajaremos dentro del contenedor
WORKDIR /usr/src/app

#copiamos los archivos de dependencia
COPY package*.json ./

#instalar dependencias necesarias
RUN npm install

##copiamos todo lo demas
COPY . .


RUN npm run build


#produccion
FROM node:20-alpine

WORKDIR /usr/src/app

#solo trae los archivos compilados de la etapa anterior
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist


EXPOSE 3000


CMD ["node", "dist/main"]