import { useState } from "react";
import { motion } from "framer-motion";
import heroImage from "./assets/hero-minecraft.png";
import logoEsperanca from "./assets/logoeditoraesperanca.png";
import logoGc from "./assets/logogc.png";
import "./App.css";

const constructionImageModules = import.meta.glob("./assets/{cp,cap}*-*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function getConstructionImages(chapterNumber: number) {
  const imagePattern = new RegExp(`(?:cp|cap)0?${chapterNumber}-(\\d+)\\.webp$`);

  return Object.entries(constructionImageModules)
    .map(([path, src]) => {
      const match = path.match(imagePattern);

      return match ? { src, order: Number(match[1]) } : null;
    })
    .filter((image): image is { src: string; order: number } => Boolean(image))
    .sort((a, b) => a.order - b.order)
    .map((image) => image.src);
}

type Chapter = {
  number: number;
  title: string;
  description: string;
  bookPage: string;
  activity: string;
  theme: string;
  principle: string;
  verse: string;
  videoId: string;
};

const chapters: Chapter[] = [
  {
    number: 1,
    title: "Cidade da Destruição",
    description:
      "Cristão vive carregando um grande fardo e descobre que precisa fugir da destruição.",
    bookPage: "Página 12",
    activity:
      "Cristão vive na Cidade da Destruição e descobre, por meio da leitura de um livro (a Bíblia), que sua cidade será julgada. Sentindo o peso de seu pecado representado por um grande fardo nas costas, ele busca ajuda para escapar da condenação. Enquanto sua família e vizinhos tentam convencê-lo a permanecer, Cristão decide seguir o conselho do Evangelista e partir em direção à Cidade Celestial.",
    theme: "Convencimento do pecado e chamado para a salvação.",
    principle:
      "Converse com seu filho sobre como o pecado é um fardo pesado, mas Cristo chama os cansados para encontrarem descanso nele.",
    verse: "Mateus 11:28",
    videoId: "x1dzSkSX294",
  },
  {
    number: 2,
    title: "Pântano do Desânimo",
    description:
      "Cristão afunda no pântano enquanto aprende como o desânimo pode prender quem está começando a jornada.",
    bookPage: "Página 26",
    activity:
      "Logo após iniciar sua jornada, Cristão cai em um pântano junto com Flexível. O local simboliza as dúvidas, medos e angústias que surgem quando uma pessoa começa a buscar a Deus. Flexível desiste da caminhada, mas Cristão recebe ajuda para sair e continua sua jornada.",
    theme: "As dificuldades iniciais da caminhada cristã.",
    principle:
      "Mostre que o desânimo pode nos fazer afundar, mas Deus sustenta seus filhos e os ajuda a continuar.",
    verse: "Salmo 40:2",
    videoId: "eWO_gPnFcbY",
  },
  {
    number: 3,
    title: "Monte da Moralidade",
    description:
      "Cristão tenta aliviar seu fardo por um caminho aparentemente bom, mas descobre que moralidade sem Cristo não salva.",
    bookPage: "Página 39",
    activity:
      "O Sr. Sábio Segundo o Mundo tenta convencer Cristão a abandonar o caminho indicado pelo Evangelista e procurar salvação por meio das boas obras e da moralidade. Cristão quase se desvia, mas percebe seu erro e retorna ao caminho correto.",
    theme: "A salvação não vem pelas obras, mas pela graça de Deus.",
    principle:
      "Converse sobre a diferença entre tentar ser aceito por boas obras e confiar na graça de Cristo.",
    verse: "Efésios 2:8-9",
    videoId: "sWs9xlo2syM",
  },
  {
    number: 4,
    title: "Porta Estreita",
    description:
      "Cristão chega à Porta Estreita e aprende que o caminho verdadeiro começa pela entrada indicada por Deus.",
    bookPage: "Página 58",
    activity:
      "Cristão chega à Porta Estreita e é recebido por Boa Vontade. Ele aprende que entrou oficialmente no caminho da vida e recebe orientações para prosseguir rumo à Cidade Celestial.",
    theme: "A entrada no caminho da salvação.",
    principle:
      "Ensine que Jesus é o caminho de entrada para a salvação e que devemos responder ao seu chamado.",
    verse: "Mateus 7:13-14",
    videoId: "qs5JLCb7z4Q",
  },
  {
    number: 5,
    title: "Casa do Intérprete",
    description:
      "Cristão visita a Casa do Intérprete e recebe lições visuais que o ajudam a entender melhor a vida cristã.",
    bookPage: "Página 70",
    activity:
      "Na Casa do Intérprete, Cristão recebe várias lições por meio de quadros, cenas e ilustrações. Cada uma delas ensina verdades sobre o coração humano, a graça de Deus, a perseverança e a luta espiritual.",
    theme: "Aprendendo as verdades da vida cristã.",
    principle:
      "Fale sobre como Deus nos ensina por sua Palavra e nos dá sabedoria para entender o caminho.",
    verse: "Tiago 1:5",
    videoId: "RhZocTMSAeE",
  },
  {
    number: 6,
    title: "Lugar da Libertação",
    description:
      "Cristão chega ao lugar onde seu fardo cai, apontando para o perdão e a libertação encontrados em Cristo.",
    bookPage: "Página 95",
    activity:
      "Cristão chega à cruz. Ao contemplá-la, seu fardo se desprende e desaparece para sempre. Ele recebe vestes novas e a certeza de que seus pecados foram perdoados.",
    theme: "A justificação pela fé em Cristo.",
    principle:
      "Converse sobre o perdão dos pecados e a alegria de ser liberto por Jesus.",
    verse: "João 8:36",
    videoId: "bz0v8L9FEnU",
  },
  {
    number: 7,
    title: "Palácio Belo",
    description:
      "Cristão encontra descanso, comunhão e preparo para continuar sua jornada com coragem.",
    bookPage: "Página 104",
    activity:
      "Cristão é acolhido por irmãos da fé no Palácio Belo. Ali recebe alimento espiritual, descanso, encorajamento e armadura para enfrentar as batalhas futuras.",
    theme: "A importância da comunhão e do fortalecimento espiritual.",
    principle:
      "Mostre a importância da comunhão, do cuidado espiritual e da preparação para perseverar.",
    verse: "Hebreus 10:24-25",
    videoId: "rnHR7huBO0w",
  },
  {
    number: 8,
    title: "Vale da Humilhação",
    description:
      "Cristão desce ao vale e enfrenta perigo, aprendendo humildade e dependência de Deus.",
    bookPage: "Página 140",
    activity:
      "Cristão atravessa um vale difícil e enfrenta Apoliom, um poderoso inimigo que tenta fazê-lo desistir. Após uma intensa batalha espiritual, Cristão vence usando a espada da Palavra de Deus.",
    theme: "A luta contra Satanás e a perseverança na fé.",
    principle:
      "Ensine que a humildade nos lembra que precisamos da força de Deus em todas as batalhas.",
    verse: "Tiago 4:10",
    videoId: "bg5iqDbHBSk",
  },
  {
    number: 9,
    title: "Cidade da Vaidade",
    description:
      "Cristão passa por uma cidade cheia de distrações e tentações que procuram desviar seu coração.",
    bookPage: "Página 160",
    activity:
      "Cristão e Fiel chegam à Cidade da Vaidade, onde tudo gira em torno do orgulho, riqueza e prazeres deste mundo. Por permanecerem fiéis a Cristo, enfrentam perseguição. Fiel é martirizado, mas recebe sua recompensa celestial.",
    theme: "Fidelidade a Cristo em meio à perseguição.",
    principle:
      "Converse sobre amar mais a Deus do que as coisas passageiras que o mundo oferece.",
    verse: "1 João 2:15",
    videoId: "D6qe4PTn8TU",
  },
  {
    number: 10,
    title: "Castelo da Dúvida",
    description:
      "Cristão passa por sofrimento e prisão no Castelo da Dúvida, até lembrar da esperança que abre portas.",
    bookPage: "Página 225",
    activity:
      "Cristão e Esperançoso saem do caminho correto e são capturados pelo Gigante Desespero. Presos no Castelo da Dúvida, quase perdem toda esperança, até que Cristão lembra da chave Promessa, que abre todas as portas da prisão.",
    theme: "As promessas de Deus vencem o desespero e a dúvida.",
    principle:
      "Mostre que dúvidas e medo podem aprisionar, mas as promessas de Deus fortalecem a fé.",
    verse: "Romanos 15:13",
    videoId: "WcE9LjoebnA",
  },
  {
    number: 11,
    title: "Montanhas Deliciosas",
    description:
      "Cristão chega a um lugar alto de descanso e orientação, onde consegue ver melhor o caminho adiante.",
    bookPage: "Página 248",
    activity:
      "Os peregrinos chegam às Montanhas Deliciosas, onde recebem descanso, ensino e orientação de pastores sábios. Também observam exemplos das consequências da desobediência e aprendem sobre os perigos da jornada.",
    theme: "Crescimento espiritual e orientação pastoral.",
    principle:
      "Fale sobre como Deus renova nossa visão, nos orienta e nos dá ânimo para prosseguir.",
    verse: "Salmo 121:1-2",
    videoId: "COLOQUE_AQUI_O_ID_DO_VIDEO",
  },
  {
    number: 12,
    title: "Solo Encantado",
    description:
      "Cristão atravessa uma região perigosa onde o sono e a distração podem fazê-lo parar no caminho.",
    bookPage: "Página 280",
    activity:
      "Cristão e Esperançoso atravessam uma região perigosa onde muitos peregrinos adormecem espiritualmente. Para permanecerem vigilantes, conversam sobre a obra de Deus em suas vidas e encorajam um ao outro.",
    theme: "Vigilância espiritual e perseverança.",
    principle:
      "Ensine sobre vigilância espiritual e perseverança mesmo quando a caminhada parece tranquila.",
    verse: "1 Pedro 5:8",
    videoId: "9qRpQjdbrMo",
  },
  {
    number: 13,
    title: "Rio da Morte",
    description:
      "Cristão precisa atravessar o rio final, confiando que será sustentado até chegar ao outro lado.",
    bookPage: "Página 313",
    activity:
      "Antes de entrar na Cidade Celestial, os peregrinos precisam atravessar um rio que representa a morte física. Cristão enfrenta momentos de medo e insegurança, mas é fortalecido pelas promessas de Deus e chega em segurança à outra margem.",
    theme: "A esperança cristã diante da morte.",
    principle:
      "Converse sobre a esperança cristã diante da morte e a promessa de vida eterna em Cristo.",
    verse: "João 11:25",
    videoId: "gt429tAqs44",
  },
  {
    number: 14,
    title: "Cidade Celestial",
    description:
      "A jornada termina com a chegada à Cidade Celestial, lugar de alegria, descanso e presença de Deus.",
    bookPage: "Página 333",
    activity:
      "Após toda a jornada, Cristão e Esperançoso entram na Cidade Celestial. Eles são recebidos com alegria pelos habitantes do céu e contemplam a presença do Rei. A história termina mostrando a recompensa eterna reservada aos que perseveram pela fé em Cristo.",
    theme: "A glorificação e a vida eterna com Deus.",
    principle:
      "Mostre que a esperança do cristão é estar para sempre com Deus, onde não haverá mais tristeza.",
    verse: "Apocalipse 21:4",
    videoId: "XpKFCwZUAAQ",
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/genio.cristao",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@geniocristao",
  },
];

