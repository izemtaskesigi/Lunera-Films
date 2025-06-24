import Card from "./Card.tsx";
import "./Section.css";
function Section() {
  return (
    <>
      <section className="examples">
        <h2>🎓 Neler Yapabiliyoruz?</h2>
        <div className="cards">
          <Card
            header="📄 PDF'den Özet"
            paragraph="Yüklediğin PDF’ten sınava uygun, kısa ve etkili özet çıkartılır.."
          />

          <Card
            header="❓ Otomatik Quiz"
            paragraph="Özetten yola çıkarak çoktan seçmeli veya klasik sınav soruları hazırlanır."
          />
          <Card
            header="🧠 Kişiselleştirme"
            paragraph="Zorluk seviyesi, konu seçimi gibi filtrelerle özelleştirme imkanı.."
          />
        </div>
      </section>
    </>
  );
}

export default Section;
