import { useState, useEffect } from "react";
import useSwr, { mutate } from "swr";
import router from 'next/router';
const fetcher = (url) => fetch(url).then((res) => res.json());
import Image from 'next/image'
import Link from 'next/link'
import Calendario from '../../components/b2b_components/Calendario'
import axios from "axios";
export default function Modal({ customers, id_ }) {
  const [Name, setName] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [passaporte, setPassaporte] = useState("");
  const [datanascimento, setDatanascimento] = useState("")
  const [telefone, setTelefone] = useState("")
  const [observacoes, setObservações] = useState("")
  const [genero, setGenero] = useState("");

  useEffect(() => {
    customers?.map((item, index) => {
      if (item._id === id_) {
        setObservações(item.observacoes)
        setTelefone(item.telefone)
        setDatanascimento(item.datanascimento)
        setPassaporte(item.passaporte)
        setCpf(item.cpf)
        setRg(item.rg)
        setName(item.nome)
        setGenero(item.genero)
      }
    })
  }, [id_])

  const atthospoede = async () => {
    router.reload();
   await axios.put(`/api/hospedes/updateHospedes?id=${id_}`, {
      nome: Name,
      rg: rg,
      cpf: cpf,
      passaporte: passaporte,
      datanascimento: datanascimento,
      telefone: telefone,
      genero: genero,
      observacoes: observacoes
    });
    mutate(`/api/hospedes/getAllHospedes`);
  }
  return (
    <div className="modal fade" id="edit_modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{ borderRadius: "6px" }}>
          <div className="modal-body">
            <div className="row">
              <div className="ec-vendor-block-img space-bottom-30">
              <div className="d-flex justify-content-between">
                  <div>
                    <h5>Iniciar Check-in</h5>
                  </div>
                  <div>
                      <div
                        className="btn btn-sm btn-primary qty_close"
                        style={{ width: '80px', background: 'red' }}
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Fechar
                      </div>
                  </div>
                </div>
                <div className="ec-vendor-upload-detail">
                  {customers?.map((item, index) => {
                    if (item._id === id_) {
                      return (
                        <form className="row g-3" key={item.id}>
                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="first-name" className="form-label">
                              Nome
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={Name}
                              onChange={(e) => setName(e.target.value)}
                              id="first-name"
                            />
                          </div>


                          <div className="col-md-6 space-t-15 d-flex justify-content-between mt-3">
                            <div className="col-md-12">
                              <label htmlFor="email" className="form-label">
                                Telefone
                              </label>
                              <input type="text" defaultValue={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                className="form-control" id="email" />
                            </div>
                          </div>

                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="phone-1" className="form-label">
                              RG
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={rg}
                              onChange={(e) => setRg(e.target.value)}
                              id="phone-1"
                            />
                          </div>

                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="phone-1" className="form-label">
                              CPF
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={cpf}
                              id="phone-1"
                              onChange={(e) => setCpf(e.target.value)}
                            />
                          </div>

                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="phone-1" className="form-label">
                              Passaporte
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={passaporte}
                              id="phone-1"
                              onChange={(e) => setPassaporte(e.target.value)}
                            />
                          </div>

                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="phone-2" className="form-label">
                              Nascimento
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              value={datanascimento}
                              id="phone-2"
                              onChange={(e) => setDatanascimento(e.target.value)}
                            />
                          </div>
                          <div className="col-md-12 space-t-15 mt-3">
                            <label className="form-label">Genero</label>
                            <select className="form-control" value={genero} onChange={(e) => setGenero(e.target.value)}>
                              <option value={''} selected></option>
                              <option value={'masculino'} selected>Masculino</option>
                              <option value={'feminino'}>Feminino</option>
                              <option value={'outros'}>Outros</option>

                            </select>
                          </div>

                          <div className="col-md-12">
                            <label className="form-label">Observações</label>
                            <textarea
                              rows={5}
                              className="slug-title"
                              id="inputEmail4"
                              value={observacoes}
                              onChange={(e) => setObservações(e.target.value)}
                            />
                          </div>

                          <div className="col-md-6 space-t-15 mt-4 d-flex justify-content-center text-center">
                            <div
                              onClick={(e) => atthospoede()}
                              className="btn btn-sm btn-primary"
                              style={{ width: '250px' }}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              Atualizar Hospede
                            </div>
                          </div>
                          <div className="col-md-6 space-t-15 mt-4 d-flex justify-content-center text-center">
                            <div
                              className="btn btn-sm btn-primary"
                              style={{ width: '250px' }}

                            >
                              <div data-bs-dismiss="modal"
                                aria-label="Close">
                              <Link
                                href={`/b2b/checkInhospede?id=${id_}`}
                                style={{ width: '250px', background: 'limegreen' }}
                                className="btn btn-sm btn-primary"
                              > Iniciar Check-in</Link>
                              </div>

                            </div>
                          </div>

                        </form>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
