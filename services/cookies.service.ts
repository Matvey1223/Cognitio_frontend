import Cookies  from "js-cookie";


export async function createAccessToken(accesstToken: string | any) {
    await Cookies.set("access_token", accesstToken)
}

export async function getAccessToken() {
    const studentId = await Cookies.get("student_id")
    return studentId
}