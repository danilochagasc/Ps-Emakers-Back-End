import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Livro from 'App/Models/Livro'

export default class LivrosController {

    public async store({request, response} : HttpContextContract){      
        try{
            const data = {
                nome: request.input("nome"),
                quantidade: request.input("quantidade"),
                id_biblioteca: request.input("id_biblioteca"),
                estoque_disponivel: true,
            };

            if (data.quantidade >=1){
                data.estoque_disponivel = true
            }else{
                data.estoque_disponivel = false
            }
            
            const livro = await Livro.create({...data});
            return livro;
        } catch(error){
            response.status(500).send("Erro ao salvar novo livro!");
        }
    }

    public async destroy({params, response} : HttpContextContract){
        try{
            const livro = await Livro.findOrFail(params.id);
            await livro.delete()
            return livro;
        } catch(error){
            response.status(500).send("Erro ao excluir livro!");
        }
        

    }

}
