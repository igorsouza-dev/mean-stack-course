const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user');
const env = require('../../.env');

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/;

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = [];
    _.forIn(dbErrors.errors, error => errors.push(error.message));
    return res.status(400).json({errors});
};

const login = (req, res) => {
    const email = req.body.email || '';
    const password = req.body.password || '';
    //find user by email and passord
    User.findOne({email}, (err, user) => {
        if(err) {
            return sendErrorsFromDB(res, err)
        } else if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: "1 day"
            });
            const { name, email } = user;
            res.json({ name, email, token });
        } else {
            return res.status(400).send({errors: ['Usuário/Senha inválidos']});
        }
    })
};

const validateToken = (req, res, next) => {
    const token = req.body.token || '';
    jwt.verify(token, env.authSecret, function(err, decoded) {
        return res.status(200).send({valid: !err});
    });
};

const signup = (req, res, next) => {
    const name = req.body.name || '';
    const email = req.body.email || '';
    const password = req.body.password || '';
    const confirmPassword = req.body.confirm_password || '';

    //validade email using the email regex
    if(!email.match(emailRegex)) {
        return res.status(400).send({errors: ['O e-mail informado está inválido']});
    }

    //validade the password using the password regex
    if(!password.match(passwordRegex)) {
        return res.status(400).send({errors: ["Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-12."]});
    }

    //generate hash
    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);

    //compares it with the confirmation password
    if(!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({errors: ['Senhas não conferem.']});
    }

    //checks if there is already a registered email on the database
    User.findOne({email}, (err, user) => {
        if(err) {
            return sendErrorsFromDB(res, err);
        } else if (user) {
            return res.status(400).send({errors: ['Usuário já cadastrado.']});
        } else {
            const newUser = new User({ name, email, password: passwordHash });//send hash instead of the password
            newUser.save(err => {
                if(err) {
                    return sendErrorsFromDB(res, err);
                } else {
                    login(req, res, next);
                }
            });
        }
    });
};

module.exports = { login, signup, validateToken };