// const db = require('../database/connection');

// module.exports = {
//     async listarUsuarios(request, response) {
//         try {
//             // instruções SQL
//             const sql = `SELECT 
//                 usu_id, usu_nome, usu_sexo, usu_data_nascimento, usu_email, 
//                 usu_senha, usu_data_cadastro, tus_cod
//                 FROM usuarios
//                 `;
//             // executa instruções SQL e armazena o resultado na variável usuários
//             const usuarios = await db.query(sql);
//             // armazena em uma variável o número de registros retornados
//             const nItens = usuarios[0].length;
    
//             // Formatar as datas para remover as horas
//             const dadosFormatados = usuarios[0].map(usuario => {
//                 return {
//                     ...usuario,
//                     usu_data_nascimento: usuario.usu_data_nascimento.toISOString().split('T')[0],
//                     usu_data_cadastro: usuario.usu_data_cadastro.toISOString().split('T')[0]
//                 };
//             });
    
//             return response.status(200).json({
//                 sucesso: true,
//                 mensagem: 'Lista de usuários.',
//                 dados: dadosFormatados,
//                 nItens
//             });
//         } catch (error) {
//             return response.status(500).json({
//                 sucesso: false,
//                 mensagem: 'Erro na requisição.',
//                 dados: error.message
//             });
//         }
//     },
    
//     async cadastrarUsuarios(request, response) {
//         try {
//             // parâmetros recebidos no corpo da requisição
//             const { usu_nome, usu_sexo, usu_data_nascimento, usu_email, usu_senha, usu_data_cadastro, tus_cod } = request.body;
//             // instrução SQL
//             const sql = `INSERT INTO usuarios 
//                 (usu_nome, usu_sexo, usu_data_nascimento, usu_email, usu_senha, usu_data_cadastro,tus_cod) 
//                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
//             // definição dos dados a serem inseridos em um array
//             const values = [usu_nome, usu_sexo, usu_data_nascimento, usu_email, usu_senha, usu_data_cadastro, tus_cod];
//             // execução da instrução sql passando os parâmetros
//             const execSql = await db.query(sql, values);
//             // identificação do ID do registro inserido
//             const usu_id = execSql[0].insertId;

//             return response.status(200).json({
//                 sucesso: true,
//                 mensagem: 'Cadastro de usuário efetuado com sucesso.',
//                 dados: usu_id
//                 //mensSql: execSql
//             });
//         } catch (error) {
//             return response.status(500).json({
//                 sucesso: false,
//                 mensagem: 'Erro na requisição.',
//                 dados: error.message
//             });
//         }
//     },
//     async editarUsuarios(request, response) {
//         try {
//             // parâmetros recebidos pelo corpo da requisição
//             const { usu_nome, usu_sexo, usu_email, usu_senha } = request.body;
//             // parâmetro recebido pela URL via params ex: /usuario/1
//             const { usu_id } = request.params;
//             // instruções SQL
//             const sql = `UPDATE usuarios SET usu_nome = ?, usu_sexo = ?, 
//                 usu_email = ?, usu_senha = ? WHERE usu_id = ?;
//                  `;
//             // preparo do array com dados que serão atualizados
//             const values = [usu_nome, usu_sexo, usu_email, usu_senha, usu_id];
//             // execução e obtenção de confirmação da atualização realizada
//             const atualizaDados = await db.query(sql, values);

//             return response.status(200).json({
//                 sucesso: true, 
//                 mensagem: `Usuário ${usu_id} atualizado com sucesso!`,
//                 dados: atualizaDados[0].affectedRows
//                 // mensSql: atualizaDados
//             });
//         } catch (error) {
//             return response.status(500).json({
//                 sucesso: false,
//                 mensagem: 'Erro na requisição.',
//                 dados: error.message
//             });
//         }
//     },
//     async apagarUsuarios(request, response) {
//         try {
//             // parâmetro passado via url na chamada da api pelo front-end
//             const { usu_id } = request.params;
//             // comando de exclusão
//             const sql = `DELETE FROM usuarios WHERE usu_id = ?`;
//             // array com parâmetros da exclusão
//             const values = [usu_id];
//             // executa instrução no banco de dados
//             const excluir = await db.query(sql, values);

//             return response.status(200).json({
//                 sucesso: true,
//                 mensagem: `Usuário ${usu_id} excluído com sucesso`,
//                 dados: excluir[0].affectedRows
//             });
//         } catch (error) {
//             return response.status(500).json({
//                 sucesso: false,
//                 mensagem: 'Erro na requisição.',
//                 dados: error.message
//             });
//         }
//     }, 
//     async ocultarUsuario(request, response) {
//         try {
//             const usu_ativo = false; 
//             const { usu_id } = request.params; 
//             const sql = `UPDATE usuarios SET usu_ativo = ? 
//                 WHERE usu_id = ?;`;
//             const values = [usu_ativo, usu_id]; 
//             const atualizacao = await db.query(sql, values); 
            
