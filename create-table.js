import { sql } from './db.js'

/*sql`DROP TABLE IF EXISTS livros;`.then(() => {
    console.log('Tabela apagada!')
})
*/
sql`
    CREATE TABLE livros (
        id              TEXT PRIMARY KEY,
        titulo           TEXT,
        autor     TEXT,
        npaginas        INTEGER
    );
`
.then(() => {
        console.log('Tabela criada!')
})