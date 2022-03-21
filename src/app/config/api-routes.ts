export const API_ROUTES = {
    account: {
        get: {
            oneByUserId: 'accountusers/account'
        },
        post: {
            uploadPhoto:  'accountusers/upload-photo'
        },
        put: {
            isProfessional: 'accountusers/is-professional',
            updateGeneralInformations:  'accountusers/update-general-informations',
            updateContactInformations:  'accountusers/update-contact-informations',
            updateSituationInformations:  'accountusers/update-situation-informations'
        },
        delete: {
            delete: 'accountusers/delete'
        }
    },
    agglomerations: {
        get: {
            all: 'agglomerations/all',
            onById: 'agglomerations/one-by-id'
        },
        post: {
            create: 'agglomerations/create'
        },
        put: {
            update: 'agglomerations/update'
        },
        delete: {
            delete: 'agglomerations/delete'
        }
    },
    auth:  {
        post: {
            login: 'authusers/login',
            register: 'authusers/register',
            confirmEmail: 'authusers/confirm-email',
            forgottenPassword: 'authusers/forgotten-password',
            resetPassword: 'authusers/reset-password'
        },
        put: {
            changePassword: 'authusers/change-password'
        }
    },
    contracts: {
        get: {
            oneById: 'contracts/one-by-id'
        },
        post: {
            accept: 'contractuseracceptances/create'
        }
    },
    companies: {
        get: {
            allJobUsersCompanies: 'jobusers/companies/all',
            oneBySlug: 'companies/one-by-slug'
        },
    },
    jobs: {
        get: {
            allJobDomains: 'jobdomains/all',
            allJobUsersByUserId: 'jobusers/all/by-user-id'
        },
        post: {
            create: 'jobusers/create'
        },
        put: {
            update: 'jobusers/update'
        },
        delete: {
            delete: 'jobusers/delete'
        }
    },
    messaging: {
        post: {
            sendMessage:  'messaging/messages/send',
            sendMessageWithProposals:  'messaging/messages/sendproposal',
            sendReview: 'messaging/messages/review'
        },
        put: {
            markAsReadConversation: 'messaging/conversations/mark-as-read',
            markAsUnreadConversation: 'messaging/conversations/mark-as-unread',
            markAsReadMessage: 'messaging/messages/mark-as-read',
            markAsUnreadMessage: 'messaging/messages/mark-as-unread',
            updateProposal: 'messaging/messages/proposal-update'
        },
        delete: {
            deleteConversation: 'messaging/conversations/delete'
        }
    },
    search: {
        post: {
            searchPublic: 'jobsearches/search-public',
            searchRestricted: 'jobsearches/search-restricted'
        }
    },
    userFavorites: {
        post: {
            add: 'userfavorites/create'
        },
        delete: {
            remove: 'userfavorites/delete'
        }
    },
    userMeetings: {
        post: {
            create: 'usermeetings/create'
        }
    },
    userReporting: {
        get: {
            allReportingReasons: 'userreportingreasons/all'
        },
        post: {
            create: 'userreported/create'
        }
    },
    users: {
        get: {
            allDegrees: 'userdegrees/all',
            allContactInformations: 'usercontactinformations/all',
            allContactMethods: 'usercontactmethods/all',
            allProfessionalSituations: 'userprofessionalsituations/all',
            publicOneByUserId: 'public/one-by-id',
            restrictedOneByUserId: 'restricted/one-by-id'
        }
    },
    promotions: {
        get: {
            allForSearchForm: 'offersubscriptions/all-promotes-for-search-form'
        }
    }
};
