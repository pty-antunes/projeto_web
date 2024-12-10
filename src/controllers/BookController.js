const BookRepository = require('../repositories/BookRepository')

class BookController {

    // Listar todos os livros
    async index(request, response) {
        const books = await BookRepository.findAll()
        response.json(books);
    }

    // Exibir um livro por ID
    async show(request, response) {
        const { id } = request.params;
        const book = await BookRepository.findById(id)
        if (!book) {
            return response.status(404).json({ error: "Livro não encontrado :(" })
        }
        response.status(200).json(book)
    }

    // Add novo livro
    async store(request, response) {
        const { titulo, autor, editora, genero, outro_genero, formato, status } = request.body;
    
        console.log("Dados recebidos no Controller:", request.body);
    
        if (!titulo || !genero || !formato) {
            return response.status(400).json({ error: "Campos obrigatórios: título, gênero, formato." });
        }
    
        try {
            const novoLivro = await BookRepository.create(
                titulo,
                autor || null,
                editora || null,
                genero,
                outro_genero || null,
                formato,
                status || 'não lido'
            );
    
            console.log("Livro criado no Controller:", novoLivro);
            response.status(201).json({ message: "Livro criado com sucesso!", data: novoLivro });
        } catch (error) {
            console.error("Erro ao criar livro no Controller:", error.message);
            response.status(500).json({ error: "Erro ao salvar livro no banco de dados" });
        }
    }
    
    // Att livro existente
    async update(request, response) {
        const { id } = request.params;
        const { titulo, autor, editora, genero, outro_genero, formato, status} = request.body 
        if (!id) {
            return response.status(400).json({ error: 'ID inválido' })
        }
        const existingBook = await BookRepository.findById(id)
        if (!existingBook) {
            return response.status(404).json({ error: 'Livro não encontrado :(' }) // Verifica se o contato existe
        }
        const updatedBook = await BookRepository.update(id, {
            titulo,
            autor: autor || null,
            editora: editora || null,
            genero: genero || null,
            outro_genero: outro_genero || null,
            formato,
            status
        })

        response.status(200).json(updatedBook)
    }

    // Excluir um livro
    async delete(request, response) {
        const { id } = request.params
        if (!id) {
            return response.status(400).json({ error: 'ID inválido' })
        }
        await BookRepository.delete(id)
        response.sendStatus(204)
    }
}

module.exports = new BookController()
