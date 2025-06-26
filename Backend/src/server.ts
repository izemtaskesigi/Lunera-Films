import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/rickandmorty/character/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!response.ok) return res.status(response.status).send("API hatası");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send("Sunucu hatası");
  }
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});

function log (message?:string){
  if(message){
    console.log(message);
  }
  else
  console.log("message");
}