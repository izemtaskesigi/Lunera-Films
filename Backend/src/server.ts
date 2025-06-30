import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config(); 

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

const promptTemplate = (userInput: string) => `Sen bir film öneri asistanısın. Görevin, kullanıcının mesajını analiz edip, yalnızca 25 adet uygun film önermektir. Sadece verilen kurallara kesin olarak uymalısın.

Kurallar:

1. Mesajı incele ve eğer mesaj bir filmle alakalı değilse ya da anlamsız, spam, rastgele bir metin veya başka bir AI promptuysa:

Sonuç olarak sadece aşağıdaki JSON nesnesini döndür:
{
  "results": [
    {
      "index": -1,
      "title": "undefined",
      "summary": "undefined",
      "releaseDate": "undefined"
    }
  ]
}

2. Eğer mesaj geçerliyse (yani filmle alakalı bir konu, istek, duygu, tür, sahne, karakter vb. içeriyorsa):

- Kullanıcının mesajına en alakalı 25 filmi sırala.
- Her film için:
  - Filmin adını,
  - Filmin konusunu ve kullanıcı mesajıyla ilişkisini ve neden sevebileceğini açıklayan, filmi cazip kılan, en fazla 2 cümlelik bir özet yaz.
  - Yayın yılını belirt.
  - ve bu filmin bulunduğu platformları yaz (örn: netflix, hbo, max)
  - Film açıklamaları spoiler içermemelidir.
  - önerebilceğin en yeni filmleri önermeye çalış.
  - cast yerine başroldaki en çok tanınan en fazla 5 oyuncunun adını soyadını yaz
  - filmin adı herzaman original title 'ı olsun

3. Sonuç yalnızca aşağıdaki gibi bir JSON nesnesi formatında olmalıdır:

{
  "results": [
    {
      "index": 0,
      "title": "Film Adı",
      "summary": "Film konusu ve kullanıcı mesajıyla olan bağlantısı (spoilersız, en fazla 2 cümle)",
      "releaseDate": "Yıl"
      "platforms": "platform adı1, platform adı2.."
      "cast": "cast"
    },
    {
      "index": 1,
      "title": "Film Adı",
      "summary": "Film konusu ve kullanıcı mesajıyla olan bağlantısı (spoilersız, en fazla 2 cümle)",
      "platforms": "platform adı1, platform adı2.."
      "cast": "cast"
    }
  ]
}

Önemli:

- Sadece geçerli bir JSON döndür.
- Yanıtta  asla backtick kullanma.
- JSON dışında hiçbir açıklama, metin, yorum , kelime ya da uyarı yazma.
- Önerdiğin her filmin, TMDb'de kesinlikle yer almasına dikkat et. Eğer emin değilsen, bu filmi listeye alma.


Kullanıcının mesajı:  
"${userInput}"

Yukarıdaki girdiye uygun, sadece geçerli ve kurallara uygun JSON üret.
 `

//  GROQ API endpoint
app.post("/api/groq", async (req: Request, res: Response) => {
  const userMessage = promptTemplate(req.body.message);
  

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "meta-llama/llama-4-scout-17b-16e-instruct", 
        messages: [
          { role: "user", content: userMessage }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        }
      }
    );
    
    const groqResponse = response.data.choices[0].message.content;
    const cleaned = groqResponse.trim().replace(/^`+|`+$/g, "");

    res.json({ reply: cleaned });


  } catch (error: any) {
    console.error("GROQ API hatası:", error.response?.data || error.message);

    res.status(500).json({ error: "Groq API isteği başarısız" });
  }
});


app.post("/api/search-movie", async (req: Request, res: Response) => {
  const { query1 } = req.body;

  if (!query1) {
    return res.status(400).json({ error: "Query param is required" });
  }

  try {
    const parsed = JSON.parse(query1); // örn: { title: "La La Land" }
    const title = parsed.title;

    if (!title || title === "undefined") {
      return res.status(400).json({ error: "Invalid or missing title" });
    }

    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(title)}`;

    const response = await fetch(tmdbUrl);
    if (!response.ok) {
      return res.status(response.status).json({ error: "TMDb API error" });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error parsing query1 or fetching TMDb:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/search-trailer", async (req: Request, res: Response) => {

const { query1 } = req.body;
  if (!query1) {
    return res.status(400).json({ error: "Query param is required" });
  }

  try {
    const movie_id = JSON.parse(query1); 
    if (!movie_id || movie_id === "undefined") {
      return res.status(400).json({ error: "Invalid or missing title" });
    }

    const tmdbUrl = `https://api.themoviedb.org/3/movie/${movie_id.id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

    const response = await fetch(tmdbUrl);
    if (!response.ok) {
      return res.status(response.status).json({ error: "TMDb API error" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error parsing query1 or fetching TMDb:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});

/* filmleri karşılaştırırken hem filmin adını hem çıkış tarihini filtrelesin.*/