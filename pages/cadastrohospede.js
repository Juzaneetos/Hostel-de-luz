import axios from "axios";
import Image from 'next/image';
import { useEffect, useState } from "react";
import Link from "next/link";
import useSwr, { mutate } from "swr";
import router from 'next/router'
import { toast } from "react-toastify";
const fetcher = (url) => fetch(url).then((res) => res.json());
import bg2 from '../assets/img/previa.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Home() {
  const { data: hospedes } = useSwr(`/api/hospedes/getAllHospedes`, fetcher);
  const [Name, setName] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [passaporte, setPassaporte] = useState("vazio");
  const [datanascimento, setDatanascimento] = useState("")
  const [telefone, setTelefone] = useState("")
  const [observacoes, setObservações] = useState("")
  const [genero, setGenero] = useState("");

  const atthospoede = () => {
    let contador = 0;
    let errorOccurred = false;
    console.log(hospedes.length)
    if (hospedes.length === 0) {
      if (!errorOccurred) {
        errorOccurred = true;
        toast.success('Úsuario cadastrado!')
        router.push("/b2b/hospedesall");
        dispararbanco()
      }
    } else {
      hospedes?.map((item, index) => {
        if (Name === '' || cpf === '' || telefone === '') {
          contador = contador + 1
          if (!errorOccurred) {
            errorOccurred = true;
            toast.error('gentileza preencha os campos!')
          }
        } else if (item.nome === Name || item.rg === rg || item.cpf === cpf || item.passaporte === passaporte) {
          contador = contador + 1
          if (!errorOccurred) {
            errorOccurred = true;
            toast.error('Úsuario ja cadastrado')
          }
        } else if (contador === 0 && errorOccurred === false) {
          if (!errorOccurred) {
            errorOccurred = true;
            toast.success('Úsuario cadastrado!')
            dispararbanco()
          }
        }
      })
    }
  };


  const dispararbanco = async () => {
    console.log('Requisição concluída com sucesso!');
    await axios.put(`/api/hospedes/insertHospedes`, {
      nome: Name,
      rg: rg,
      cpf: cpf,
      passaporte: passaporte,
      datanascimento: datanascimento,
      telefone: telefone,
      genero: genero,
      observacoes: observacoes
    });
    router.push("/b2b/hospedesall");
    mutate('/api/hospedes/getAllHospedes');
  }

  return (
    <>
      {/* <!-- ec Banner Slider --> */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        centeredSlides={true}
        className="owl-carousel">
        <SwiperSlide >
          <div className="video-container" style={{ backgroundImage: `url('${bg2.src}')`, backgroundSize: 'cover' }}>
            <div className='backgroundprovisorio d-flex flex-column justify-content-center align-items-center p-5' style={{ width: '100vw', height: '100%' }}>
              <div className="row">

                <div className="col-12">

                  <div className="card card-default">

                    <div className="card-body container">
                      <div className="d-flex flex-column" style={{width: '250px', margin: '0 auto'}}>
                        <Image
                          src={require('../assets/img/hostellogo.png')}
                          width={350} heigth={'auto'}
                          priority
                          alt=""
                          style={{ objectFit: 'cover' }}
                          className='rounded'
                        />
                      </div>
                        <h1 className="text-center mt-3">Seja Bem vindo!</h1>
                        <h3 className="text-center mb-3">Preencha o formulario abaixo para se cadastrar!</h3>
                      <div>
                        <form className="row">
                          <div className="col-md-12 mt-3">
                            <label htmlFor="first-name" className="form-label">
                              Nome
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => setName(e.target.value)}
                              id="first-name"
                            />
                          </div>


                          <div className="col-md-12 mt-3">
                            <div className="col-md-12">
                              <label htmlFor="email" className="form-label">
                                Telefone
                              </label>
                              <input type="text"
                                onChange={(e) => setTelefone(e.target.value)}
                                className="form-control" id="email" />
                            </div>
                          </div>

                          <div className="col-md-12 mt-3">
                            <label htmlFor="phone-1" className="form-label">
                              RG
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => setRg(e.target.value)}
                              id="phone-1"
                            />
                          </div>

                          <div className="col-md-12 mt-3">
                            <label htmlFor="phone-1" className="form-label">
                              CPF
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone-1"
                              onChange={(e) => setCpf(e.target.value)}
                            />
                          </div>

                          <div className="col-md-12 mt-3">
                            <label htmlFor="phone-1" className="form-label">
                              Passaporte
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone-1"
                              onChange={(e) => setPassaporte(e.target.value)}
                            />
                          </div>

                          <div className="col-md-12 mt-3">
                            <label htmlFor="phone-2" className="form-label">
                              Nascimento
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="phone-2"
                              onChange={(e) => setDatanascimento(e.target.value)}
                            />
                          </div>
                          <div className="col-md-12 mt-3">
                            <label className="form-label">Genero</label>
                            <select className="form-control" onChange={(e) => setGenero(e.target.value)}>
                              <option value={''} selected></option>
                              <option value={'masculino'} >Masculino</option>
                              <option value={'feminino'}>Feminino</option>
                              <option value={'outros'}>Outros</option>

                            </select>
                          </div>

                          <div className="col-md-12 mt-3">
                            <label className="form-label">Observações</label>
                            <textarea
                              rows={5}
                              className="slug-title"
                              id="inputEmail4"
                              onChange={(e) => setObservações(e.target.value)}
                            />
                          </div>

                          <div className="col-md-12 mt-4 d-flex justify-content-center text-center">
                            <div
                              onClick={(e) => atthospoede(e)}
                              className="btn btn-sm btn-primary qty_close"
                              style={{ width: '250px' }}
                            >
                              Enviar Cadastro!
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
        </SwiperSlide>
      </Swiper>


    </>
  );
}
