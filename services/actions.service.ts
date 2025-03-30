import { axiosWithAuth } from "@/intreceptors";

const BASE_URL = "http://localhost:8000/api/v1/actions/"

export interface UserData {
    student_id: number
    age: number
    city_id: number
    position: string | undefined
    email: string
    full_name: string
    description: string | undefined
    github: string | undefined
    technologies: any[]
    is_first_time: boolean
}

export interface LikeData {
    like_id: number
    status: boolean
    sender_id: number
    receiver_id: number
    timestamp: string
    sender: UserData
}
export async function likeAction(receiver_id: number): Promise<LikeData> {
    const response = await axiosWithAuth.post<LikeData>(BASE_URL + "like",
        {receiver_id: receiver_id})
    return response.data
}

export async function unlikeAction(like_id: number){
    await axiosWithAuth.post(BASE_URL + "unlike", {like_id: like_id})
}