import App from 'koa';
import cors from '@koa/cors'; // Move this import statement up
import apiRouter from '../routes/api';

// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;

// Register all routes for the application
const router = apiRouter();
api.use(cors());
api.use(router.allowedMethods());
api.use(router.routes());

export default api;
