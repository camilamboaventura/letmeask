import { Question } from "../components/Question";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import logoImg from "../assets/logo.svg";
import "../styles/room.scss";
import { RoomCode } from "../components/RoomCode";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { useEffect } from "react";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    iaAnswered: boolean;
    isHighlighted: boolean;
  }
>;

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");

  const roomId = params.id;

  //useEffect é uma funçao que dispara um evento sempre que alguma informaçao mudar(se array de dependencia estiver vazio esta funçao so sera executada uma unica vez quando o componente for exibido em tela)
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      //toda vez que alguma informaçao for add ou mudada esse código vai ser execultado de novo - esta ouvindo em tempo real a atualizaçao dos dados
      const databaseRoom = room.val();
      const firebaseQuestion: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestion = Object.entries(firebaseQuestion).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.iaAnswered,
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestion);
    });
  }, [roomId]); //a pagina vai carregar toda vez que o Id da sala mudar

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault(); //para n recarregar a tela

    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      throw new Error("you must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question); //recurso para add as perguntas

    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que vc quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar pergunta, <button>faça seu login</button>.
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
