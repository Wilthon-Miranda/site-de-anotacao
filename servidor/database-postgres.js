import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class DatabasePostgres {
    #usuarios = new Map()
    /*USUARIOS*/
    async list(search) {
        let usuarios

        if (search) {
            usuarios = await sql`
            select *
            from usuarios
            where usuario = ${search}
            `   
        } else {
            usuarios = await sql`
            select *
            from usuarios
            `
        }

        return usuarios;
    }

    async create(login) {
        const usuarioID = randomUUID()

        const { nome, usuario, senha, sexo } = login;

        await sql`
        insert into usuarios (id, nome, usuario, senha, sexo)
        VALUES (${usuarioID}, ${nome}, ${usuario}, ${senha}, ${sexo})
        `
    }

    async update(id, login) {
        const { nome, usuario, senha, sexo } = login;

        await sql`
        update usuarios
        set nome = ${nome}, usuario = ${usuario}, senha = ${senha}, sexo = ${sexo}
        where id = ${id}
        ` 
    }

    async delete(id) {
        await sql`
        delete from usuarios 
        where id = ${id}
        `
    }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  


    /*ANOTAÇÕES*/
    async listNotes(id) {
        let anotacoes
    
        if (id) {
            anotacoes = await sql`
            select *
            from anotacao
            where id_usuario = ${id}
            ORDER BY updated_at DESC
            `
        } else {
            anotacoes = await sql`
            select *
            from anotacao
            ORDER BY updated_at DESC
            `
        }
    
        return anotacoes;
    }
    
    async createNotes(dados) {
        const { id_usuario, titulo, texto } = dados;

        await sql`
        insert into anotacao (id_usuario, titulo, texto)
        VALUES (${id_usuario}, ${titulo}, ${texto})
        `
    }

    async updateNotes(id_anotacao, dados) {
        const { titulo, texto } = dados;

        await sql`
        update anotacao
        set titulo = ${titulo}, texto = ${texto}
        where id_anotacao = ${id_anotacao}
        `
    }

    async deleteNotes(id, usuario_id) {
        await sql`
        delete from anotacao 
        where id_anotacao = ${id}
        and id_usuario = ${usuario_id}
        `
    }
}/*
export class DatabasePostgres {
    #anotacoes = new Map()    
}*/