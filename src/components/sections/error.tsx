import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { blogRoute, portfolioRoute, RouteComponentProps } from '../routes';
import { SectionContainer } from '../section-container';

export const Error: React.FC<Partial<RouteComponentProps>> = (props) => (
    <SectionContainer
        containerRef={props.containerRef}
        links={
            <React.Fragment>
                <NavLink to={blogRoute.path} className="link">
                    ⬅️ Blog
                </NavLink>
                <NavLink to={portfolioRoute.path} className="link">
                    Portfolio ➡️
                </NavLink>
            </React.Fragment>
        }
        sectionName="error"
    >
        <Helmet>
            <title>Carles Capellas</title>
            <meta
                name="description"
                content="Something went wrong... You are not supposed to be here"
            />
        </Helmet>
        <h1 className="error-title">Something went wrong</h1>
        <img className="error-image" src="/images/shrug.png" alt="Shrug meme" />
    </SectionContainer>
);