//             return response.status(200).json({
//                 sucesso: true,
//                 mensagem: `Usuário ${usu_id} excluído com sucesso`,
//                 dados: atualizacao[0].affectedRows
//             });
//         } catch (error) {
//             return response.status(500).json({
//                 sucesso: false,
//                 mensagem: 'Erro na requisição.',
//                 dados: error.message
//             });
//         }
//     }, 
//     async login(request, response) {
//         try {
//             const { usu_email, usu_senha } = request.body;
    
//             const sql = `SELECT usu_id, usu_nome, usu_sexo, usu_data_nascimento, usu_data_cadastro, tus_cod FROM usuarios 
//                          WHERE usu_email = ? AND usu_senha = ?`;
    
//             const values = [usu_email, usu_senha];
    
//             const usuarios = await db.query(sql, values);
//             const nItens = usuarios[0].length; 

//             const dadosFormatados = usuarios[0].map(usuario => {
//                 return {
//                     ...usuario,
//                     usu_data_nascimento: usuario.usu_data_nascimento.toISOString().split('T')[0],
//                     usu_data_cadastro: usuario.usu_data_cadastro.toISOString().split('T')[0]
//                 };
//             });
    
//             if (nItens < 1) {
//                 return response.status(403).json({
//                     sucesso: false,
//                     mensagem: 'Login e/ou senha inválido.',
//                     dados: null,
//                 });
//             }
    
//             return response.status(200).json({
//                 sucesso: true,
//                 mensagem: 'Login efetuado com sucesso',
//                 dados: dadosFormatados
//             });
//         } catch (error) {
//             return response.status(500).json({
//                 sucesso: false,
//                 mensagem: 'Erro na requisição.',
//                 dados: error.message
//             });
//         }
//     },
    
// }

const db = require('../database/connection');

