import axios from "axios";
import router from 'next/router'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { mutate } from "swr";

function EditProdutos({ produtosId, produtos, setShowEditProdutosComponent }) {
  const [produtosNome, setProdutosNome] = useState("");
  const [produtosValorCompra, setProdutosValorCompra] = useState(null);
  const [produtosValorVenda, setProdutosValorVenda] = useState(null);
  const [produtosEstoque, setProdutosEstoque] = useState(null);
  const [id_, setId_] = useState();

  const [addProdutos, setProdutos] = useState({
    nome: "",
    valorCompra: "",
    valorVenda: "",
    estoque: "",
    id: "",
  });

  useEffect(() => {
    produtos?.map(item => {
      if (item._id === produtosId) {
        setProdutosNome(item.nome);
        setProdutosValorCompra(item.valorCompra);
        setProdutosValorVenda(item.valorVenda);
        setProdutosEstoque(item.estoque);
        setId_(item._id)
        setProdutos({
          nome: item.nome,
          valorCompra: item.valorCompra,
          valorVenda: item.valorVenda,
          estoque: item.estoque,
          id: item._id,
        })
      }
    })
  }, [produtosId]);



  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.put(`/api/produtos/updateProdutos?id=${id_}`, {
      nome: produtosNome,
      valorCompra: produtosValorCompra,
      valorVenda: produtosValorVenda,
      estoque: produtosEstoque,
    });
    toast('Produto sendo editado!', {
      position: "top-right",
    });
    mutate(`/api/produtos/getAllProdutos/`);
    router.push("/b2b/produtos");
    setProdutos({
      nome: "",
      valorCompra: "",
      valorVenda: "",
      estoque: "",
      id: "",
    });
  };

  return (
    <div className="card-body">
      <div className="ec-cat-form">
        <div className="d-flex justify-content-between">
          <h4>Editar</h4>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              setShowEditProdutosComponent(false);
            }}
          > Novo </button>
        </div>
        <form onSubmit={onSubmit} className="row d-flex flex-wrap">

          <div className="form-group row col-6">
            <label htmlFor="text" className="col-12 col-form-label">
              Nome
            </label>
            <div className="col-12">
              <input
                name="nome"
                className="form-control here slug-title"
                type="text"
                defaultValue={produtosNome}
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
                defaultValue={produtosEstoque}
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
                defaultValue={produtosValorCompra}
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
                defaultValue={produtosValorVenda}
                onChange={(e) => setProdutosValorVenda(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <button name="submit" type="submit" className="btn btn-primary">
                Editar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProdutos;