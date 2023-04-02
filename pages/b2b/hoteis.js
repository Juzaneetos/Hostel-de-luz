import axios from "axios";
import Image from 'next/image';
import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../../components/b2b_components/Modal";
import Menu from "../../components/b2b_components/Menu";
import Footer from "../../components/b2b_components/Footer";
import useSwr, { mutate } from "swr";


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Hoteis() {
  const { data: hoteis } = useSwr(`/api/hoteis/getAllHotel`, fetcher);
  var tamanho = hoteis?.length || [];

  return (
    <div style={{ backgroundColor: '#f3f3f3' }}>
      <div style={{ display: 'flex' }}>
        <Menu />
        <div className="ec-page-wrapper">
          <div className="ec-content-wrapper">
            <div className="content">
              <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
                <h1>hoteis</h1>
                <p className="breadcrumbs">
                  <div className="btn-group">
                    <Link
                      href={`/b2b/addhotel`}
                      title="Edit Detail"
                      className="btn btn-primary mr-4"
                    >
                      Adicionar Quarto
                    </Link>
                  </div>
                  <span>
                    <Link href="/b2b">Dashboard</Link>
                  </span>
                  <span>
                    <i className="mdi mdi-chevron-right"></i>
                  </span>
                  hoteis
                </p>
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
                            className="table"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th>Ativado</th>
                                <th>Titulo</th>
                                <th>subtitulo</th>
                                <th>Imagem</th>
                                <th></th>
                              </tr>
                            </thead>

                            <tbody>

                              {hoteis?.map((item, index) => {
                                return (
                                  <tr key={index} className="align-middle">
                                    <td>{item.ativado === '1' ? 'Sim' : 'Não'}</td>
                                    <td>{item.titulo.slice(0, 10)}...</td>
                                    <td>{item.subtitulo}</td>
                                    <td  style={{width: '200px', height: '50px'}}><Image width={1000} height={1000} style={{objectFit: 'cover'}} src={item.imagem[0].url}/></td>
                                    <td className="text-right">
                                      <div className="btn-group">
                                        <Link
                                          href={{
                                            pathname: '/b2b/edithotel',
                                            query: { id: `${item?._id}` }
                                          }}
                                          title="Edit Detail"
                                          className="btn btn-primary"
                                        >
                                          Editar
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                )
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