"use client";

import { useState } from "react";
import data from "./community.json";

type FacultyMember = {
  name: string;
  role: string;
  field: string;
};

type FacultyGroup = {
  id: string;
  label: string;
  members: FacultyMember[];
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

type Cohort = {
  id: string;
  label: string;
  teams: Team[];
};

type FacultySectionData = {
  id: string;
  title: string;
  type: "faculty";
  groups: FacultyGroup[];
};

type AmbassadorSectionData = {
  id: string;
  title: string;
  type: "ambassador";
  cohorts: Cohort[];
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

function getRoleLabel(label: string) {
  if (label === "앰버서더") {
    return "앰배서더";
  }

  return label;
}

function FacultySectionBlock({
  section,
}: {
  section: FacultySectionData;
}) {
  const totalCount = section.groups.reduce(
    (acc, group) => acc + group.members.length,
    0
  );

  return (
    <section className="section">
      <div className="section-header section-header-blue">
        <h2 className="section-title">Dream-AI 운영진</h2>
        <span className="section-count">{totalCount}명</span>
      </div>

      <div className="faculty-groups">
        {section.groups.map((group) => (
          <div className="faculty-group" key={group.id}>
            <div className="group-heading">
              <h3 className="group-title">{group.label}</h3>
              <span className="group-count">
                {group.members.length}명
              </span>
            </div>

            <div className="card-grid">
              {group.members.map((member) => (
                <FacultyCard
                  key={`${group.id}-${member.name}`}
                  member={member}
                />
              ))}
            </div>
          </div>
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
  const latestCohortId =
    section.cohorts[section.cohorts.length - 1]?.id ?? "";

  const [activeCohortId, setActiveCohortId] =
    useState(latestCohortId);

  const activeCohort =
    section.cohorts.find(
      (cohort) => cohort.id === activeCohortId
    ) ?? section.cohorts[0];

  if (!activeCohort) {
    return null;
  }

  const totalCount = activeCohort.teams.reduce(
    (teamAcc, team) => {
      const teamCount = team.roles.reduce(
        (roleAcc, role) =>
          roleAcc + role.members.length,
        0
      );

      return teamAcc + teamCount;
    },
    0
  );

  return (
    <section className="section">
      <div className="section-header section-header-green">
        <h2 className="section-title">AI Ambassador</h2>

        <span className="section-count">
          {section.cohorts.length}개 기수
        </span>
      </div>

      <div className="cohort-toolbar">
        <div
          className="cohort-tabs"
          role="tablist"
          aria-label="AI Ambassador 기수 선택"
        >
          {section.cohorts.map((cohort) => {
            const isActive =
              cohort.id === activeCohort.id;

            return (
              <button
                key={cohort.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`cohort-tab${
                  isActive
                    ? " cohort-tab--active"
                    : ""
                }`}
                onClick={() =>
                  setActiveCohortId(cohort.id)
                }
              >
                {cohort.label}
              </button>
            );
          })}
        </div>

        <p className="cohort-summary">
          {activeCohort.teams.length}팀 · {totalCount}명
        </p>
      </div>

      <div className="cohort-content">
        {activeCohort.teams.map(
          (team, teamIdx) => {
            const teamCount = team.roles.reduce(
              (acc, role) =>
                acc + role.members.length,
              0
            );

            return (
              <div
                key={`${activeCohort.id}-${team.id}`}
                className={`team-block team-block--${team.id}${
                  teamIdx <
                  activeCohort.teams.length - 1
                    ? " team-block--bordered"
                    : ""
                }`}
              >
                <div className="team-heading">
                  <p className="team-label">
                    {team.name}

                    <span className="team-tag">
                      {team.tag}
                    </span>
                  </p>

                  <span className="team-count">
                    {teamCount}명
                  </span>
                </div>

                <hr className="team-divider" />

                {team.roles.map(
                  (roleGroup) => (
                    <div
                      key={`${activeCohort.id}-${team.id}-${roleGroup.label}`}
                      className="role-group"
                    >
                      <div className="role-heading">
                        <p className="role-label">
                          {getRoleLabel(
                            roleGroup.label
                          )}
                        </p>

                        <span className="role-count">
                          {roleGroup.members.length}명
                        </span>
                      </div>

                      <div className="card-grid">
                        {roleGroup.members.map(
                          (member) => (
                            <AmbassadorCard
                              key={`${activeCohort.id}-${team.id}-${roleGroup.label}-${member.name}`}
                              member={member}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}

export default function CommunityPage() {
  return (
    <>
      <style>{`
        .community-page {
          max-width: 1080px;
          margin: 0 auto;
          padding: 4rem 2rem 5rem;
          font-family: inherit;
        }

        .page-title {
          font-size: 40px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.7rem;
          letter-spacing: -0.04em;
          line-height: 1.2;
        }

        .page-subtitle {
          font-size: 17px;
          color: #6b7280;
          margin: 0 0 4rem;
          line-height: 1.7;
        }

        .section {
          margin-bottom: 4.5rem;
        }

        .section-header {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 1.75rem;
          padding-bottom: 0.9rem;
        }

        .section-header-blue {
          border-bottom: 2px solid #378add;
        }

        .section-header-green {
          border-bottom: 2px solid #639922;
        }

        .section-title {
          font-size: 25px;
          font-weight: 700;
          color: #111827;
          margin: 0;
          letter-spacing: -0.03em;
        }

        .section-count {
          font-size: 14px;
          color: #9ca3af;
        }

        /* 운영진 */

        .faculty-groups {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .faculty-group {
          width: 100%;
        }

        .group-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.85rem;
        }

        .group-title {
          font-size: 17px;
          font-weight: 700;
          color: #374151;
          margin: 0;
        }

        .group-count {
          font-size: 13px;
          color: #9ca3af;
        }

        /* 카드 */

        .card-grid {
          display: grid;
          grid-template-columns:
            repeat(auto-fill, minmax(210px, 1fr));
          gap: 12px;
        }

        .faculty-card,
        .ambassador-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.2rem 1.3rem;
          box-shadow:
            0 3px 12px rgba(0, 0, 0, 0.04);
        }

        .faculty-card {
          min-height: 125px;
        }

        .ambassador-card {
          min-height: 82px;
        }

        .card-name {
          font-size: 17px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 5px;
          line-height: 1.4;
        }

        .card-role {
          font-size: 14px;
          color: #4b5563;
          margin: 0 0 12px;
          line-height: 1.5;
        }

        .card-divider {
          border: none;
          border-top: 1px solid #eeeeee;
          margin: 0 0 11px;
        }

        .card-field {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
        }

        /* 기수 탭 */

        .cohort-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .cohort-tabs {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f3f4f6;
          padding: 5px;
          border-radius: 12px;
        }

        .cohort-tab {
          border: 0;
          background: transparent;
          color: #6b7280;
          min-width: 72px;
          padding: 10px 20px;
          border-radius: 9px;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .cohort-tab:hover {
          color: #374151;
        }

        .cohort-tab--active {
          background: #ffffff;
          color: #386414;
          font-weight: 700;
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .cohort-summary {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        /* 팀 */

        .cohort-content {
          width: 100%;
        }

        .team-block {
          margin-bottom: 2.5rem;
        }

        .team-block--bordered {
          padding-bottom: 2.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .team-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .team-label {
          font-size: 21px;
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 9px;
          letter-spacing: -0.025em;
        }

        .team-tag {
          font-size: 12px;
          font-weight: 700;
          border-radius: 999px;
          padding: 4px 11px;
        }

        .team-count {
          font-size: 13px;
          color: #9ca3af;
        }

        .team-divider {
          border: none;
          border-top: 1px solid #eeeeee;
          margin: 0 0 1.5rem;
        }

        .role-group {
          margin-bottom: 1.8rem;
        }

        .role-group:last-child {
          margin-bottom: 0;
        }

        .role-heading {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 10px;
        }

        .role-label {
          font-size: 14px;
          font-weight: 700;
          margin: 0;
        }

        .role-count {
          font-size: 12px;
          color: #9ca3af;
        }

        /* DT팀 - 파랑 */

        .team-block--dt .team-label {
          color: #174b8a;
        }

        .team-block--dt .team-tag {
          color: #174b8a;
          background: #eaf3fc;
          border: 1px solid #b9d7f3;
        }

        .team-block--dt .role-label {
          color: #174b8a;
        }

        /* AA팀 - 초록 */

        .team-block--aa .team-label {
          color: #4f7927;
        }

        .team-block--aa .team-tag {
          color: #4f7927;
          background: #eef6e8;
          border: 1px solid #c9dfb5;
        }

        .team-block--aa .role-label {
          color: #4f7927;
        }

        /* 모바일 */

        @media (max-width: 768px) {
          .community-page {
            padding: 3rem 1rem 4rem;
          }

          .page-title {
            font-size: 34px;
          }

          .page-subtitle {
            font-size: 16px;
            margin-bottom: 3rem;
          }

          .section {
            margin-bottom: 3.5rem;
          }

          .section-title {
            font-size: 22px;
          }

          .cohort-toolbar {
            align-items: flex-start;
            flex-direction: column;
          }

          .cohort-tabs {
            width: 100%;
            overflow-x: auto;
          }

          .cohort-tab {
            flex: 1;
            white-space: nowrap;
          }

          .card-grid {
            grid-template-columns: 1fr;
          }

          .team-label {
            font-size: 18px;
          }

          .team-heading {
            align-items: flex-start;
          }
        }
      `}</style>

      <main className="community-page">
        <h1 className="page-title">Community</h1>

        <p className="page-subtitle">
          Dream-AI 운영진과 AI Ambassador를 소개합니다.
        </p>

        {communityData.sections.map((section) => {
          if (section.type === "faculty") {
            return (
              <FacultySectionBlock
                key={section.id}
                section={section}
              />
            );
          }

          return (
            <AmbassadorSectionBlock
              key={section.id}
              section={section}
            />
          );
        })}
      </main>
    </>
  );
}