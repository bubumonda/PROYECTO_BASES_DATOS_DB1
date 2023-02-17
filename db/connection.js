

import  pkg from 'pg';

const {Client} = pkg;
// Conexión con PG
const cliente = new Client({
    connectionString: 'postgres://xvjtzhbb:wzd0g6uBHBOhiHDSlKVMU_svATS0_oEx@babar.db.elephantsql.com/xvjtzhbb'

    
})

export default cliente

