import { fastify } from 'fastify';
import fastifyCors from 'fastify-cors';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const database = new DatabasePostgres();

// Registra o CORS para permitir requisições de qualquer origem
server.register(fastifyCors, {
    origin: "*", // Permite todas as origens (útil para desenvolvimento)
});

// Função para agrupar as rotas de usuários
const userRoutes = (server, database) => {
    // Rota para criar um usuário
    server.post('/usuarios', async (request, reply) => {
        const { nome, usuario, senha, sexo } = request.body;

        await database.create({
            nome,
            usuario,
            senha,
            sexo,
        });

        return reply.status(201).send();
    });

    // Rota para listar usuários
    server.get('/usuarios', async (request, reply) => {
        const search = request.query.search; //recebe os valores do campo de pesquisa (search)
        const usuarios = await database.list(search);
        return usuarios;
    });

    // Rota para atualizar um usuário
    server.put('/usuarios/:id', async (request, reply) => {
        const usuarioID = request.params.id; //atribui o ID do usuario que foi passado
        const { nome, usuario, senha, sexo } = request.body;

        await database.update(usuarioID, {
            nome,
            usuario,
            senha,
            sexo,
        });

        return reply.status(204).send();
    });

    // Rota para deletar um usuário
    server.delete('/usuarios/:id', async (request, reply) => {
        const usuarioID = request.params.id; //atribui o ID do usuario que foi passado
        await database.delete(usuarioID);
        return reply.status(204).send();
    });
};

// Função para agrupar as rotas de anotações
const noteRoutes = (serverAnotacao, database) => {
    // Rota para criar uma anotação
    serverAnotacao.post('/anotacoes', async (request, reply) => {
        const { id_usuario ,titulo, texto } = request.body;
    
        try {
            await database.createNotes({
                id_usuario,
                titulo,
                texto,
            });
            return reply.status(201).send({ message: "Nota criada com sucesso!" });
        } catch (error) {
            console.error("Erro ao criar anotação:", error);
            return reply.status(500).send({ error: "Erro interno ao criar anotação." });
        }
    });

    // Rota para listar anotações
    serverAnotacao.get('/anotacoes', async (request, reply) => {
        const id = request.query.id; //recebe os valores do campo de pesquisa (id)
        const anotacoes = await database.listNotes(id);
        return anotacoes;
    });
    

    // Rota para atualizar uma anotação
    serverAnotacao.put('/anotacoes/:id', async (request, reply) => {
     // Obtém o ID da anotação a partir da URL
        const anotacaoID = request.params.id

        const { titulo, texto } = request.body; // Extrai o título e o conteúdo do corpo da requisição
        
            await database.updateNotes (anotacaoID, {
            titulo,
            texto // Corrigido para usar "conteudo" em vez de "texto"
        });
    
        return reply.status(204).send(); // Retorna uma resposta sem conteúdo (204)
    });

    // Rota para deletar uma anotação
    serverAnotacao.delete('/anotacoes/:id', async (request, reply) => {
        const anotacaoID = request.params.id; //atribui o ID da anotação que foi passada
        await database.deleteNote(anotacaoID);
        return reply.status(204).send();
    });
};

// Inicializa as rotas de usuários e anotações
userRoutes(server, database);
noteRoutes(server, database);

// Inicia o servidor na porta 3000
server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
