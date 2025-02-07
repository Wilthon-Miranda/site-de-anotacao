function verificaLogin() {
    // Verifica se o usuário está logado
    if (!sessionStorage.getItem("isLoggedIn")) {
        // Se não estiver, redireciona para a tela de login
        window.location.href = "login/login.html";
    }
}

function buscarNotas() {
    fetch(`http://localhost:3000/anotacoes?search=${sessionStorage.getItem("id")}`, {
        method: 'GET', //inializa o site no metodo GET
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json()) // Converte a resposta em JSON
        .then(data => {
            // Atribui
            const resultado = data;

            if (resultado.length > 0) {
                data.forEach(categoria => {
                    const categoriaItem = document.createElement('li');
                    categoriaItem.textContent = categoria.nome; // Nome da categoria

                    if (categoria.subitens && categoria.subitens.length > 0) {
                        const sublista = document.createElement('ul');

                        // Adiciona os subitens
                        categoria.subitens.forEach(subitem => {
                            const subitemElement = document.createElement('li');
                            subitemElement.textContent = subitem;
                            sublista.appendChild(subitemElement);
                        });

                        categoriaItem.appendChild(sublista);
                    }

                    listaPrincipal.appendChild(categoriaItem);
                });
            } else {
                const mensagem = document.createElement('li');
                mensagem.textContent = 'Nenhuma anotação encontrada.';
                listaPrincipal.appendChild(mensagem);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar as anotações:', error);
        });
}

