import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = 3000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello, World!");
});

app.listen(port, () => {
  console.log(`Srvidor rodando em http://localhost:${port}`);
});

interface Lingerie {
  id: string;
  marca: string;
  modelo: string;
  tamanho: string;
  cor: string;
}

let lingeries: Lingerie[] = [];

app.get("/lingeries", (req: Request, res: Response) => {
  res.json(lingeries);
});

app.post("/lingeries", (req: Request, res: Response) => {
  const novaLingerie: Lingerie = req.body;
  lingeries.push(novaLingerie);
  res.json(novaLingerie);
});

app.get("/lingeries/:id", (req: Request, res: Response) => {
  const id: string = req.params.id;
  const lingerie: Lingerie | undefined = lingeries.find((l) => l.id === id);
  if (!lingerie) {
    res.status(404).json({ error: "Lingerie não encontrada " });
  } else {
    res.json(lingerie);
  }
});

app.put("/lingeries/:id", (req: Request, res: Response) => {
  const id: string = req.params.id;
  const lingerieIndex: number = lingeries.findIndex((l) => l.id === id);
  if (lingerieIndex === -1) {
    res.status(404).json({ error: "Lingerie não encontrada." });
  } else {
    lingeries[lingerieIndex] = req.body;
    res.json(lingeries[lingerieIndex]);
  }
});

app.delete("/lingeries/:id", (req: Request, res: Response) => {
  const id: string = req.params.id;
  const lingerieIndex: number = lingeries.findIndex((l) => l.id === id);
  if (lingerieIndex === -1) {
    res.status(404).json({ error: "Lingerie não encontrada" });
  } else {
    const deletedLingerie = lingeries.splice(lingerieIndex, 1);
    res.json(deletedLingerie[0]);
  }
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
