'use client'

import * as React from 'react'
import { UserButton } from '@clerk/nextjs'
import { OrganizationSwitcher } from '@clerk/nextjs'

const Navbar: React.FC = () => {
    return (
        <nav className='flex items-center justify-between p-4'>
            <div>
                <h1 className='font-semibold text-2xl'>Tenantrix</h1>
            </div>
            <div className='flex justify-center items-center gap-2'>
                <OrganizationSwitcher afterSelectOrganizationUrl="/org/:slug" />
                <UserButton />
            </div>
        </nav>
    )
}

export default Navbar