const API_URL = "http://localhost:2057/bookmanager"; 

// Seletores DOM
const bookList = document.getElementById("books-list");
const form = document.getElementById("infos");
const submitButton = document.getElementById("submit-button");
const tituloInput = document.getElementById("titulo");
const autorInput = document.getElementById("autor");
const editoraInput = document.getElementById("editora");
const generoInput = document.getElementById("genero");
const formatoInput = document.getElementById("formato");
const statusInput = document.getElementById("status");
const outroGeneroInput = document.getElementById("outro_genero");
const bookIdInput = document.getElementById("book-id");
const searchInput = document.getElementById("search");

// Modal de confirmação de exclusão
const modal = document.getElementById('confirmDeleteModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
let currentBookId = null;

// Navegar entre abas
function toggleTab(event, currentTab) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    document.getElementById(currentTab).style.display = "block";
    event.currentTarget.classList.add("active");
}

// Função para buscar os livros
async function fetchBooks() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Erro na resposta da API");
        }

        const data = await response.json();
        console.log("Dados recebidos:", data);

        bookList.innerHTML = "";
        data.sort((a, b) => a.titulo.localeCompare(b.titulo));         

        data.forEach(book => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="livro">
                    <div class="book-details">
                    <div class="book-main">
                        <span class="book-title">${book.titulo}</span>
                        <span class="book-author no-separator">${book.autor}</span>
                    </div>
                        <span class="book-publisher">${book.editora}</span>
                        <span class="book-genre">
                            ${book.genero === 'outro' && book.outro_genero ? book.outro_genero : book.genero}
                        </span>
                        <span class="book-format">${book.formato}</span>
                        <span class="book-status">${book.status}</span>
                    </div>
                    <div class="actions">
                        <button onclick="editBook(${book.id})"><i class="fas fa-edit"></i></button>
                        <button onclick="showDeleteModal(${book.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            bookList.appendChild(listItem);
        });

    } catch (error) {
        console.error("Erro ao buscar livros:", error);
    }
}

// Função para buscar livros com filtro
function searchBooks() {
    const query = searchInput.value.toLowerCase();
    const allBooks = document.querySelectorAll("#books-list li");

    allBooks.forEach((book) => {
        const title = book.textContent.toLowerCase();
        if (title.includes(query)) {
            book.style.display = "";
        } else {
            book.style.display = "none";
        }
    });
}

searchInput.addEventListener("input", searchBooks);

// Função para cancelar a edição
document.getElementById("cancel-button").addEventListener("click", (event) => {
    form.reset();
    bookIdInput.value = "";
    submitButton.textContent = "Atualizar";
    toggleTab(event, 'list');
});

// Função para salvar o livro (Cadastro ou Atualização)
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = bookIdInput.value;
    const book = {
        titulo: tituloInput.value,
        autor: autorInput.value || null,
        editora: editoraInput.value || null,
        genero: generoInput.value,
        formato: formatoInput.value,
        outro_genero: (generoInput.value === "outro") ? outroGeneroInput.value : null,
        status: statusInput.value || 'não lido', 
    };

    try {
        if (id) {
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });
            submitButton.textContent = "Cadastrar";
            bookIdInput.value = "";
            showMessage('Livro atualizado com sucesso!', 'success');
            console.log("Livro atualizado com sucesso!");
        } else {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });
            showMessage('Livro cadastrado com sucesso!', 'success');
            console.log("Livro adicionado com sucesso!");
        }

        form.reset();
        fetchBooks();

        setTimeout(() => {
            toggleTab(null, 'list');
        }, 1000);
    } catch (error) {
        console.error("Erro ao salvar livro:", error);
    }
});

// Função para editar livro
async function editBook(id) {
    console.log('Editar livro com ID:', id);

    try {
        const response = await fetch(`${API_URL}/${id}`);
        const book = await response.json();

        tituloInput.value = book.titulo;
        autorInput.value = book.autor || '';
        editoraInput.value = book.editora || '';
        generoInput.value = book.genero || '';
        formatoInput.value = book.formato || '';
        statusInput.value = book.status || 'não lido';
        outroGeneroInput.value = book.outro_genero || '';
        bookIdInput.value = book.id;

        submitButton.textContent = "Atualizar";

        toggleTab(null, 'form');
    } catch (error) {
        console.error("Erro ao buscar livro para editar:", error);
    }
}

// Função para mostrar o campo de "Outro Gênero"
function mostrarOutroGenero() {
    const generoSelect = document.getElementById("genero");
    const outroGeneroDiv = document.getElementById("outroGenero");

    if (generoSelect.value === "outro") {
        outroGeneroDiv.style.display = "block";
    } else {
        outroGeneroDiv.style.display = "none";
    }
}

// Função para mostrar o modal de confirmação de exclusão
function showDeleteModal(bookId) {
    currentBookId = bookId;
    modal.style.display = 'flex';
}

// Função para excluir o livro
async function deleteBook() {
    try {
        await fetch(`${API_URL}/${currentBookId}`, {
            method: "DELETE",
        });
        fetchBooks();
        closeDeleteModal(); 
        showMessage('Livro deletado com sucesso!', 'success');
    } catch (error) {
        console.error("Erro ao excluir livro:", error);
        showMessage('Erro ao tentar deletar o livro', 'error'); 
    }
}


// Função para fechar o modal
function closeDeleteModal() {
    modal.style.display = 'none';
}
confirmDeleteBtn.addEventListener('click', deleteBook);
cancelDeleteBtn.addEventListener('click', closeDeleteModal);
document.addEventListener("DOMContentLoaded", fetchBooks);



// Função para exibir a mensagem de sucesso ou erro
function showMessage(message, type = 'success') {
    const messageModal = document.getElementById("message-modal");
    const messageText = document.getElementById("message-modal-text");

    messageModal.classList.remove('success', 'error');
    messageModal.classList.add(type);  // Adicionar a classe para definir o tipo de mensagem

    messageText.textContent = message;
    messageModal.style.display = 'block';

    setTimeout(() => {
        messageModal.style.opacity = '1';
    }, 10);
    setTimeout(() => {
        messageModal.style.opacity = '0'; 
        setTimeout(() => {
            messageModal.style.display = 'none';
        }, 300);
    }, 2000); 
}


