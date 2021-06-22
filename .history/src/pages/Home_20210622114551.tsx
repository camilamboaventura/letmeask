import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import googleIconImg from "../assets/google-icon.svg";

export function Home() {
  return (
    <div>
      <aside>
        <img src={illustrationImg} alt="Ilustraçao de perguntas e respostas" />
        <strong>Crie salas de Q7amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div>
          <img src={logoImg} alt="Letmeask" />
          <button>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie Sua sala com o Google
          </button>
        </div>
      </main>
    </div>
  );
}
