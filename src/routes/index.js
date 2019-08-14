import React from 'react'
function Index() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

var routes = [
    {
        component: Index,
        routes: [
            {
                path: "/",
                exact: true,
                component: About
            },
            {
                path: "/about",
                component: About,
                /* routes: [
                     {
                         path: "/child/:id/grand-child",
                         component: GrandChild
                     }
                 ]*/
            },
            {
                path:'user',
                component:Users
            }
        ]
    }
]

export default routes;