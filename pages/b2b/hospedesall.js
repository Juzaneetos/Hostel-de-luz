import axios from "axios";
import Image from 'next/image';
import { use, useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../../components/b2b_components/Modalhospede";
import Menu from "../../components/b2b_components/Menu";
import Footer from "../../components/b2b_components/Footer";
import useSwr, { mutate } from "swr";
import { BsPencilFill, BsWhatsapp } from "react-icons/bs";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Hospedeall() {
  const { data: hospedes } = useSwr(`/api/hospedes/getAllHospedes`, fetcher);
  const [id_, setId] = useState(0);
  const [pesquisa, setPesquisa] = useState('');
  const [hospedesarr, setHospedesarr] = useState([]);
  const [newarr, setNewarr] = useState([]);
  var tamanho = hospedes?.length || [];


  useEffect(() => {
    setHospedesarr(hospedes);
  }, [hospedes])

  useEffect(() => {
    const procurararr = () => {
      let tempArr = [];
      const pesquisaMinuscula = pesquisa.toLowerCase();
      hospedesarr.forEach((item, index) => {
        const nomeMinusculo = item.nome.toLowerCase();
        const cpfMinusculo = item.cpf.toLowerCase();
        const rgMinusculo = item.rg.toLowerCase();
        const passaporteMinusculo = item.passaporte.toLowerCase();
        if (
          nomeMinusculo.includes(pesquisaMinuscula) ||
          cpfMinusculo.includes(pesquisaMinuscula) ||
          rgMinusculo.includes(pesquisaMinuscula) ||
          passaporteMinusculo.includes(pesquisaMinuscula)
        ) {
          tempArr.push(item);
        }
        if (hospedesarr.length === index + 1) {
          setNewarr(tempArr);
        }
      });


    };
    procurararr();
  }, [pesquisa]);


  return (
    <div style={{ backgroundColor: '#f3f3f3' }}>
      <div style={{ display: 'flex' }}>
        <Menu parametro={'5'} />
        <div className="ec-page-wrapper">
          <div className="ec-content-wrapper">
            <div className="content">
              <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
                <h1>Todos os Hóspedes</h1>
                <p className="breadcrumbs">
                  <span>
                    <Link href="/b2b">Dashboard</Link>
                  </span>
                  <span>
                    <i className="mdi mdi-chevron-right"></i>
                  </span>
                </p>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card card-default">
                    <div className="card-body">
                      <div className="mb-2">
                        <label htmlFor="phone-2" className="form-label">
                          Pesquisar
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          id="phone-1"
                          onChange={(e) => setPesquisa(e.target.value)}
                        />
                      </div>
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
                                <th>CPF</th>
                                <th>Gênero</th>
                                <th></th>
                              </tr>
                            </thead>

                            <tbody>
                              {newarr.length > 0 ?
                                newarr?.map((item, index) => {
                                  return (
                                    <tr key={item.id} className="align-middle">
                                      <td>{item.nome}</td>
                                      <td>{item.telefone}</td>
                                      <td>{item.cpf}</td>
                                      <td>{item.genero}</td>
                                      <td className="text-right">
                                        <div className="btn-group">
                                        <a
                                            href="javasript:void(0)"
                                            data-link-action="editmodal"
                                            title="Edit Detail"
                                            data-bs-toggle="modal"
                                            data-bs-target="#edit_modal"
                                            className="btn btn-primary"
                                            style={{marginRight: '10px', fontWeight: 600}}
                                            onClick={() => setId(item._id)}
                                          >
                                            INICIAR CHECK-IN
                                          </a>
                                          <a
                                            target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send?phone=55${item.telefone}&text=Olá, me chamo...`}
                                            title="Whatsapp"
                                            style={{  background: '#25D366' }}
                                            className="btn btn-primary"
                                          >
                                            <BsWhatsapp />
                                          </a>
                                          
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })
                                :
                                <>
                                  {pesquisa.length === 0 ?
                                    hospedesarr?.map((item, index) => {
                                      return (
                                        <tr key={item.id} className="align-middle">
                                          <td>{item.nome}</td>
                                          <td>{item.telefone}</td>
                                          <td>{item.cpf}</td>
                                          <td>{item.genero}</td>
                                          <td className="text-right">
                                            <div className="btn-group">
                                            <a
                                                href="javasript:void(0)"
                                                data-link-action="editmodal"
                                                title="Edit Detail"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_modal"
                                                className="btn btn-primary"
                                                style={{ marginRight: '10px', fontWeight: 600}}
                                                onClick={() => setId(item._id)}
                                              >
                                                INICIAR CHECK-IN
                                              </a>
                                              <a
                                                target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send?phone=55${item.telefone}&text=Olá, me chamo...`}
                                                title="Whatsapp"
                                                style={{ background: '#25D366' }}
                                                className="btn btn-primary"
                                              >
                                                <BsWhatsapp size={20} />
                                              </a>
                                              
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })
                                    :
                                    <></>
                                  }
                                </>

                              }

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

      <Modal customers={hospedes} id_={id_} />
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