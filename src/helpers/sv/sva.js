// server values support
export class sva {

    static localData() {
        return localStorage.getItem('sv_data') ? JSON.parse(localStorage.getItem('sv_data')) : null;
    }

    static accounts() {
        const svDataLocal = this.localData()
        return svDataLocal ? svDataLocal?.accounts : []
    }

    static currency() {
        const svDataLocal = this.localData()
        return svDataLocal ? svDataLocal?.currency : 'USD'
    }
}