class AppConfig {
    readonly port : number = 4700
    readonly routePrefix = "/api/v1";
    readonly doormanKey = "GZs7Y!82b@kF%9Rlz3xJp#4Q^nWcVmA&dThUo";
    readonly jwtSecrete = "aS4@!C9n&X8qL#Zk2Rt^7MgWpV3jT$Yh*F6e";
    readonly dbConfig = {
        host: 'localhost',
        port: 3306,
        database: 'parking',
        user: 'root',
        password: ''
    }
}

export const appConfig = new AppConfig()