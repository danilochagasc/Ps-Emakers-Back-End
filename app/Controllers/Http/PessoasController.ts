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

    public async update_emprestimo({params,response}:HttpContextContract){

        const {id, emprestar, id_livro} = params;
         try{
            if(emprestar == "emprestimo"){
                const pessoa = await Pessoa.find(id);
                
                if(pessoa?.emprestimo_disponivel == true){                  //verifica se a pessoa pode realizar emprestimo(se ela tem emprestimo pendente)
                    pessoa.id_livro = id_livro;
                    await pessoa.load('livro');
                    const livro = pessoa.livro;                             //acessa o livro no qual a pessoa esta querendo pegar emprestado
                    
                    if(Number(livro.quantidade) > 0){                       // verifica se o livro esta disponivel em estoque
                        livro.quantidade = Number(livro.quantidade) - 1;    //reduz em 1 a quantidade no estoque                                                  
                        pessoa.emprestimo_disponivel = false;               //atualiza para a pessoa nao poder mais realizar emprestimos e salva os resultados
                        pessoa.save();                                  
                        livro.save();
                        return response.send("Emprestimo Realizado com Sucesso!");
                    }else{
                        return response.send("Nao ha estoque disponivel do livro solicitado");
                    }
                }else{
                    return response.send("Voce ja realizou um emprestimo! Devolva seu livro para poder realizar outro.");
                }
            }else{
                return response.send("Parametro invalido");
            }
         }catch(error){
             response.status(500).send("Erro ao realizar emprestimo")
         }
    } 

    public async update_devolucao({params, response}:HttpContextContract){

        const {id, devolver} = params;
        try{
            if(devolver == "devolver"){
                const pessoa = await Pessoa.find(id)
                if(pessoa?.emprestimo_disponivel == false){
                    await pessoa.load('livro')
                    const livro = pessoa.livro;
                    
                    livro.quantidade = Number(livro.quantidade) + 1;
                    pessoa.id_livro = null;
                    pessoa.emprestimo_disponivel = true;
                    livro.save();
                    pessoa.save();
                    return response.send("Livro devolvido com sucesso!");
                    //Adicionar +1 unidade ao livro que o cara tem emprestado
                    //Atualizar o bool de false pra true
                    //verificar se o livro que o cara tinha estava sem disponibilidade, se sim, atualizar para true tambem
                    
                }else{
                    return response.send("Voce nao tem livros para devolver.");

                }
            }

        }catch(error){
            response.status(500).send("Erro ao realizar devolucao")
        }
    }
    
}
