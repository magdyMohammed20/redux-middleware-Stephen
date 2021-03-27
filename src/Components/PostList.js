import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../actions/'

function PostList(props) {

    
    useEffect(() => {
        props.fetchPosts()
    } , [])

    console.log(props.posts)
    
    return (
        <div>
            PostList
        </div>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}
export default connect(mapStateToProps , {fetchPosts})(PostList)
