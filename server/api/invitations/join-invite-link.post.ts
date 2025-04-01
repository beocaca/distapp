import { addToOrg } from "../add-me-to-org.get"

export default defineEventHandler(async (event) => {
    const { link } = await readBody(event)
    const payload = await verifyToken(event, link)
    const orgId: string = payload.id
    const email: string = payload.email
    if (!payload || !orgId || !email) {
        throw createError({
            statusCode: 400,
            message: 'Invitation code expired or invalid',
        })
    }
    try {
        await addToOrg(event, orgId, email)
    } catch (e) {
        if (`${e}`.includes('UNIQUE constraint failed: organizationsPeople.userId')) {
            throw createError({
                statusCode: 400,
                message: 'You already join invitation',
            })
        } else {
            throw e
        }
    }
    return {
        message: 'added',
    }
})