const articleLinks = [
  {
    label: "Como instalar o Minetest",
    href: "/artigos/como-instalar-o-minetest",
  },
];

function ConstructionShowcase({
  chapter,
  images,
}: {
  chapter: Chapter;
  images: string[];
}) {
  const [expandedImage, setExpandedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <>
      <motion.aside
        className={`constructionShowcase ${
          images.length > 1 ? "hasGallery" : ""
        }`}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12 }}
        viewport={{ once: true, amount: 0.25 }}
        aria-label={`Imagens da construção do capítulo ${chapter.number}`}
      >
        <div className="showcaseHeader">
          <span>Construção Minecraft/Minetest</span>
          <strong>{chapter.title}</strong>
        </div>

        {images.length > 0 ? (
          <div className="buildGallery">
            {images.map((image, imageIndex) => {
              const imageAlt = `Construção do capítulo ${
                chapter.number
              }, imagem ${imageIndex + 1}`;

              return (
                <figure key={image}>
                  <button
                    className="buildImageButton"
                    type="button"
                    onClick={() =>
                      setExpandedImage({
                        src: image,
                        alt: imageAlt,
                      })
                    }
                    aria-label={`Expandir ${imageAlt}`}
                  >
                    <img src={image} alt={imageAlt} />
                  </button>
                </figure>
              );
            })}
          </div>
        ) : (
          <div className="buildPlaceholder">
            <span>Imagem da construção em breve</span>
          </div>
        )}
      </motion.aside>

      {expandedImage ? (
        <div
          className="imageLightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Imagem da construção expandida"
          onClick={() => setExpandedImage(null)}
        >
          <button
            className="expandedImageButton"
            type="button"
            onClick={() => setExpandedImage(null)}
            aria-label="Fechar imagem expandida"
          >
            <img src={expandedImage.src} alt={expandedImage.alt} />
          </button>
        </div>
      ) : null}
    </>
  );
}

