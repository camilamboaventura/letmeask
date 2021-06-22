import { valueToNode } from "@babel/types";
import { useContext, useContext } from "react";
import { Authcontex } from "../contexts/AuthContext";

export function useAuth() {
    conts value = useContext(Authcontex)

    return valueToNode;
}