import axios from "axios";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import useSwr, { mutate } from "swr";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai"

import router from 'next/router'
import Menu from "../../components/b2b_components/Menu";

const fetcher = (url) => fetch(url).then((res) => res.json());

//ADD NO CSS

// [type="number"] {
//   width: 60px;
// padding: 0 8px !important;
// }

// .campoQtd{
//   width: 60px;
//   height: 35px;
//   line-height: 33px;
// }

export default function NovoPedido({ }) {
  const { data: hoteis } = useSwr(`/api/hoteis/getAllHotel`, fetcher);
  const [dataPedido, setDataPedido] = useState("");
  const [comandasPedido, setComandasPedido] = useState("");
  const [produtosPedido, setProdutosPedido] = useState([]);
  const [valorTotalPedido, setValorTotalPedido] = useState(0);
  const [descontoPedido, setDescontoPedido] = useState("");
  const [metodoPedido, setMetodoPedido] = useState("");
  const [pagamentoPedido, setPagamentoPedido] = useState("");
  const [trocoPedido, setTrocoPedido] = useState(0);
  const [searchItem, setSearchItem] = useState("");
  const [filter, setFilter] = useState([]);
  const [hostel, setHostel] = useState('');
  const [cpf, setCpf] = useState('');
  const [active, setActive] = useState('1');

  const { data: produtos } = useSwr(`/api/produtos/getAllProdutos`, fetcher);

  let hoje = new Date()
  let ano = hoje.getFullYear()
  let mes = hoje.getMonth() + 1
  let dia = hoje.getDate()

  let dataDia = `${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;

  const formatter = new Intl.NumberFormat('bt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  useEffect(() => {
    setDataPedido(dataDia)
    setFilter(produtos)
  }, [produtos])

  useEffect(() => {
    let itemObtido;
    setFilter(produtos?.filter(item => {
      return itemObtido = item.nome.toLowerCase().includes(searchItem);
    }));
  }, [searchItem]);

  const onSubmit = async (e) => {
    e.preventDefault();

    router.push("/b2b/pedidos-abertos");

    produtos?.map((item, index) => {
      produtosPedido?.map((item2, index2) => {
        if (item._id === item2._id) {
          axios.put(`/api/produtos/updateProdutosEstoque?id=${item._id}`, {
            estoque: item.estoque - item2.quantidade,
          });
        }
      })
    })

    let data = await axios.post(`/api/pedidos/insertPedido`, {
      data_pedido: dataPedido,
      comandas: comandasPedido,
      cpf: cpf,
      hostel: hostel,
      ativo: active,
      produtos: produtosPedido,
      desconto: descontoPedido,
      valor_total: valorTotalPedido,
      metodo_pagamento: metodoPedido
    });

    mutate(`/api/pedidos`);

    filter?.map((item) => {
      item.quantidade = 0;
    })

      toast('Pedido adiconado com sucesso!', {
        position: "top-right",
      });
     

  };
console.log(produtosPedido)
  const addItem = async (produto) => {
    let contador = 0;
    if (produtosPedido.length === 0) {
      setProdutosPedido([...produtosPedido, produto])
    } else {
      produtosPedido?.map((item) => {
        console.log(item, produto._id)
        if (item._id === produto._id) {
          contador++;
        }
      })
    }
    if (contador > 0) {
      toast.error(`${produto.nome} já existe na lista!`, {
        position: "top-right",
      });
      return;
    } else {
      setProdutosPedido([...produtosPedido, produto])
      toast.success(`${produto.nome} foi adicionado lista!`, {
        position: "top-right",
      });
      attValorPedidoAdicao((parseFloat(produto.valorVenda) * parseFloat(produto.quantidade)));
      return;
    }
  }

  const deleteItem = async (e, id, valorSubtrair) => {
    e.preventDefault();
    setProdutosPedido((produto) =>
      produto.filter((item) => item._id !== id)
    );
    attValorPedidoDelete(valorSubtrair);
  }

  const attPedido = async (value, id) => {
    produtosPedido?.map((item, index) => {

      if (item._id === id) {
        item.quantidade = parseInt(value);
      }
    })
    attValorPedido();
  }

  const attValorPedido = async (e) => {
    let valorTotal = 0;
    produtosPedido?.map((item, index) => {
      let valorParcial = item.quantidade * item.valorVenda

      valorTotal = parseFloat(valorTotal) + parseFloat(valorParcial);
    })
    setValorTotalPedido(valorTotal)
  }

  const attValorPedidoAdicao = async (valorAdcionar) => {
    let valorTotal = 0;
    produtosPedido?.map((item, index) => {
      let valorParcial = item.quantidade * item.valorVenda

      valorTotal = parseFloat(valorTotal) + parseFloat(valorParcial);
    })
    setValorTotalPedido(valorTotal + valorAdcionar)
  }

  const attValorPedidoDelete = async (valorSubtrair) => {
    let valorTotal = 0;
    produtosPedido?.map((item, index) => {
      let valorParcial = item.quantidade * item.valorVenda

      valorTotal = parseFloat(valorTotal) + parseFloat(valorParcial);
    })
    setValorTotalPedido(valorTotal - valorSubtrair)
  }

  const attValorTotal = async (e, valorDesconto) => {
    e.preventDefault();
    let valorFinal = parseFloat(valorTotalPedido) - parseFloat(valorDesconto);
    retiraDotComma(valorFinal)
    setValorTotalPedido(valorFinal)
  }

  const attTroco = async (e, valorPago) => {
    e.preventDefault();
    let troco = parseFloat(valorPago) - parseFloat(valorTotalPedido);
    retiraDotComma(troco)
    setTrocoPedido(troco)
  }

  function retiraDotComma(value) {
    let hasComma = new String(value).indexOf(",") !== -1;
    let hasDot = new String(value).indexOf(".") !== -1;

    if (hasComma && hasDot) {
      return parseFloat(new String(value).replace(".", "").replace(",", "."));
    }
    else if (hasComma) {
      return parseFloat(new String(value).replace(",", "."));
    }
    return parseFloat(value)
  }

  return (
    <>
      <div className="bg-geral">
        <div style={{ display: 'flex' }}>
          <Menu  parametro={'18'}/>
          <div className="ec-page-wrapper">
            <div className="ec-content-wrapper">
              <div className="content">
                <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
                  <h1>Novo Pedido</h1>
                  <p className="breadcrumbs">
                    <span>
                      <a href="#">Dashboard</a>
                    </span>
                    <span>
                      <i className="mdi mdi-chevron-right"></i>
                    </span>
                    Novo Pedido
                  </p>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="ec-cat-list card card-default mb-24px">
                      <div className="card-body">

                        <div className="card-body">
                          <div className="ec-cat-form">
                            <form onSubmit={onSubmit}>
                              <div className="form-group row">
                                <label htmlFor="text" className="col-12 col-form-label">
                                  Data
                                </label>
                                <div className="col-12">
                                  <input
                                    id="data"
                                    name="data"
                                    className="form-control here slug-title"
                                    type="date"
                                    defaultValue={dataDia}
                                    onChange={(e) => setDataPedido(e.target.value)}
                                  />
                                </div>

                                <label htmlFor="text" className="col-12 col-form-label">
                                  Comandas
                                </label>
                                <div className="col-12">
                                  <input
                                    id="text"
                                    name="nome"
                                    className="form-control here slug-title"
                                    type="text"
                                    required
                                    value={comandasPedido}
                                    onChange={(e) => setComandasPedido(e.target.value)}
                                  />
                                </div>

                                <label htmlFor="text" className="col-12 col-form-label">
                                  Documento
                                </label>
                                <div className="col-12">
                                  <input
                                    id="text"
                                    name="nome"
                                    className="form-control here slug-title"
                                    type="text"
                                    required
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                  />
                                </div>

                                <label htmlFor="produtos" className="col-12 col-form-label">
                                  Produtos
                                </label>
                                <div className="col-12">
                                  <ul>
                                    {produtosPedido?.map((item, index) => {
                                      return (
                                        <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                          <button
                                            onClick={(e) => deleteItem(e, item._id, (parseFloat(item.valorVenda) * parseFloat(item.quantidade)))}>
                                            <FaTrash style={{ color: '#DC3545' }} />
                                          </button>
                                          <input
                                            type="number"
                                            name="campoQtd"
                                            className="campoQtd mx-1"
                                            defaultValue={item.quantidade}
                                            onChange={(e) => attPedido(e.target.value, item._id)}
                                          />
                                          <div className="d-flex justify-content-between w-100">
                                            <p>{item.nome}</p>
                                            <p>{formatter.format(parseFloat(item.valorVenda))}</p>
                                          </div>
                                        </li>
                                      )
                                    })}
                                  </ul>
                                </div>

                                <label htmlFor="text" className="col-12 col-form-label">
                                  Desconto em Reais
                                </label>
                                <div className="col-12 d-flex align-items-center">
                                  <input
                                    id="text"
                                    name="valor"
                                    className="form-control here slug-title"
                                    type="number"
                                    defaultValue={descontoPedido}
                                    onChange={(e) => { setDescontoPedido(e.target.value) }}
                                  />
                                  <button className="btn btn-info ml-1" type="attValorTotal" onClick={(e) => { attValorTotal(e, descontoPedido) }}>Aplicar</button>
                                </div>

                                <label htmlFor="estoque" className="col-12 col-form-label">
                                  Valor Total
                                </label>
                                <div className="col-12">
                                  <input
                                    id="estoque"
                                    name="estoque"
                                    className="form-control here slug-title"
                                    type="text"
                                    disabled
                                    value={formatter.format(parseFloat(valorTotalPedido))}
                                    onChange={(e) => setValorTotalPedido(e.target.value)}
                                  />
                                </div>

                                <label htmlFor="text" className="col-12 col-form-label">
                                  Método de Pagamento
                                </label>
                                <div className="col-12">
                                  <select
                                    id="metodoPagamento"
                                    name="metodoPagamento"
                                    className="form-control here slug-title"
                                    defaultValue={metodoPedido}
                                    onChange={(e) => setMetodoPedido(e.target.value)}
                                  >
                                    <option value="">Escolha uma opção de pagamento</option>
                                    <option value="Cartão Crédito">Cartão Crédito</option>
                                    <option value="Cartão Dédito">Cartão Dédito</option>
                                    <option value="Dinheiro">Dinheiro</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="Pix">Pix</option>
                                    <option value="Outro">Outro</option>
                                  </select>
                                </div>
                                {(metodoPedido === "Dinheiro") ?
                                  <>
                                    <label htmlFor="text" className="col-12 col-form-label">
                                      Valor Pago
                                    </label>
                                    <div className="col-12 d-flex align-items-center">
                                      <input
                                        id="text"
                                        name="valorPago"
                                        className="form-control here slug-title"
                                        type="text"
                                        value={pagamentoPedido}
                                        onChange={(e) => { setPagamentoPedido(e.target.value) }}
                                      />
                                      <button className="btn btn-info ml-1" type="attTroco" onClick={(e) => { attTroco(e, pagamentoPedido) }}>Aplicar</button>
                                    </div>

                                    <label htmlFor="text" className="col-12 col-form-label">
                                      Troco
                                    </label>
                                    <div className="col-12">
                                      <input
                                        id="text"
                                        name="valor"
                                        className="form-control here slug-title"
                                        type="text"
                                        disabled
                                        value={formatter.format(parseFloat(trocoPedido))}
                                      />
                                    </div>
                                  </> : <></>
                                }

                              </div>

                              <div className="space-t-15 mt-3 mb-3">
                                    <label htmlFor="phone-2" className="form-label">
                                        Hostel
                                    </label>
                                    <select className="form-control here slug-title" id="cars" onChange={(e) => setHostel(e.target.value)}>
                                        <option value='todos'>Todos os Hostels</option>
                                        {hoteis?.map((item, index) => {
                                            console.log(item)
                                            return (<option value={item._id}>{item.titulo}</option>)
                                        })}
                                    </select>
                                </div>

                              <div className="d-flex mb-3 space-t-15">
                                <div className="row align-items-center">
                                  <label className="form-label">Ativado</label>
                                  <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                                      <input
                                        type="radio"
                                        name="active"
                                        value={'1'}
                                        style={{ width: '20px', margin: '0 15px 0 0' }}
                                        onChange={(e) => setActive(e.target.value)}
                                      />
                                    Sim
                                  </div>
                                  <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                                      <input
                                        type="radio"
                                        name="active"
                                        value={'0'}
                                        style={{ width: '20px', margin: '0 15px 0 0' }}
                                        onChange={(e) => setActive(e.target.value)}
                                      />
                                    Não
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-12">
                                  <button name="submit" type="submit" className="btn btn-warning">
                                    Concluir compra
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12">
                    <div className="ec-cat-list card card-default">
                      <div className="card-body">
                        <div className="table-responsive">
                          <input
                            type="search"
                            placeholder="Digite sua busca"
                            className="form-control here slug-title"
                            onChange={(e) => { setSearchItem(e.target.value.toLowerCase()) }}
                          />
                          <table id="responsive-data-table" className="table table-striped">
                            <thead>
                              <tr>
                                <th>Qtd.</th>
                                <th>Nome</th>
                                <th>Valor</th>
                                <th></th>
                              </tr>
                            </thead>

                            <tbody>
                              {filter?.map((item, index) => {
                                return (
                                  <tr key={index} className="align-middle">
                                    <td><input type="number" className="campoQtd text-black" name="campoQtd" defaultValue={item.quantidade} onChange={(e) => item.quantidade = parseInt(e.target.value)} /></td>
                                    <td>{item.nome}</td>
                                    <td>{formatter.format(item.valorVenda)}</td>
                                    <td className="text-right">
                                      <div className="btn-group">
                                        <button
                                          type="value"
                                          className="btn btn-success"
                                          onClick={(e) => {
                                            addItem(item);
                                          }}
                                        >
                                          <AiOutlinePlus size={20} color={"#ffffff"}/>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>)
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = async (ctx) => {

  const myCookie = ctx.req?.cookies || "";

  if (myCookie.access_token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};