const db = require('../database/connection');

module.exports = {
    async listarTelefones(request, response) {
        try {
            const sql = 'SELECT * FROM TELEFONES;';
            const telefones = await db.query(sql);

            const dados = telefones[0].map(item => {
                return {
                    ...item,
                    tel_principal: item.tel_principal[0] === 1,
                    
                };
            });
            
            const nItens = dados.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Telefones.',
                dados,
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

    async cadastrarTelefone(request, response) {
        try {
            const { tel_primario, usu_id, tel_whatsapp, tel_principal, tel_secundario } = request.body;
            const sql = 'INSERT INTO TELEFONES (tel_primario, usu_id, tel_whatsapp, tel_principal, tel_secundario) VALUES (?, ?, ?, ?, ?);';
            const values = [tel_primario, usu_id, tel_whatsapp, tel_principal ? 1 : 0, tel_secundario];
            const execSql = await db.query(sql, values);
            const tel_id = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de telefone efetuado com sucesso.',
                dados: tel_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async editarTelefone(request, response) {
        try {
            const { tel_primario, usu_id, tel_whatsapp, tel_principal, tel_secundario } = request.body;
            const { tel_id } = request.params;
            const sql = 'UPDATE TELEFONES SET tel_primario = ?, usu_id = ?, tel_whatsapp = ?, tel_principal = ?, tel_secundario = ? WHERE tel_id = ?;';
            const values = [tel_primario, usu_id, tel_whatsapp, tel_principal ? 1 : 0, tel_secundario, tel_id];
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Telefone ${tel_id} atualizado com sucesso!`,
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async apagarTelefone(request, response) {
        try {
            const { tel_id } = request.params;
            const sql = 'DELETE FROM TELEFONES WHERE tel_id = ?;';
            const values = [tel_id];
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Telefone ${tel_id} excluído com sucesso.`,
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }
}
