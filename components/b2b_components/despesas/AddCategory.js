import { useState } from "react";
import axios from "axios";
import useSwr, { mutate } from "swr";
import router from 'next/router'
import { toast } from "react-toastify";

function AddDespesas() {
  const [titulo, setDespesasName] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const onSubmit = async (e) => {
    const dataAtual = new Date(); // Obtém a data atual
    e.preventDefault();
    let data = await axios.post(`/api/despesas/insertDespesas`, {
      titulo: titulo,
      descricao: descricao,
      entrada: dataAtual.toISOString().slice(0, 10),
      valor: valor,
    });
    toast('Categoria sendo adicionada!', {
      position: "top-right",
      });
    mutate(`/api/despesas/getAllDespesas`);
    router.push("/b2b/category");
  };

  

  return (
    <div className="card-body">
      <div className="ec-cat-form">
        <h4>Adicionar Categoria</h4>
        <form onSubmit={onSubmit}>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Nome
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                className="form-control here slug-title"
                type="text"
                onChange={(e) => setDespesasName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Descrição
            </label>
            <div className="col-12">
              <textarea
              rows={6}
                id="text"
                name="text"
                className="form-control here slug-title"
                type="text"
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Valor
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                className="form-control here slug-title"
                type="text"
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
          </div>


          <div className="row">
            <div className="col-12">
            <button name="submit" type="submit" className="btn btn-primary">
            Adicionar Categoria
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddDespesas;