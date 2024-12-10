const db = require('../models/ConnectDatabase');

class BookRepository {

    async findAll() {
        const rows = await db.query(
            `SELECT * FROM livros ORDER BY titulo ASC;`
        )
        return rows; 
    }

    async findById(id) {
        const [row] = await db.query(
            `SELECT * FROM livros WHERE id = ?;`, 
            [id]
        )
        return row; 
    }

    async create(titulo, autor, editora, genero, outro_genero, formato, status) {
        const result = await db.query(
            `INSERT INTO livros (titulo, autor, editora, genero, outro_genero, formato, status) VALUES (?, ?, ?, ?, ?, ?, ?);`, 
            [titulo, autor, editora, genero, outro_genero, formato, status]
        )
        const insertId = result.insertId
        return {
            id: insertId,
            titulo,
            autor: autor || null,
            editora: editora || null,
            genero,
            outro_genero: outro_genero || null,
            formato,
            status
        }
    }

    async update(id, book) {
        const { titulo, autor, editora, genero, outro_genero, formato, status } = book;
        await db.query(
            `UPDATE livros SET titulo = ?, autor = ?, editora = ?, genero = ?, outro_genero = ?, formato = ?, status = ? WHERE id = ?`,
            [titulo, autor || null, editora || null, genero || null, outro_genero || null, formato, status, id]
        )
        return this.findById(id);
    }

    // Deletar um livro
    async delete(id) {
        const deleteBook = await db.query(
            `DELETE FROM livros WHERE id = ?`,
            [id]
        )
        return deleteBook
    }
}

module.exports = new BookRepository();
