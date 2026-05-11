type Info = {
    money: number;
    date: string;
}

function getLocalStorage() {
    const data = localStorage.getItem("incomeManager-v1-key")
    return data ? JSON.parse(data) : []
}

function setLocalStorage(info: object) {
    const existInfo: Info[] = getLocalStorage()
    localStorage.setItem("incomeManager-v1-key", JSON.stringify([...existInfo, info]))
}

export default {
    getLocalStorage,
    setLocalStorage
}