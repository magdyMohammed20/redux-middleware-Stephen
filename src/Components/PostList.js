import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../actions/'
import UserHeader from './UserHeader'

function PostList(props) {

    
    useEffect(() => {
        props.fetchPosts()
    } , [])

    const renderList = () => {
        return props.posts.map(post => {
            return <div key={post.id}> 
                <h1>{post.title}</h1>
                <p>{post.body}</p>
                <UserHeader userId={post.userId}/>
            </div>
        })
    }
    
    return (
        <div>
            {renderList()}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}
export default connect(mapStateToProps , {fetchPosts})(PostList)
