import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Biblioteca from 'App/Models/Biblioteca'

export default class BibliotecasController {
    public async store({request, response} : HttpContextContract){      
        try{
            const data = {
                cnpj: request.input("cnpj"),
                nome: request.input("nome"),
            };
            
            const biblioteca = await Biblioteca.create({...data});
            return biblioteca;
        } catch(error){
            response.status(500).send("Erro ao cadastrar uma nova biblioteca!");
        }
    }

    public async destroy({params, response} : HttpContextContract){
        try{
            const biblioteca = await Biblioteca.findOrFail(params.id);
            await biblioteca.delete()
            return biblioteca;
        } catch(error){
            response.status(500).send("Erro ao excluir biblioteca!");
        }
        

    }

    public async index({}: HttpContextContract) {
        const registros = await Biblioteca.query().select('nome');
        return registros.map((registro) => registro.nome);
    }
      
      
}
