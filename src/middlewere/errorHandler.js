import { logEvents } from './logger';

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.handler}`, 'errLog.log')
    console.log(req.handler, err.stack);

    const status = res.statusCode ? res.statusCode : 500 //server error

    res.status(status);
    res.json({ message: err.message })
}

export default errorHandler;