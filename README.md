
<h3>Código do curso de Fundamentos da pilha MEAN</h3>

Primeira instalação | Backend
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

Primeira instalação | Frontend
> npm install admin-lte angular angular-animate angular-toastr angular-ui-router font-awesome babel-preset-es2015 gulp gulp-babel gulp-concat gulp-htmlmin gulp-uglify gulp-uglifycss gulp-util gulp-watch gulp-webserver --save-dev
