import axios from "axios";
import router from 'next/router'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BsPencilFill } from "react-icons/bs";
import useSwr, { mutate } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

function EditCategory({ despesasId, despesas, setShowEditCategoryComponent }) {
 
  const [id_, setId_] = useState(0);
  const [titulo, setDespesasName] = useState("");
  const [descricao, setDescricao] = useState("");
  const [entrada, setEntrada] = useState("");
  const [valor, setValor] = useState("");
  useEffect(() => {
    despesas?.map(item => {
      if (item._id === despesasId) {
        setDespesasName(item.titulo);
        setDescricao(item.descricao);
        setEntrada(item.entrada)
        setId_(item._id)
        setValor(item.valor)

      }
    })
  }, [despesasId]);


  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.put(`/api/despesas/updateDespesas?id=${id_}`, {
      titulo: titulo,
      descricao: descricao,
      entrada: entrada,
      valor: valor,
    });
    toast('Despesa sendo editada!', {
      position: "top-right",
      });
    mutate(`/api/despesas/getAllDespesas`);
    router.push("/b2b/despesas");
  };

  return (
    <div className="card-body">
      <div className="ec-cat-form">
        <div className="d-flex justify-content-between">
          <h4>Editar</h4>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              setShowEditCategoryComponent(false);
            }}
          > Nova </button>
        </div>
        <form onSubmit={onSubmit}>
          
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Nome
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                className="form-control here slug-title"
                type="text"
                value={titulo}
                onChange={(e) => setDespesasName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Descrição
            </label>
            <div className="col-12">
              <textarea
              rows={6}
                id="text"
                name="text"
                className=" here slug-title"
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Valor
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                className="form-control here slug-title"
                type="text"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <button name="submit" type="submit" className="btn btn-primary">
              Editar Despesa
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditCategory;