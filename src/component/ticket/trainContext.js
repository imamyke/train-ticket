import { createContext, useContext } from "react";

export const TrainContext = createContext() // create

export const useTrain = () => useContext(TrainContext) // use

export const TrainProvider = ({ //provide
  children, 
  trainNumber,
  departStation,
  arriveStation,
  departDate }) => {
  return (
    <TrainContext.Provider value={{
      trainNumber,
      departStation,
      arriveStation,
      departDate
    }}>
      { children }
    </TrainContext.Provider>
  )
}