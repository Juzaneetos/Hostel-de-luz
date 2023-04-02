import { useState, useEffect } from "react";
import useSwr, { mutate } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());
import Image from 'next/image'
export default function Modal({ customers, id_ }) {
  const { data: hoteis } = useSwr(`/api/hoteis/getAllHotel`, fetcher);
  const { data: quartos } = useSwr(`/api/quartos/getAllQuarto`, fetcher);
  const [Name, setName] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [passaporte, setPassaporte] = useState("");
  const [entrada, setEntrada] = useState("")
  const [saida, setSaida] = useState("")
  const [datanascimento, setDatanascimento] = useState("")
  const [telefone, setTelefone] = useState("")
  const [diaLimpeza, setDiaLimpeza] = useState("")
  const [formapagamento, setFormaPagamento] = useState("")
  const [observacoes, setObservações] = useState("")
  const [valorpago, setValorpago] = useState(0)
  const [valordiaria, setValordiaria] = useState(0)
  const [hotel, setHotel] = useState("");
  const [quarto, setQuarto] = useState([]);
  const [cama, setCama] = useState(0);
  const [nomequarto, setNomeQuarto] = useState('');
  const [genero, setGenero] = useState("");
  const [idquarto, setIdquarto] = useState("");
  const [objreserva, setObjreserva] = useState([]);
  const [active, setActive] = useState('1');
  const [pagamentoconcluido, setPagamentoConcluido] = useState('0');
console.log(customers)

  useEffect(() => {
    customers?.map((item, index) => {
      if (item._id === id_) {
        setPagamentoConcluido(item.pagamentoconcluido )
        setActive(item.ativado)
        setObjreserva(item.objreserva)
        setValordiaria(item.valordiaria)
        setValorpago(item.valorpago)
        setObservações(item.observacoes)
        setFormaPagamento(item.formapagamento)
        setTelefone(item.telefone)
        setDiaLimpeza(item.diaLimpeza)
        setDatanascimento(item.datanascimento)
        setSaida(item.saida)
        setEntrada(item.entrada)
        setPassaporte(item.passaporte)
        setCpf(item.cpf)
        setRg(item.rg)
        setName(item.nome)
        setGenero(item.genero)
        setHotel(item.objreserva.hotel)
        setIdquarto(item.objreserva.quarto)
        setCama(item.objreserva.cama)

        quartos?.map((item2, index) => {
          if(item.objreserva.quarto === item2._id){
              setQuarto(item2.arrCamas)
          } 
        })
      }
    })
  }, [id_])

  console.log(entrada) 
  const registrarQuarto = (numerocama) => {
    setObjreserva({
      hotel: hotel,
      quarto: idquarto,
      cama: numerocama,
    })
  }

  

  return (
    <div className="modal fade" id="edit_modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{ borderRadius: "6px" }}>
          <div className="modal-body">
            <div className="row">
              <div className="ec-vendor-block-img space-bottom-30">
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
                              <input type="text" value={telefone} className="form-control" id="email" />
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
                          <div className="col-md-6 space-t-15 mt-3">
                            <label className="form-label">Genero</label>
                            <select className="form-control" value={genero} onChange={(e) => setGenero(e.target.value)}>
                              <option value={''} selected></option>
                              <option value={'masculino'} selected>Masculino</option>
                              <option value={'feminino'}>Feminino</option>
                              <option value={'unisex'}>Unisex</option>

                            </select>
                          </div>
                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="phone-2" className="form-label">
                              Ultimo dia de limpeza
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              value={diaLimpeza}
                              id="phone-2"
                              onChange={(e) => setDiaLimpeza(e.target.value)}
                            />
                          </div>
                          <div className="col-md-12">
                            <label className="form-label">Observações</label>
                            <textarea
                              rows={5}
                              className="form-control slug-title"
                              id="inputEmail4"
                              value={observacoes}
                              onChange={(e) => setObservações(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="phone-2" className="form-label">
                              Valor da Diaria
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={valordiaria}
                              id="phone-2"
                              onChange={(e) => setValordiaria(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="phone-2" className="form-label">
                              Valor Pago
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={valorpago}
                              onChange={(e) => setValorpago(e.target.value)}
                              id="phone-2"
                            />
                          </div>
                          <div className="col-md-12">
                            <label className="form-label">Forma de Pagamento</label>
                            <select className="form-control" value={formapagamento} onChange={(e) => setFormaPagamento(e.target.value)}>
                              <option value={''} selected></option>
                              <option value={'dinheiro'} >Dinheiro</option>
                              <option value={'pix'} >Pix</option>
                              <option value={'debito'}>Débito</option>
                              <option value={'credito'}>Crédito</option>
                              <option value={'cheque'}>Cheque</option>
                            </select>
                          </div>
                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="phone-2" className="form-label">
                              Entrada
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              value={entrada}
                              id="phone-2"
                              onChange={(e) => setEntrada(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="phone-2" className="form-label">
                              Saída
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              value={saida}
                              id="phone-2"
                              onChange={(e) => setSaida(e.target.value)}
                            />
                          </div>


                          <h3 className="text-center"> Escolha o Hotel </h3>
                              <div className="col-md-12 d-flex">
                                {hoteis?.map((item, index) => {
                                  return (
                                    <div className={`col-md-6`} style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                                      <Image width={1000} height={1000} className='pl-3 pr-3' style={{ opacity: '0.5' }} src={item.imagem[0].url} />
                                      <div className={`circulohotel d-flex flex-column ${hotel === item._id ? 'backgroundactive' : ''}`} style={{ position: 'absolute', fontWeight: '700' }} onClick={() => setHotel(item._id)}>
                                        {item.titulo}

                                      </div>
                                    </div>
                                  )
                                })}
                              </div>

                              {hotel.length > 0 ?
                                <>
                                  <h3 className="text-center"> Escolha o Quarto </h3>
                                  <div className="col-md-12 d-flex justify-content-center">
                                    {quartos?.map((item, index) => {
                                      let contadordisponivel = 0;
                                      let contadorgeral = 0;
                                      const dataEntradaNovaReserva = new Date(entrada);
                                      const dataSaidaNovaReserva = new Date(saida);

                                      if (item.hotel === hotel) {
                                        return (
                                          <>
                                            <div className="col-md-3" style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                                              <Image width={1000} height={1000} className='pl-3 pr-3' style={{ opacity: '0.5' }} src={require('../../assets/img/luxo-classico-moderno-quarto-suite-em-hotel.jpg')} />
                                              <div className={`circuloquarto d-flex flex-column ${idquarto === item._id ? 'backgroundactive' : ''}`} style={{ position: 'absolute', fontWeight: '700' }} onClick={() => { setQuarto(item.arrCamas), setNomeQuarto(item.titulo), setIdquarto(item._id) }}>
                                                {item.titulo}
                                                <div>{item.genero} </div>
                                                {item.arrCamas?.map((item2, index) => (
                                                  <>
                                                    {item2?.map((item3) => {
                                                      const dataEntradaReserva = new Date(item3.entrada);
                                                      const dataSaidaReserva = new Date(item3.saida);
                                                      const quartoVago = !(dataEntradaNovaReserva < dataSaidaReserva && dataSaidaNovaReserva > dataEntradaReserva)
                                                      console.log(dataEntradaNovaReserva < dataSaidaReserva && dataSaidaNovaReserva > dataEntradaReserva)
                                                      if (item3.vago === false) {
                                                        contadordisponivel++;
                                                        contadorgeral++;

                                                      } else if (item3.vago === true && quartoVago) {
                                                        contadordisponivel++;
                                                        contadorgeral++;
                                                      } else {
                                                        contadorgeral++;
                                                      }
                                                      if (item.arrCamas.length === index + 1) {
                                                        return (
                                                          <div>Disponiveis: {contadordisponivel} </div>
                                                        )
                                                      }
                                                    })}
                                                  </>
                                                ))}
                                              </div>
                                            </div>

                                          </>
                                        )
                                      }
                                    })}
                                  </div>
                                </>
                                :
                                <></>
                              }


                              {quarto.length > 0 ? (
                                <>
                                  <h3 className="text-center">{nomequarto}</h3>
                                  <div className="col-12 d-flex justify-content-center mb-3">
                                    <div
                                      className="col-10 d-flex justify-content-center align-items-center"
                                      style={{ height: "200px", border: "3px solid black" }}
                                    >
                                      {quarto?.map((item2, index) => (
                                        <>
                                          {item2?.map((item3, index) => {
                                            let contadorcamas = 0;
                                            let contadorunico = 0;
                                            const dataEntradaNovaReserva = new Date(entrada);
                                            const dataSaidaNovaReserva = new Date(saida);
                                            const dataEntradaReserva = new Date(item3.entrada);
                                            const dataSaidaReserva = new Date(item3.saida);
                                            const quartoVago = (dataEntradaNovaReserva <= dataSaidaReserva && dataSaidaNovaReserva >= dataEntradaReserva);
                                            console.log(item2.length)
                                            if (item2.length > 1) {

                                              if (item3.base === true) {
                                                contadorcamas++;
                                              }
                                              if (!quartoVago) {
                                                contadorcamas++;
                                              }
                                            }
                                            if (item2.length > 1 && item3.base === true) {
                                              let verdadeiro = false;
                                              item2?.map((item5, index) => {
                                                const dataEntradaReservanew = new Date(item5.entrada);
                                                const dataSaidaReservannew = new Date(item5.saida);
                                                const quartoVagonew = (dataEntradaNovaReserva <= dataSaidaReservannew && dataSaidaNovaReserva >= dataEntradaReservanew);
                                                if(quartoVagonew) {
                                                  verdadeiro = true;
                                                }
                                                if(item2.length === index + 1 && verdadeiro === false){
                                                  contadorunico++;
                                                }
                                              })
                                            }
                                            if (contadorcamas === 0) {
                                              return (
                                                <>
                                                  {quartoVago ? (
                                                    <div
                                                      style={{ position: "relative" }}
                                                      key={`quarto-${item3.numeroCama}`}
                                                    >
                                                      <Image
                                                        width={70}
                                                        height={70}
                                                        className="pl-3 pr-3"
                                                        style={{ opacity: "0.5" }}
                                                        src={require("../../assets/img/cama-de-solteiro.png")}
                                                      />
                                                      <div
                                                        className="circulocama d-flex flex-column"
                                                        style={{
                                                          position: "absolute",
                                                          fontWeight: "700",
                                                          background: "rgb(200, 229, 255)",
                                                        }}
                                                        onClick={() => alert("Já reservado")}
                                                      >
                                                        {item3.numeroCama}
                                                        <p>{item3.vago ? item3.hospede : "Liberado"}</p>
                                                        <p>{item3.entrada}</p>
                                                        <p>{item3.saida}</p>
                                                      </div>
                                                    </div>
                                                  ) : (
                                                    <div
                                                      style={{ position: "relative" }}
                                                      key={`quarto-${item3.numeroCama}`}
                                                    >
                                                      <Image
                                                        width={70}
                                                        height={70}
                                                        className="pl-3 pr-3"
                                                        style={{ opacity: "0.5" }}
                                                        src={require("../../assets/img/cama-de-solteiro.png")}
                                                      />
                                                      <div
                                                        className={`${objreserva.cama === item3.numeroCama ? "bg-black" : ""
                                                          } circulocama d-flex flex-column`}
                                                        style={{ position: "absolute", fontWeight: "700" }}
                                                        onClick={() => { registrarQuarto(item3.numeroCama), setNumerocama(item3.numeroCama) }}
                                                      >
                                                        {item3.numeroCama}
                                                        <p>{"Liberado"}</p>
                                                      </div>
                                                    </div>
                                                  )}
                                                </>
                                              )
                                            } else if (contadorunico > 0) {
                                              return (
                                                <>
                                                  {quartoVago ? (
                                                    <div
                                                      style={{ position: "relative" }}
                                                      key={`quarto-${item3.numeroCama}`}
                                                    >
                                                      <Image
                                                        width={70}
                                                        height={70}
                                                        className="pl-3 pr-3"
                                                        style={{ opacity: "0.5" }}
                                                        src={require("../../assets/img/cama-de-solteiro.png")}
                                                      />
                                                      <div
                                                        className="circulocama d-flex flex-column"
                                                        style={{
                                                          position: "absolute",
                                                          fontWeight: "700",
                                                          background: "rgb(200, 229, 255)",
                                                        }}
                                                        onClick={() => alert("Já reservado")}
                                                      >
                                                        {item3.numeroCama}
                                                        <p>{item3.vago ? item3.hospede : "Liberado"}</p>
                                                        <p>{item3.entrada}</p>
                                                        <p>{item3.saida}</p>
                                                      </div>
                                                    </div>
                                                  ) : (
                                                    <div
                                                      style={{ position: "relative" }}
                                                      key={`quarto-${item3.numeroCama}`}
                                                    >
                                                      <Image
                                                        width={70}
                                                        height={70}
                                                        className="pl-3 pr-3"
                                                        style={{ opacity: "0.5" }}
                                                        src={require("../../assets/img/cama-de-solteiro.png")}
                                                      />
                                                      <div
                                                        className={`${objreserva.cama === item3.numeroCama ? "bg-black" : ""
                                                          } circulocama d-flex flex-column`}
                                                        style={{ position: "absolute", fontWeight: "700" }}
                                                        onClick={() => { registrarQuarto(item3.numeroCama), setNumerocama(item3.numeroCama) }}
                                                      >
                                                        {item3.numeroCama}
                                                        <p>{"Liberado"}</p>
                                                      </div>
                                                    </div>
                                                  )}
                                                </>
                                              )
                                            }
                                          })}


                                        </>
                                      )
                                      )}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}



                          <div className="col-md-12 space-t-15 mt-4 d-flex justify-content-center text-center">
                            <button
                              onClick={(e) => e.preventDefault()}
                              className="btn btn-sm btn-primary qty_close"
                              style={{ width: '250px' }}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              Fechar
                            </button>
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
