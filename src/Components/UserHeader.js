import React , {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../actions/'

function UserHeader(props) {

    useEffect(() => {
        props.fetchUser(props.userId)
    } , [])

    // Fetch User Of The Current Post 
    const user = props.user.find(user => user.id === props.userId)
    
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

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps , {fetchUser})(UserHeader)
