import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../actions/'

function PostList(props) {

    useEffect(() => {
        console.log(props.fetchPosts())
    } , [])
    return (
        <div>
            PostList
        </div>
    )
}

export default connect(null , {fetchPosts})(PostList)
