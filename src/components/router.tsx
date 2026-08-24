import { createBrowserRouter } from 'react-router-dom';
import { createAppRoutes } from './router-config';

/** Data router (as opposed to a plain BrowserRouter); required by the react-router-dom
 * view transitions, which power the section enter/exit animations
 */
export const router = createBrowserRouter(createAppRoutes());
