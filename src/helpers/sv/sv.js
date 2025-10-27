import { stb } from '../../bootstrap/st/stb';
import { sva } from './sva'

// server values
export class sv {
  static accounts(param = null) {
    const data = sva.accounts();
    return stb.propReturn(param, data);
  }

  static currency(param = null) {
    const data = sva.currency();
    return data;  
  }
}