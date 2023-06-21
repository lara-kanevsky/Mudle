class Usuario{
    constructor(username, mail, password,tipoUsuario) {
        this.username = username;
        this.mail = mail;
        this.password = password;
        this.tipoUsuario = tipoUsuario??"default";
        this.items = [];
        this.moodleCredentials = null;
    }
}

module.exports = Usuario;