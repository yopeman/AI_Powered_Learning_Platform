const request_parser = async (req, res, next)=>{
    
    if (process.env.NODE_ENV === 'production') {
        return next();
    }

    console.log('\n\n\n------------------------------------------------------------------------------------------------------------');
    console.log(`${req.method} ${req.protocol}://${req.host}${req.originalUrl}`);
    console.log('body', req.body);
    console.log('params', req.params);
    console.log({heders: req.headers.authorization});
    console.log('query', req.query);
    
    next();
}

export default request_parser;