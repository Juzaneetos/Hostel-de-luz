import clientPromise from "../../../../util/mongo";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Hosteldeluz");
    const objectid = new ObjectId(req.query.id);

    db.collection("hospedes").updateOne({ _id: objectid }, {
      $set: {
        nome: req.body.nome,
        rg: req.body.rg,
        cpf: req.body.cpf,
        passaporte: req.body.passaporte,
        datanascimento: req.body.datanascimento,
        telefone: req.body.telefone,
        genero: req.body.genero,
        observacoes: req.body.observacoes
      }
    });

  } catch (e) {
    console.error(e);
  }
};
