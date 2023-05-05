import axios from "axios";
import { Link } from "next/link";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { BsPencilFill } from "react-icons/bs";
import router from 'next/router'
import AddCategory from "../../components/b2b_components/despesas/AddCategory";
import EditCategory from "../../components/b2b_components/despesas/EditCategory";

import Header from "../../components/b2b_components/Header";
import Menu from "../../components/b2b_components/Menu";
import Footer from "../../components/b2b_components/Footer";
import useSwr, { mutate } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Despesas({ }) {
  const [despesasEditId, setCategoryEditId] = useState("");
  const [despesasInfo, setCategoryInfo] = useState([]);
  const [showEditCategoryComponent, setShowEditCategoryComponent] = useState(false);

  const { data: despesas } = useSwr(`/api/despesas/getAllDespesas`, fetcher);
  console.log(despesas)
  var tamanho = despesas?.length || [];

  const deleteDespesas = async (id) => {
    let data = await axios.delete(`/api/despesas/deleteDespesas?id=${id}`);
    mutate(`/api/despesas/getAllDespesas`);
    router.push("/b2b/despesas");
  };

  return (
    <>
      <div style={{ backgroundColor: '#f3f3f3' }}>
        <div style={{ display: 'flex' }}>
          <Menu  parametro={'8'}/>
          <div className="ec-page-wrapper">
            <div className="ec-content-wrapper">
              <div className="content">
                <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
                  <h1>Despesas</h1>
                  <p className="breadcrumbs">
                    <span>
                      <a href="#">Dashboard</a>
                    </span>
                    <span>
                      <i className="mdi mdi-chevron-right"></i>
                    </span>
                    Despesas
                  </p>
                </div>
                <div className="row">
                <div className=" col-lg-12">
                    <div className="ec-cat-list card card-default mb-24px">
                      <div className="card-body">
                        {showEditCategoryComponent !== true ? (
                          <AddCategory />
                        ) : (
                          <EditCategory despesasId={despesasEditId} despesas={despesas} setShowEditCategoryComponent={setShowEditCategoryComponent}/>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" col-lg-12">
                    <div className="ec-cat-list card card-default">
                      <div className="card-body">
                        <div className="table-responsive">
                          {tamanho === 0 && (
                            <div className="text-center">
                              Não possui nenhuma despesa cadastrada
                            </div>
                          )}

                          {tamanho !== 0 && (
                            <table id="responsive-data-table" className="table table-striped">
                              <thead>
                                <tr>
                                  <th>Nome</th>
                                  <th>Valor</th>
                                  <th>Descrição</th>
                                  <th></th>
                                </tr>
                              </thead>

                              <tbody>
                                {despesas?.map((item) => {
                                  return (
                                    <tr key={item._id} className="align-middle">
                                      <td>{item.titulo}</td>
                                      <td>{item.entrada}</td>
                                      <td>{item.descricao.slice(0, 20)}...</td>
                                      <td>
                                        R$ {item.valor}
                                      </td>
                                      <td className="text-right">
                                        <div className="btn-group">
                                          <button
                                            type="value"
                                            className="btn btn-primary"
                                            onClick={(e) => {
                                              setCategoryEditId(item._id);
                                              setShowEditCategoryComponent(true);
                                            }}
                                          >
                                            <BsPencilFill />
                                          </button>
                                          <button
                                            className="btn btn-outline-primary delete-btn"
                                            onClick={() => deleteDespesas(item._id)}
                                          >
                                            <FaTrash color="#d93b3b" />
                                          </button>
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
       
      </div>
    </>
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