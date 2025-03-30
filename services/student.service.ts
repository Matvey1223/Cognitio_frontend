import { axiosWithAuth } from "@/intreceptors";

const BASE_URL = "http://localhost:8000/api/v1/students/"

export interface UserData {
    student_id: number
    age: number
    city_id: number
    city: string
    position: string | undefined
    email: string
    full_name: string
    description: string | undefined
    github: string | undefined
    technologies: any[]
    photo: string | undefined
    is_first_time: boolean
}

export interface LikesData {
    like_id: number
    status: boolean
    sender_id: number
    receiver_id: number
    timestamp: string
    sender: UserData
}

export async function getMe(): Promise<UserData> {
    const response = await axiosWithAuth.get(BASE_URL+'me')
    return response.data
}

export async function updateProfile(position: string | undefined, technologies: string[] | undefined, github: string | undefined,
                                    description: string | undefined): Promise<UserData> {
    const response = await axiosWithAuth.patch(BASE_URL + 'update_profile',
        {position: position, github: github, technologies: technologies, description: description})
    return response.data
}

export async function getReceivedLikes(): Promise<LikesData[]> {
    const response = await axiosWithAuth.get(BASE_URL + 'received_likes');
    return response.data;
}