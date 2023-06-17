//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

//import Livro from 'App/Models/Livro'

export default class LivrosController {

    public async store(){      
        return {
            message: "Livro armazenado com sucesso",
        }
    }

}
