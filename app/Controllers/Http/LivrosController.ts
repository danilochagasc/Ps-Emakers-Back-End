import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Livro from 'App/Models/Livro'

export default class LivrosController {

    public async store({request, response} : HttpContextContract){      
        try{
            const data = {
                nome: request.input("nome"),
                quantidade: request.input("quantidade"),
                id_biblioteca: request.input("id_biblioteca"),
            };
            
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

    public async index({params}:HttpContextContract){

        const {id_buscado} = params;
        
        const livros = await Livro
            .query()
            .where('id_biblioteca', id_buscado)
            .where('quantidade','>',0);

        return livros;
    }

    public async update({params, response}: HttpContextContract){
        const {id_livro, id_biblio_nova} = params;
        const livros = await Livro.find(id_livro);
        if(livros?.id_biblioteca == id_biblio_nova){
            return response.send("O livro ja pertence a essa biblioteca");
        }else{
            if(livros){
                livros.id_biblioteca = id_biblio_nova;
                await livros.save();
                return response.send("Biblioteca alterada com sucesso");
            }else{
                return response.send("Livro inexistente ou nao encontrado");
            }
            
        }

    }

}
