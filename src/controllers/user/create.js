import dbConnection from '../../middlewere/dbConnection';

async function create (req, res) {
    if(!req.body.email) {
        return res.json({ })
    }
}