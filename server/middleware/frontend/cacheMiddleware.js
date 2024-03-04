import redis from 'redis';
import { promisify } from 'util';

const redisClient = redis.createClient();

const getAsync = promisify(redisClient.get).bind(redisClient);
const setexAsync = promisify(redisClient.setex).bind(redisClient);

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;

  getAsync(key)
    .then(data => {
      if (data) {
        
        res.json(JSON.parse(data));
      } else {
       
        next();
      }
    })
    .catch(err => {
      console.error('Error retrieving data from cache:', err);
      next(); 
    });
};

export default cacheMiddleware;
