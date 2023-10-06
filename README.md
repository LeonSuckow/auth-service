## Instalar as dependências

```sh 
  npm install
```
## Crie um arquivo .env na raiz 
para armazenar o endereço local do banco de dados
``` 
  DATABASE_URL=file:./dev.db
```

## Comando para rodar as migrations 
```sh 
  npx prisma migrate dev
```


## Comando para abrir o prisma studio

```sh 
  npx prisma studio
```
