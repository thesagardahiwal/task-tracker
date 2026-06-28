import { Router } from 'express';
import { getDashboardSummary } from '../controllers/dashboard.controller';

const router = Router();

router.route('/summary').get(getDashboardSummary);

export default router;
