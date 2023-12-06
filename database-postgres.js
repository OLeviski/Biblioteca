import { randomUUID } from "node:crypto"
import {sql} from './db.js'

export class DatabasePostgres{

    async list(search){
        let livros

        if(search){
            livros = await sql`select * from livros where titulo ilike ${'%' + search + '%'}`
        }
        else{
            livros = await sql`select * from livros`
        }
        return livros
    }
    async create(livro){
        const livroId = randomUUID()
        const { titulo, autor, npaginas  } = livro
        await sql`insert into livros (id, titulo, autor, npaginas ) 
        VALUES (${livroId},  ${titulo}, ${autor}, ${npaginas })`
    }
    async update(id, livro){
        const { titulo, autor, npaginas  } = livro
        await sql`update livros set titulo = ${titulo}, autor = ${autor}, npaginas  = ${npaginas } WHERE id = ${id}`
    }
    async delete(id){
        await sql`DELETE FROM livros where id = ${id}`
    }
}