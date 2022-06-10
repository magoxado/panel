import React from 'react';
import { useStoreState } from '@/state/hooks';
import { ServerContext } from '@/state/server';
import { history } from '@/components/history';
import StoreRouter from '@/routers/StoreRouter';
import ServerRouter from '@/routers/ServerRouter';
import { Router, Switch, Route } from 'react-router';
import DashboardRouter from '@/routers/DashboardRouter';
import { NotFound } from '@/components/elements/ScreenBlock';
import AuthenticationRouter from '@/routers/AuthenticationRouter';
import AuthenticatedRoute from '@/components/elements/AuthenticatedRoute';

const IndexRouter = () => {
    const enabled = useStoreState(state => state.storefront.data?.enabled);

    return (
        <Router history={history}>
            <Switch>
                <Route path={'/auth'}>
                    <AuthenticationRouter/>
                </Route>
                <AuthenticatedRoute path={'/server/:id'}>
                    <ServerContext.Provider>
                        <ServerRouter/>
                    </ServerContext.Provider>
                </AuthenticatedRoute>
                {enabled === 'true' &&
                    <AuthenticatedRoute path={'/store'}>
                        <StoreRouter/>
                    </AuthenticatedRoute>
                }
                <AuthenticatedRoute path={'/'}>
                    <DashboardRouter/>
                </AuthenticatedRoute>
                <Route path={'*'} component={NotFound} />
            </Switch>
        </Router>
    );
};

export default IndexRouter;