import React from "react"
import { AddCircleHalfDotIcon, Coupon01Icon, HelpSquareIcon, LanguageSkillIcon, Legal01Icon, Location09Icon, Notification03Icon, Notification03IconStroke, Store01IconStroke, UserStatusIcon, Wallet02Icon } from "../../constants/IconsPro"
import { COLORS, SIZES } from "../../constants/theme"

const SettingsData = {
   id: 'Settings',
   label: "Account Settings",
   description: "Manage your Doval profile, preferencesprivacy settings, and notifications.",
}

const Settings = [
    {
        id: 'General',
        label: 'General',
        content: [
            {
                id: 'Account',
                label: 'Account',
                navigation: 'Account',
                icon: <UserStatusIcon width={SIZES.icons} height={SIZES.icons} color={COLORS.light}/>
            },
            // {
            //     id: 'Privacy',
            //     label: 'Privacy',
            //     navigation: 'Privacy',
            //     icon: <AddCircleHalfDotIcon />
            // },
            // {
            //     id: 'Security',
            //     label: 'Security',
            //     navigation: 'Security',
            //     icon: <AddCircleHalfDotIcon />
            // },
            {
                id: 'Paymentmethods',
                label: 'Payment methods',
                navigation: 'PaymentsGeneral',
                icon: <Wallet02Icon width={SIZES.icons} height={SIZES.icons} color={COLORS.light}/>
            },
            {
                id: 'MyLocations',
                label: 'My Locations',
                navigation: 'MyLocationsGeneral',
                icon: <Location09Icon width={SIZES.icons} height={SIZES.icons} color={COLORS.light}/>
            },
            {
                id: 'MyCoupons',
                label: 'My Coupons',
                navigation: 'Coupons',
                icon: <Coupon01Icon width={SIZES.icons} height={SIZES.icons} color={COLORS.light}/>
            }
        ]
    },
    {
        id: 'Display',
        label: 'Display',
        content: [
            {
                id: 'Notifications',
                label: 'Notifications',
                navigation: 'Notifications',
                icon: <Notification03IconStroke width={SIZES.icons} height={SIZES.icons} color={COLORS.light}/>
            },
            {
                id: 'Languages & Currency',
                label: 'Languages & Currency',
                navigation: 'Languages',
                icon: <LanguageSkillIcon width={SIZES.icons} height={SIZES.icons} color={COLORS.light}/>
            },
            // {
            //     id: 'Dark Mode',
            //     label: 'Dark Mode',
            //     navigation: 'Dark Mode',
            //     icon: <AddCircleHalfDotIcon />
            // }
        ]
    },
    {
        id: 'Support and about',
        label: 'Support and about',
        content: [
            {
                id: 'Legal',
                label: 'Legal',
                navigation: 'Legal',
                icon: <Legal01Icon width={SIZES.icons} height={SIZES.icons} color={COLORS.light}/>
            },
            {
                id: 'Support',
                label: 'Support',
                navigation: 'Support',
                icon: <HelpSquareIcon width={SIZES.icons} height={SIZES.icons} color={COLORS.light}/>
            },
            {
                id: 'Report a problem',
                label: 'Report a problem',
                navigation: 'Report',
                icon: <HelpSquareIcon width={SIZES.icons} height={SIZES.icons} color={COLORS.light}/>
            },
            {
                id: 'Register business',
                label: 'Register business',
                navigation: 'RegisterBusiness',
                icon: <Store01IconStroke width={SIZES.icons} height={SIZES.icons} color={COLORS.light}/>
            },
            {
                id: 'Register delivery',
                label: 'Register delivery',
                navigation: 'RegisterDelivery',
                icon: <AddCircleHalfDotIcon width={SIZES.icons} height={SIZES.icons} color={COLORS.light}/>
            }
        ]
    }
]


export {
    SettingsData,
    Settings
}