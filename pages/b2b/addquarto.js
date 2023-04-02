import axios from "axios";
// import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";

import { toast } from "react-toastify";
import router from 'next/router';
import Link from "next/link";
import Image from "next/image";
import { FaEdit, FaCheck, FaTrash } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase';

import useSwr, { mutate } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

import Menu from "../../components/b2b_components/Menu";

export default function AddProduct() {
  const { data: hoteis } = useSwr(`/api/hoteis/getAllHotel`, fetcher);

  const [productName, setProductName] = useState("");

  const [hotel, setHotel] = useState("");
  const [genero, setGenero] = useState("");
  const [qtdcamas, setQtdcamas] = useState(0);
  const [arrqtdcamas, setQtdarrcamas] = useState([]);
  const [active, setActive] = useState(1);
  const onSubmit = async (e) => {
    const date = new Date();
    let arrayquartos = [];
    {[...Array(parseFloat(qtdcamas))]?.map((item, index) => {
      arrayquartos.push([{numeroCama: index + 1, limpeza: date, vago: false, hospede: '', entrada: '', saida: '', base: true, checkinID: ''}]);

      if(parseFloat(qtdcamas) === index + 1){
        dispararbanco(arrayquartos)
      }
    })}

   
  };

  const dispararbanco = async (arrayquartos) => {
    let data = await axios.post(`/api/quartos/insertQuarto`, {
      titulo: productName,
      camas: qtdcamas,
      arrCamas: arrayquartos,
      hotel: hotel,
      genero: genero,
      ativado: active,
    });
    router.push("/b2b/quartos");
  }

  return (
    <div style={{ backgroundColor: '#f3f3f3' }}>
      <div style={{ display: 'flex' }}>
        <Menu />
        <div className="ec-page-wrapper">
          <div className="ec-content-wrapper">
            <div className="content">
              <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
                <div>
                  <h1>Adicionar Quarto</h1>
                  <p className="breadcrumbs">
                    <span>
                      <Link href="/b2b">Dashboard</Link>
                    </span>
                    <span>
                      <i className="mdi mdi-chevron-right"></i>
                    </span>
                    Adicionar Quarto
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card card-default">
                    <div className="card-body">
                      <div className="row ec-vendor-uploads">
                        <div className="col-lg-12">
                          <div className="ec-vendor-upload-detail">
                            <form
                              onSubmit={onSubmit}
                              className="row g-3"
                              encType="multipart/form-data"
                            >

                              <div className="col-md-12">
                                <label htmlFor="inputEmail4" className="form-label">
                                  Título
                                </label>
                                <input
                                  type="text"
                                  className="form-control slug-title"
                                  id="inputEmail4"
                                  onChange={(e) => setProductName(e.target.value)}
                                />
                              </div>

                              <div className="col-md-4">
                                <label className="form-label">Hotel</label>
                                <select  onChange={(e) => setHotel(e.target.value)}>
                                  <option value={''} selected></option>
                                  {hoteis?.map((item, index) => {
                                    console.log(item)
                                    return (
                                      <option key={index} value={item._id}>
                                        {item.titulo}
                                      </option>
                                    )
                                  })}
                                </select>
                              </div>
                              <div className="col-md-4">
                                <label className="form-label">Genero</label>
                                <select  onChange={(e) => setGenero(e.target.value)}>
                                  <option value={''} selected></option>
                                  <option value={'masculino'} >Masculino</option>
                                  <option value={'feminino'}>Feminino</option>
                                  <option value={'unisex'}>Unisex</option>
                                </select>
                              </div>
                              <div className="col-md-4">
                                <label className="form-label">Quantidade de Camas</label>
                                <select  onChange={(e) => setQtdcamas(e.target.value)}>
                                  <option value={1} selected>1</option>
                                  <option value={2} >2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                                  <option value={6}>6</option>
                                  <option value={7}>7</option>
                                  <option value={8}>8</option>
                                  <option value={9}>9</option>
                                  <option value={10}>10</option>
                                </select>
                              </div>

                              <div className="d-flex mb-3">
                                <div className="row align-items-center">
                                  <label className="form-label">Ativado</label>
                                  <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                                      <input
                                        type="radio"
                                        name="active"
                                        value={1}
                                        style={{ width: '20px', margin: '0 15px 0 0' }}
                                        onChange={(e) => setActive(e.target.value)}
                                      />
                                    Sim
                                  </div>
                                  <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                                      <input
                                        type="radio"
                                        name="active"
                                        value={0}
                                        style={{ width: '20px', margin: '0 15px 0 0' }}
                                        onChange={(e) => setActive(e.target.value)}
                                      />
                                    Não
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div onClick={() => onSubmit()} className="btn btn-primary">
                                  Adicionar Produto
                                </div>
                              </div>
                            </form>
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
}