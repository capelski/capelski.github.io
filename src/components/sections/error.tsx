import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { blogRoute, portfolioRoute } from '../routes';
import { SectionContainer } from '../section-container';

export const Error: React.FC = () => (
    <SectionContainer
        contentStyle={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}
        links={
            <React.Fragment>
                <NavLink to={blogRoute.path} className="link" viewTransition={true}>
                    ⬅️ Blog
                </NavLink>
                <NavLink to={portfolioRoute.path} className="link" viewTransition={true}>
                    Portfolio ➡️
                </NavLink>
            </React.Fragment>
        }
        linksStyle={{ justifyContent: 'space-between' }}
        sectionName="error"
        viewTransitionName="error"
    >
        <Helmet>
            <title>Carles Capellas</title>
            <meta
                name="description"
                content="Something went wrong... You are not supposed to be here"
            />
        </Helmet>
        <h1 className="error-title">Something went wrong</h1>
        <img
            className="error-image"
            src="/images/shrug.png"
            alt="Shrug meme"
            style={{
                display: 'block',
                margin: '32px auto',
                maxHeight: 250,
                maxWidth: '100%'
            }}
        />
    </SectionContainer>
);
