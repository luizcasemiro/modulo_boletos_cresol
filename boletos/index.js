const axios = require("axios")
const qs = require('qs')
class BoletosCresol{

    constructor(credentials){
        const { login, password } = credentials
        this.login = login
        this.password = password
        this.url = "http://cobranca.confesol.com.br/cooperado"
    }
    getConfig(){
        return {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    }
    async getIdPessoa(login = this.login){
        const idPessoa = await axios.post(`${this.url}/login?action=2&_dc=${Date.now()}`, qs.stringify({    
                login,
                start: 0,
                limit: 10,
        }), this.getConfig());
        if(idPessoa.data.results > 0){
            this.idPessoa = idPessoa.data.rows[0].id
            return idPessoa.data.rows[0].id
        }
        return null
    }
    async getIdMulti(pessoa = this.idPessoa){
        const idMulti = await axios.post(`${this.url}/login?action=3&_dc=${Date.now()}`, qs.stringify({    
                pessoa,
                start: 0,
                limit: 10,
        }), this.getConfig());
        if(idMulti.data.results > 0){
            this.idMulti = idMulti.data.rows[0].id
            return idMulti.data.rows[0].id
        }
        return null
    }
    async getSessionCookie(pessoa = this.idPessoa, multi = this.idMulti, login = this.login, senha = this.password){
        const cookie = await axios.post(`${this.url}/login?action=1`, qs.stringify({    
            pessoa,
            senha,
            multi,
            login,
        }), this.getConfig());
        //console.log(pessoa, multi, login, senha)
        console.log(cookie)

    }
    
}
module.exports = BoletosCresol