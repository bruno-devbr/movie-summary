import axios from "axios";
import { TokenProps } from "../types/auth";

export async function getRequestToken() {
    const res = await axios.get<TokenProps>(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/authentication`
    );

    if (!res.status !== 200) {
        throw new Error("nao foi possivel fazer login");
    }

    return res.data.request_token;
}
