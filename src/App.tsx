import './App.css'
import { useState } from 'react'
import localStorageModel from './models/localStorageModel'

type MoneyType = {
  info: {
    money: number;
    date: string;
  }
}

function App() {
  const [income, setIncome] = useState<any>()
  const [hours, setHours] = useState<any>()
  const [money, setMoney] = useState<MoneyType[]>(() => {
    return localStorageModel.getLocalStorage();
  });
  const [deletePanel, setDeletePanel] = useState<boolean>(false)

  const formatted = (income: number, hours: number) => {
    if (!Number.isNaN(income * hours)) {
      const newObj = { info: { money: Number((income * hours).toFixed(2)), date: new Date().toLocaleDateString("uk-UA") } }
      setMoney(prev => [...prev, newObj])
      localStorageModel.setLocalStorage(newObj)
      console.log(localStorageModel.getLocalStorage())
    } else return
  }

  const handleDelete = (index: number) => {
    setMoney(prev => {
      const updated = prev.filter((_, i) => i !== index)
      localStorage.setItem('incomeManager-v1-key', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <>
      <div className="flex flex-col gap-5 items-center justify-center h-screen">
        <div className="bg-gray-200 border-2 border-gray-300 rounded-[10px] w-[80%] h-[80%] flex flex-col items-center justify-between">
          <div className="border-b border-gray-400 flex justify-center w-[80%] my-5 pb-5">
            <input onChange={(e) => { setIncome(e.target.value) }} value={income} type="text" placeholder='Your income per hour...' className='w-[90%] px-2 py-1 border-gray-400 border rounded-[10px]' />
          </div>
          <div className="flex flex-col items-center gap-4 w-[75%] h-[70%] overflow-y-auto scrollbar-none">
            {[...money].reverse().map((el, index) => (
              <div onDoubleClick={() => handleDelete(index)} className="cursor-pointer flex justify-between items-center w-full">
                <b className='text-green-400 text-[30px] [text-shadow:-1px_1px_0px_rgba(0,0,0,0.15)]'>+{el.info.money}</b>
                <div className="flex flex-col">
                  <p className="text-gray-500">{el.info.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input onChange={(e) => { setHours(e.target.value) }} value={hours} type="text" placeholder='Hours you workd' className='w-[70%] px-2 py-1 border-gray-400 border rounded-[10px] mb-3' />
            <button onClick={() => formatted(parseFloat(income), parseFloat(hours))} className='w-[25%] px-2 h-8.5 border-gray-400 border rounded-[10px]'>Enter</button>
          </div>
        </div>
        <button onClick={() => {
          localStorage.removeItem('incomeManager-v1-key')
          setMoney([])
        }
        } className='w-[80%] h-[8%] bg-red-200 border-2 border-red-300 rounded-[10px]'>Clean all</button>
      </div>
    </>
  )
}

export default App
