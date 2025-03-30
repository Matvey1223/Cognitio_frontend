import {axiosClassic, axiosWithAuth} from "@/intreceptors";
import {AuthType} from "@/types/auth.types";

const BASE_URL: string = "http://localhost:8000/api/v1/students/"


interface AccessToken{
    access_token: string
}


async function auth(email: string | undefined): Promise<AccessToken> {
    try {
        const response = await axiosWithAuth.post<AccessToken>(BASE_URL + "login", {email: email})
        return response.data
    }
    catch (error) {
        return error
    }

}

export { auth }
