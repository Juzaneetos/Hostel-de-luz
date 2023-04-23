import axios from "axios";
import Image from 'next/image';
import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../../components/b2b_components/Modal";
import Menu from "../../components/b2b_components/Menu";
import Footer from "../../components/b2b_components/Footer";
import useSwr, { mutate } from "swr";


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Trocadecama() {
  const [id_, setId] = useState(0);
  const [wpplink, setWpplink] = useState('');
  // const { data: checkin } = useSwr(`/api/checkin/getAllCheckin`, fetcher);
  const { data: quartos } = useSwr(`/api/quartos/getAllQuarto`, fetcher);
  var tamanho = quartos?.length || [];
  console.log(quartos)

  var estruturaWpp = `https://api.whatsapp.com/send?phone=5514996528505&text=Olá!%20%20%0a%0a${wpplink}`;
  let titulo_ = '';
  let camas = '';
  let arrCamas = [];
  let hotel_ = '';
  let genero_ = '';
  let ativado = '';

  const filtrolimpeza = () => {
    let wpptext = '';
    quartos?.map((item, index) => {
      item.arrCamas?.map((item2, index2) => {
        if (item2.length > 1) {
          item2.map((item3, index3) => {
            if (item3.base === false) {
              const dataAtual = new Date(); // Obtém a data atual
              const dataLimpeza = new Date(item3.limpeza); // Obtém a data de limpeza de item3
              const diff = Math.floor((dataAtual - dataLimpeza) / (1000 * 60 * 60 * 24)); // Calcula a diferença em dias

              if (diff >= 3) {
                console.log(`Já se passaram ${diff} dias desde a limpeza em ${item3.limpeza}.`);
                var produtosWpp = `${diff}%20dias%20desde%20a%20limpeza%20do%20%0aQuarto:%20${item.titulo}%20%0aCama:%20${item3.numeroCama}%20%0aHóspede:%20${item3.hospede}%20%0aÚltima%20limpeza%20em%20${item3.limpeza}.%20%20%0a%0a`;
                var soma = wpptext + produtosWpp;
                wpptext = soma;
                // Faça o que precisa ser feito caso já se tenham passado três dias
              } else {
                console.log(`Faltam ${3 - diff} dias para se passarem três dias desde a limpeza em ${item3.limpeza}.`);
                // Faça o que precisa ser feito caso ainda não se tenham passado três dias
              }
            }
          })
        }
      })
      if (quartos.length === index + 1) {
        setWpplink(wpptext)
      }
    })
  }
  const atualizarguias = () => {
    quartos?.map((item, index) => {
      item.arrCamas?.map((item2, index2) => {
        if (item2.length > 1) {
          item2.map((item3, index3) => {
            if (item3.base === false) {
              const dataAtual = new Date(); // Obtém a data atual
              const dataLimpeza = new Date(item3.limpeza); // Obtém a data de limpeza de item3
              const diff = Math.floor((dataAtual - dataLimpeza) / (1000 * 60 * 60 * 24)); // Calcula a diferença em dias

              if (diff >= 3) {
                console.log(`Já se passaram ${diff} dias desde a limpeza em ${item3.limpeza}.`);
                item3.limpeza = dataAtual.toISOString().slice(0, 10);

                titulo_ = item.titulo;
                camas = item.camas;
                arrCamas = item.arrCamas;
                hotel_ = item.hotel;
                genero_ = item.genero;
                ativado = item.ativado;
                disparaquartos(item._id)
                // Faça o que precisa ser feito caso já se tenham passado três dias
              } else {
                console.log(`Faltam ${3 - diff} dias para se passarem três dias desde a limpeza em ${item3.limpeza}.`);
                // Faça o que precisa ser feito caso ainda não se tenham passado três dias
              }
            }
          })
        }
      })
    })
  }

  const disparaquartos = async (idquarto) => {
    const response1 = await axios.put(`/api/quartos/updateQuarto?id=${idquarto}`, {
      titulo: titulo_,
      camas: camas,
      arrCamas: arrCamas,
      hotel: hotel_,
      genero: genero_,
      ativado: ativado,
    });
    mutate('/api/quartos/getAllQuarto')
  }

  return (
    <div style={{ backgroundColor: '#f3f3f3' }}>
      <div style={{ display: 'flex' }}>
        <Menu />
        <div className="ec-page-wrapper">
          <div className="ec-content-wrapper">
            <div className="content">
              <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
                <h1>Hospedes</h1>
                {wpplink !== '' ?
                  <a
                    className="btn btn-primary"
                    href={estruturaWpp} target='_blank'
                    rel="noreferrer"
                  >
                    Enviar Mensagem
                  </a>
                  :
                  <a
                    className="btn btn-primary"
                    onClick={filtrolimpeza}
                  >
                    Preparar Mensagem
                  </a>
                }
                <a
                  className="btn btn-primary"
                  onClick={atualizarguias}
                >
                  Atualizar Guias!
                </a>
                <p className="breadcrumbs">
                  <span>
                    <Link href="/b2b">Dashboard</Link>
                  </span>
                  <span>
                    <i className="mdi mdi-chevron-right"></i>
                  </span>
                  Hospedes
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
                                <th>Quarto</th>
                                <th>Cama</th>
                                <th>Hóspede</th>
                                <th>Entrada</th>
                                <th>Sáida</th>
                                <th>Limpeza</th>
                                <th></th>
                              </tr>
                            </thead>

                            <tbody>
                              {quartos?.map((item, index) => {
                                return(
                                  <>
                                  {item.arrCamas?.map((item2, index2) => {
                                  if (item2.length > 1) {
                                    return(
                                      <>
                                      {item2.map((item3, index3) => {
                                      if (item3.base === false) {
                                        const dataAtual = new Date(); // Obtém a data atual
                                        const dataLimpeza = new Date(item3.limpeza); // Obtém a data de limpeza de item3
                                        const diff = Math.floor((dataAtual - dataLimpeza) / (1000 * 60 * 60 * 24)); // Calcula a diferença em dias

                                        if (diff >= 3) {
                                          return (
                                            <tr key={item.id} className="align-middle">
                                              <td>{item.titulo}</td>
                                              <td>{item3.numeroCama}</td>
                                              <td>{item3.hospede}</td>
                                              <td>{item3.entrada}</td>
                                              <td>{item3.saida}</td>
                                              <td><div className={'styleinativo'}>{item3.limpeza}</div></td>
                                            </tr>
                                          );
                                          // Faça o que precisa ser feito caso já se tenham passado três dias
                                        } else {
                                          <></>
                                          // Faça o que precisa ser feito caso ainda não se tenham passado três dias
                                        }
                                      }
                                    })}
                                      </>
                                    )
                                    
                                  }
                                })}
                                  </>
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

      {/* <Modal customers={checkin} id_={id_} /> */}
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