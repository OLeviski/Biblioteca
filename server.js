// importando o fastify
import { fastify } from 'fastify'
//importando database memory
import { DatabaseMemory } from './database-memory.js'
// criando nosso servidor
const server = fastify()
//Criando o database
const database = new DatabaseMemory()
// criando um livro
server.post('/livros', (request, reply) => {
// acessando dados do corpo (desestrurado)
    const {titulo, autor, npaginas} = request.body

    database.create({
        titulo: titulo,
        autor: autor,
        npaginas: npaginas,
    })
// vamos listar ele
//    console.log(database.list())
// retornando o status da rota
    return reply.status(201).send()
})
// ler livros cadastrados
server.get('/livros', (request) => {
// pegando a busca
    const search = request.query.search
// imprimindo a busca
    console.log(search)
// acessando database
    const livros = database.list(search)
    //console.log(livros)
// retornando livros 
    return livros
})
// atualizar livro, lembre-se de passar o Route Parameter 
server.put('/livros/:id', (request, reply) => {
//    return "Atualizar!"
// passando id do livro
    const livroId = request.params.id
// passando restante dos atributos
    const {titulo, autor, npaginas} = request.body
    const livro = database.update(livroId, {
        titulo,
        autor,
        npaginas,  
    })
// sucesso sem conteudo
    return reply.status(204).send()
})
// apagar um livro, lembre-se de passar o Route Parameter
server.delete('/livros/:id', (request, reply) => {
// passando Id do livro
    const livroId = request.params.id
// deletando livro
    database.delete(livroId)
// retornando status de sucesso em branco
    return reply.status(204).send()
})
server.listen({
    port: 3333,
})