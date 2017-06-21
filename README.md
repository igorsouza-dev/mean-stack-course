
<h3>Código do curso de Fundamentos da pilha MEAN</h3>

Primeira instalação (Backend)
> npm init

(entry point) loader.js

> npm install express body-parser mongoose node-restful mongoose-paginate lodash express-query-int pm2 --save
> npm install nodemon --save-dev

Alterar o <strong>package.json</strong> no item "scripts" para:
<br/>
<code>
 "scripts": {
    "dev":"nodemon",
    "production":"pm2 start loader.js --name backend"
  },
</code>
