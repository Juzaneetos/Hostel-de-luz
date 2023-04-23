import axios from "axios";
import Image from 'next/image';
import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../../components/b2b_components/Modalhospede";
import Menu from "../../components/b2b_components/Menu";
import Footer from "../../components/b2b_components/Footer";
import useSwr, { mutate } from "swr";


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Hospedeall() {
  const [id_, setId] = useState(0);
  const [pesquisa, setPesquisa] = useState(0);
  const { data: hospedes } = useSwr(`/api/hospedes/getAllHospedes`, fetcher);
  var tamanho = hospedes?.length || [];

  return (
    <div style={{ backgroundColor: '#f3f3f3' }}>
      <div style={{ display: 'flex' }}>
        <Menu />
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
                            className="table"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>RG</th>
                                <th>Gênero</th>
                                <th></th>
                              </tr>
                            </thead>

                            <tbody>
                              {hospedes?.map((item, index) => {
                                return (
                                  <tr key={item.id} className="align-middle">
                                    <td>{item.nome}</td>
                                    <td>{item.telefone}</td>
                                    <td>{item.rg}</td>
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
                                          onClick={() => setId(item._id)}
                                        >
                                          Visualizar
                                        </a>
                                      </div>
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