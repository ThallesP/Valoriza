<p align="center" >
<img src="https://i.imgur.com/SbhNaFr.png" />
</p>
<h1 align="center">NLW - Valoriza</h1>

Aqui você irá encontrar o código do NLW together na trilha de NodeJS junto com algumas adições ou melhorias!

---

## Instalação

```bash
git clone https://github.com/ThallesP/Valoriza

# NPM
npm i --save-dev
npx tsc
node src/server.js

# Yarn
yarn install --save-dev
yarn tsc
node src/server.js

```

## Desenvolvimento

```bash
git clone https://github.com/ThallesP/Valoriza

# NPM
npm i --save-dev
npm run dev

# Yarn
yarn install --save-dev
yarn dev

```

# Configuração

Para a aplicação iniciar, você terá que configurar o banco de dados no `ormconfig.json`, se você não sabe sobre isso, dê uma olhada no [Quick Start](https://typeorm.io/#/) do TypeORM!

## Variáveis de ambiente

Para iniciar esse projeto, você irá precisar definir as seguintes variáveis:

`APP_KEY`  
Key usada para geração de hash de senhas, recomendado gerar um hash do tipo [MD5](https://onlinehashtools.com/generate-random-md5-hash) aleatório
