import { Response } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Pessoa from 'App/Models/Pessoa'

export default class PessoasController {
    public async store({request, response} : HttpContextContract){      
        try{
            const data = {
                nome: request.input("nome"),
                cpf: request.input("cpf"),
                emprestimo_disponivel: true,
            };
            
            const pessoa = await Pessoa.create({...data});
            return pessoa;
        } catch(error){
            response.status(500).send("Erro ao salvar nova pessoa!");
        }
    }

    public async destroy({params, response} : HttpContextContract){
        try{
            const pessoa = await Pessoa.findOrFail(params.id);
            await pessoa.delete()
            return pessoa;
        } catch(error){
            response.status(500).send("Erro ao excluir pessoa!");
        }
    }

    public async update({params, response}:HttpContextContract){

        const {id, emprestar, id_livro} = params;
        try{
            if(emprestar == "emprestimo"){
                const pessoa = await Pessoa.find(id);
                if(pessoa?.emprestimo_disponivel == true){

                    //Ver se o livro que o cara pegou esta disponivel
                    //Se estiver, reduzir em 1 o livro que ele pegou
                    //Se apos a reducao, a quantidade daquele livro for 0, entao atualizar a disponibilidade dele para false
                    //Atualizar a pessoa para que ela nao possa realizar mais emprestimos
                }else{
                    return{
                        msg: "voce possui um emprestimo pendente, devolva o seu livro antes de realizar outro emprestimo!"
                    }
                }
                

            }else{
                return{
                    msg : "parametro invalido",
                }
            }
        }catch(error){
            response.status(500).send("Erro ao realizar emprestimo")
        }
    } 

    public async update({params, response}:HttpContextContract){

        const {id, devolver} = params;
        try{
            if(devolver == "devolver"){
                const pessoa = await Pessoa.find(id)
                if(pessoa?.emprestimo_disponivel == true){
                    return{
                        msg: "Voce nao tem livros para devolver",
                    }
                }else{
                    //Adicionar +1 unidade ao livro que o cara tem emprestado
                    //Atualizar o bool de false pra true
                    //verificar se o livro que o cara tinha estava sem disponibilidade, se sim, atualizar para true tambem
                }
            }

        }catch(error){
            response.status(500).send("Erro ao realizar emprestimo")
        }
    }

}