function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const nextChapterNumber = chapters[index + 1]?.number ?? chapters[0].number;
  const previousChapterNumber =
    chapters[index - 1]?.number ?? chapters[chapters.length - 1].number;
  const isFirstChapter = index === 0;
  const isLastChapter = index === chapters.length - 1;
  const constructionImages = getConstructionImages(chapter.number);

  return (
    <motion.section
      className={`chapter ${index % 2 === 0 ? "left" : "right"}`}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="card">
        <div className="chapterMeta">
          <span className="badge">Capítulo {chapter.number}</span>
          <span>{chapter.bookPage}</span>
        </div>

        <h2>{chapter.title}</h2>

        <p className="description">{chapter.description}</p>

        <div className="blockGrid">
          <div className="block activity">
            <strong>Resumo do capítulo</strong>
            <p>{chapter.activity}</p>
            <p className="chapterTheme">Tema principal: {chapter.theme}</p>
          </div>

          <div className="block principle">
            <strong>Conversa em família</strong>
            <p>{chapter.principle}</p>
            <p className="verse">{chapter.verse}</p>
          </div>
        </div>

        <div className="videoWrap">
          {chapter.videoId === "COLOQUE_AQUI_O_ID_DO_VIDEO" ? (
            <div className="videoPlaceholder">
              <span>Vídeo em breve</span>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${chapter.videoId}`}
              title={chapter.title}
              allowFullScreen
            />
          )}
        </div>

        <div className="cardActions">
          <a className="btn btnSecondary" href="#jornada">
            Início da jornada
          </a>
          <a className="btn btnSecondary" href={`#capitulo-${previousChapterNumber}`}>
            {isFirstChapter ? "Último capítulo" : "Capítulo anterior"}
          </a>
          <a className="btn" href={`#capitulo-${nextChapterNumber}`}>
            {isLastChapter ? "Recomeçar jornada" : "Próximo capítulo"}
          </a>
        </div>
      </div>
      <ConstructionShowcase chapter={chapter} images={constructionImages} />
    </motion.section>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="heroBackdrop" aria-hidden="true">
        <img src={heroImage} alt="" />
      </div>

      <motion.div
        className="heroContent"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="eyebrow">Livro</span>
        <h1>O Peregrino de Bloco em Bloco</h1>
        <p>
          Quando um clássico cristão de 348 anos encontra o jogo mais vendido da história, nasce uma experiência única de aprendizado, criatividade e fé.
        </p>
        <div className="heroActions">
          <a
            className="primaryAction"
            href="https://forms.gle/bTfLju3uPuq3fH1JA"
            target="_blank"
            rel="noreferrer"
          >
            Entre na lista de espera
          </a>
          <a className="secondaryAction" href="#capitulo-1">
            Ver jornada
          </a>
        </div>
        <p className="launchNote">* Seja um dos primeiros a receber informações sobre o lançamento.</p>
        <div className="partners" aria-label="Parceiros da escrita do livro">
          <a
            href="https://geniocristao.com.br"
            target="_blank"
            rel="noreferrer"
            aria-label="Instituto Gênio Cristão"
          >
            <img src={logoGc} alt="Instituto Gênio Cristão" />
          </a>
          <a
            href="https://www.editoraesperanca.com.br/"
            target="_blank"
            rel="noreferrer"
            aria-label="Editora Esperança"
          >
            <img src={logoEsperanca} alt="Editora Esperança" />
          </a>
        </div>
      </motion.div>
    </header>
  );
}

function Intro() {
  return (
    <section className="intro" aria-label="Resumo da jornada">
      <div>
        <span>01</span>
        <strong>Leia</strong>
        <p>Acompanhe cada capítulo com uma cena central da história.</p>
      </div>
      <div>
        <span>02</span>
        <strong>Construa</strong>
        <p>Transforme a leitura em marcos visuais dentro do jogo.</p>
      </div>
      <div>
        <span>03</span>
        <strong>Converse</strong>
        <p>Use o princípio bíblico como ponte para falar ao coração.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footerInner">
        <section className="footerBrand" aria-label="O Peregrino de Bloco em Bloco">
          <strong>O Peregrino de Bloco em Bloco</strong>
          <p>Leitura, fé e construção para famílias que aprendem juntas.</p>
        </section>

        <nav className="footerNav" aria-label="Redes sociais">
          <h2>Redes sociais</h2>
          <div className="footerLinkList">
            {socialLinks.map((link) => (
              <a
                className="footerLink"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <nav className="footerNav" aria-label="Artigos">
          <h2>Artigos</h2>
          <div className="footerLinkList">
            {articleLinks.map((link) => (
              <a className="footerLink" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Hero />

      <main className="journey" id="jornada">
        <Intro />

        <div className="sectionHeading">
          <span>Mapa de leitura</span>
          <h2>Capítulos da jornada</h2>
          <p>
            Cada parada une história, construção e uma conversa bíblica para
            conduzir a família pelo caminho de Cristão.
          </p>
        </div>

        <div className="road"></div>

        {chapters.map((chapter, index) => (
          <div id={`capitulo-${chapter.number}`} key={chapter.number}>
            <ChapterCard chapter={chapter} index={index} />
          </div>
        ))}
      </main>

      <Footer />
    </>
  );
}

function MinetestInstallArticle() {
  return (
    <>
      <main className="articlePage">
        <article className="articleContent">
          <a className="backLink" href="/">
            Voltar para a jornada
          </a>

          <h1>Sumário – Instalação do Minetest</h1>
          <nav className="articleSummary" aria-label="Sumário do artigo">
            <ul>
              <li>
                <a href="#windows">Como instalar o Minetest no Windows 10/11</a>
              </li>
              <li>
                <a href="#linux">Como instalar o Minetest no Linux</a>
              </li>
              <li>
                <a href="#macos">Como instalar o Minetest no macOS</a>
              </li>
              <li>
                <a href="#android">Como instalar o Minetest no celular (Android)</a>
              </li>
              <li>
                <a href="#singleplayer">Primeiro jogo rápido (Singleplayer)</a>
              </li>
            </ul>
          </nav>

          <section id="windows">
            <h2>Como instalar o Minetest no Windows 10/11</h2>
            <div className="articleVideo">
              <iframe
                src="https://www.youtube.com/embed/XguXdtIR-lM"
                title="Como instalar o Minetest no Windows 10/11"
                allowFullScreen
              />
            </div>

            <ol>
              <li>
                <p>Baixe o instalador no site oficial</p>
                <blockquote>
                  <a href="https://www.luanti.org/downloads/" target="_blank" rel="noreferrer">
                    https://www.luanti.org/downloads/
                  </a>
                </blockquote>
                <p>Escolha a versão Windows 64-bit (.exe).</p>
              </li>
              <li>
                <p>Abra o arquivo baixado e siga os passos:</p>
                <ul>
                  <li>Clique em Next (Avançar).</li>
                  <li>Aceite a licença.</li>
                  <li>Escolha a pasta (padrão é recomendado).</li>
                  <li>Clique em Install.</li>
                  <li>Ao terminar, marque Launch Minetest para abrir o jogo.</li>
                </ul>
              </li>
            </ol>
          </section>

          <section id="linux">
            <h2>Como instalar o Minetest no Linux</h2>
            <h3>Método 1 — PPA oficial (APT) – estável recomendado</h3>
            <ol>
              <li>Abra o Terminal.</li>
              <li>
                <p>Adicione o PPA estável e atualize a lista de pacotes:</p>
                <pre><code>{`sudo add-apt-repository ppa:minetestdevs/stable
sudo apt update`}</code></pre>
              </li>
              <li>
                <p>Instale o jogo (o pacote ainda se chama minetest)</p>
                <pre><code>sudo apt install minetest</code></pre>
              </li>
              <li>
                <p>Abra pelo menu de aplicativos (Luanti/Minetest) ou rode</p>
                <pre><code>minetest</code></pre>
              </li>
            </ol>

            <h3>Método 2 — Flatpak (Flathub)</h3>
            <ol>
              <li>
                <p>Se não tiver o Flatpak instalado, instale-o (Ubuntu/Mint):</p>
                <pre><code>sudo apt install flatpak</code></pre>
              </li>
              <li>
                <p>Instale o Luanti pelo Flathub:</p>
                <pre><code>flatpak install flathub org.luanti.luanti</code></pre>
              </li>
              <li>
                <p>Para abrir via Terminal:</p>
                <pre><code>flatpak run org.luanti.luanti</code></pre>
              </li>
            </ol>
            <p>Também é possível instalar/abrir pela loja gráfica do sistema com suporte a Flatpak.</p>
            <blockquote>
              <a href="https://flathub.org/en/apps/org.luanti.luanti" target="_blank" rel="noreferrer">
                https://flathub.org/en/apps/org.luanti.luanti
              </a>
            </blockquote>
          </section>

          <section id="macos">
            <h2>Como instalar o Minetest no macOS</h2>
            <p>
              <strong>Requisitos e opções oficiais</strong>
            </p>
            <p>
              Recomenda-se macOS 11.3 ou superior. Há apps assinados específicos para Apple Silicon
              (M1/M2/M3) e para Intel 64-bit. Também é possível instalar pelo Homebrew.
            </p>

            <h3>Método 1 — App oficial (recomendado)</h3>
            <p>Acesse a página oficial de Downloads do Luanti.</p>
            <blockquote>
              <a href="https://www.luanti.org/downloads/" target="_blank" rel="noreferrer">
                https://www.luanti.org/downloads/
              </a>
            </blockquote>

            <h4>Em macOS, escolha o download correspondente ao seu chip:</h4>
            <blockquote>
              <a
                href="https://github.com/luanti-org/luanti/releases/download/5.13.0/luanti_5.13.0-macos11.3_arm64.zip"
                target="_blank"
                rel="noreferrer"
              >
                Signed Apple Silicon — App
              </a>
              <span> para Macs M1/M2/M3</span>
            </blockquote>
            <blockquote>
              <a
                href="https://github.com/luanti-org/luanti/releases/download/5.13.0/luanti_5.13.0-macos11.3_x86_64_flag_O1.zip"
                target="_blank"
                rel="noreferrer"
              >
                Signed Intel 64-bit — App
              </a>
              <span> para Macs Intel</span>
            </blockquote>

            <ol>
              <li>Baixe o arquivo (vem como app pronto para uso).</li>
              <li>Abra o arquivo baixado e arraste “Luanti.app” para a pasta Aplicativos.</li>
              <li>Abra pelo Launchpad.</li>
            </ol>

            <aside className="articleWarning">
              Se aparecer o aviso do macOS (Gatekeeper), vá em Ajustes do Sistema → Privacidade e
              Segurança e escolha “Abrir assim mesmo”.
            </aside>

            <h3>Método 2 — Homebrew (linha de comando)</h3>
            <p>Use se você já tem o Homebrew instalado.</p>
            <ol>
              <li>Abra o Terminal.</li>
              <li>
                <p>Instale com:</p>
                <pre><code>brew install --cask luanti</code></pre>
              </li>
              <li>
                <p>Para atualizar no futuro:</p>
                <pre><code>brew upgrade --cask luanti</code></pre>
              </li>
            </ol>
          </section>

          <section id="android">
            <h2>Como instalar o Minetest no celular (Android)</h2>
            <p>Há dois caminhos oficiais: Google Play ou F-Droid.</p>

            <h3>Opção 1 — Google Play</h3>
            <ol>
              <li>Abra a Google Play Store no seu celular.</li>
            </ol>
            <blockquote>
              <a
                href="https://play.google.com/store/apps/details?hl=en_US&id=net.minetest.minetest"
                target="_blank"
                rel="noreferrer"
              >
                https://play.google.com/store/apps/details?hl=en_US&id=net.minetest.minetest
              </a>
            </blockquote>
            <ol start={2}>
              <li>Pesquise por “Luanti” (aparece como Luanti (formerly Minetest)).</li>
              <li>Toque em Instalar e aguarde concluir.</li>
              <li>Toque em Abrir para iniciar o jogo.</li>
            </ol>

            <h3>Opção 2 — F-Droid</h3>
            <ol>
              <li>Use esta se você já usa F-Droid ou prefere somente software livre.</li>
              <li>Se ainda não tiver, instale o app F-Droid (do site oficial do F-Droid).</li>
            </ol>
            <blockquote>
              <a href="https://f-droid.org/en/packages/net.minetest.minetest/" target="_blank" rel="noreferrer">
                https://f-droid.org/en/packages/net.minetest.minetest/
              </a>
            </blockquote>
            <ol start={3}>
              <li>Abra o F-Droid, pesquise por Luanti e toque em Instalar.</li>
              <li>Abra o jogo pelo atalho criado.</li>
            </ol>
          </section>

          <section id="singleplayer">
            <h2>Primeiro jogo rápido (Singleplayer)</h2>
            <ol>
              <li>Abra o Minetest.</li>
              <li>Clique em Singleplayer → New.</li>
              <li>Dê um nome ao mundo (exemplo: “Meu Mundo”).</li>
              <li>Em Game, deixe Minetest Game.</li>
              <li>Em Mapgen, selecione v7 (padrão).</li>
              <li>Para jogar livremente, marque Creative Mode e desmarque Enable Damage.</li>
              <li>Clique em Create, depois em Play.</li>
              <li>Pronto! Você já estará dentro de um mundo novo para explorar e construir.</li>
            </ol>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  const currentPath =
    typeof window !== "undefined"
      ? window.location.pathname.replace(/\/+$/, "")
      : "";
  const isMinetestArticle = currentPath === "/artigos/como-instalar-o-minetest";

  return isMinetestArticle ? <MinetestInstallArticle /> : <HomePage />;
}
