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
    const { data: getAllPedidos } = useSwr(`/api/pedidos/getAllPedidos`, fetcher);
    const { data: hoteis } = useSwr(`/api/hoteis/getAllHotel`, fetcher);
    const [id_, setId] = useState(0);
    const [rendatotal, setRendatotal] = useState(0);
    const [pagototal, setPagototal] = useState(0);
    const [rendatotal2, setRendatotal2] = useState(0);
    const [hospedes2, setHospedes2] = useState(0);
    const [entrada, setEntrada] = useState('');
    const [saida, setSaida] = useState('');
    const [despesasArr, setCheckinArr] = useState([]);
    const [categoria, setCategoria] = useState("todos");
    const [hostel, setHostel] = useState("todos");

    var tamanho = getAllPedidos?.length || [];

    useEffect(() => {
        let valortotal = 0;
        let itensativos = 0;
        getAllPedidos?.map((item, index) => {
            itensativos = itensativos + 1;
            valortotal = valortotal + parseFloat(item.valor_total)
            if (getAllPedidos.length === index + 1) {
                setRendatotal2(valortotal);
                setCheckinArr(getAllPedidos);
                setHospedes2(itensativos);
            }
        })
    }, [getAllPedidos])

    const filtrar = () => {
        let newarr = [];
        let valortotal = 0;
        let itensativos = 0;
        if(categoria === 'todos' && hostel === 'todos'){
            getAllPedidos?.map((item, index) => {
                const dataEntradaNovaReserva = new Date(entrada);
                const dataSaidaNovaReserva = new Date(saida);
                const dataEntradaReserva = new Date(item.data_pedido);
                const quartoVago = (dataSaidaNovaReserva >= dataEntradaReserva) && (dataEntradaNovaReserva <= dataEntradaReserva);
                if (quartoVago) {
                    itensativos = itensativos + 1;
                    valortotal = valortotal + parseFloat(item.valor_total);
                    newarr.push(item);
                }
                if (getAllPedidos.length === index + 1) {
                    setCheckinArr(newarr);
                    setRendatotal2(valortotal);
                    setHospedes2(itensativos);
                }
            });
        }else if(categoria !== 'todos' && hostel === 'todos'){
            getAllPedidos?.map((item, index) => {
                if(item.categoria === categoria){
                    const dataEntradaNovaReserva = new Date(entrada);
                    const dataSaidaNovaReserva = new Date(saida);
                    const dataEntradaReserva = new Date(item.data_pedido);
                    const quartoVago = (dataSaidaNovaReserva >= dataEntradaReserva) && (dataEntradaNovaReserva <= dataEntradaReserva);
                    if (quartoVago) {
                        itensativos = itensativos + 1;
                        valortotal = valortotal + parseFloat(item.valor_total);
                        newarr.push(item);
                    }
                }
                if (getAllPedidos.length === index + 1) {
                    setCheckinArr(newarr);
                    setRendatotal2(valortotal);
                    setHospedes2(itensativos);
                }
            });
        }else if(categoria === 'todos' && hostel !== 'todos'){
            getAllPedidos?.map((item, index) => {
                if(item.hostel === hostel){
                    const dataEntradaNovaReserva = new Date(entrada);
                    const dataSaidaNovaReserva = new Date(saida);
                    const dataEntradaReserva = new Date(item.data_pedido);
                    const quartoVago = (dataSaidaNovaReserva >= dataEntradaReserva) && (dataEntradaNovaReserva <= dataEntradaReserva);
                    if (quartoVago) {
                        itensativos = itensativos + 1;
                        valortotal = valortotal + parseFloat(item.valor_total);
                        newarr.push(item);
                    }
                }
                if (getAllPedidos.length === index + 1) {
                    setCheckinArr(newarr);
                    setRendatotal2(valortotal);
                    setHospedes2(itensativos);
                }
            });
        }else if(categoria !== 'todos' && hostel !== 'todos'){
            getAllPedidos?.map((item, index) => {
                if(item.hostel === hostel && item.categoria === categoria){
                    const dataEntradaNovaReserva = new Date(entrada);
                    const dataSaidaNovaReserva = new Date(saida);
                    const dataEntradaReserva = new Date(item.data_pedido);
                    const quartoVago = (dataSaidaNovaReserva >= dataEntradaReserva) && (dataEntradaNovaReserva <= dataEntradaReserva);
                    if (quartoVago) {
                        itensativos = itensativos + 1;
                        valortotal = valortotal + parseFloat(item.valor_total);
                        newarr.push(item);
                    }
                }
                if (getAllPedidos.length === index + 1) {
                    setCheckinArr(newarr);
                    setRendatotal2(valortotal);
                    setHospedes2(itensativos);
                }
            });
        }
    };


    const todosarr = () => {
        let newarr = [];
        let valortotal = 0;
        let itensativos = 0;
        if(categoria === 'todos' && hostel === 'todos'){
            getAllPedidos?.map((item, index) => {
                newarr.push(item)
                itensativos = itensativos + 1;
                valortotal = valortotal + parseFloat(item.valor_total)
                if (getAllPedidos.length === index + 1) {
                    setRendatotal2(valortotal);
                    setCheckinArr(newarr)
                    setHospedes2(itensativos);
                }
            });
        }else if(hostel !== 'todos'){
            getAllPedidos?.map((item, index) => {
                if(item.hostel === hostel){
                    newarr.push(item)
                    itensativos = itensativos + 1;
                    valortotal = valortotal + parseFloat(item.valor_total)
                }
                if (getAllPedidos.length === index + 1) {
                    setRendatotal2(valortotal);
                    setCheckinArr(newarr)
                    setHospedes2(itensativos);
                }
            });
        }
    }

    const formatter = new Intl.NumberFormat('bt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <div style={{ backgroundColor: '#f3f3f3' }}>
            <div style={{ display: 'flex' }}>
                <Menu parametro={'10'} />
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
                                <div className="col-md-4 space-t-15 mt-3 p-1">
                                    <label htmlFor="phone-2" className="form-label">
                                        Inicio
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="phone-2"
                                        onChange={(e) => setEntrada(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-4 space-t-15 mt-3 p-1">
                                    <label htmlFor="phone-2" className="form-label">
                                        Fim
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="phone-2"
                                        onChange={(e) => setSaida(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-4 space-t-15 mt-3 p-1">
                                    <label htmlFor="phone-2" className="form-label">
                                        Hostel
                                    </label>
                                    <select className="form-control" id="cars" onChange={(e) => setHostel(e.target.value)}>
                                        <option value='todos'>Todos os Hostels</option>
                                        {hoteis?.map((item, index) => {
                                            console.log(item)
                                            return (<option value={item._id}>{item.titulo}</option>)
                                        })}
                                    </select>
                                </div>
                                <div style={{ cursor: 'pointer' }} className="col-lg-6 modalprice2" onClick={todosarr}>
                                    <h5 className="text-white">Todos</h5>
                                </div>
                                <div style={{ cursor: 'pointer' }} className="col-lg-6 modalprice2" onClick={filtrar}>
                                    <h5 className="text-white">Filtrar</h5>
                                </div>

                                <div className="col-lg-6 modalprice">
                                    <h5 className="text-white">Total</h5>
                                    <div className="text-white">{formatter.format(rendatotal2)}</div>
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
                                                                <th>Data</th>
                                                                <th>Desconto</th>
                                                                <th>Valor Total</th>
                                                                <th>Método</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {despesasArr?.map((item, index) => {
                                                                return (
                                                                    <tr key={item.id} className="align-middle">
                                                                        <td>{item.comandas}</td>
                                                                        <td>{item.data_pedido}</td>
                                                                        <td>{formatter.format(item.desconto)}</td>
                                                                        <td>{formatter.format(item.valor_total)}</td>
                                                                        <td>{item.metodo_pagamento}</td>
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