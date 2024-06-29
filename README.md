# Description

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del archivo ```.env.dist``` renombrarlo a ```.env``` y sustituir las variables de entorno
3. Instalar dependencias ```npm install```
4. Levantar la bd ```docker compose up -d```
5. Correr las migraciones de prisma ```npx prisma migrate dev```
6. Popular la db local ```npm run seed```
7. Correr proyecto ```npm run dev```

## Correr en prod
