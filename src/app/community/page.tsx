import data from "./community.json";

type FacultyMember = {
  name: string;
  role: string;
  field: string;
};

type AmbassadorMember = {
  name: string;
  field: string;
};

type RoleGroup = {
  label: string;
  members: AmbassadorMember[];
};

type Team = {
  id: string;
  name: string;
  tag: string;
  roles: RoleGroup[];
};

type FacultySectionData = {
  id: string;
  title: string;
  type: "faculty";
  members: FacultyMember[];
};

type AmbassadorSectionData = {
  id: string;
  title: string;
  type: "ambassador";
  teams: Team[];
};

type SectionData = FacultySectionData | AmbassadorSectionData;

type CommunityData = {
  sections: SectionData[];
};

const communityData = data as CommunityData;

function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <div className="faculty-card">
      <p className="card-name">{member.name}</p>
      <p className="card-role">{member.role}</p>
      <hr className="card-divider" />
      <p className="card-field">{member.field}</p>
    </div>
  );
}

function AmbassadorCard({ member }: { member: AmbassadorMember }) {
  return (
    <div className="ambassador-card">
      <p className="card-name">{member.name}</p>
      <p className="card-field">{member.field}</p>
    </div>
  );
}

function FacultySectionBlock({ section }: { section: FacultySectionData }) {
  return (
    <section className="section">
      <div className="section-header section-header-blue">
        <h2 className="section-title">{section.title}</h2>
        <span className="section-count">{section.members.length}명</span>
      </div>

      <div className="card-grid">
        {section.members.map((member) => (
          <FacultyCard key={`${section.id}-${member.name}`} member={member} />
        ))}
      </div>
    </section>
  );
}

function AmbassadorSectionBlock({
  section,
}: {
  section: AmbassadorSectionData;
}) {
  const totalCount = section.teams.reduce((teamAcc, team) => {
    const teamCount = team.roles.reduce(
      (roleAcc, role) => roleAcc + role.members.length,
      0
    );

    return teamAcc + teamCount;
  }, 0);

  return (
    <section className="section">
      <div className="section-header section-header-green">
        <h2 className="section-title">{section.title}</h2>
        <span className="section-count">
          {section.teams.length}팀 · {totalCount}명
        </span>
      </div>

      {section.teams.map((team, teamIdx) => (
        <div
          key={team.id}
          className={`team-block${
            teamIdx < section.teams.length - 1 ? " team-block--bordered" : ""
          }`}
        >
          <p className="team-label">
            {team.name}
            <span className="team-tag">{team.tag}</span>
          </p>

          <hr className="team-divider" />

          {team.roles.map((roleGroup) => (
            <div key={`${team.id}-${roleGroup.label}`} className="role-group">
              <p className="role-label">{roleGroup.label}</p>

              <div className="card-grid">
                {roleGroup.members.map((member) => (
                  <AmbassadorCard
                    key={`${team.id}-${roleGroup.label}-${member.name}`}
                    member={member}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export default function CommunityPage() {
  return (
    <>
      <style>{`
        .community-page {
          max-width: 960px;
          margin: 0 auto;
          padding: 4rem 1.5rem 5rem;
          font-family: inherit;
        }

        .page-title {
          font-size: 34px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.5rem;
          letter-spacing: -0.03em;
        }

        .page-subtitle {
          font-size: 15px;
          color: #6b7280;
          margin: 0 0 3.5rem;
          line-height: 1.6;
        }

        .section {
          margin-bottom: 3.5rem;
        }

        .section-header {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
        }

        .section-header-blue {
          border-bottom: 1.5px solid #378add;
        }

        .section-header-green {
          border-bottom: 1.5px solid #639922;
        }

        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .section-count {
          font-size: 13px;
          color: #9ca3af;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
        }

        .faculty-card,
        .ambassador-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 1rem 1.1rem;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
        }

        .card-name {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 4px;
        }

        .card-role {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 10px;
        }

        .card-divider {
          border: none;
          border-top: 1px solid #eeeeee;
          margin: 0 0 10px;
        }

        .card-field {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
          margin: 0;
        }

        .team-block {
          margin-bottom: 2rem;
        }

        .team-block--bordered {
          padding-bottom: 2rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .team-label {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.875rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .team-tag {
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          background: #f5f5f5;
          border: 1px solid #e5e7eb;
          border-radius: 999px;
          padding: 3px 10px;
        }

        .team-divider {
          border: none;
          border-top: 1px solid #eeeeee;
          margin: 0 0 1rem;
        }

        .role-group {
          margin-bottom: 1.25rem;
        }

        .role-group:last-child {
          margin-bottom: 0;
        }

        .role-label {
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
          margin: 0 0 7px;
          letter-spacing: 0.03em;
        }

        @media (max-width: 640px) {
          .community-page {
            padding: 3rem 1rem 4rem;
          }

          .page-title {
            font-size: 28px;
          }

          .card-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main className="community-page">
        <h1 className="page-title">Community</h1>
        <p className="page-subtitle">
          Dream-AI 강사진과 Ambassador를 소개합니다.
        </p>

        {communityData.sections.map((section) => {
          if (section.type === "faculty") {
            return (
              <FacultySectionBlock key={section.id} section={section} />
            );
          }

          return (
            <AmbassadorSectionBlock key={section.id} section={section} />
          );
        })}
      </main>
    </>
  );
}