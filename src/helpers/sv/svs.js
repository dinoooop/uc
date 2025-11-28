import { stb } from '../../bootstrap/st/stb';
import { sva } from './sv'

// server values
export class svs {
  static accounts(param = null) {
    const data = sva.accounts();
    return stb.propReturn(param, data);
  }

  static currency(param = null) {
    const data = sva.currency();
    return data;  
  }
  
}