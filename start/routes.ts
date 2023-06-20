/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  //rotas livros
  Route.resource("/livros", "LivrosController").apiOnly().except(['index', 'show', 'update']);
  Route.get("/livros/:id_buscado", "LivrosController.index");
  Route.put("/livros/:id_livro/:id_biblio_nova", "LivrosController.update");

  //rotas pessoas
  Route.put("/pessoas/:id/:emprestar/:id_livro", "PessoasController.update_emprestimo");
  Route.put("/pessoas/:id/:devolver", "PessoasController.update_devolucao");
  Route.resource("/pessoas", "PessoasController").apiOnly().except(['update']);

  //rotas bibliotecas
  Route.resource("/bibliotecas", "BibliotecasController").apiOnly();
}).prefix('/api')

