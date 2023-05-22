import axios from "axios";
import Image from 'next/image';
import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../../components/b2b_components/Modal";
import Menu from "../../components/b2b_components/Menu";
import Footer from "../../components/b2b_components/Footer";
import useSwr, { mutate } from "swr";
import { BsPencilFill, BsWhatsapp } from "react-icons/bs";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Financeiro() {
    const { data: hoteis } = useSwr(`/api/hoteis/getAllHotel`, fetcher);
    const [id_, setId] = useState(0);
    const [rendatotal, setRendatotal] = useState(0);
    const [pagototal, setPagototal] = useState(0);
    const [rendatotal2, setRendatotal2] = useState(0);
    const [pagototal2, setPagototal2] = useState(0);
    const [rensamensal, setRendamensal] = useState(0);
    const [debitos, setDebitos] = useState(0);
    const [hostel, setHostel] = useState('todos');
    const [hospedes, setHospedes] = useState(0);
    const [hospedes2, setHospedes2] = useState(0);
    const [entrada, setEntrada] = useState('');
    const [saida, setSaida] = useState('');
    const [checkinArr, setCheckinArr] = useState([]);

    const { data: checkin } = useSwr(`/api/checkin/getAllCheckin`, fetcher);
    const { data: quartos } = useSwr(`/api/quartos/getAllQuarto`, fetcher);
    var tamanho = checkin?.length || [];
    console.log(hostel)
    useEffect(() => {
        let valortotal = 0;
        let pagototal = 0;
        let hospedesinativos = 0;
        checkin?.map((item, index) => {
            if (item.ativado === '0') {
                hospedesinativos = hospedesinativos + 1;
                valortotal = valortotal + parseInt(item.valorpago)
                const entrada = new Date(item.entrada);
                const saida = new Date(item.saida);
                const timeDifference = saida.getTime() - entrada.getTime();
                const diasDiferenca = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                console.log(diasDiferenca)
                pagototal = pagototal + (diasDiferenca + 1) * parseInt(item.valordiaria)
            }
            if (checkin.length === index + 1) {
                setRendatotal(valortotal)
                setPagototal(pagototal)
                setHospedes(hospedesinativos)
                setCheckinArr(checkin)
            }
        })
    }, [checkin])

    const filtrar = () => {
        let newarr = [];
        let valortotal = 0;
        let pagototal = 0;
        let hospedesinativos = 0;
        if (hostel === 'todos') {
            checkin?.map((item, index) => {
                if (item.ativado === '0') {
                    const dataEntradaNovaReserva = new Date(entrada);
                    const dataSaidaNovaReserva = new Date(saida);
                    const dataEntradaReserva = new Date(item.entrada);
                    const dataSaidaReserva = new Date(item.saida);
                    const quartoVago = (dataEntradaNovaReserva < dataSaidaReserva && dataSaidaNovaReserva > dataEntradaReserva);
                    if (quartoVago) {
                        const entrada = new Date(item.entrada);
                        const saida = new Date(item.saida);
                        const timeDifference = saida.getTime() - entrada.getTime();
                        const diasDiferenca = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                        console.log(diasDiferenca)
                        newarr.push(item)
                        hospedesinativos = hospedesinativos + 1;
                        valortotal = valortotal + parseInt(item.valorpago)
                        if (checkin.length === index + 1 && newarr.length === 1) {
                            pagototal = pagototal + (diasDiferenca) * parseInt(item.valordiaria)
                        } else {
                            pagototal = pagototal + (diasDiferenca + 1) * parseInt(item.valordiaria)
                        }
                    }
                }
                if (checkin.length === index + 1) {
                    setCheckinArr(newarr)
                    setRendatotal2(valortotal)
                    setPagototal2(pagototal)
                    setHospedes2(hospedesinativos)
                }
            });
        } else {
            checkin?.map((item, index) => {
                if (hostel === item.objreserva.hotel) {
                    if (item.ativado === '0') {
                        const dataEntradaNovaReserva = new Date(entrada);
                        const dataSaidaNovaReserva = new Date(saida);
                        const dataEntradaReserva = new Date(item.entrada);
                        const dataSaidaReserva = new Date(item.saida);
                        const quartoVago = (dataEntradaNovaReserva < dataSaidaReserva && dataSaidaNovaReserva > dataEntradaReserva);
                        if (quartoVago) {
                            const entrada = new Date(item.entrada);
                            const saida = new Date(item.saida);
                            const timeDifference = saida.getTime() - entrada.getTime();
                            const diasDiferenca = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                            console.log(diasDiferenca)
                            newarr.push(item)
                            hospedesinativos = hospedesinativos + 1;
                            valortotal = valortotal + parseInt(item.valorpago)
                            if (checkin.length === index + 1 && newarr.length === 1) {
                                pagototal = pagototal + (diasDiferenca) * parseInt(item.valordiaria)
                            } else {
                                pagototal = pagototal + (diasDiferenca + 1) * parseInt(item.valordiaria)
                            }
                        }
                    }
                }

                if (checkin.length === index + 1) {
                    setCheckinArr(newarr)
                    setRendatotal2(valortotal)
                    setPagototal2(pagototal)
                    setHospedes2(hospedesinativos)
                }
            });
        }

    }

    const debitosativos = () => {
        let newarr = [];
        let valortotal = 0;
        let pagototal = 0;
        let hospedesinativos = 0;
        if (hostel === 'todos') {
            checkin?.map((item, index) => {
                if (item.pagamentoconcluido === '0' && item.ativado === '0') {
                    newarr.push(item)
                    const entrada = new Date(item.entrada);
                    const saida = new Date(item.saida);
                    const timeDifference = saida.getTime() - entrada.getTime();
                    const diasDiferenca = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                    hospedesinativos = hospedesinativos + 1;
                    valortotal = valortotal + parseInt(item.valorpago)
                    if (checkin.length === index + 1 && newarr.length === 1) {
                        pagototal = pagototal + (diasDiferenca) * parseInt(item.valordiaria)
                    } else {
                        pagototal = pagototal + (diasDiferenca + 1) * parseInt(item.valordiaria)
                    }
                }
                if (checkin.length === index + 1) {
                    setCheckinArr(newarr)
                    setRendatotal2(valortotal)
                    setPagototal2(pagototal)
                    setHospedes2(hospedesinativos)
                }
            });
        } else {
            checkin?.map((item, index) => {
                if (hostel === item.objreserva.hotel) {
                    if (item.pagamentoconcluido === '0' && item.ativado === '0') {
                        newarr.push(item)
                        const entrada = new Date(item.entrada);
                        const saida = new Date(item.saida);
                        const timeDifference = saida.getTime() - entrada.getTime();
                        const diasDiferenca = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                        hospedesinativos = hospedesinativos + 1;
                        valortotal = valortotal + parseInt(item.valorpago)
                        if (checkin.length === index + 1 && newarr.length === 1) {
                            pagototal = pagototal + (diasDiferenca) * parseInt(item.valordiaria)
                        } else {
                            pagototal = pagototal + (diasDiferenca + 1) * parseInt(item.valordiaria)
                        }
                    }
                }
                if (checkin.length === index + 1) {
                    console.log(newarr)
                    setCheckinArr(newarr)
                    setRendatotal2(valortotal)
                    setPagototal2(pagototal)
                    setHospedes2(hospedesinativos)
                }

            });
        }

    }
    const todosarr = () => {
        let newarr = [];
        let valortotal = 0;
        let pagototal = 0;
        let hospedesinativos = 0;
        if (hostel === 'todos') {
            checkin?.map((item, index) => {
                if (item.ativado === '0') {
                    newarr.push(item)
                    const entrada = new Date(item.entrada);
                    const saida = new Date(item.saida);
                    const timeDifference = saida.getTime() - entrada.getTime();
                    const diasDiferenca = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                    hospedesinativos = hospedesinativos + 1;
                    valortotal = valortotal + parseInt(item.valorpago)
                    if (checkin.length === index + 1 && newarr.length === 1) {
                        pagototal = pagototal + (diasDiferenca) * parseInt(item.valordiaria)
                    } else {
                        pagototal = pagototal + (diasDiferenca + 1) * parseInt(item.valordiaria)
                    }
                }
                if (checkin.length === index + 1) {
                    setCheckinArr(newarr)
                    setRendatotal2(valortotal)
                    setPagototal2(pagototal)
                    setHospedes2(hospedesinativos)
                }
            });
        } else {
            checkin?.map((item, index) => {
                if (hostel === item.objreserva.hotel) {
                    if (item.ativado === '0') {
                        newarr.push(item)
                        const entrada = new Date(item.entrada);
                        const saida = new Date(item.saida);
                        const timeDifference = saida.getTime() - entrada.getTime();
                        const diasDiferenca = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                        hospedesinativos = hospedesinativos + 1;
                        valortotal = valortotal + parseInt(item.valorpago)
                        if (checkin.length === index + 1 && newarr.length === 1) {
                            pagototal = pagototal + (diasDiferenca) * parseInt(item.valordiaria)
                        } else {
                            pagototal = pagototal + (diasDiferenca + 1) * parseInt(item.valordiaria)
                        }
                    }
                }
                if (checkin.length === index + 1) {
                    setCheckinArr(newarr)
                    setRendatotal2(valortotal)
                    setPagototal2(pagototal)
                    setHospedes2(hospedesinativos)
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
                <Menu parametro={'7'} />
                <div className="ec-page-wrapper">
                    <div className="ec-content-wrapper">
                        <div className="content">
                            <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
                                <h1>Financeiro Hóspede</h1>
                                <p className="breadcrumbs">
                                    <span>
                                        <Link href="/b2b">Dashboard</Link>
                                    </span>
                                    <span>
                                        <i className="mdi mdi-chevron-right"></i>
                                    </span>
                                    Financeiro
                                </p>
                            </div>
                            <h2 className="p-3 mb-2">Geral</h2>
                            <div className="d-flex">
                                <div className="col-lg-3 modalprice">
                                    <h5 className="text-white">Renda Total</h5>
                                    <div className="text-white">{formatter.format(rendatotal)}</div>
                                </div>
                                <div className="col-lg-3 modalprice">
                                    <h5 className="text-white">Estimado</h5>
                                    <div className="text-white">{formatter.format(pagototal)}</div>
                                </div>
                                <div className="col-lg-3 modalprice">
                                    <h5 className="text-white">Débitos</h5>
                                    <div className="text-white">{formatter.format(rendatotal - pagototal)}</div>
                                </div>
                                <div className="col-lg-3 modalprice">
                                    <h5 className="text-white">Hóspedes</h5>
                                    <div className="text-white">{hospedes}</div>
                                </div>

                            </div>

                            <h2 className="pl-3 mt-3 pt-3">Mensal</h2>
                            <div className="d-flex flex-wrap align-items-end">
                                <div className="col-md-4 space-t-15 mt-3 p-1">
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
                                <div className="col-md-4 space-t-15 mt-3 p-1">
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
                                <div className="col-md-4 space-t-15 mt-3 p-1">
                                    <label htmlFor="phone-2" className="form-label">
                                        Hostel
                                    </label>
                                    <select className="form-control" id="cars" onChange={(e) => setHostel(e.target.value)}>
                                        <option value='todos'>Todos os Hostels</option>
                                        {hoteis?.map((item, index) => {
                                            console.log(item)
                                            return (<option key={item._id} value={item._id}>{item.titulo}</option>)
                                        })}
                                    </select>
                                </div>

                                <div style={{ cursor: 'pointer' }} className="col-lg-4 modalprice2" onClick={todosarr}>
                                    <h5 className="text-white">Todos</h5>
                                </div>
                                <div style={{ cursor: 'pointer' }} className="col-lg-4 modalprice2" onClick={debitosativos}>
                                    <h5 className="text-white">Débitos</h5>
                                </div>
                                <div style={{ cursor: 'pointer' }} className="col-lg-4 modalprice2" onClick={filtrar}>
                                    <h5 className="text-white">Filtrar</h5>
                                </div>

                                <div className="col-lg-3 modalprice">
                                    <h5 className="text-white">Renda Total</h5>
                                    <div className="text-white">{formatter.format(rendatotal2)}</div>
                                </div>
                                <div className="col-lg-3 modalprice">
                                    <h5 className="text-white">Pago Total</h5>
                                    <div className="text-white">{formatter.format(pagototal2)}</div>
                                </div>
                                <div className="col-lg-3 modalprice">
                                    <h5 className="text-white">Débitos</h5>
                                    <div className="text-white">{formatter.format(rendatotal2 - pagototal2)}</div>
                                </div>
                                <div className="col-lg-3 modalprice">
                                    <h5 className="text-white">Hóspedes</h5>
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
                                                                <th>Nome</th>
                                                                <th>Telefone</th>
                                                                <th>Estadia</th>
                                                                <th>Total Diária</th>
                                                                <th>Pago</th>
                                                                <th>Estado</th>
                                                                <th>Pagamento</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {checkinArr?.map((item, index) => {
                                                                console.log(item)
                                                                if (item.ativado === '0') {
                                                                    return (
                                                                        <tr key={item.id} className="align-middle">
                                                                            <td>{item.nome}</td>
                                                                            <td>{item.telefone}</td>
                                                                            <td>{item.entrada}<br />{item.saida}</td>
                                                                            <td>{item.valordiaria}</td>
                                                                            <td>{item.valorpago}</td>
                                                                            <td><div className={`${item.ativado === '1' ? 'styleativo' : 'styleinativo'}`}>{item.ativado === '1' ? 'Ativo' : 'Inativo'}</div></td>
                                                                            <td><div className={`${item.pagamentoconcluido === '1' ? 'styleativo' : 'styleinativo'}`}>{item.pagamentoconcluido === '1' ? 'Pago' : 'Débito'}</div></td>
                                                                            <td className="text-right">
                                                                                <div className="btn-group">
                                                                                    <a
                                                                                        target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send?phone=55${item.telefone}&text=Olá, me chamo...`}
                                                                                        title="Whatsapp"
                                                                                        style={{ marginRight: '10px', background: '#25D366' }}
                                                                                        className="btn btn-primary"
                                                                                    >
                                                                                        <BsWhatsapp />
                                                                                    </a>
                                                                                    <a
                                                                                        href="javasript:void(0)"
                                                                                        data-link-action="editmodal"
                                                                                        title="Edit Detail"
                                                                                        data-bs-toggle="modal"
                                                                                        data-bs-target="#edit_modal"
                                                                                        className="btn btn-primary"
                                                                                        onClick={() => setId(item._id)}
                                                                                    >
                                                                                        <BsPencilFill />
                                                                                    </a>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
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

            <Modal customers={checkin} id_={id_} />
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
