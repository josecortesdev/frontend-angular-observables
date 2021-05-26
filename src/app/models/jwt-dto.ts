export class JwtDTO {
    token: string;  // Esta va a tener un token
    constructor(token: string) {
        this.token = token;
    }
}
