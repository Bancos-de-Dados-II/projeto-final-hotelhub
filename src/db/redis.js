import Redis from 'ioredis'

class RedisClient {
    constructor() {
        this.client = new Redis('redis://localhost:6379')

        this.client.on('connect', () => {
            console.log('Redis connected')
        })

        this.client.on('error', (err) => {
            console.error('Erro ao conectar ao Redis:', err);
        });
    }

    getClient() {
        return this.client;
    }
}

const redisClientInstance = new RedisClient();
export default redisClientInstance.getClient()