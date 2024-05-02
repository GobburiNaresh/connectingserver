import React,{useRef} from 'react';
import './AddMovie.css';


const AddMovie = (props) => {
    const titleRef = useRef('');
    const textRef = useRef('');
    const dateRef = useRef('');

    const formSubmitHandler = (event) =>{
        event.preventDefault();

        const movie = {
            title: titleRef.current.value,
            openingText: textRef.current.value,
            releaseDate: dateRef.current.value
        }
        props.onAddMovie(movie);
        titleRef.current.value = '';
        textRef.current.value = '';
        dateRef.current.value = '';
    }
    return(
        <form onSubmit={formSubmitHandler}>
            <div className='control'>
                <label>Title</label>
                <input type='text' id='title' ref={titleRef}/>
            </div>
            <div className='control'>
                <label>Opening Text</label>
                <textarea rows='5' id='text' ref={textRef}></textarea>
            </div>
            <div className='control'>
                <label>Release Date</label>
                <input type='text' id='date' ref={dateRef}/>
            </div>
            <button>Add Movie</button>
        </form>
       

    )

}

export default AddMovie;