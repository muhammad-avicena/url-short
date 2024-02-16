import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'yaml';

const openApiPath = 'api-docs.yaml';
const readApiFile = fs.readFileSync(openApiPath, 'utf8');
const swaggerDocs = yaml.parse(readApiFile);

const router = Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
