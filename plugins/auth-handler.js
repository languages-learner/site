export default async context => {
    context.app.$fireAuth.onAuthStateChanged(async function(user) {
        if (user) {
            // User is signed in.
            await context.store.dispatch('user/authUser', user)
        } else {
            // User is signed out.
            await context.store.dispatch('user/logoutUser')
        }
    })
}
