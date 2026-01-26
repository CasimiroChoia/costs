

function enviarDados(project) {
    postMessage()
}

function setCategories(lista = ['desenvolvimento', 'infraestrutura', 'planeamento', 'outros']) {
    const sqlite3 = require('sqlite3').verbose()
    const db = new sqlite3.Database('./db/banco.db')

    db.serialize(() => {
        db.run(`
            create table if not exists categorias(
                id integer primary key autoincrement,
                categoria text not null
            )
        `)

        const stmt = db.prepare(`insert into categorias values (?)`);
        lista.forEach((valor, index) => {
            stmt.run(valor)
        })
        stmt.finalize()
    })

    db.close()
}

export { setCategories }