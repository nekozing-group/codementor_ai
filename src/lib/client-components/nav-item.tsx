'use client'

import { RedirectType, redirect } from "next/navigation"

interface Props {
  problemId: string
}

export default function NavItem(props: Props) {
  return (
    <li onClick={ () => redirect(`/${props.problemId}`, RedirectType.push) }><a>{ props.problemId }</a></li>
  )
}