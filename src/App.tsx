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
  // const [deletePanel, setDeletePanel] = useState<boolean>(false)

  const formatted = (income: number, hours: number) => {
    if (!Number.isNaN(income * hours)) {
      const newObj = {info : { money: income * hours, date: new Date().toLocaleDateString("uk-UA") }}
      setMoney(prev => [...prev, newObj])
      localStorageModel.setLocalStorage(newObj)
      console.log(localStorageModel.getLocalStorage())
    } else return
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-200 border-2 border-gray-300 rounded-[10px] w-[80%] h-[80%] flex flex-col items-center justify-between">
          <div className="border-b border-gray-400 flex justify-center w-[80%] my-5 pb-5">
            <input onChange={(e) => { setIncome(e.target.value) }} value={income} type="text" placeholder='Your income per hour...' className='w-[90%] px-2 py-1 border-gray-400 border rounded-[10px]' />
          </div>
          <div className="flex flex-col items-center gap-4 w-[75%] h-[70%] overflow-y-auto scrollbar-none">
            {[...money].reverse().map(el => (
              <div className="flex justify-between items-center w-full">
                <b className='text-green-400 text-[30px] [text-shadow:-1px_1px_0px_rgba(0,0,0,0.15)]'>+{el.info.money}</b>
                <div className="flex flex-col">
                  <p className="text-gray-500">{el.info.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input onChange={(e) => { setHours(e.target.value) }} value={hours} type="text" placeholder='Hours you workd' className='w-[70%] px-2 py-1 border-gray-400 border rounded-[10px] mb-3' />
            <button onClick={() => formatted(parseInt(income), parseInt(hours))} className='w-[25%] px-2 h-8.5 border-gray-400 border rounded-[10px]'>Enter</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
