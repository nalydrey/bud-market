export enum Server {
    PROTOCOL = 'http',
    ADRESS = 'localhost',
    PORT = 3030
}

export const SERVER_PATH = `${Server.PROTOCOL}://${Server.ADRESS}:${Server.PORT}/`