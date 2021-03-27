import React , {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../actions/'

function UserHeader(props) {

    useEffect(() => {
        props.fetchUser(props.userId)
    })

    return (
        <div>
            UserHeader
        </div>
    )
}

export default connect(null , {fetchUser})(UserHeader)
