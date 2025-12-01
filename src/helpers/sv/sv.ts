import { sva } from './sva'

// server values
export class sv {

  static currency() {
    const svDataLocal = sva.localData()
        return svDataLocal ? svDataLocal?.currency : 'USD';  
  }

  static brands() {
    const svDataLocal = sva.localData()
    return svDataLocal ? svDataLocal?.brands : []  
  }
  
}