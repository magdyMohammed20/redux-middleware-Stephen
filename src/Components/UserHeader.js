import React , {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../actions/'

function UserHeader({user , fetchUser , userId}) {

    useEffect(() => {
        fetchUser(userId)
    } , [])
    
    // For Set 'Loading...' When Load Name
    if(!user) {
        return <div>Loading..</div>
    }

    return (
        <div>
            Name : {user.name}
        </div>
    )
}

// ownProps Instead Of 'props'
// And Filter Users Here
const mapStateToProps = (state , ownProps) => {
    return {
        user: state.user.find(user => user.id === ownProps.userId)
    }
}
export default connect(mapStateToProps , {fetchUser})(UserHeader)
