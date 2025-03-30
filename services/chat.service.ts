import { axiosClassic } from "@/intreceptors";

const BASE_URL = "http://localhost:8000/api/v1/chat/"

interface ChatData {

}

export async function createChat(user_1: number, user_2: number) {
    const response = await axiosClassic.post(BASE_URL + "create", {user_1: user_1,
        user_2: user_2})
    return response.data
}
