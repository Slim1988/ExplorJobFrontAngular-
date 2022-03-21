export const CONFIG = {
    account: {
        refresh: {
            interval: 240000 // 4 minutes
        }
    },
    contracts: {
        cgu: {
            id: 'e3eefaa1-270c-48c4-baca-6fd3d5e427ed',
            context: 'webapp',
            name: 'CGU',
            version: 'v1'
        },
        legalNotices: {
            id: '2d4d467a-992c-4c4c-a932-a6772bdc8d1e',
            context: 'webapp',
            name: 'Mentions Légales',
            version: 'v1'
        }
    },
    dates: {
        api: {
            empty: '0001-01-01T00:00:00'
        }
    },
    explorJob: {
        jobs: {
            noFoundForm: 'https://www.explorjob.com/vous-navez-pas-trouve-le-metier-recherche'
        },
        users: {
            photo: {
                default: 'assets/images/users/photo-default.png'
            }
        },
        socialMedias: {
            facebook: 'https://www.facebook.com/explorjob',
            linkedIn: 'https://fr.linkedin.com/company/explorjob',
            instagram: 'https://www.instagram.com/explor.job'
        },
        help: {
            contactEmail: 'contact@explorjob.com',
            faqUrl: 'https://explorjob.com/faq',
            videoUrls: {
                explorer: 'https://www.youtube.com/watch?v=0fEChvLlzlY',
                professional: 'https://www.youtube.com/watch?v=fNYYkYnMObA'
            }
        }
    },
    http: {
        options: {
            headers: {
                'content-type' : 'application/json',
                'access-control-allow-origin' : '*'
            }
        },
        resilience: {
            retry: {
                methods: {
                    get: 3,
                    post: 0,
                    put: 0,
                    delete: 0
                }
            }
        }
    },
    masks: {
        phone: '99 99 99 99 99',
        zipCode: '99 999'
    },
    messaging: {
        refresh: {
            interval: 60000 // 1 minute
        }
    },
    promotions: {
        slidersIntervals : {
            logoOnly: 5000,
            logoAndMessage: 5000, // in seconds
        }
    },
    restrictions: {
        jobs: {
            label: {
                maxLength: 150
            },
            company: {
                maxLength: 125
            },
            presentation: {
                maxLength: 500
            }
        },
        messages: {
            maxLength: 500
        },
        users: {
            firstName: {
                minLength: 3,
                maxLength: 100
            },
            lastName: {
                minLength: 3,
                maxLength: 100
            },
            address: {
                street: {
                    minLength: 1,
                    maxLength: 175
                },
                complement: {
                    minLength: 1,
                    maxLength: 175
                },
                city: {
                    minLength: 1,
                    maxLength: 100
                }
            },
            presentation: {
                maxLength: 500
            },
            currentCompany: {
                maxLength: 125
            },
            currentSchool: {
                maxLength: 125
            }
        },
        passwords: {
            minLength: 8
        }
    },
    cookies: {
        name: 'cookie-explorjob',
        IdMeasure: 'G-SPG0TCCTPD',
        disableString: 'ga-disable-G-SPG0TCCTPD',
        domains: [
            'explorjob.com',
            'app.explorjob.com'
        ]
    },
};
