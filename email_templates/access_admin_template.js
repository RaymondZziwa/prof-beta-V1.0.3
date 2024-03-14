export const AccessAdminEmailTemplate = (accessCode) => {
    return(
        `
            A one time prof bioresearch admin dashboard access code has been requested.
            Code: ${accessCode}
            Note: This code is only valid for 30 minutes. Please use it to log into the Prof BioResearch Admin Dashboard.
            
            Ignore if you don't recognize this email.

            System developed and managed by  the Aloatech Team 2021-present.
        `
    )
};