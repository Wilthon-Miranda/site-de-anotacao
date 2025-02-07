import { useAnotacoes } from "./comandos.js";
import "./App.css";

const Anotacoes = () => {
  const {
    novaAnotacao,
    anotacoes,
    tituloAnotacoes,
    textoAnotacoes,
    handleNovaAnotacaoChange,
    handleTituloChange,
    handleChange,
    salvarNovaAnotacao,
    salvar,
  } = useAnotacoes();
  
  return (
    <div className="container">
      <div className="anotacao">
        <textarea
          className="titulo"
          placeholder="Título..."
          value={novaAnotacao.titulo}
          onChange={(e) => handleNovaAnotacaoChange("titulo", e.target.value)}
        />
        <textarea
          className="texto"
          placeholder="Digite algo..."
          value={novaAnotacao.texto}
          onChange={(e) => handleNovaAnotacaoChange("texto", e.target.value)}
        />
        <br />
        <button type="button" onClick={() =>
          salvarNovaAnotacao(novaAnotacao.titulo.trim(), novaAnotacao.texto.trim())
        }>
          Salvar
        </button>
      </div>
     
      {anotacoes.length > 0 &&
        anotacoes.map((anotacao) => (
          <div key={anotacao.id_anotacao} className="anotacao">
            <textarea
              id={`titulo-${anotacao.id_anotacao}`}
              className="titulo"
              value={tituloAnotacoes[anotacao.id_anotacao] ?? anotacao.titulo}
              onChange={(e) => handleTituloChange(anotacao.id_anotacao, e.target.value)}
              placeholder="Título..."
            />
            <textarea
              id={`texto-${anotacao.id_anotacao}`}
              className="texto"
              value={textoAnotacoes[anotacao.id_anotacao] ?? anotacao.texto}
              onChange={(e) => handleChange(anotacao.id_anotacao, e.target.value)}
              placeholder="Digite algo..."
            />
            <br />
            <button
              type="button"
              onClick={() =>
                salvar(anotacao.id_anotacao, tituloAnotacoes[anotacao.id_anotacao] ?? anotacao.titulo, textoAnotacoes[anotacao.id_anotacao] ?? anotacao.texto)
              }
            >
              Salvar
            </button>
          </div>
        ))}
    </div>
  );
};

export default Anotacoes;
