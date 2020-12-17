import { auth } from 'firebase'

export default function({ app, store, redirect, error }) {
    if (!store.state.user.currentUser) {
        if (
            app.getRouteBaseName() != 'login' &&
            app.getRouteBaseName() != 'signup'
        )
            return redirect(app.localePath('login'))
    }

    if (store.state.user.currentUser) {
        if (
            app.getRouteBaseName() == 'login' ||
            app.getRouteBaseName() == 'signup'
        )
            return redirect(app.localePath('/cabinet/dashboard'))
    }
}
