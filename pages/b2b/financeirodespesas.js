import axios from "axios";
import Image from 'next/image';
import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../../components/b2b_components/Modal";
import Menu from "../../components/b2b_components/Menu";
import Footer from "../../components/b2b_components/Footer";
import useSwr, { mutate } from "swr";


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Financeirodespesas() {
    const [id_, setId] = useState(0);
    const [rendatotal, setRendatotal] = useState(0);
    const [pagototal, setPagototal] = useState(0);
    const [rendatotal2, setRendatotal2] = useState(0);
    const [hospedes2, setHospedes2] = useState(0);
    const [entrada, setEntrada] = useState('');
    const [saida, setSaida] = useState('');
    const [despesasArr, setCheckinArr] = useState([]);

    const { data: despesas } = useSwr(`/api/despesas/getAllDespesas`, fetcher);
    const { data: quartos } = useSwr(`/api/quartos/getAllQuarto`, fetcher);
    var tamanho = despesas?.length || [];
    console.log(despesas)

    useEffect(() => {
        let valortotal = 0;
        let itensativos = 0;
        despesas?.map((item, index) => {
                itensativos = itensativos + 1;
                valortotal = valortotal + parseFloat(item.valor)
                if (despesas.length === index + 1) {
                    setRendatotal2(valortotal)
                    setCheckinArr(despesas)
                    setHospedes2(itensativos)
                }
        })
    }, [despesas])

    const filtrar = () => {
        let newarr = [];
        let valortotal = 0;
        let itensativos = 0;
        despesas?.map((item, index) => {
          const dataEntradaNovaReserva = new Date(entrada);
          const dataSaidaNovaReserva = new Date(saida);
          const dataEntradaReserva = new Date(item.entrada);
          const quartoVago = (dataSaidaNovaReserva >= dataEntradaReserva) && (dataEntradaNovaReserva <= dataEntradaReserva);
          if (quartoVago) {
            itensativos = itensativos + 1;
            valortotal = valortotal + parseFloat(item.valor);
            newarr.push(item);
          }
          if (despesas.length === index + 1) {
            setCheckinArr(newarr);
            setRendatotal2(valortotal);
            setHospedes2(itensativos);
          }
        });
      };
      

    const todosarr = () => {
        let newarr = [];
        let valortotal = 0;
        let itensativos = 0;
        despesas?.map((item, index) => {
                    newarr.push(item)
                    itensativos = itensativos + 1;
                    valortotal = valortotal + parseFloat(item.valor)
                if (despesas.length === index + 1) {
                    setRendatotal2(valortotal);
                    setCheckinArr(newarr)
                    setHospedes2(itensativos);
                }
        });
    }

    return (
        <div style={{ backgroundColor: '#f3f3f3' }}>
            <div style={{ display: 'flex' }}>
                <Menu  parametro={'9'}/>
                <div className="ec-page-wrapper">
                    <div className="ec-content-wrapper">
                        <div className="content">
                            <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
                                <h1>Financeiro Despesas</h1>
                                <p className="breadcrumbs">
                                    <span>
                                        <Link href="/b2b">Dashboard</Link>
                                    </span>
                                    <span>
                                        <i className="mdi mdi-chevron-right"></i>
                                    </span>
                                    Financeiro Despesas
                                </p>
                            </div>
                            {/* <h2 className="p-3 mb-2">Geral</h2>
                            <div className="d-flex">
                                <div className="col-lg-3 modalprice">
                                    <h5 className="text-white">Renda Total</h5>
                                    <div className="text-white">R$ {rendatotal},00</div>
                                </div>
                                <div className="col-lg-3 modalprice">
                                    <h5 className="text-white">Estimado</h5>
                                    <div className="text-white">R$ {pagototal},00</div>
                                </div>
                                <div className="col-lg-3 modalprice">
                                    <h5 className="text-white">Débitos</h5>
                                    <div className="text-white">R$ {rendatotal - pagototal},00</div>
                                </div>
                                <div className="col-lg-3 modalprice">
                                    <h5 className="text-white">Hóspedes</h5>
                                    <div className="text-white">{hospedes}</div>
                                </div>

                            </div> */}

                            <div className="d-flex flex-wrap align-items-end">
                                <div className="col-md-6 space-t-15 mt-3 p-1">
                                    <label htmlFor="phone-2" className="form-label">
                                        Entrada
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="phone-2"
                                        onChange={(e) => setEntrada(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 space-t-15 mt-3 p-1">
                                    <label htmlFor="phone-2" className="form-label">
                                        Saída
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="phone-2"
                                        onChange={(e) => setSaida(e.target.value)}
                                    />
                                </div>

                                <div style={{ cursor: 'pointer' }} className="col-lg-6 modalprice2" onClick={todosarr}>
                                    <h5 className="text-white">Todos</h5>
                                </div>
                                <div style={{ cursor: 'pointer' }} className="col-lg-6 modalprice2" onClick={filtrar}>
                                    <h5 className="text-white">Filtrar</h5>
                                </div>
                                
                                <div className="col-lg-6 modalprice">
                                    <h5 className="text-white">Total</h5>
                                    <div className="text-white">R$ {rendatotal2},00</div>
                                </div>
                                <div className="col-lg-6 modalprice">
                                    <h5 className="text-white">Total cadastrado</h5>
                                    <div className="text-white">{hospedes2}</div>
                                </div>
                                
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="card card-default">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                {tamanho === 0 && (
                                                    <div className="text-center">
                                                        Não possui nenhum cliente cadastrado
                                                    </div>
                                                )}

                                                {tamanho !== 0 && (
                                                    <table
                                                        id="responsive-data-table"
                                                        className="table table-striped"
                                                        style={{ width: "100%" }}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th>Titulo</th>
                                                                <th>Entrada</th>
                                                                <th>Valor</th>
                                                                <th>Descrição</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {despesasArr?.map((item, index) => {
                                                                    return (
                                                                        <tr key={item.id} className="align-middle">
                                                                            <td>{item.titulo}</td>
                                                                            <td>{item.entrada}</td>
                                                                            <td>{item.valor}</td>
                                                                            <td style={{borderLeft: '1px solid black', maxWidth: '160px', minWidth: '160px'}} className="text-left">
                                                                            {item.descricao}
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal customers={despesas} id_={id_} />
        </div>
    );
}

export const getServerSideProps = async (ctx) => {

    const myCookie = ctx.req?.cookies || "";

    if (myCookie.access_token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/b2b/login",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};