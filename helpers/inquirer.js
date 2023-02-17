


import inquirer from 'inquirer';
import colors from 'colors'


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices:[
            {
                value: '1',
                name: `${'1.'.green} Crear Bases de datos`
            },

            {
                value: '2',
                name: `${'2.'.green} Insertar Datos`
            },

            {
                value: '3',
                name: `${'3.'.green} Consultas especiales`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },

        ]
    }
];


const consultas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea consultar?',
        choices:[
            {
                value: '1',
                name: `${'1.'.green}Ventas totales por empleado en la farmacia ordenado descendentemente`
            },

            {
                value: '2',
                name: `${'2.'.green}Cantidad de Medicamentos por laboratorio que sean Antibioticos en Pastilla o en Crema`
            },
            {
                value: '3',
                name: `${'3.'.green}Vendedores que hayan vendido   Antihistaminicos del Laboratorio de Profarma y Medifarma ordenados descendentemente`
            },
            {
                value: '4',
                name: `${'4.'.green}Medicamentos que hayan sido vendidos por un regente de farmacia y empiecen por 'Anti' y su precio seA mayor a 50$`
            },
            {
                value: '5',
                name: `${'5.'.green}Clientes que los hayan atendido  Elmer Padilla o una mujer en la noche mayor de 30 años`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },

        ]
    }
];

const inquirerConsulta = async() =>{


    console.clear();
    console.log('Seleccione una opcion\n')
    
    const {opcion} = await inquirer.prompt(consultas);


    return opcion;
}


const inquirerMenu = async() =>{


    console.clear();
    console.log('Seleccione una opcion\n')
    
    const {opcion} = await inquirer.prompt(preguntas);


    return opcion;
}
const pausa = async() =>{

    const question = [
        {
            type: 'input',
            name: 'enter',
            message:` Presione ${'enter'.green} para continuar`
        }
    ]
    console.log('\n')
    await inquirer.prompt(question)

}

const leerInput = async(message) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}




const confirmar = async(message) =>{

    const question =[
        {
            type: 'confirm',
            name: 'ok',
            message
        }

    ];
    const {ok} = await inquirer.prompt( question)
    return ok

}



export {inquirerMenu, pausa, leerInput, confirmar, inquirerConsulta}