import React from 'react';


// This is a functional component that represents a single menu item. It currently takes in the title and displays it in an h2 element.
// Modify the component to take in all the other properties of a menu item you need and display them in the component.
// Use bootstrap to style the elements so that it looks like the mockup in the assignment.
// Hint: You can use the image name to get the image from the images folder.
const MenuItem = ({ item }) => {
// item is destructured, you would use props.item without the curly braces
    return (
        <div className='menu-item-div'>
            <div className='image-container'>
                <img src={require(`../images/${item.imageName}`)} alt=""/>
            </div>
            <div className='desc-div'>
                <h1>{item.title}</h1>
                <h4>{item.description}</h4>
                <h4>${item.price}</h4>
                <button>Add</button>
            </div>

        </div>
    );
};

export default MenuItem;
