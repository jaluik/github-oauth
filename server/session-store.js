function getRedisSessionId(sid) {
    return `ssid:${sid}`
}

class RedisSessionStore {
    constructor(client) {
        this.client = client
    }

    async get(sid) {
        console.log('get session: ', sid)
        const sstr = getRedisSessionId(sid)
        const data = await this.client.get(sstr)
        if (!data) {
            return null
        }
        try {
            const result = JSON.parse(data)
            return result
        } catch (err) {
            console.log(err)
        }
    }

    async set(sid, sess, ttl) {
        console.log('set session: ', sid)
        const sstr = getRedisSessionId(sid)
        if (typeof ttl === 'number') {
            ttl = Math.ceil(ttl / 1000)
        }
        try {
            const data = JSON.stringify(sess)
            if (ttl) {
                await this.client.setex(sstr, ttl, data)
            } else {
                await this.client.set(sstr, data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    async destroy(sid) {
        console.log('destroy session: ', sid)
        const sstr = getRedisSessionId(sid)
        await this.client.del(sstr)
    }
}

module.exports = RedisSessionStore
