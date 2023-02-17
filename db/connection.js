
<<<<<<< HEAD
import  pkg from 'pg';

const {Client} = pkg;
// Conexión con PG
const cliente = new Client({
    connectionString: 'postgres://xvjtzhbb:wzd0g6uBHBOhiHDSlKVMU_svATS0_oEx@babar.db.elephantsql.com/xvjtzhbb'

    
})

export default cliente
=======
const db = new Sequelize(process.env.DB_USER ||'postgres', process.env.DB_NAME || 'postgres', process.env.DB_PASSWORD || '1234',{
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    // logging: false,
});

export default db;
>>>>>>> 4c11063fec0a53560eb637ec6ad8e9313e2dbe7f
