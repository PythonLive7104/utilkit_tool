import { createContext, useContext } from 'react'

export const SeoOverrideContext = createContext(null)
export const useSeoOverride = () => useContext(SeoOverrideContext)
