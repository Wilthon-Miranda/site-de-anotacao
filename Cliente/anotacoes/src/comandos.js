import { useState, useEffect } from "react";

export const useAnotacoes = () => {
  const [novaAnotacao, setNovaAnotacao] = useState({ titulo: "", texto: "" });
  const [tituloAnotacoes, setTituloAnotacoes] = useState({});
  const [textoAnotacoes, setTextoAnotacoes] = useState({});
  const [anotacoes, setAnotacoes] = useState([]);

  const urlParams = new URLSearchParams(window.location.search); //Recebe todos os parametros do HTML
  const id = urlParams.get('id');
  if (!id) {
    // Se não estiver, redireciona para a tela de login
    window.location.href = "http://127.0.0.1:5500/Cliente/login/login.html";

}

  useEffect(() => {
    // Obtém os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search); //Recebe todos os parametros do HTML
    const id = urlParams.get('id'); //coloca o parametro ID dentro de uma variavel
  
    // Faz a requisição fetch usando o ID
    if (id) {
      fetch(`http://localhost:3000/anotacoes?id=${id}`)
        .then((response) => response.json())
        .then((data) => setAnotacoes(data))
        .catch((error) => console.error("Erro ao buscar anotações:", error));
    }
  }, []);

  const ajustarAlturaDinamica = (id, tipo) => {
    setTimeout(() => {
      const textarea = document.querySelector(`#${tipo}-${id}`);
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }
    }, 0);
  };

  const handleNovaAnotacaoChange = (campo, valor) => {
    setNovaAnotacao((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleTituloChange = (id, value) => {
    setTituloAnotacoes((prev) => ({ ...prev, [id]: value }));
    ajustarAlturaDinamica(id, "titulo");
  };

  const handleChange = (id, value) => {
    setTextoAnotacoes((prev) => ({ ...prev, [id]: value }));
    ajustarAlturaDinamica(id, "texto");
  };

  const salvarNovaAnotacao = async () => {
    const urlParams = new URLSearchParams(window.location.search); //Recebe todos os parametros do HTML
    const id = urlParams.get('id'); //coloca o parametro ID dentro de uma variavel
    let id_usuario = id;

    try {
      const response = await fetch("http://localhost:3000/anotacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: id_usuario,
          titulo: novaAnotacao.titulo,
          texto: novaAnotacao.texto,
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar anotação.");
      const anotacaoCriada = await response.json();
      setAnotacoes((prev) => [anotacaoCriada, ...prev]);
      setNovaAnotacao({ titulo: "", texto: "" });
      window.location.href = `http://localhost:5173/Cliente/anotacoes/index.html?id=${encodeURIComponent(id)}`;
    } catch (error) {
      console.error("Erro ao salvar anotação:", error);
    }
  };

  const salvar = async (id_anotacao, tituloAnotacao, textoAnotacao) => {
    const urlParams = new URLSearchParams(window.location.search); //Recebe todos os parametros do HTML
    const id = urlParams.get('id'); //coloca o parametro ID dentro de uma variavel

    try {
      const response = await fetch(`http://localhost:3000/anotacoes/${id_anotacao}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: tituloAnotacao,
          texto: textoAnotacao
        }),
      });
      if (!response.ok) throw new Error("Erro ao atualizar anotação.");
      window.alert(`Anotação ${tituloAnotacao} atualizada com sucesso!`);
      window.location.href = `http://localhost:5173/Cliente/anotacoes/index.html?id=${encodeURIComponent(id)}`;
    } catch (error) {
      console.error("Erro ao salvar anotação:", error);
    }
  };

  return {
    novaAnotacao,
    anotacoes,
    tituloAnotacoes,
    textoAnotacoes,
    handleNovaAnotacaoChange,
    handleTituloChange,
    handleChange,
    salvarNovaAnotacao,
    salvar,
  };
};