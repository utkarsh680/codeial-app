const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});





const development = {
    name:'development',
    asset_path: './assets',
    session_cookie_key:"blahsomething",
    db: "codeial_development",
    smtp:{

    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: 'singhrishu680@gmail.com',
        pass: 'ytibxwqjxulyejzz'
    }
},
    google_clientID:"449169790954-jh8v57so6ud3sbkn4ua37ktlb2i0bnkk.apps.googleusercontent.com",
    google_clientSecret:"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",
    google_callbackURL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',
    morgan:{
        mode:'dev',
        options: {stream:accessLogStream}
    }


}

const production = {
    name:'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB ,
    smtp:{

    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: process.env.CODEIAL_GMAIL_USERNAME,
        pass: process.env.CODEIAL_GMAIL_PASSWORD
    }
},
    google_clientID:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_clientSecret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callbackURL:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options: {stream:accessLogStream}
    }

}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT)== undefined ? development:eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports = production;