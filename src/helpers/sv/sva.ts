// server values support
export class sva {

    static localData() {
        return localStorage.getItem('uc_garage_sv_data') ? JSON.parse(localStorage.getItem('uc_garage_sv_data') as string) : null;
    }

}