import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../actions/'

function PostList(props) {

    
    useEffect(() => {
        props.fetchPosts()
    } , [])

    const renderList = () => {
        return props.posts.map(post => {
            return <div key={post.id}> 
                <h1>{post.title}</h1>
                <p>{post.body}</p>
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
