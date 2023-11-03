'use server'

import React, { ReactNode } from 'react';
import { getProblemList } from '../server-functions/clients';
import { redirect } from 'next/dist/server/api-utils';
import NavItem from '../client-components/nav-item';
import Link from 'next/link';

type ProblemNavProps = {
  children: ReactNode;
}

export default async function ProblemNav(props: ProblemNavProps) {
  const problems = await getProblemList();
  console.log(problems);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        {props.children}
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          {
            problems.map(problemId => { 
              return <li><Link href={ `/problems/${problemId}` }>{ problemId }</Link></li>
            })
          }
        </ul>
      </div>
    </div>
  )
}