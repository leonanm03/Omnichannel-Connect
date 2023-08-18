import { Router } from 'express'
const routes = Router()

routes.get('/health', (_req, res) => res.send('OK'))

export default routes
