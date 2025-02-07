async function validar() {
    const usuario = document.querySelector("#Usuario").value;
    const senha = document.querySelector("#Senha").value;

    if (usuario && senha) {
        // Fazendo a requisição usando o método GET e enviando os dados pela URL
        fetch(`http://localhost:3000/usuarios?search=${usuario}`, {
            method: 'GET', //inializa o site no metodo GET
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json()) // Converte a resposta em JSON
            .then(data => {
                // Atribui
                const resultado = data;

                // Verifica se algum resultado foi encontrado
                if (resultado.length > 0) {
                    // Exibindo o nome do primeiro resultado no alert
                    if (senha == resultado[0].senha) {
                        // Após o login bem-sucedido
                        window.alert(`Login efetuado com sucesso, seja bem vindo(a) (${resultado[0].usuario})`);

                        // Salva no localStorage indicando que o usuário está logado
                        localStorage.setItem("isLoggedIn", "true");

                        // Redireciona para a tela principal com o ID na URL
                        const id = resultado[0].id;
                        window.location.href = `http://localhost:5173/Cliente/anotacoes/index.html?id=${encodeURIComponent(id)}`;
                    }
                    else {
                            window.alert(`Senha do usuario (${resultado[0].usuario}) esta incorreta`);
                            localStorage.removeItem('isLoggedIn');
                            localStorage.removeItem('id');
                        }
                    } else {
                        // Se nenhum resultado for encontrado, exibe uma mensagem de erro
                        window.alert(`Nenhum usuário (${usuario}) encontrado.`);
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('id');
                    }
                })
            .catch(error => {
                // Tratamento de erro, caso a requisição falhe
                window.alert('Erro ao buscar os dados: ' + error);
            });
    }
    else {
        window.alert("Favor preencher o campo de usuario e senha")
    }
}


function cadastrar() {
    const nome = document.querySelector("#Nome").value;
    const usuario = document.querySelector("#Usuario").value;
    const senha = document.querySelector("#Senha").value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;

    if (nome && usuario && senha && sexo) {
        fetch(`http://localhost:3000/usuarios`, {
            method: 'POST', //inializa o site no metodo GET
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, usuario, senha, sexo })
        })
            .then(response => {
                if (response.ok) {
                    window.alert("Usuario cadastrado com sucesso")
                }
                else {
                    throw new Error('Erro ao cadastrar o usuário.');
                }
            })
            .then(data => {
                console.log('Resposta do servidor:', data);
            })
            .catch(error => {
                window.alert('Erro na requisição: ' + error.message);
            });
    }
    else {
        window.alert("Favor preencher todos os campos")
    }

}