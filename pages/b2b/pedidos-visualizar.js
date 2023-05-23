import { useState, useEffect } from "react";
import useSwr, { mutate } from "swr";
import Menu from "../../components/b2b_components/Menu";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
export default function PedidosVisualizar({ }) {
  const router = useRouter();
  const data = router.query;

  const { data: pedido } = useSwr(`/api/pedidos/getPedidoByID?id=${data.id}`, fetcher);

  const [idPedido, setIdPedido] = useState("");
  const [dataPedido, setDataPedido] = useState("");
  const [comandasPedido, setComandasPedido] = useState("");
  const [produtosPedido, setProdutosPedido] = useState([]);
  const [valorTotalPedido, setValorTotalPedido] = useState(0);
  const [descontoPedido, setDescontoPedido] = useState(0);
  const [metodoPedido, setMetodoPedido] = useState("");
  const [entrada, setEntrada] = useState("");
  const [fechamento, setFechamento] = useState("");
  const [abertpor, setAbertopor] = useState("");
  const [valorTotalPedidoSemDesconto, setValorTotalPedidoSemDesconto] = useState(0);

  let valorTotalSemDesconto = 0;
  useEffect(() => {
    pedido?.forEach((item) => {
      setIdPedido(item._id);
      setDataPedido(item.data_pedido.split("T")[0]);
      setComandasPedido(item.comandas)
      setEntrada(format(new Date(item.dataentrada), 'dd/MM/yyyy', { locale: ptBR }))
      setFechamento(format(new Date(item.datafechamento), 'dd/MM/yyyy', { locale: ptBR }))
      setProdutosPedido(item.produtos)
      setDescontoPedido(item.desconto)
      setValorTotalPedido(item.valor_total)
      setMetodoPedido(item.metodo_pagamento)
      setAbertopor(item.acesso_comanda)
    })
  }, [pedido])

  const formatter = new Intl.NumberFormat('bt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  
  
 
 

  return (
    <>
      <div className="bg-geral">
        <div style={{ display: 'flex' }}>
          <Menu />
          <div className="ec-page-wrapper">
            <div className="ec-content-wrapper">
              <div className="content">
                <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
                  <h1>Pedido nº {idPedido}</h1>
                  <p className="breadcrumbs print-some-elemento">
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
                  <div className="col-12">
                    <div className="ec-cat-list card card-default mb-24px">
                      <div className="card-body">

                        <div className="card-body">
                          <div className="ec-cat-form">
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
                                  value={dataPedido}
                                  disabled
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
                                  disabled
                                  value={comandasPedido}
                                />
                              </div>

                              <label htmlFor="produtos" className="col-12 col-form-label">
                                Produtos
                              </label>
                              <div className="col-12">
                                <table id="responsive-data-table" className="table">
                                  <thead>
                                    <tr>
                                      <th>Qtd.</th>
                                      <th>Produto</th>
                                      <th>Valor Parcial</th>
                                      <th className="text-end">Valor Total</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {produtosPedido?.map((item, index) => {
                                      console.log(item)
                                      return (
                                        <tr key={index} className="align-middle">
                                          <td>{item.quantidade}</td>
                                          <td>{item.nome}</td>
                                          <td>{formatter.format(parseFloat(item.valorVenda))}</td>
                                          <td className="text-end">{formatter.format(parseFloat(item.valorVenda * item.quantidade))}</td>
                                        </tr>
                                      )
                                    })}
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <td><strong>Total</strong></td>
                                      <td></td>
                                      <td></td>
                                      {produtosPedido?.map((item, index) => {
                                        valorTotalSemDesconto += parseFloat(item.valorVenda * item.quantidade)
                                      })}
                                      <td className="text-end"><strong>{formatter.format(parseFloat(valorTotalSemDesconto))}</strong></td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>

                              <label htmlFor="text" className="col-12 col-form-label">
                                Desconto em reais
                              </label>
                              <div className="col-12 d-flex align-items-center">
                                <input
                                  id="text"
                                  name="valor"
                                  className="form-control here slug-title"
                                  type="text"
                                  disabled
                                  value={formatter.format(parseFloat(descontoPedido))}
                                />
                              </div>

                              <label htmlFor="estoque" className="col-12 col-form-label">
                                Valor total já com desconto
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
                                Método de pagamento
                              </label>
                              <div className="col-12">
                                <input
                                  id="estoque"
                                  name="estoque"
                                  className="form-control here slug-title"
                                  type="text"
                                  disabled
                                  value={metodoPedido}
                                />
                              </div>
                              <label htmlFor="text" className="col-12 col-form-label">
                                Aberto Por
                              </label>
                              <div className="col-12">
                                <input
                                  id="estoque"
                                  name="estoque"
                                  className="form-control here slug-title"
                                  type="text"
                                  disabled
                                  value={abertpor}
                                />
                              </div>
                              <label htmlFor="text" className="col-12 col-form-label">
                                Entrada e Fechamento
                              </label>
                              <div className="col-6">
                                <input
                                  id="estoque"
                                  name="estoque"
                                  className="form-control here slug-title"
                                  type="text"
                                  disabled
                                  value={entrada}
                                />
                              </div>
                              <div className="col-6">
                                <input
                                  id="estoque"
                                  name="estoque"
                                  className="form-control here slug-title"
                                  type="text"
                                  disabled
                                  value={fechamento}
                                />
                              </div>
                            </div>

                            <div className="row print-some-elemento">
                              <div className="col-12">
                                <button onClick={(e) => history.go(-1)} className="btn btn-info mr-3">
                                  Voltar
                                </button>
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