module.exports = {
    async listarUsuarios(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT 
                usu_id, usu_nome, usu_sexo, usu_data_nascimento, usu_email, 
                usu_senha, usu_data_cadastro, tus_cod
                FROM usuarios
                `;
            // executa instruções SQL e armazena o resultado na variável usuários
            const usuarios = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = usuarios[0].length;
    
            // Formatar as datas para remover as horas
            const dadosFormatados = usuarios[0].map(usuario => {
                return {
                    ...usuario,
                    usu_data_nascimento: formatarData(usuario.usu_data_nascimento),
                    usu_data_cadastro: formatarData(usuario.usu_data_cadastro)
                };
            });
    
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de usuários.',
                dados: dadosFormatados,
                nItens
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async listarFuncionarioUnico(request, response) {
        try {
            const {usu_id} = request.params;

            // instruções SQL
            const sql = `SELECT 
                usu_id, usu_nome, usu_sexo, usu_data_nascimento, usu_email, 
                usu_senha, usu_data_cadastro, tus_cod
                FROM usuarios where tus_cod = 1 and usu_id = ?
                `;


            const funcionario = [usu_id];
            // executa instruções SQL e armazena o resultado na variável usuários
            const executarComando = await db.query(sql,funcionario);
            // armazena em uma variável o número de registros retornados
            //const id = executarComando[0].insertId;

            const dadosFormatados = executarComando[0].map(usuario => {
                return {
                    ...usuario,
                    usu_data_nascimento: formatarData(usuario.usu_data_nascimento),
                    usu_data_cadastro: formatarData(usuario.usu_data_cadastro)
                };
            });

    
            // Formatar as datas para remover as horas
            
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de  unico funcionario.',
                dados: dadosFormatados[0],
                
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async listarUsuariosAdministradores(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT 
                usu_id, usu_nome, usu_sexo, usu_data_nascimento, usu_email, 
                usu_senha, usu_data_cadastro, tus_cod
                FROM usuarios 
                WHERE tus_cod = 1
                `;
            // executa instruções SQL e armazena o resultado na variável usuários
            const usuarios = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = usuarios[0].length;
    
            // Formatar as datas para remover as horas
            const dadosFormatados = usuarios[0].map(usuario => {
                return {
                    ...usuario,
                    usu_data_nascimento: formatarData(usuario.usu_data_nascimento),
                    usu_data_cadastro: formatarData(usuario.usu_data_cadastro)
                };
            });
            
    
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de administradores.',
                dados: dadosFormatados,
                nItens
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },




    async TotalClientes(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT COUNT(*) AS total_usuarios FROM usuarios
            WHERE tus_cod = 2

                `;
            // executa instruções SQL e armazena o resultado na variável usuários
            const usuarios = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = usuarios[0].length;
    
            // Formatar as datas para remover as horas
           
            
    
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista total de clientes.',
                dados: usuarios[0],
            
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
>>>>>>> 5d393e107b199eba2a32abfb13320aad4543c0c4

    async listarUsuariosClientes(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT 
                usu_id, usu_nome, usu_sexo, usu_data_nascimento, usu_email, 
                usu_senha, usu_data_cadastro, tus_cod
                FROM usuarios 
                WHERE tus_cod = 2
                `;
            // executa instruções SQL e armazena o resultado na variável usuários
            const usuarios = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = usuarios[0].length;
    
            // Formatar as datas para remover as horas
            const dadosFormatados = usuarios[0].map(usuario => {
                return {
                    ...usuario,
                    usu_data_nascimento: formatarData(usuario.usu_data_nascimento),
                    usu_data_cadastro: formatarData(usuario.usu_data_cadastro)
                };
            });
    
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de clientes.',
                dados: dadosFormatados,
                nItens
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async cadastrarUsuarios(request, response) {
        try {
            // parâmetros recebidos no corpo da requisição
            const { usu_nome, usu_sexo, usu_data_nascimento, usu_email, usu_senha, usu_data_cadastro, tus_cod } = request.body;
            // instrução SQL
            const sql = `INSERT INTO usuarios 
                (usu_nome, usu_sexo, usu_data_nascimento, usu_email, usu_senha, usu_data_cadastro,tus_cod) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
            // definição dos dados a serem inseridos em um array
            const values = [usu_nome, usu_sexo, usu_data_nascimento, usu_email, usu_senha, usu_data_cadastro, tus_cod];
            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values);
            // identificação do ID do registro inserido
            const usu_id = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de usuário efetuado com sucesso.',
                dados: usu_id
                //mensSql: execSql
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async editarUsuarios(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { usu_nome, usu_sexo, usu_email, usu_senha } = request.body;
            // parâmetro recebido pela URL via params ex: /usuario/1
            const { usu_id } = request.params;
            // instruções SQL
            const sql = `UPDATE usuarios SET usu_nome = ?, usu_sexo = ?, 
                usu_email = ?, usu_senha = ? WHERE usu_id = ?;
                 `;
            // preparo do array com dados que serão atualizados
            const values = [usu_nome, usu_sexo, usu_email, usu_senha, usu_id];
            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Usuário ${usu_id} atualizado com sucesso!`,
                dados: atualizaDados[0].affectedRows
                // mensSql: atualizaDados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },


    async apagarUsuarios(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { usu_id } = request.params;
            // comando de exclusão
            const sql = `DELETE FROM usuarios WHERE usu_id = ?`;
            // array com parâmetros da exclusão
            const values = [usu_id];
            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} excluído com sucesso`,
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async ocultarUsuario(request, response) {
        try {
            const usu_ativo = false; 
            const { usu_id } = request.params; 
            const sql = `UPDATE usuarios SET usu_ativo = ? 
                WHERE usu_id = ?;`;
            const values = [usu_ativo, usu_id]; 
            const atualizacao = await db.query(sql, values); 
            
            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} excluído com sucesso`,
                dados: atualizacao[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async login(request, response) {
        try {
            const { usu_email, usu_senha } = request.body;
    
            const sql = `SELECT usu_id, usu_nome, usu_sexo, usu_data_nascimento, usu_data_cadastro, tus_cod FROM usuarios 
                         WHERE usu_email = ? AND usu_senha = ?`;
    
            const values = [usu_email, usu_senha];
    
            const usuarios = await db.query(sql, values);
            const nItens = usuarios[0].length; 

            const dadosFormatados = usuarios[0].map(usuario => {
                return {
                    ...usuario,
                    usu_data_nascimento: formatarData(usuario.usu_data_nascimento),
                    usu_data_cadastro: formatarData(usuario.usu_data_cadastro)
                };
            });
    
            if (nItens < 1) {
                return response.status(403).json({
                    sucesso: false,
                    mensagem: 'Login e/ou senha inválido.',
                    dados: null,
                });
            }
    
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Login efetuado com sucesso',
                dados: dadosFormatados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
}

function formatarData(data) {
    const date = new Date(data);
    const ano = date.getUTCFullYear();
    const mes = String(date.getUTCMonth() + 1).padStart(2, '0');
    const dia = String(date.getUTCDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}
