import React from "react";


const teams = [
    { name: "Amit Sharma", role: "Founder & CEO", image: "/images/team1.jpg" },
    { name: "Priya Patel", role: "Sales Manager", image: "/images/team2.jpg" },
    { name: "Rahul Verma", role: "Technical Lead", image: "/images/team3.jpg" },
    { name: "Neha Singh", role: "Customer Support", image: "/images/team4.jpg" },
];

const Team: React.FC = () => {
    return (
        <section className="part bg-grey">
            <div className="wrapper">
                <h2 className="part-title">Meet Our Team</h2>
                <h2 className="part-title-sub mb-3">The people behind your perfect ride</h2>
                <div className="d-flex-center">
                    {teams.map((member, index) => (
                        <div className="team-card bg-white" key={index}>
                            <img src={member.image} alt={member.name} className="team-img" />
                            <h2>{member.name}</h2>
                            <h3>{member.role}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Team;