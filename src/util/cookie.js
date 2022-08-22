import Cookies from "universal-cookie"

const cookies = new Cookies()

const initialOpt = {
    //차후 정하기
    // path: ,      // 쿠키의 저장 경로 (string /)
    // expires: ,   // 쿠키의 절대적 사용 기간 (date) => 안정하면 브라우저끄면 그냥 자동 삭제
    // maxAge: ,    // 쿠키 수신시점부터 쿠키의 상대적 사용 기간 (number)
    // secure: ,    // https 통신에만 access허용 (boolean)
    // httpOnly: true,  // server에서만 access 가능하게 (boolean) => (document.cookie따위로 못들어오게 xss방지)
    // sameSite: ,  // 잘모르겠네...(boolean|none|lax|strict)
}

export const setCookie = (name, value, opt) => {
    return cookies.set(name, value, {...opt})
}

export const getCookie = (name) => {
    return cookies.get(name)
}

export const removeCookie = (name) => {
    return cookies.remove(name)
}
