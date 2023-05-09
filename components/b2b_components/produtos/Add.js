import { useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import router from 'next/router'
import { toast } from "react-toastify";

function AddProdutos() {
  const [produtosNome, setProdutosNome] = useState("");
  const [produtosValorCompra, setProdutosValorCompra] = useState(null);
  const [produtosValorVenda, setProdutosValorVenda] = useState(null);
  const [produtosEstoque, setProdutosEstoque] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    router.reload();
    await axios.post(`/api/produtos/insertProdutos/`, {
      nome: produtosNome,
      valorCompra: produtosValorCompra,
      valorVenda: produtosValorVenda,
      estoque: produtosEstoque,
    });
    
    toast('Produto sendo adicionado!', {
      position: "top-right",
    });
    
    clearInputs();
    mutate(`/api/produtos/getAllProdutos`);
  };

  const clearInputs = async (e) => {
    setProdutosNome("")
    setProdutosValorCompra(null);
    setProdutosValorVenda(null);
    setProdutosEstoque(null);
  };

  return (
    <div className="card-body">
      <div className="ec-cat-form">
        <h4>Adicionar</h4>
        <form onSubmit={onSubmit} className="row">

          <div className="form-group row col-6">
            <label htmlFor="text" className="col-12 col-form-label">
              Nome
            </label>
            <div className="col-12">
              <input
                name="nome"
                className="form-control here slug-title"
                type="text"
                onChange={(e) => setProdutosNome(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row col-6">
            <label htmlFor="text" className="col-12 col-form-label">
              Estoque
            </label>
            <div className="col-12">
              <input
                name="estoque"
                className="form-control here slug-title"
                type="text"
                onChange={(e) => setProdutosEstoque(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row col-6">
            <label htmlFor="text" className="col-12 col-form-label">
              Valor de Compra
            </label>
            <div className="col-12">
              <input
                name="valorCompra"
                className="form-control here slug-title"
                type="text"
                onChange={(e) => setProdutosValorCompra(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row col-6">
            <label htmlFor="text" className="col-12 col-form-label">
              Valor de Venda
            </label>
            <div className="col-12">
              <input
                name="valorVenda"
                className="form-control here slug-title"
                type="text"
                onChange={(e) => setProdutosValorVenda(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <button name="submit" type="submit" className="btn btn-primary">
                Adicionar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddProdutos;