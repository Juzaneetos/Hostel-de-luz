import clientPromise from "../../../../util/mongo";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Hosteldeluz");

    db.collection("pedidos").insertOne({
      data_pedido: req.body.data_pedido,
      comandas: req.body.comandas,
      cpf: req.body.cpf,
      hostel: req.body.hostel,
      ativo: req.body.ativo,
      produtos: req.body.produtos,
      desconto: req.body.desconto,
      valor_total: req.body.valor_total,
      metodo_pagamento: req.body.metodo_pagamento
    }).then((data) => {
      console.log(data)
    }).catch((err) => console.log(err));
  } catch (e) {
    console.error(e);
  }
};
