let test;

class TestDAO {

    static async injectDB(conn) {
        if(test) return;
        try {
            test = await conn.db(process.env.DB_NS).collection('test');
        } catch(err) {
            console.log('Errror occurred...');
        }
    }

    static async getRecords() {
        if(!test) throw Error('Collection not initialized');
        return await test.findOne({});
    }
}

module.exports = TestDAO;