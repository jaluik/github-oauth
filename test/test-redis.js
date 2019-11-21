async function test() {
    const Redis = require('ioredis')

    const redis = new Redis({
        port: 6378,
        password: 123456,
    })

    await redis.set('a', 123)
    await redis.setex('b', 5, 234)
    const keys = await redis.keys('*')

    console.log(keys)
    console.log(await redis.get('a'))
    console.log(await redis.get('b'))
}

test()
