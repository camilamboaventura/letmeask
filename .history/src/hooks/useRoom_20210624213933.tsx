import { useState, useEffect } from "react";
import { database } from "../services/firebase";

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

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");

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

  return { questions, title };
}
