import { useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import router from 'next/router'
import { toast } from "react-toastify";

function AddProdutos() {
  const [produtosNome, setProdutosNome] = useState("");
  const [produtosValorCompra, setProdutosValorCompra] = useState('');
  const [produtosValorVenda, setProdutosValorVenda] = useState('');
  const [produtosEstoque, setProdutosEstoque] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    toast('Produto sendo adicionado!', {
      position: "top-right",
    });
    setTimeout(() => {
      router.reload()
    }, 3000)
    await axios.post(`/api/produtos/insertProdutos/`, {
      nome: produtosNome,
      valorCompra: parseFloat(produtosValorCompra),
      valorVenda: parseFloat(produtosValorVenda),
      estoque: produtosEstoque,
    });
    
      mutate(`/api/produtos/getAllProdutos`);


    
    clearInputs();
  };

  const clearInputs = async (e) => {
    setProdutosNome("")
    setProdutosValorCompra('');
    setProdutosValorVenda('');
    setProdutosEstoque(0);
  };

  function mascaraMoeda(event) {
    const campo = event.target;
    const tecla = event.which || window.event.keyCode;
    const valor = campo.value.replace(/[^\d]+/gi, '').split('').reverse();
    let resultado = '';
    const mascara = '########.##'.split('').reverse();

    for (let x = 0, y = 0; x < mascara.length && y < valor.length;) {
      if (mascara[x] !== '#') {
        resultado += mascara[x];
        x++;
      } else {
        resultado += valor[y];
        y++;
        x++;
      }
    }

    campo.value = resultado.split('').reverse().join('');
  }


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
                value={`R$ ${produtosValorCompra}`}
                onChange={(e) => { mascaraMoeda(e), setProdutosValorCompra(e.target.value) }}
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
                value={`R$ ${produtosValorVenda}`}
                onChange={(e) => { mascaraMoeda(e), setProdutosValorVenda(e.target.value) }}
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