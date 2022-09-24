import { useState } from "react";

export const useLocalStorage = (key, defValue) => {
    const [value, setValue] = useState(() => {
        const storage = localStorage.getItem(key)
        return storage? JSON.parse(storage) : defValue
    })

    const setData = (data) => {
        localStorage.setItem(key, JSON.stringify(data))
        setValue(data)
    }

    return [
        value,
        setData
    ]
}