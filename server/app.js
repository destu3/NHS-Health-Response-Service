import express from 'express';
import morgan from 'morgan';

// import routers
import appointmentRouter from './routers/appointmentRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import facilityRouter from './routers/facilityRouter.js';
import healthProfileRouter from './routers/healthProfileRouter.js';
import prescriptionRouter from './routers/prescriptionRouter.js';
import serviceRouter from './routers/serviceRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();

// request body parser
app.use(express.json());

// log request info
if (process.env.APP_ENV !== 'production') app.use(morgan('dev'));

// mount routers
app.use('/api/appointments', appointmentRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/facilities', facilityRouter);
app.use('/api/healthProfiles', healthProfileRouter);
app.use('/api/prescriptions', prescriptionRouter);
app.use('/api/services', serviceRouter);
app.use('/api/users', userRouter);

export default app;
