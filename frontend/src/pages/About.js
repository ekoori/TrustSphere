//import React from 'react';

import '../styles/Pages.css';

const About = () => {
    return (
        <div className="page-main">
        <section className="about-intro">
            <h1>About TrustSphere</h1>
            <p>TrustSphere is a social network and gift economy platform designed to foster trust, collaboration, and mutual support among its members. Our mission is to create a community where individuals and organizations can connect, share resources, and work together towards common goals.</p>
        </section>
        <section className="about-philosophy">
            <h2>Our Philosophy</h2>
            <p>At TrustSphere, we believe in the power of trust and community. We envision a world where people come together to support each other, share their skills and resources, and create value for everyone involved. Our platform is built on the principles of trust, transparency, and collaboration.</p>
        </section>
        <section className="about-concepts">
            <h2>Key Concepts</h2>
            <div className="concept">
                <img src="static/gift_economy.png" alt="Gift Economy" className="concept-image"/>
                <div className="concept-content">
                    <h3>Gift Economy</h3>
                    <p>The gift economy is a system where resources and services are given without any explicit agreement for immediate or future rewards. In TrustSphere, members can offer their skills and resources to others, fostering a culture of generosity and mutual support.</p>
                </div>
            </div>
            <div className="concept">
                <img src="static/trustifacts.png" alt="Trustifacts" className="concept-image"/>
                <div className="concept-content">
                    <h3>TrustiFacts</h3>
                    <p>TrustiFacts are records of transactions and interactions between members. They serve as a testament to the trustworthiness and reliability of members within the community. By building a positive history of trustifacts, members can enhance their reputation and build stronger relationships.</p>
                </div>
            </div>
            <div className="concept">
                <img src="static/social_network.png" alt="Social Network" className="concept-image"/>
                <div className="concept-content">
                    <h3>Social Network</h3>
                    <p>TrustSphere functions as a social network where members can create profiles, join spheres (groups with common interests), and participate in projects. This allows for seamless collaboration and communication within the community.</p>
                </div>
            </div>

            <div className="concept">
                <img src="static/projects_spheres.png" alt="Projects and Spheres" className="concept-image"/>
                <div className="concept-content">
                    <h3>Projects and Spheres</h3>
                    <p>Projects are collaborative efforts where members can contribute their skills and resources towards a common goal. Spheres are groups of members with shared interests or objectives. Together, projects and spheres form the backbone of collaboration within TrustSphere.</p>
                </div>
            </div>
            <div className="concept">
                <img src="static/voting_governance.png" alt="Voting and Governance" className="concept-image"/>
                <div className="concept-content">
                    <h3>Voting and Governance</h3>
                    <p>TrustSphere emphasizes community governance. Members can participate in voting to make decisions about the union's governance, policies, and leadership. This democratic approach ensures that all voices are heard and considered.</p>
                </div>
            </div>
        </section>
        <section className="about-join">
            <h2>Join Us</h2>
            <p>If you share our vision of a collaborative, trust-based community, we invite you to join TrustSphere. Together, we can build a better future where everyone supports and uplifts each other.</p>
            <button className="btn-join">Join TrustSphere</button>
        </section>
    </div>
    );
};

export default About;
