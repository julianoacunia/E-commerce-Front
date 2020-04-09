import '../styles/categorie.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCategories } from '../redux/actions/categorieActions'

class categorie extends Component {
    componentDidMount(){
        this.props.fetchCategories()
    }
    render() {
        const categorieItems = this.props.categories.map(category => (
        <div className='col-md-4' key={category._id}>
            <a href={`#${category._id}`} className='a-categories'>
                <div className='btn-div'>
                    <button className='btn-name'>{category.name}</button>
                </div>
            </a>
        </div>
        ) )
        return <div className='row'>{categorieItems}</div>
    }
}

const mapStateToProps = state => ({
    categories: state.categories.items
})
  
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchCategories }, dispatch)
}
  
export default connect(mapStateToProps, mapDispatchToProps)(categorie)